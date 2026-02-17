export type Event = {
  id: string;
  name: string;
  category: 'Technical' | 'Cultural' | 'Sports';
  committee: string;
  date: string; // ISO 8601 format
  time: string;
  venue: string;
  description: string;
  image: string;
  registrationLink: string;
};
