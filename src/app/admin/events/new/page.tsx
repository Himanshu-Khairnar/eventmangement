import EventForm from '@/components/admin/EventForm';
import { createEvent } from '@/lib/actions';

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Create New Event</h1>
      <EventForm action={createEvent} />
    </div>
  );
}
