import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, CheckCircle2, Clock } from "lucide-react";

interface ParticipationStatsProps {
    totalEvents: number;
    totalTeams: number;
    approvedTeams: number;
    pendingTeams: number;
}

export default function ParticipationStats({
    totalEvents,
    totalTeams,
    approvedTeams,
    pendingTeams,
}: ParticipationStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Events
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalEvents}</div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Teams
                    </CardTitle>
                    <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalTeams}</div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-green-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Approved Teams
                    </CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-500">{approvedTeams}</div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-yellow-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Pending Teams
                    </CardTitle>
                    <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-yellow-500">{pendingTeams}</div>
                </CardContent>
            </Card>
        </div>
    );
}
