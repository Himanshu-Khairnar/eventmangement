'use client';

import { useState, useMemo } from 'react';
import type { Event } from '@/lib/definitions';
import EventList from './EventList';
import EventFilterDialog from './EventFilterDialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useData } from '@/lib/store';

export default function PublicEventDashboard() {
    const { events } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [committeeFilter, setCommitteeFilter] = useState('all');

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.committee.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
            const matchesCommittee = committeeFilter === 'all' || event.committee === committeeFilter;
            return matchesSearch && matchesCategory && matchesCommittee;
        });
    }, [events, searchTerm, categoryFilter, committeeFilter]);

    const committees = Array.from(new Set(events.map(e => e.committee)));

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-headline font-bold">Upcoming Events</h1>
                    <p className="text-muted-foreground">Discover the latest hackathons, workshops, and meetups.</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 bg-card border-border/50"
                        />
                    </div>
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
            </div>

            <section>
                {filteredEvents.length > 0 ? (
                    <EventList events={filteredEvents} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <Search className="h-10 w-10 mb-3 opacity-20" />
                        <p>No events found matching your filters.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
