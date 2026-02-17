'use client';

import { useState, useMemo } from 'react';
import type { Event } from '@/lib/definitions';
import EventFilters from './EventFilters';
import EventList from './EventList';

type EventDashboardProps = {
  initialEvents: Event[];
  committees: string[];
};

export default function EventDashboard({ initialEvents, committees }: EventDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [committeeFilter, setCommitteeFilter] = useState('all');
  
  const filteredEvents = useMemo(() => {
    return initialEvents.filter(event => {
      const matchesSearch = 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.committee.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      const matchesCommittee = committeeFilter === 'all' || event.committee === committeeFilter;
      return matchesSearch && matchesCategory && matchesCommittee;
    });
  }, [initialEvents, searchTerm, categoryFilter, committeeFilter]);

  return (
    <div className="relative space-y-12 pb-20">
      {/* Decorative Background Element 
          Adds a soft green glow behind the header 
      */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[120px] pointer-events-none" />

      <header className="relative text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider mb-2">
          Campus Life
        </div>
        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Discover What&apos;s Happening
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          The central hub for all events on campus. Filter by committee or category to find your next experience.
        </p>
      </header>

      {/* Sticky Filter Bar 
          Using 'backdrop-blur' to make it feel modern when scrolling
      */}
      <section className="sticky top-4 z-30 p-1 rounded-2xl bg-card/50 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/40">
        <EventFilters
          committees={committees}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
          onCommitteeChange={setCommitteeFilter}
        />
      </section>

      <section className="relative">
        {filteredEvents.length > 0 ? (
          <EventList events={filteredEvents} />
        ) : (
          <div className="py-20 text-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02]">
            <p className="text-muted-foreground">No events found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setCommitteeFilter('all');
              }}
              className="mt-4 text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}