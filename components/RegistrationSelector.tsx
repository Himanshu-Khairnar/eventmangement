'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RegistrationForm from '@/components/RegistrationForm';
import TeamRegistrationForm from '@/components/TeamRegistrationForm';
import { User, Users } from 'lucide-react';
import { useData } from '@/lib/store';
import type { Event } from '@/lib/definitions';

type RegistrationSelectorProps = {
  eventId: string;
  eventName: string;
  minTeamSize?: number;
  maxTeamSize?: number;
  allowIndividual?: boolean;
  resumeRequired?: boolean;
};

export default function RegistrationSelector({
  eventId,
  eventName,
  minTeamSize = 2,
  maxTeamSize = 4,
  allowIndividual = true,
  resumeRequired = false
}: RegistrationSelectorProps) {
  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>(allowIndividual ? 'individual' : 'team');

  // If only one type is allowed, show that form directly
  if (!allowIndividual) {
    return (
      <div className="space-y-4">
        <div className="bg-primary border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-sm font-bold text-black uppercase">
            <Users className="inline h-4 w-4 mr-2" />
            Team Registration Only ({minTeamSize}-{maxTeamSize} members)
          </p>
        </div>
        <TeamRegistrationForm
          eventId={eventId}
          eventName={eventName}
          minTeamSize={minTeamSize}
          maxTeamSize={maxTeamSize}
          resumeRequired={resumeRequired}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue={registrationType} onValueChange={(value) => setRegistrationType(value as 'individual' | 'team')}>
        <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-0 h-12">
          <TabsTrigger value="individual" className="flex items-center gap-2 h-full rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-bold transition-all">
            <User className="h-4 w-4" />
            Individual
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2 h-full rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-bold transition-all">
            <Users className="h-4 w-4" />
            Team ({minTeamSize}-{maxTeamSize} members)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="mt-6">
          <RegistrationForm
            eventId={eventId}
            eventName={eventName}
            resumeRequired={resumeRequired}
          />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <TeamRegistrationForm
            eventId={eventId}
            eventName={eventName}
            minTeamSize={minTeamSize}
            maxTeamSize={maxTeamSize}
            resumeRequired={resumeRequired}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
