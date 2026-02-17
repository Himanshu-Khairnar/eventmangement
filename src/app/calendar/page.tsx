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
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container max-w-screen-2xl px-4 py-12 relative z-10">
          {/* Enhanced Header Section */}
          <header className="mb-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Event Calendar
                   </span>
                </div>
                
                <div>
                  <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                      Campus Timeline
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground/80 mt-2 max-w-lg font-light">
                    Stay synchronized with campus life. Discover events, workshops, and gatherings happening around you.
                  </p>
                </div>
              </div>

               {/* Quick Stats Cards - Refined */}
              <div className="flex gap-4">
                  <div className="group relative overflow-hidden rounded-2xl bg-card/30 border border-white/5 p-4 min-w-[140px] backdrop-blur-md transition-all hover:bg-card/50 hover:border-primary/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                          <p className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform origin-left">{stats.thisWeek}</p>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">This Week</p>
                      </div>
                  </div>
                   <div className="group relative overflow-hidden rounded-2xl bg-card/30 border border-white/5 p-4 min-w-[140px] backdrop-blur-md transition-all hover:bg-card/50 hover:border-purple-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="relative">
                          <p className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform origin-left">{stats.total}</p>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Events</p>
                      </div>
                  </div>
              </div>
            </div>

            {/* Category Filter - Refined */}
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-sm font-medium text-muted-foreground mr-2">Filter by:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                    ${selectedCategory === cat 
                        ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105' 
                        : 'bg-card/30 text-muted-foreground hover:bg-card/50 hover:text-foreground border border-white/5'}
                  `}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Calendar + Upcoming */}
            <div className="lg:col-span-4 space-y-8">
              {/* Calendar Card */}
              <div className="lg:sticky lg:top-24 space-y-8">
                <div className="rounded-3xl border border-white/10 bg-card/20 backdrop-blur-xl shadow-2xl p-1 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none" />
                  
                  <div className="p-6 pb-2">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-xl text-white">Select Date</h3>
                        <div className="px-2 py-1 rounded bg-white/5 text-xs font-mono text-primary/80">
                            {date ? format(date, 'MMM yyyy') : 'No Date'}
                        </div>
                     </div>
                  </div>

                  <div className="w-full flex justify-center pb-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-xl border-none p-0"
captionLayout='dropdown'
                    />
                  </div>
                </div>

                {/* Upcoming Events - Compact List */}
                {upcomingEvents.length > 0 && (
                  <div className="rounded-3xl border border-white/5 bg-card/10 backdrop-blur-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg text-white flex items-center gap-2">
                         <Clock className="w-4 h-4 text-primary" />
                         Upcoming
                      </h3>
                      <Link href="/events" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {upcomingEvents.map((event, i) => (
                        <Link key={event.id} href={`/events/${event.id}`} className="block group">
                          <div className="flex gap-4 items-center">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-card/50 border border-white/5 flex flex-col items-center justify-center group-hover:border-primary/30 transition-colors">
                               <span className="text-[10px] font-bold text-muted-foreground uppercase">{format(new Date(event.date), 'MMM')}</span>
                               <span className="text-lg font-bold text-white leading-none">{format(new Date(event.date), 'dd')}</span>
                            </div>
                            <div className="min-w-0">
                               <h4 className="text-sm font-semibold text-white/90 truncate group-hover:text-primary transition-colors">{event.name}</h4>
                               <p className="text-xs text-muted-foreground mt-0.5">{event.venue}</p>
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
              <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-6">
                 <div>
                    <p className="text-sm font-medium text-primary mb-1">Schedule for</p>
                    <h2 className="text-4xl font-bold text-white tracking-tight">
                        {date ? format(date, 'EEEE, MMMM do') : 'Select a Date'}
                    </h2>
                 </div>
                 {date && isSameDay(date, new Date()) && (
                     <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 px-3 py-1">Today</Badge>
                 )}
              </div>

              {selectedDayEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                        <CalendarDays className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No Events Scheduled</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
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