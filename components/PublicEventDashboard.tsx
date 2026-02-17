'use client';

import { useState, useMemo, useEffect } from 'react';
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            {/* Sticky Search Section - Neubrutalism */}
            <div className={` top-0 z-40 bg-background   pb-6 -mt-6 pt-6`}>
                <div className={`bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${isScrolled ? 'p-4' : 'p-6'}`}>
                    <div className="flex flex-col gap-4">
                        {/* Header - Hidden when scrolled */}
                        
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-black pb-4">
                                <div>
                                    <h1 className="text-4xl font-black uppercase tracking-tight text-black">Upcoming Events</h1>
                                    <p className="text-black/70 font-bold text-sm mt-1">Discover the latest hackathons, workshops, and meetups.</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-primary border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="text-xs font-black uppercase text-black">
                                        {filteredEvents.length} Events
                                    </span>
                                </div>
                            </div>
                        

                        {/* Search and Filter - Compact when scrolled */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                            <div className="relative flex-1">
                                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-black transition-all ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
                                <Input
                                    placeholder={isScrolled ? "SEARCH..." : "SEARCH EVENTS..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`pl-12 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white text-black font-bold placeholder:text-black/40 placeholder:font-bold placeholder:uppercase focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all rounded-none ${isScrolled ? 'h-10' : 'h-12'}`}
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

                        {/* Active Filters Display */}
                        {(categoryFilter !== 'all' || committeeFilter !== 'all') && (
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-black">
                                <span className="text-xs font-black uppercase text-black">Active Filters:</span>
                                {categoryFilter !== 'all' && (
                                    <div className="px-3 py-1 bg-accent border-2 border-black text-black text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {categoryFilter}
                                    </div>
                                )}
                                {committeeFilter !== 'all' && (
                                    <div className="px-3 py-1 bg-accent border-2 border-black text-black text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {committeeFilter}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Events List */}
            <section>
                {filteredEvents.length > 0 ? (
                    <EventList events={filteredEvents} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center border-4 border-dashed border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                        <div className="w-20 h-20 border-2 border-black bg-accent flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Search className="h-10 w-10 text-black" />
                        </div>
                        <p className="text-xl font-black uppercase text-black mb-2">No Events Found</p>
                        <p className="text-black/70 font-medium">Try adjusting your search or filters</p>
                    </div>
                )}
            </section>
        </div>
    );
}
