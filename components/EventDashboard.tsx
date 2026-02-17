'use client';

import { useState, useMemo } from 'react';
import type { Event } from '@/lib/definitions';
import EventList from './EventList';
import EventFilterDialog from './EventFilterDialog';
import { Input } from '@/components/ui/input';
import { Search, CalendarDays, CheckCircle2, Clock, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useData } from '@/lib/store';
import Link from 'next/link';

// Mock data for new dashboard sections
const tasks = [
  { id: 1, title: 'Send final payment reminder', project: 'Emma & Liam\'s Wedding', completed: false },
  { id: 2, title: 'Confirm seating plan updates', project: 'Emma & Liam\'s Wedding', completed: false },
  { id: 3, title: 'Review guest list updates', project: 'Hope for All Charity Gala', completed: false },
];

const meetings = [
  { id: 1, title: 'Seating Plan Approval Meeting', time: '10:00 AM - 10:30 AM', role: 'Venue Coordinator' },
  { id: 2, title: 'Initial Planning Call', time: '10:45 AM - 11:15 AM', role: 'Client - Brann Callahan' },
];

export default function EventDashboard() {
  const { events } = useData(); // Use data from store
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [committeeFilter, setCommitteeFilter] = useState('all');

  // Compute stats dynamically
  const totalEvents = events.length;
  // TODO: Add real logic for "In Progress" or "Upcoming" based on date
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).slice(0, 3);

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

  // Extract unique committees for filter
  const committees = Array.from(new Set(events.map(e => e.committee)));

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Maya Brooks</p>
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
          <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
            <Link href="/admin/events/new">
              <Plus className="mr-2 h-4 w-4" /> New Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tasks Card */}
        <Card className="hover:shadow-md transition-shadow duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Today's Tasks <span className="ml-2 inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">12</span></CardTitle>
            <Button variant="link" className="text-sm text-primary h-auto p-0">See All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 group">
                <div className={`mt-0.5 h-4 w-4 rounded-full border border-primary/30 flex items-center justify-center cursor-pointer hover:border-primary peer ${task.completed ? 'bg-primary border-primary' : ''}`}>
                  {task.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.project}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-primary px-0">
              <Plus className="mr-2 h-3.5 w-3.5" /> Add Task
            </Button>
          </CardContent>
        </Card>

        {/* Meetings Card */}
        <Card className="hover:shadow-md transition-shadow duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Today's Meetings <span className="ml-2 inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">5</span></CardTitle>
            <Button variant="link" className="text-sm text-primary h-auto p-0">See All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {meetings.map((meeting, idx) => (
              <div key={meeting.id} className="flex gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${idx === 0 ? 'bg-blue-500/10 text-blue-600' : 'bg-purple-500/10 text-purple-600'}`}>
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{meeting.title}</p>
                  <p className="text-xs text-muted-foreground">{meeting.time}</p>
                  <p className="text-xs text-muted-foreground">{meeting.role}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-primary px-0">
              <Plus className="mr-2 h-3.5 w-3.5" /> Schedule Meeting
            </Button>
          </CardContent>
        </Card>

        {/* Projects Worked Stats - Simplified Donut Mock */}
        <Card className="hover:shadow-md transition-shadow duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Projects Worked</CardTitle>
            <Button variant="link" className="text-sm text-primary h-auto p-0">See All</Button>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="relative h-32 w-32 rounded-full border-8 border-muted flex items-center justify-center border-t-primary border-r-blue-400 border-l-purple-400">
              <div className="text-center">
                <span className="block text-2xl font-bold">{totalEvents}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Events</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground truncate max-w-[120px]">Upcoming Events</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-muted-foreground truncate max-w-[120px]">Active Hackathons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                <span className="text-muted-foreground truncate max-w-[120px]">Workshops</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section: Upcoming Events Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <Button variant="link" className="text-sm text-muted-foreground h-auto p-0">See All</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, i) => {
            // Mock progress for visuals
            const progress = Math.floor(Math.random() * 60) + 30;
            const colors = ['bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'];
            const cardColor = colors[i % colors.length];

            return (
              <Card key={event.id} className={`border-none shadow-none ${cardColor} transition-transform hover:-translate-y-1 duration-300`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-70">{Math.floor(Math.random() * 20) + 2} days left</div>
                      <CardTitle className="text-lg leading-tight">{event.name}</CardTitle>
                    </div>
                    {/* Avatar Stack Mock */}
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full border-2 border-background bg-gray-300" />
                      <div className="h-8 w-8 rounded-full border-2 border-background bg-gray-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-xs font-medium mb-2 opacity-80">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-black/5 dark:bg-white/10" indicatorClassName="bg-current" />
                </CardContent>
              </Card>
            )
          })}
          {upcomingEvents.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
              No upcoming events. Create one to see it here!
            </div>
          )}
        </div>
      </section>

      {/* Filter Filter Row */}
      <section className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">All Events</h2>
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