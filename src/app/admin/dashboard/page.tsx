import { getEvents } from '@/lib/data';
import EventDataTable from '@/components/admin/EventDataTable';
import EnrollmentChart from '@/components/admin/EnrollmentChart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default async function DashboardPage() {
  const events = await getEvents();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline font-bold">Event Management</h1>
        <Button asChild>
          <Link href="/admin/events/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Event
          </Link>
        </Button>
      </div>
      
      <EnrollmentChart />
      
      <EventDataTable events={events} />
    </div>
  );
}
