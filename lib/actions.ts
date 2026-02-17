'use server';

import { z } from 'zod';
import { addEvent, updateEvent as updateEventInDb, deleteEvent as deleteEventFromDb } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Event } from './definitions';

const EventSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Event name must be at least 3 characters long.' }),
  category: z.enum(['Technical', 'Cultural', 'Sports']),
  committee: z.string().min(2, { message: 'Committee name must be at least 2 characters long.' }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date" }),
  time: z.string().min(1, { message: 'Time is required.' }),
  venue: z.string().min(3, { message: 'Venue must be at least 3 characters long.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
  image: z.string().url({ message: 'Please select a valid image.' }),
  registrationLink: z.string().url({ message: 'Please enter a valid URL.' }).or(z.literal('#')),
});

const CreateEvent = EventSchema.omit({ id: true });
const UpdateEvent = EventSchema;

export type State = {
  errors?: {
    name?: string[];
    category?: string[];
    committee?: string[];
    date?: string[];
    time?: string[];
    venue?: string[];
    description?: string[];
    image?: string[];
    registrationLink?: string[];
  };
  message?: string | null;
};

export async function createEvent(prevState: State, formData: FormData) {
  const validatedFields = CreateEvent.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    committee: formData.get('committee'),
    date: new Date(formData.get('date') as string).toISOString(),
    time: formData.get('time'),
    venue: formData.get('venue'),
    description: formData.get('description'),
    image: formData.get('image'),
    registrationLink: formData.get('registrationLink'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create event. Please check the fields.',
    };
  }

  try {
    await addEvent(validatedFields.data as Omit<Event, 'id'>);
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Event.',
    };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/');
  revalidatePath('/calendar');
  redirect('/admin/dashboard');
}

export async function updateEvent(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateEvent.safeParse({
        id: id,
        name: formData.get('name'),
        category: formData.get('category'),
        committee: formData.get('committee'),
        date: new Date(formData.get('date') as string).toISOString(),
        time: formData.get('time'),
        venue: formData.get('venue'),
        description: formData.get('description'),
        image: formData.get('image'),
        registrationLink: formData.get('registrationLink'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to update event. Please check the fields.',
        };
    }

    try {
        await updateEventInDb(id, validatedFields.data);
    } catch (error) {
        return { message: 'Database Error: Failed to Update Event.' };
    }

    revalidatePath(`/admin/dashboard`);
    revalidatePath(`/events/${id}`);
    revalidatePath('/');
    revalidatePath('/calendar');
    redirect('/admin/dashboard');
}


export async function deleteEvent(id: string) {
  try {
    await deleteEventFromDb(id);
    revalidatePath('/admin/dashboard');
    revalidatePath('/');
    revalidatePath('/calendar');
    return { message: 'Deleted Event.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Event.' };
  }
}
