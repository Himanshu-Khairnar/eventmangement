'use client';

import { useState, useEffect, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { getEvents } from '@/lib/data';
import type { Event } from '@/lib/definitions';
import EventCard from '@/components/EventCard';
import { format, isSameDay, isAfter, isBefore, addDays, startOfDay } from 'date-fns';
import Header from '@/components/Header';
import { CalendarDays, Sparkles, TrendingUp, Filter, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

// ... imports remain same ...

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchEvents() {
      const allEvents = await getEvents();
      setEvents(allEvents);
    }
    fetchEvents();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category));
    return ['all', ...Array.from(cats)];
  }, [events]);

  const selectedDayEvents = useMemo(() => {
    if (!date) return [];
    let filtered = events.filter(event => isSameDay(new Date(event.date), date));
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }
    return filtered;
  }, [date, events, selectedCategory]);

  const upcomingEvents = useMemo(() => {
    const today = startOfDay(new Date());
    return events
      .filter(event => isAfter(new Date(event.date), today))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [events]);

  const eventDays = useMemo(() => events.map(event => new Date(event.date)), [events]);

  const stats = useMemo(() => {
    const today = startOfDay(new Date());
    const nextWeek = addDays(today, 7);

    return {
      total: events.length,
      thisWeek: events.filter(e => {
        const eventDate = new Date(e.date);
        return isAfter(eventDate, today) && isBefore(eventDate, nextWeek);
      }).length,
    };
  }, [events]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background relative">
        <div className="container max-w-screen-2xl px-4 py-12">
          {/* Enhanced Header Section */}
          <header className="mb-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   <CalendarDays className="w-4 h-4 text-black" />
                   <span className="text-sm font-bold text-black uppercase tracking-wider">
                      Event Calendar
                   </span>
                </div>

                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight uppercase text-black">
                    Campus Timeline
                  </h1>
                  <p className="text-lg text-black/70 mt-4 max-w-lg font-medium">
                    Stay synchronized with campus life. Discover events, workshops, and gatherings happening around you.
                  </p>
                </div>
              </div>

               {/* Quick Stats Cards - Neubrutalist */}
              <div className="flex gap-4">
                  <div className="group relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 min-w-[140px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                      <p className="text-4xl font-black text-black mb-2">{stats.thisWeek}</p>
                      <p className="text-xs font-bold text-black/60 uppercase tracking-wide">This Week</p>
                  </div>
                   <div className="group relative bg-primary border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 min-w-[140px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                      <p className="text-4xl font-black text-black mb-2">{stats.total}</p>
                      <p className="text-xs font-bold text-black/80 uppercase tracking-wide">Total Events</p>
                  </div>
              </div>
            </div>

            {/* Category Filter - Neubrutalist */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <span className="text-sm font-bold text-black mr-2 uppercase">Filter:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-5 py-2 text-sm font-bold uppercase transition-all border-2 border-black
                    ${selectedCategory === cat
                        ? 'bg-primary text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'}
                  `}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Calendar + Upcoming */}
            <div className="lg:col-span-4 space-y-8">
              {/* Calendar Card */}
              <div className="lg:sticky lg:top-24 space-y-8">
                <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="p-6 pb-4 bg-primary border-b-2 border-black">
                     <div className="flex items-center justify-between">
                        <h3 className="font-black text-xl text-black uppercase">Select Date</h3>
                        <div className="px-3 py-1 bg-black text-white text-xs font-bold">
                            {date ? format(date, 'MMM yyyy') : 'No Date'}
                        </div>
                     </div>
                  </div>

                  <div className="w-full flex justify-center p-4 bg-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="border-none p-0"
                      captionLayout='dropdown'
                      modifiers={{
                        hasEvent: eventDays,
                      }}
                      modifiersClassNames={{
                        hasEvent: 'has-event',
                      }}
                    />
                  </div>
                </div>

                {/* Upcoming Events - Compact List */}
                {upcomingEvents.length > 0 && (
                  <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                      <h3 className="font-black text-lg text-black uppercase flex items-center gap-2">
                         <Clock className="w-5 h-5 text-black" />
                         Upcoming
                      </h3>
                      <Link href="/events" className="text-xs text-black font-bold uppercase hover:text-primary transition-colors">
                        View All →
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {upcomingEvents.map((event, i) => (
                        <Link key={event.id} href={`/events/${event.id}`} className="block group">
                          <div className="flex gap-4 items-center p-3 border-2 border-black bg-white group-hover:bg-primary group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none">
                            <div className="flex-shrink-0 w-14 h-14 border-2 border-black bg-primary flex flex-col items-center justify-center">
                               <span className="text-[10px] font-bold text-black uppercase">{format(new Date(event.date), 'MMM')}</span>
                               <span className="text-xl font-black text-black leading-none">{format(new Date(event.date), 'dd')}</span>
                            </div>
                            <div className="min-w-0">
                               <h4 className="text-sm font-bold text-black truncate">{event.name}</h4>
                               <p className="text-xs text-black/70 mt-1 font-medium">{event.venue}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Selected Day Events */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-end justify-between border-b-4 border-black pb-6 mb-8">
                 <div>
                    <p className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Schedule for</p>
                    <h2 className="text-4xl font-black text-black tracking-tight uppercase">
                        {date ? format(date, 'EEEE, MMMM do') : 'Select a Date'}
                    </h2>
                 </div>
                 {date && isSameDay(date, new Date()) && (
                     <Badge className="border-2 border-black bg-accent text-black px-4 py-2 text-sm font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                       Today
                     </Badge>
                 )}
              </div>

              {selectedDayEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedDayEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="animate-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-4 border-dashed border-black bg-white p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="w-20 h-20 border-2 border-black bg-accent flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <CalendarDays className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-black mb-3 uppercase">No Events Scheduled</h3>
                    <p className="text-black/70 max-w-sm mx-auto font-medium text-base">
                        {date ? "There are no events scheduled for this specific date." : "Please select a date from the calendar to view events."}
                    </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}