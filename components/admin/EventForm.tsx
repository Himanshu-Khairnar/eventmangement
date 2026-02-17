'use client';

import { useState } from 'react';
import type { Event } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useData } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

type EventFormProps = {
  event?: Event;
};

export default function EventForm({ event }: EventFormProps) {
  const { addEvent } = useData();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Construct event object
    const newEvent = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      venue: formData.get('venue') as string,
      category: formData.get('category') as Event['category'],
      committee: formData.get('committee') as string,
      image: formData.get('image') as string,
      registrationLink: formData.get('registrationLink') as string,
    };

    try {
      await addEvent(newEvent);

      toast({
        title: "Success",
        description: "Event created successfully.",
      });

      router.push('/admin/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name</Label>
                <Input id="name" name="name" defaultValue={event?.name} required placeholder="e.g. Annual Tech Symposium" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={event?.description} rows={5} required placeholder="Describe the event details..." />
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
                    <SelectItem value="Workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="committee">Organizing Committee</Label>
                <Input id="committee" name="committee" defaultValue={event?.committee} required placeholder="e.g. CSI" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" defaultValue={event?.date.split('T')[0]} required />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" defaultValue={event?.time} required placeholder="e.g. 10:00 AM" />
                </div>
              </div>
              <div>
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" name="venue" defaultValue={event?.venue} required placeholder="e.g. Auditorium" />
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
                <p className="text-xs text-muted-foreground mt-1">Select a placeholder image cover.</p>
              </div>
              <div>
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input id="registrationLink" name="registrationLink" defaultValue={event?.registrationLink || '#'} required placeholder="https://..." />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
          </Button>
        </div>
      </div>
    </form>
  );
}
