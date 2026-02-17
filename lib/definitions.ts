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

  // Enhanced fields
  detailedDescription?: string;
  prerequisites?: string[];
  requirements?: string[];
  whatToBring?: string[];
  schedule?: { time: string; activity: string }[];
  rules?: string[];
  prizes?: { position: string; prize: string }[];
  benefits?: string[];
  eligibility?: string[];
  registrationFee?: string;
  contactInfo?: { name: string; email: string; phone: string }[];

  // Registration Configuration
  teamSize?: {
    min: number;
    max: number;
    allowIndividual: boolean;
  };
  resumeRequired?: boolean;
};

export interface TeamMember {
  name: string;
  email: string;
  studentId: string;
  year: string;
  branch: string;
  role: 'leader' | 'member';
  resume?: string; // URL to the resume file (optional)
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
  createdAt?: string; // Registration timestamp
}
