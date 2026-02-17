import EventForm from '@/components/admin/EventForm';
import { updateEvent } from '@/lib/actions';
import { getEventById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }
  
  const updateEventWithId = updateEvent.bind(null, id);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Edit Event</h1>
      <EventForm event={event} action={updateEventWithId} />
    </div>
  );
}
