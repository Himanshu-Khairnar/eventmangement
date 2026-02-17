import type { Event, Team } from './definitions';
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
    detailedDescription: 'Join us for an intensive 24-hour hackathon where innovation meets collaboration! Nexus 2024 brings together the brightest minds to solve real-world problems using cutting-edge technology. Whether you\'re a coding wizard or a creative problem solver, this event is your platform to showcase your skills, learn from industry experts, and win amazing prizes. Team up with fellow participants, brainstorm ideas, and build working prototypes that could change the world!',
    prerequisites: [
      'Basic programming knowledge in any language',
      'Laptop with development environment setup',
      'GitHub account (for project submission)',
      'Familiarity with version control (Git)',
      'Problem-solving mindset'
    ],
    requirements: [
      'Form a team of 2-4 members (individual participation not allowed)',
      'All team members must be current students',
      'At least one team member must be present in person',
      'Original work only - no pre-built solutions',
      'Must use provided APIs and datasets'
    ],
    whatToBring: [
      'Laptop and charger',
      'Student ID card',
      'Power strips/extension cords',
      'Headphones',
      'Reusable water bottle',
      'Any external hardware for your project'
    ],
    schedule: [
      { time: '09:00 AM', activity: 'Registration & Check-in' },
      { time: '10:00 AM', activity: 'Opening Ceremony & Problem Statement Release' },
      { time: '10:30 AM', activity: 'Hacking Begins!' },
      { time: '01:00 PM', activity: 'Lunch Break' },
      { time: '04:00 PM', activity: 'Mentor Round 1' },
      { time: '07:00 PM', activity: 'Dinner Break' },
      { time: '09:00 PM', activity: 'Mid-hackathon Check-in' },
      { time: '12:00 AM', activity: 'Midnight Snacks' },
      { time: '06:00 AM', activity: 'Breakfast' },
      { time: '09:00 AM', activity: 'Code Freeze & Submission Deadline' },
      { time: '10:00 AM', activity: 'Project Presentations & Judging' },
      { time: '02:00 PM', activity: 'Lunch' },
      { time: '03:00 PM', activity: 'Results & Prize Distribution' }
    ],
    rules: [
      'All team members must be registered before the event',
      'Teams cannot exceed 4 members',
      'Projects must be started from scratch during the hackathon',
      'Use of open-source libraries is allowed with proper attribution',
      'Teams must submit code via GitHub by the deadline',
      'Plagiarism will lead to immediate disqualification',
      'Judges\' decision will be final',
      'Maintain decorum and respect fellow participants'
    ],
    prizes: [
      { position: '1st Place', prize: '$5,000 + Internship Opportunities' },
      { position: '2nd Place', prize: '$3,000 + Tech Goodies' },
      { position: '3rd Place', prize: '$2,000 + Amazon Vouchers' },
      { position: 'Best Innovation', prize: '$1,000' },
      { position: 'Best UI/UX', prize: '$500' },
      { position: 'All Participants', prize: 'Certificate & Swag Kit' }
    ],
    benefits: [
      'Network with industry professionals and mentors',
      'Learn new technologies and frameworks',
      'Build your portfolio with real projects',
      '24-hour access to mentors from top tech companies',
      'Free meals and refreshments throughout',
      'Certificate of participation',
      'Exclusive swag and goodies',
      'Opportunity for internships and job referrals'
    ],
    eligibility: [
      'Must be a registered college student',
      'No age restrictions',
      'All branches and years welcome',
      'Prior hackathon experience not required'
    ],
    registrationFee: 'Free for all students',
    contactInfo: [
      { name: 'Rahul Sharma', email: 'rahul.tech@college.edu', phone: '+91 98765 43210' },
      { name: 'Priya Patel', email: 'priya.events@college.edu', phone: '+91 98765 43211' }
    ],
    teamSize: {
      min: 2,
      max: 4,
      allowIndividual: false
    },
    resumeRequired: true
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
    detailedDescription: 'Get ready for the most electrifying musical evening of the year! Symphony brings together talented artists, soulful melodies, and infectious energy for an unforgettable night under the stars. From rock to classical fusion, indie to EDM, experience diverse genres performed by acclaimed local bands and emerging artists. Enjoy delicious food stalls, capture memories at our photo booths, and dance the night away!',
    prerequisites: [
      'Love for music and good vibes',
      'No prior music knowledge required',
      'Open to all music enthusiasts'
    ],
    requirements: [
      'Valid college ID or registration confirmation',
      'Entry tickets (available at the gate)',
      'Age 16+ (minors must be accompanied by guardians)',
      'Follow the dress code: Casual/festive wear'
    ],
    whatToBring: [
      'College ID card',
      'Cash for food and merchandise',
      'Mobile phone for digital tickets',
      'Light jacket (evening weather)',
      'Power bank for your devices'
    ],
    schedule: [
      { time: '05:00 PM', activity: 'Gates Open - Entry & Registration' },
      { time: '06:00 PM', activity: 'Opening Act - College Band' },
      { time: '06:45 PM', activity: 'Acoustic Session - Solo Artists' },
      { time: '07:30 PM', activity: 'Break - Food & Refreshments' },
      { time: '08:00 PM', activity: 'Main Act - The Echoes (Rock Band)' },
      { time: '09:00 PM', activity: 'DJ Night Begins' },
      { time: '10:00 PM', activity: 'Special Performance - Classical Fusion' },
      { time: '11:00 PM', activity: 'Closing Act & Fireworks' },
      { time: '11:30 PM', activity: 'Event Concludes' }
    ],
    rules: [
      'No outside food or beverages allowed',
      'Smoking and alcohol strictly prohibited',
      'Maintain decorum and respect all attendees',
      'Follow instructions from security personnel',
      'No professional cameras without prior permission',
      'Keep the venue clean - dustbins provided',
      'Mosh pits allowed only in designated areas',
      'Lost and found available at the help desk'
    ],
    prizes: [
      { position: 'Best Dressed', prize: 'Music Store Voucher worth $100' },
      { position: 'Instagram Contest', prize: 'Concert Merchandise' },
      { position: 'Lucky Draw', prize: 'Bluetooth Speakers' }
    ],
    benefits: [
      'Experience live performances by renowned artists',
      'Multiple food and beverage stalls',
      'Instagram-worthy photo booths',
      'Exclusive event merchandise',
      'Networking with music enthusiasts',
      'Memories to last a lifetime',
      'Support local artists and talent'
    ],
    eligibility: [
      'Open to all college students',
      'External guests allowed with valid tickets',
      'Age 16 and above',
      'Faculty and staff welcome'
    ],
    registrationFee: '$5 (Early Bird) | $8 (At the Gate)',
    contactInfo: [
      { name: 'Ananya Desai', email: 'ananya.arts@college.edu', phone: '+91 98765 43212' },
      { name: 'Arjun Mehta', email: 'arjun.culture@college.edu', phone: '+91 98765 43213' }
    ],
    teamSize: {
      min: 1,
      max: 1,
      allowIndividual: true
    },
    resumeRequired: false
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
    detailedDescription: 'The most anticipated sporting event of the year is here! Annual Sports Day brings together athletes from all departments to compete, celebrate sportsmanship, and showcase college pride. From sprints to marathons, high jumps to shot puts, this day is packed with adrenaline-pumping action. Whether you\'re competing or cheering from the stands, experience the thrill of victory and the agony of defeat!',
    prerequisites: [
      'Basic fitness level',
      'Medical clearance certificate (for competitive events)',
      'Prior training recommended for competitive categories',
      'Sports shoes mandatory'
    ],
    requirements: [
      'Register for events minimum 2 days in advance',
      'Wear proper sports attire',
      'Submit medical fitness certificate',
      'Represent your department with official jersey',
      'Follow all safety guidelines'
    ],
    whatToBring: [
      'Student ID card',
      'Sports shoes and athletic wear',
      'Water bottle (hydration stations available)',
      'Sun protection (cap, sunscreen)',
      'Personal first-aid kit',
      'Change of clothes',
      'Towel'
    ],
    schedule: [
      { time: '07:00 AM', activity: 'Registration & Warm-up Sessions' },
      { time: '08:00 AM', activity: 'Opening Ceremony & March Past' },
      { time: '08:30 AM', activity: 'Track Events - 100m, 200m Heats' },
      { time: '10:00 AM', activity: 'Field Events - Long Jump, High Jump' },
      { time: '11:30 AM', activity: 'Team Events - Relay Races' },
      { time: '01:00 PM', activity: 'Lunch Break' },
      { time: '02:00 PM', activity: 'Tug of War & Fun Games' },
      { time: '03:30 PM', activity: 'Semi-finals - Track Events' },
      { time: '04:30 PM', activity: 'Finals - All Events' },
      { time: '05:30 PM', activity: 'Prize Distribution & Closing Ceremony' }
    ],
    rules: [
      'All participants must check in 30 minutes before their event',
      'Proper sports attire mandatory - no jeans or casual wear',
      'Follow lane discipline in track events',
      'No unfair means or performance-enhancing substances',
      'Decision of judges and referees is final',
      'Replacement participants not allowed after registration',
      'Respect all officials, opponents, and spectators',
      'Medical team available - report any injuries immediately'
    ],
    prizes: [
      { position: 'Overall Champion Department', prize: 'Trophy + $1,000' },
      { position: 'Individual Gold Medalists', prize: 'Medal + $200' },
      { position: 'Individual Silver Medalists', prize: 'Medal + $150' },
      { position: 'Individual Bronze Medalists', prize: 'Medal + $100' },
      { position: 'Best Athlete (Male & Female)', prize: 'Trophy + $300' },
      { position: 'All Participants', prize: 'Certificate of Participation' }
    ],
    benefits: [
      'Showcase your athletic abilities',
      'Compete for your department\'s glory',
      'Professional coaching tips from guest coaches',
      'Free sports injury assessment',
      'Medals and certificates for winners',
      'Refreshments and lunch provided',
      'Team building and networking',
      'Lifetime memories and college pride'
    ],
    eligibility: [
      'Currently enrolled students only',
      'Medical fitness certificate mandatory',
      'Age: 18-25 years',
      'No inter-college participants'
    ],
    registrationFee: 'Free for all students',
    contactInfo: [
      { name: 'Coach Rajesh Kumar', email: 'rajesh.sports@college.edu', phone: '+91 98765 43214' },
      { name: 'Neha Singh', email: 'neha.athletics@college.edu', phone: '+91 98765 43215' }
    ],
    teamSize: {
      min: 1,
      max: 1,
      allowIndividual: true
    },
    resumeRequired: false
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

