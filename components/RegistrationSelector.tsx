'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RegistrationForm from '@/components/RegistrationForm';
import TeamRegistrationForm from '@/components/TeamRegistrationForm';
import { User, Users } from 'lucide-react';

export default function RegistrationSelector({ eventId, eventName }: { eventId: string, eventName: string }) {
  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>('individual');

  return (
    <div className="space-y-4">
      <Tabs defaultValue="individual" onValueChange={(value) => setRegistrationType(value as 'individual' | 'team')}>
        <TabsList className="grid w-full grid-cols-2 bg-card/30 backdrop-blur-sm">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Individual
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team (4 members)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="mt-6">
          <RegistrationForm eventId={eventId} eventName={eventName} />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <TeamRegistrationForm eventId={eventId} eventName={eventName} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
