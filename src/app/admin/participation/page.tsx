'use client';

import ParticipationList from '@/components/admin/ParticipationList';
import ParticipationStats from '@/components/admin/ParticipationStats';
import { useData } from '@/lib/store';

export default function ParticipationPage() {
    const { events, getAllTeams } = useData();
    const teams = getAllTeams();

    const totalEvents = events.length;
    const totalTeams = teams.length;
    const approvedTeams = teams.filter(t => t.status === 'Approved').length;
    const pendingTeams = teams.filter(t => t.status === 'Pending').length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground transition-colors">Participation Details</h1>
                <p className="text-muted-foreground mt-1 transition-colors">
                    Overview of event participation, team submissions, and candidate profiles.
                </p>
            </div>

            <ParticipationStats
                totalEvents={totalEvents}
                totalTeams={totalTeams}
                approvedTeams={approvedTeams}
                pendingTeams={pendingTeams}
            />

            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight border-b border-border/50 pb-2 text-foreground transition-colors">Event Enrollments</h2>
                <ParticipationList events={events} teams={teams} />
            </div>
        </div>
    );
}
