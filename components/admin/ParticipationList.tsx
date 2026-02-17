'use client';

import { useState } from 'react';
import { Event, Team } from '@/lib/definitions';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, ExternalLink, Presentation, Github, Users } from 'lucide-react';
import ResumeViewer from './ResumeViewer';

interface ParticipationListProps {
    events: Event[];
    teams: Team[];
}

export default function ParticipationList({ events, teams }: ParticipationListProps) {
    const [selectedResume, setSelectedResume] = useState<{ url: string; name: string } | null>(null);

    const getEventTeams = (eventId: string) => teams.filter(t => t.eventId === eventId);

    return (
        <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
                {events.map((event) => {
                    const eventTeams = getEventTeams(event.id);
                    return (
                        <AccordionItem
                            key={event.id}
                            value={event.id}
                            className="border border-border/40 rounded-xl overflow-hidden bg-card/40 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <AccordionTrigger className="hover:no-underline px-6 py-5 group">
                                <div className="flex items-center justify-between w-full pr-4">
                                    <div className="text-left space-y-1">
                                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{event.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="bg-muted/50 px-2 py-0.5 rounded text-xs">{event.category}</span>
                                            <span>•</span>
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="ml-4 bg-muted/30 border-primary/20 text-primary">
                                        {eventTeams.length} {eventTeams.length === 1 ? 'Team' : 'Teams'}
                                    </Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 pt-2 bg-muted/5">
                                {eventTeams.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground border-2 border-dashed border-muted/30 rounded-lg">
                                        <Github className="h-10 w-10 mb-3 opacity-20" />
                                        <p>No teams have registered for this event yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4">
                                        {eventTeams.map((team) => (
                                            <Card key={team.id} className="bg-background border-border/50 hover:border-primary/30 transition-colors shadow-sm">
                                                <CardHeader className="pb-3">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div className="space-y-1.5">
                                                            <div className="flex items-center gap-2">
                                                                <CardTitle className="text-base font-bold text-foreground">{team.projectTitle}</CardTitle>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className={
                                                                        team.status === 'Approved'
                                                                            ? "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20"
                                                                            : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20"
                                                                    }
                                                                >
                                                                    {team.status}
                                                                </Badge>
                                                            </div>
                                                            <CardDescription className="line-clamp-2 text-sm">
                                                                {team.abstract}
                                                            </CardDescription>
                                                        </div>
                                                        <div className="flex shrink-0 gap-2">
                                                            {team.fileLink && (
                                                                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" asChild>
                                                                    <a href={team.fileLink} target="_blank" rel="noopener noreferrer">
                                                                        <Presentation className="h-3.5 w-3.5" />
                                                                        <span className="hidden sm:inline">Project</span>
                                                                    </a>
                                                                </Button>
                                                            )}
                                                            {team.canvaLink && (
                                                                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" asChild>
                                                                    <a href={team.canvaLink} target="_blank" rel="noopener noreferrer">
                                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                                        <span className="hidden sm:inline">Design</span>
                                                                    </a>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                            <Users className="h-3 w-3" /> Team Members
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                            {team.members.map((member, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-primary/20 transition-all group/member"
                                                                >
                                                                    <div className="overflow-hidden mr-2">
                                                                        <p className="text-sm font-medium truncate group-hover/member:text-primary transition-colors">{member.name}</p>
                                                                        <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                                                                            {member.role === 'leader' ? (
                                                                                <span className="text-yellow-500">👑</span>
                                                                            ) : (
                                                                                <span className="opacity-50">👤</span>
                                                                            )}
                                                                            {member.branch}
                                                                        </p>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 shrink-0"
                                                                        onClick={() => setSelectedResume({ url: member.resume, name: member.name })}
                                                                        title="View Resume"
                                                                    >
                                                                        <FileText className="h-3.5 w-3.5" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>

            {selectedResume && (
                <ResumeViewer
                    isOpen={!!selectedResume}
                    onClose={() => setSelectedResume(null)}
                    resumeUrl={selectedResume.url}
                    studentName={selectedResume.name}
                />
            )}
        </div>
    );
}
