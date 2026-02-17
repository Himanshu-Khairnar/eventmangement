export type Event = {
  id: string;
  name: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Workshop';
  committee: string;
  date: string; // ISO 8601 format
  time: string;
  venue: string;
  description: string;
  image: string;
  registrationLink: string;
};

export interface TeamMember {
  name: string;
  email: string;
  studentId: string;
  year: string;
  branch: string;
  role: 'leader' | 'member';
  resume: string; // URL to the resume file
}

export interface Team {
  id: string;
  eventId: string;
  eventName: string; // Denormalized for easier display if needed
  projectTitle: string;
  abstract: string;
  fileLink?: string; // Link to PDF/PPT
  canvaLink?: string;
  members: TeamMember[];
  status: 'Pending' | 'Approved' | 'Rejected';
}
