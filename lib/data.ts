import type { Event } from './definitions';
import { PlaceHolderImages } from './placeholder-images';

// In a real application, this would be a database.
// For this hackathon, we're using an in-memory array.
// This will reset on every server restart.
export const events: Event[] = [
  {
    id: '1',
    name: 'Nexus 2024 Hackathon',
    category: 'Technical',
    committee: 'Tech Club',
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    time: '09:00 AM - 09:00 PM',
    venue: 'Main Auditorium',
    description: 'A 24-hour hackathon to build innovative solutions. Prizes worth $10,000 to be won!',
    image: PlaceHolderImages.find(p => p.id === 'event-hackathon')?.imageUrl || '',
    registrationLink: '#',
  },
  {
    id: '2',
    name: 'Symphony: Music Fest',
    category: 'Cultural',
    committee: 'Arts & Culture Society',
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    time: '06:00 PM onwards',
    venue: 'College Grounds',
    description: 'An evening of live music, food, and fun. Featuring top local bands.',
    image: PlaceHolderImages.find(p => p.id === 'event-music-fest')?.imageUrl || '',
    registrationLink: '#',
  },
  {
    id: '3',
    name: 'Annual Sports Day',
    category: 'Sports',
    committee: 'Sports Committee',
    date: new Date().toISOString(), // Ongoing today
    time: 'All Day',
    venue: 'Sports Complex',
    description: 'Compete in various track and field events. Show your college spirit!',
    image: PlaceHolderImages.find(p => p.id === 'event-sports-day')?.imageUrl || '',
    registrationLink: '#',
  },
  {
    id: '4',
    name: 'AI/ML Workshop',
    category: 'Technical',
    committee: 'IEEE Student Chapter',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), // Past event
    time: '10:00 AM - 01:00 PM',
    venue: 'CS Department, Room 301',
    description: 'A hands-on workshop on the fundamentals of Machine Learning with Python.',
    image: PlaceHolderImages.find(p => p.id === 'event-workshop')?.imageUrl || '',
    registrationLink: '#',
  },
  {
    id: '5',
    name: 'Guest Lecture on Entrepreneurship',
    category: 'Technical',
    committee: 'E-Cell',
    date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
    time: '04:00 PM - 05:00 PM',
    venue: 'Seminar Hall 1',
    description: 'Learn from the journey of a successful startup founder.',
    image: PlaceHolderImages.find(p => p.id === 'event-guest-lecture')?.imageUrl || '',
    registrationLink: '#',
  },
  {
    id: '6',
    name: 'Inter-College Football Tournament',
    category: 'Sports',
    committee: 'Sports Committee',
    date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
    time: 'Starts 10:00 AM',
    venue: 'Football Ground',
    description: 'The ultimate showdown of football talent. Come support your team!',
    image: PlaceHolderImages.find(p => p.id === 'event-sports-day')?.imageUrl || '',
    registrationLink: '#',
  }
];

// Functions to interact with the in-memory store
export const getEvents = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getEventById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return events.find(event => event.id === id);
};

export const addEvent = async (event: Omit<Event, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newEvent = { ...event, id: String(Date.now()) };
    events.unshift(newEvent);
    return newEvent;
}

export const updateEvent = async (id: string, updatedEventData: Partial<Event>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) return null;
    events[eventIndex] = { ...events[eventIndex], ...updatedEventData };
    return events[eventIndex];
}

export const deleteEvent = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) return false;
    events.splice(eventIndex, 1);
    return true;
}