// Mock Teams Data
export const teams: Team[] = [
  {
    id: 't1',
    eventId: '1', // Nexus Hackathon
    eventName: 'Nexus 2024 Hackathon',
    projectTitle: 'Smart Campus Navigation',
    abstract: 'An AR-based navigation system for the university campus to help new students and visitors find their way around easily.',
    fileLink: 'https://example.com/project-presentation.pdf',
    canvaLink: 'https://www.canva.com/design/DAFv...',
    status: 'Approved',
    createdAt: '2024-02-10 10:30 AM',
    members: [
      {
        name: 'Alice Johnson',
        email: 'alice.j@college.edu',
        studentId: '2021001',
        year: '3',
        branch: 'CSE',
        role: 'leader',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Bob Smith',
        email: 'bob.s@college.edu',
        studentId: '2021002',
        year: '3',
        branch: 'ECE',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      }
    ]
  },
  {
    id: 't2',
    eventId: '1', // Nexus Hackathon
    eventName: 'Nexus 2024 Hackathon',
    projectTitle: 'EcoTracker',
    abstract: 'A mobile app to track carbon footprint and suggest daily habits to reduce environmental impact.',
    fileLink: 'https://example.com/ecotracker-docs.pdf',
    status: 'Pending',
    createdAt: '2024-02-12 02:15 PM',
    members: [
      {
        name: 'Charlie Brown',
        email: 'charlie.b@college.edu',
        studentId: '2022045',
        year: '2',
        branch: 'Mech',
        role: 'leader',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Diana Prince',
        email: 'diana.p@college.edu',
        studentId: '2022046',
        year: '2',
        branch: 'CSE',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Evan Wright',
        email: 'evan.w@college.edu',
        studentId: '2022047',
        year: '2',
        branch: 'Civil',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      }
    ]
  },
  {
    id: 't3',
    eventId: '4', // AI/ML Workshop
    eventName: 'AI/ML Workshop',
    projectTitle: 'N/A (Individual Participation)',
    abstract: 'Participation in workshop.',
    status: 'Approved',
    createdAt: '2024-02-08 09:00 AM',
    members: [
      {
        name: 'Fiona Gallagher',
        email: 'fiona.g@college.edu',
        studentId: '2023101',
        year: '1',
        branch: 'Data Science',
        role: 'leader',
        resume: '/uploads/resumes/dummy-resume.pdf'
      }
    ]
  },
  {
    id: 't4',
    eventId: '1', // Nexus Hackathon
    eventName: 'Nexus 2024 Hackathon',
    projectTitle: 'StudyBuddy AI',
    abstract: 'An AI-powered study companion that creates personalized study plans, quizzes, and tracks student progress using machine learning.',
    fileLink: 'https://example.com/studybuddy-proposal.pdf',
    canvaLink: 'https://www.canva.com/design/DAFw...',
    status: 'Approved',
    createdAt: '2024-02-11 11:45 AM',
    members: [
      {
        name: 'Grace Lee',
        email: 'grace.l@college.edu',
        studentId: '2021123',
        year: '3',
        branch: 'CSE',
        role: 'leader',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Henry Martinez',
        email: 'henry.m@college.edu',
        studentId: '2021124',
        year: '3',
        branch: 'CSE',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Ivy Chen',
        email: 'ivy.c@college.edu',
        studentId: '2021125',
        year: '3',
        branch: 'IT',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Jack Robinson',
        email: 'jack.r@college.edu',
        studentId: '2021126',
        year: '3',
        branch: 'Data Science',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      }
    ]
  },
  {
    id: 't5',
    eventId: '1', // Nexus Hackathon
    eventName: 'Nexus 2024 Hackathon',
    projectTitle: 'HealthHub Connect',
    abstract: 'A telemedicine platform connecting students with campus health services, enabling virtual consultations and appointment scheduling.',
    fileLink: 'https://example.com/healthhub-docs.pdf',
    status: 'Pending',
    createdAt: '2024-02-13 03:20 PM',
    members: [
      {
        name: 'Kevin Patel',
        email: 'kevin.p@college.edu',
        studentId: '2022078',
        year: '2',
        branch: 'CSE',
        role: 'leader',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Laura Anderson',
        email: 'laura.a@college.edu',
        studentId: '2022079',
        year: '2',
        branch: 'ECE',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Mike Thompson',
        email: 'mike.t@college.edu',
        studentId: '2022080',
        year: '2',
        branch: 'Biomedical',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      }
    ]
  },
  {
    id: 't6',
    eventId: '1', // Nexus Hackathon
    eventName: 'Nexus 2024 Hackathon',
    projectTitle: 'Campus Food Waste Tracker',
    abstract: 'A system to reduce food waste in campus cafeterias by predicting demand and redistributing surplus food.',
    fileLink: 'https://example.com/foodwaste-proposal.pdf',
    status: 'Rejected',
    createdAt: '2024-02-09 01:30 PM',
    members: [
      {
        name: 'Nina Sharma',
        email: 'nina.s@college.edu',
        studentId: '2023056',
        year: '1',
        branch: 'Environmental Engg',
        role: 'leader',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Oscar Williams',
        email: 'oscar.w@college.edu',
        studentId: '2023057',
        year: '1',
        branch: 'CSE',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      }
    ]
  },
  {
    id: 't7',
    eventId: '2', // Music Fest
    eventName: 'Symphony: Music Fest',
    projectTitle: 'N/A (Individual Registration)',
    abstract: 'Attending music festival.',
    status: 'Approved',
    createdAt: '2024-02-14 10:00 AM',
    members: [
      {
        name: 'Paula Green',
        email: 'paula.g@college.edu',
        studentId: '2022134',
        year: '2',
        branch: 'Arts',
        role: 'leader'
      }
    ]
  },
  {
    id: 't8',
    eventId: '2', // Music Fest
    eventName: 'Symphony: Music Fest',
    projectTitle: 'N/A (Individual Registration)',
    abstract: 'Attending music festival.',
    status: 'Approved',
    createdAt: '2024-02-14 11:30 AM',
    members: [
      {
        name: 'Quinn Davis',
        email: 'quinn.d@college.edu',
        studentId: '2021089',
        year: '3',
        branch: 'Music',
        role: 'leader'
      }
    ]
  },
  {
    id: 't9',
    eventId: '3', // Sports Day
    eventName: 'Annual Sports Day',
    projectTitle: 'N/A (Individual Registration)',
    abstract: 'Participating in 100m and 200m sprint events.',
    status: 'Approved',
    createdAt: '2024-02-15 08:00 AM',
    members: [
      {
        name: 'Ryan Mitchell',
        email: 'ryan.m@college.edu',
        studentId: '2022198',
        year: '2',
        branch: 'Physical Education',
        role: 'leader'
      }
    ]
  },
  {
    id: 't10',
    eventId: '3', // Sports Day
    eventName: 'Annual Sports Day',
    projectTitle: 'N/A (Individual Registration)',
    abstract: 'Participating in long jump and high jump.',
    status: 'Approved',
    createdAt: '2024-02-15 08:15 AM',
    members: [
      {
        name: 'Sophia Turner',
        email: 'sophia.t@college.edu',
        studentId: '2021156',
        year: '3',
        branch: 'Kinesiology',
        role: 'leader'
      }
    ]
  },
  {
    id: 't11',
    eventId: '6', // Football Tournament
    eventName: 'Inter-College Football Tournament',
    projectTitle: 'N/A (Team Sport Registration)',
    abstract: 'Representing college in inter-college football tournament.',
    status: 'Pending',
    createdAt: '2024-02-16 04:00 PM',
    members: [
      {
        name: 'Tom Baker',
        email: 'tom.b@college.edu',
        studentId: '2021234',
        year: '3',
        branch: 'Sports Science',
        role: 'leader'
      },
      {
        name: 'Uma Krishnan',
        email: 'uma.k@college.edu',
        studentId: '2021235',
        year: '3',
        branch: 'Physical Education',
        role: 'member'
      },
      {
        name: 'Victor Santos',
        email: 'victor.s@college.edu',
        studentId: '2022167',
        year: '2',
        branch: 'CSE',
        role: 'member'
      },
      {
        name: 'Wendy Foster',
        email: 'wendy.f@college.edu',
        studentId: '2022168',
        year: '2',
        branch: 'Mech',
        role: 'member'
      }
    ]
  },
  {
    id: 't12',
    eventId: '5', // Entrepreneurship Lecture
    eventName: 'Guest Lecture on Entrepreneurship',
    projectTitle: 'N/A (Individual Attendance)',
    abstract: 'Attending guest lecture on entrepreneurship.',
    status: 'Approved',
    createdAt: '2024-02-17 09:00 AM',
    members: [
      {
        name: 'Xavier Lopez',
        email: 'xavier.l@college.edu',
        studentId: '2023089',
        year: '1',
        branch: 'Business Admin',
        role: 'leader'
      }
    ]
  },
  {
    id: 't13',
    eventId: '1', // Nexus Hackathon
    eventName: 'Nexus 2024 Hackathon',
    projectTitle: 'BlockChain Attendance System',
    abstract: 'A decentralized attendance tracking system using blockchain technology to prevent tampering and ensure transparency.',
    fileLink: 'https://example.com/blockchain-attendance.pdf',
    canvaLink: 'https://www.canva.com/design/DAFx...',
    status: 'Pending',
    createdAt: '2024-02-14 05:45 PM',
    members: [
      {
        name: 'Yuki Tanaka',
        email: 'yuki.t@college.edu',
        studentId: '2022201',
        year: '2',
        branch: 'CSE',
        role: 'leader',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Zara Ahmed',
        email: 'zara.a@college.edu',
        studentId: '2022202',
        year: '2',
        branch: 'IT',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      },
      {
        name: 'Adam Cooper',
        email: 'adam.c@college.edu',
        studentId: '2022203',
        year: '2',
        branch: 'Cybersecurity',
        role: 'member',
        resume: '/uploads/resumes/dummy-resume.pdf'
      }
    ]
  }
];

export const getTeamsByEventId = async (eventId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return teams.filter(team => team.eventId === eventId);
};

export const getAllTeams = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return teams;
};
