'use client';
import { useState, useEffect, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { getEvents } from '@/lib/data';
import type { Event } from '@/lib/definitions';
import EventCard from '@/components/EventCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, isSameDay } from 'date-fns';
import Header from '@/components/Header';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      // In a real app, this would be an API call.
      const allEvents = await getEvents();
      setEvents(allEvents);
    }
    fetchEvents();
  }, []);

  const selectedDayEvents = useMemo(() => {
    if (!date) return [];
    return events.filter(event => isSameDay(new Date(event.date), date));
  }, [date, events]);

  const eventDays = useMemo(() => events.map(event => new Date(event.date)), [events]);

  return (
    <>
    <Header />
    <main>
      <div className="container max-w-screen-xl py-12">
          <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl text-center mb-8">
              Event Calendar
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1 flex justify-center md:sticky md:top-28">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{ event: eventDays }}
                  modifiersClassNames={{
                    event: 'border-2 border-primary/50',
                  }}
                />
              </div>
              <div className="md:col-span-2">
                  <Card>
                      <CardHeader>
                          <CardTitle>
                              Events for {date ? format(date, 'MMMM d, yyyy') : 'selected day'}
                          </CardTitle>
                      </CardHeader>
                      <CardContent>
                          {selectedDayEvents.length > 0 ? (
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  {selectedDayEvents.map(event => (
                                      <EventCard key={event.id} event={event} />
                                  ))}
                              </div>
                          ) : (
                              <div className="flex flex-col items-center justify-center text-center py-10">
                                  <p className="text-lg font-medium">No Events Scheduled</p>
                                  <p className="text-muted-foreground">Select another day to see what&apos;s happening.</p>
                              </div>
                          )}
                      </CardContent>
                  </Card>
              </div>
          </div>
      </div>
      </main>
    </>
  );
}
