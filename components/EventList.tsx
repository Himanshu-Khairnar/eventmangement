'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard from './EventCard';
import type { Event } from '@/lib/definitions';
import { useMemo } from 'react';

type EventListProps = {
  events: Event[];
};

export default function EventList({ events }: EventListProps) {
  const { upcoming, ongoing, past } = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const upcoming = events.filter(e => new Date(e.date) > today).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const ongoing = events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.getFullYear() === today.getFullYear() &&
               eventDate.getMonth() === today.getMonth() &&
               eventDate.getDate() === today.getDate();
    });
    const past = events.filter(e => new Date(e.date) < today).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { upcoming, ongoing, past };
  }, [events]);

  const renderEventGrid = (eventList: Event[], emptyMessage: string) => {
    if (eventList.length === 0) {
      return <p className="text-muted-foreground text-center py-10">{emptyMessage}</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventList.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 h-12">
        <TabsTrigger value="upcoming" className="h-full rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-bold transition-all uppercase">Upcoming</TabsTrigger>
        <TabsTrigger value="ongoing" className="h-full rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-bold transition-all uppercase">Ongoing</TabsTrigger>
        <TabsTrigger value="past" className="h-full rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-bold transition-all uppercase">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="mt-6">
        {renderEventGrid(upcoming, "No upcoming events found with the current filters.")}
      </TabsContent>
      <TabsContent value="ongoing" className="mt-6">
        {renderEventGrid(ongoing, "No events happening today with the current filters.")}
      </TabsContent>
      <TabsContent value="past" className="mt-6">
        {renderEventGrid(past, "No past events found with the current filters.")}
      </TabsContent>
    </Tabs>
  );
}
