'use client';

import { useFormState } from 'react-dom';
import type { State } from '@/lib/actions';
import type { Event } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useFormStatus } from 'react-dom';

type EventFormProps = {
  event?: Event;
  action: (prevState: State, formData: FormData) => Promise<State>;
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Event' : 'Create Event')}
    </Button>
  );
}

export default function EventForm({ event, action }: EventFormProps) {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(action, initialState);

  return (
    <form action={dispatch}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name</Label>
                <Input id="name" name="name" defaultValue={event?.name} required />
                {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={event?.description} rows={5} required />
                {state.errors?.description && <p className="text-sm text-destructive mt-1">{state.errors.description[0]}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-8">
          <Card>
            <CardHeader><CardTitle>Properties</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                  <Label>Category</Label>
                  <Select name="category" defaultValue={event?.category} required>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Cultural">Cultural</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                      </SelectContent>
                  </Select>
                  {state.errors?.category && <p className="text-sm text-destructive mt-1">{state.errors.category[0]}</p>}
              </div>
              <div>
                  <Label htmlFor="committee">Organizing Committee</Label>
                  <Input id="committee" name="committee" defaultValue={event?.committee} required />
                  {state.errors?.committee && <p className="text-sm text-destructive mt-1">{state.errors.committee[0]}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" defaultValue={event?.date.split('T')[0]} required />
                    {state.errors?.date && <p className="text-sm text-destructive mt-1">{state.errors.date[0]}</p>}
                </div>
                <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" name="time" defaultValue={event?.time} required />
                    {state.errors?.time && <p className="text-sm text-destructive mt-1">{state.errors.time[0]}</p>}
                </div>
              </div>
              <div>
                  <Label htmlFor="venue">Venue</Label>
                  <Input id="venue" name="venue" defaultValue={event?.venue} required />
                  {state.errors?.venue && <p className="text-sm text-destructive mt-1">{state.errors.venue[0]}</p>}
              </div>
              <div>
                  <Label>Image</Label>
                  <Select name="image" defaultValue={event?.image} required>
                      <SelectTrigger><SelectValue placeholder="Select an image" /></SelectTrigger>
                      <SelectContent>
                          {PlaceHolderImages.map(img => (
                              <SelectItem key={img.id} value={img.imageUrl}>{img.description}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  {state.errors?.image && <p className="text-sm text-destructive mt-1">{state.errors.image[0]}</p>}
              </div>
              <div>
                  <Label htmlFor="registrationLink">Registration Link</Label>
                  <Input id="registrationLink" name="registrationLink" defaultValue={event?.registrationLink || '#'} required />
                  {state.errors?.registrationLink && <p className="text-sm text-destructive mt-1">{state.errors.registrationLink[0]}</p>}
              </div>
            </CardContent>
          </Card>
          <SubmitButton isEditing={!!event} />
        </div>
      </div>
    </form>
  );
}
