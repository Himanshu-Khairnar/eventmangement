'use client';

import { useState, useMemo } from 'react';
import type { Event } from '@/lib/definitions';
import EventList from './EventList';
import EventFilterDialog from './EventFilterDialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
    <div className="relative space-y-16 pb-20">
      {/* Decorative Background Element */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[150px] pointer-events-none rounded-full" />

      <header className="relative text-center space-y-6 pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-white/5 text-secondary-foreground text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Campus Life
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 pb-2">
          Discover Events
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-light">
          Your central hub for everything happening on campus. <br className="hidden md:block" />
          Filter by committee, category, or search to find your next experience.
        </p>
      </header>

      {/* Sticky Filter Bar */}
      <section className="sticky top-20 z-40 mx-auto max-w-4xl px-4">
         <div className="flex items-center gap-2 p-2 rounded-2xl bg-background/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 ring-1 ring-white/5">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search by event name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-transparent border-none shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 h-10"
                />
            </div>
            <div className="h-6 w-[1px] bg-white/10 mx-1" />
            <EventFilterDialog 
                committees={committees}
                categoryFilter={categoryFilter}
                committeeFilter={committeeFilter}
                onCategoryChange={setCategoryFilter}
                onCommitteeChange={setCommitteeFilter}
                onClearFilters={() => {
                    setCategoryFilter('all');
                    setCommitteeFilter('all');
                }}
            />
         </div>
      </section>

      <section className="relative min-h-[400px]">
        {filteredEvents.length > 0 ? (
          <EventList events={filteredEvents} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02]">
            <div className="h-16 w-16 mb-4 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground max-w-md mb-6">
                We couldn't find any events matching your current filters. Try adjusting your search or filters.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setCommitteeFilter('all');
              }}
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}