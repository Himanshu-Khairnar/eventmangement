'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, CalendarDays, Users, TrendingUp, Clock, Plus, Award, MapPin, Mail, Phone, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useData } from '@/lib/store';
import Link from 'next/link';
import { isToday, isFuture, isPast, format } from 'date-fns';

export default function EventDashboard() {
  const { events, teams } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllEventsDialog, setShowAllEventsDialog] = useState(false);
  const [selectedParticipation, setSelectedParticipation] = useState<any>(null);

  // Compute stats dynamically
  const totalEvents = events.length;
  const todayEvents = events.filter(e => isToday(new Date(e.date)));
  const allUpcomingEvents = events.filter(e => isFuture(new Date(e.date)));
  const upcomingEvents = allUpcomingEvents.slice(0, 3);

  // Recent registrations (teams)
  const recentRegistrations = teams.slice(0, 3);

  // Event stats by category
  const eventsByCategory = useMemo(() => {
    const stats = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  }, [events]);

  // Registration stats
  const totalRegistrations = teams.length;
  const pendingRegistrations = teams.filter(t => t.status === 'Pending').length;

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
              className="pl-9 bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0"
            />
          </div>
          <Button asChild className="neubrutalist-btn rounded-none bg-primary text-black font-bold hover:bg-primary/90">
            <Link href="/admin/events/new">
              <Plus className="mr-2 h-4 w-4" /> New Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Total Events</p>
                <p className="text-3xl font-black text-black mt-2">{totalEvents}</p>
              </div>
              <div className="h-12 w-12 border-2 border-black bg-primary flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Registrations</p>
                <p className="text-3xl font-black text-black mt-2">{totalRegistrations}</p>
              </div>
              <div className="h-12 w-12 border-2 border-black bg-blue-300 flex items-center justify-center">
                <Users className="h-6 w-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Upcoming</p>
                <p className="text-3xl font-black text-black mt-2">{upcomingEvents.length}</p>
              </div>
              <div className="h-12 w-12 border-2 border-black bg-purple-300 flex items-center justify-center">
                <Clock className="h-6 w-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Pending</p>
                <p className="text-3xl font-black text-black mt-2">{pendingRegistrations}</p>
              </div>
              <div className="h-12 w-12 border-2 border-black bg-accent flex items-center justify-center">
                <Award className="h-6 w-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Cards Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Events Card */}
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold">Today's Events
              <span className="ml-2 inline-flex items-center justify-center rounded-none border-2 border-black bg-accent px-2 py-0.5 text-xs font-black text-black">
                {todayEvents.length}
              </span>
            </CardTitle>
            <CalendarDays className="h-5 w-5 text-black" />
          </CardHeader>
          <CardContent className="space-y-4">
            {todayEvents.length > 0 ? (
              todayEvents.slice(0, 3).map(event => (
                <div key={event.id} className="flex items-start gap-3 group">
                  <div className="mt-0.5 h-8 w-8 border-2 border-black bg-primary flex items-center justify-center shrink-0">
                    <CalendarDays className="h-4 w-4 text-black" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold leading-none group-hover:text-primary transition-colors">{event.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">{event.time} • {event.venue}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <CalendarDays className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm font-medium">No events scheduled for today</p>
              </div>
            )}
            {todayEvents.length > 3 && (
              <Button variant="ghost" size="sm" className="w-full justify-center text-black hover:text-primary font-bold">
                View {todayEvents.length - 3} more →
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Recent Registrations Card */}
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold">Recent Registrations
              <span className="ml-2 inline-flex items-center justify-center rounded-none border-2 border-black bg-blue-200 px-2 py-0.5 text-xs font-black text-black">
                {pendingRegistrations}
              </span>
            </CardTitle>
            <Link href="/admin/participation">
              <Button variant="link" className="text-sm text-black font-bold h-auto p-0 underline decoration-2">See All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRegistrations.length > 0 ? (
              recentRegistrations.map((team) => (
                <div
                  key={team.id}
                  className="flex gap-3 cursor-pointer hover:bg-black/5 p-2 -m-2 rounded-none transition-colors"
                  onClick={() => setSelectedParticipation(team)}
                >
                  <div className={`h-10 w-10 border-2 border-black flex items-center justify-center shrink-0 ${
                    team.status === 'Approved' ? 'bg-primary' : team.status === 'Pending' ? 'bg-blue-200' : 'bg-red-200'
                  }`}>
                    <Users className="h-5 w-5 text-black" />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-bold leading-none truncate">{team.projectTitle}</p>
                    <p className="text-xs text-muted-foreground font-medium truncate">{team.eventName}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 border border-black ${
                        team.status === 'Approved' ? 'bg-primary' : team.status === 'Pending' ? 'bg-blue-200' : 'bg-red-200'
                      }`}>
                        {team.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{team.members.length} members</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm font-medium">No registrations yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Events by Category Chart */}
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold">Events by Category</CardTitle>
            <TrendingUp className="h-5 w-5 text-black" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(eventsByCategory).map(([category, count], idx) => {
              const colors = ['bg-primary', 'bg-blue-300', 'bg-purple-300', 'bg-pink-300'];
              const percentage = (count / totalEvents) * 100;

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 border-2 border-black ${colors[idx % colors.length]}`} />
                      <span className="font-bold text-black">{category}</span>
                    </div>
                    <span className="font-black text-black">{count}</span>
                  </div>
                  <div className="h-2 bg-white border-2 border-black overflow-hidden">
                    <div
                      className={`h-full ${colors[idx % colors.length]} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(eventsByCategory).length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                <Award className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm font-medium">No events to categorize</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Middle Section: Upcoming Events Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black uppercase">Upcoming Events</h2>
          <Button
            variant="link"
            className="text-sm text-black font-bold h-auto p-0 underline decoration-2"
            onClick={() => setShowAllEventsDialog(true)}
          >
            See All
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, i) => {
            // Mock progress for visuals
            const progress = Math.floor(Math.random() * 60) + 30;
            const colors = ['bg-blue-200 text-black', 'bg-purple-200 text-black', 'bg-pink-200 text-black'];
            const cardColor = colors[i % colors.length];

            return (
              <Card key={event.id} className={`border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${cardColor} transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none duration-300`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-70">{Math.floor(Math.random() * 20) + 2} days left</div>
                      <CardTitle className="text-lg leading-tight">{event.name}</CardTitle>
                    </div>
                    {/* Avatar Stack Mock */}
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full border-2 border-black bg-gray-300" />
                      <div className="h-8 w-8 rounded-full border-2 border-black bg-gray-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm font-medium text-black">{event.venue}</p>
                  <p className="text-xs text-black/70">{event.time}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs font-black uppercase px-2 py-1 border-2 border-black bg-white">
                      {event.category}
                    </span>
                    <span className="text-xs font-bold text-black/60">
                      {event.committee}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {upcomingEvents.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-white rounded-none border-2 border-dashed border-black">
              No upcoming events. Create one to see it here!
            </div>
          )}
        </div>
      </section>

      {/* Filter Filter Row
      <section className="bg-white p-4 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black uppercase">All Events</h2>
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
      </section> */}

      {/* All Upcoming Events Dialog */}
      <Dialog open={showAllEventsDialog} onOpenChange={setShowAllEventsDialog}>
        <DialogContent className="max-w-4xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase text-black border-b-4 border-black pb-4">
              All Upcoming Events ({allUpcomingEvents.length})
            </DialogTitle>
            <DialogDescription className="text-black font-medium">
              View all upcoming events scheduled in the system
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {allUpcomingEvents.length > 0 ? (
              allUpcomingEvents.map((event) => (
                <Card key={event.id} className="border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-black">{event.name}</h3>
                          <span className="text-xs font-black uppercase px-2 py-1 border-2 border-black bg-primary">
                            {event.category}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-black">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span className="font-bold">{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-bold">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="font-bold">{event.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="font-bold">{event.committee}</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/admin/events/${event.id}`}>
                        <Button className="neubrutalist-btn bg-white hover:bg-white text-black">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-bold">No upcoming events</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Participation Details Dialog */}
      {selectedParticipation && (
        <Dialog open={!!selectedParticipation} onOpenChange={(open) => !open && setSelectedParticipation(null)}>
          <DialogContent className="max-w-3xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase text-black border-b-4 border-black pb-4 flex items-center justify-between">
                <span>Participation Details</span>
                <span className={`text-sm font-black uppercase px-3 py-1.5 border-2 border-black ${
                  selectedParticipation.status === 'Approved' ? 'bg-primary' :
                  selectedParticipation.status === 'Pending' ? 'bg-blue-200' : 'bg-red-200'
                }`}>
                  {selectedParticipation.status}
                </span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Event & Project Info */}
              <div className="space-y-3">
                <div className="p-4 border-4 border-black bg-yellow-50 rounded-none">
                  <h4 className="text-xs font-black uppercase text-black/60 mb-1">Event</h4>
                  <p className="text-lg font-black text-black">{selectedParticipation.eventName}</p>
                </div>
                <div className="p-4 border-4 border-black bg-white rounded-none">
                  <h4 className="text-xs font-black uppercase text-black/60 mb-1">Project Title</h4>
                  <p className="text-lg font-black text-black">{selectedParticipation.projectTitle}</p>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="text-sm font-black uppercase text-black mb-3 border-l-4 border-primary pl-3">
                  Team Members ({selectedParticipation.members.length})
                </h4>
                <div className="space-y-3">
                  {selectedParticipation.members.map((member: any, idx: number) => (
                    <Card key={idx} className="border-3 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`h-12 w-12 border-2 border-black ${
                            member.role === 'leader' ? 'bg-primary' : 'bg-blue-200'
                          } flex items-center justify-center shrink-0`}>
                            <User className="h-6 w-6 text-black" />
                          </div>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-base font-black text-black">{member.name}</p>
                              {member.role === 'leader' && (
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 border border-black bg-primary">
                                  Team Leader
                                </span>
                              )}
                            </div>
                            <div className="space-y-1 text-sm text-black">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                <span className="font-bold">{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">ID: {member.studentId}</span>
                                <span className="text-black/60">•</span>
                                <span className="font-bold">Year {member.year}</span>
                                <span className="text-black/60">•</span>
                                <span className="font-bold">{member.branch}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Registration Date */}
              <div className="p-4 border-2 border-black bg-gray-50 rounded-none">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase text-black/60 mb-1">Registered On</h4>
                    <p className="text-sm font-bold text-black">{selectedParticipation.createdAt}</p>
                  </div>
                  <Link href="/admin/participation">
                    <Button className="neubrutalist-btn bg-white hover:bg-white text-black">
                      View in Participation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}