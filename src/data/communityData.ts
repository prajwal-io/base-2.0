import EDITION_DATA from "./editions.json";
export interface Speaker {
  name: string;
  role: string;
  topic?: string;
  linkedin?: string;
  avatar?: string;
}

export interface Edition {
  id: number;
  editionNumber: string;
  title: string;
  subtitle: string;
  theme: string;
  date: string;
  time?: string;
  venue: string;
  location: string;
  overview: string;
  speakers: Speaker[];
  hosts?: string[];
  supporters?: string[];
  organizers?: string[];
  highlights?: string[];
  status: "Completed" | "Upcoming";
}

export const EDITIONS = EDITION_DATA as Edition[];

const VENUE_BRANDS = {
  "health catalyst": "Health Catalyst",
  microsoft: "Microsoft",
  epam: "EPAM Systems",
  thoughtworks: "Thoughtworks",
  devx: "DEVX",
  nanospace: "Nanospace",
  medicover: "Medicover",
} as const;

export function normalizeVenue(venue: string): string {
  const lower = venue.toLowerCase();
  return Object.entries(VENUE_BRANDS).find(([brand]) => lower.includes(brand))?.[1] ?? venue.trim();
}

export const EDITION_COUNT = EDITIONS.length;
export const VENUE_COUNT = new Set(EDITIONS.map(({ venue }) => normalizeVenue(venue))).size;

export const TESTIMONIALS = [
  {
    slug: "sriya-reddy",
    quote: "BacktoBase gave me the right people, the right conversations, and the nudge to actually build.",
    author: "Sriya Reddy",
    role: "Student Builder",
    avatar: "/images/avatar-sriya.jpg",
  },
  {
    slug: "aditya-varma",
    quote: "What I love most is the community — it's open, helpful, and rooted in learning.",
    author: "Aditya Varma",
    role: "Product at Microsoft",
    avatar: "/images/avatar-aditya.jpg",
  },
  {
    slug: "meghana-k",
    quote: "I went from attending my first edition to speaking at a later one — the journey has been incredible.",
    author: "Meghana K.",
    role: "Developer & Creator",
    avatar: "/images/avatar-meghana.jpg",
  },
] as const;

export const FAQS = [
  {
    question: "What is BacktoBase?",
    category: "Community",
    answer:
      "BacktoBase is a student-driven community that brings together students, builders, creators, founders, and professionals to learn, connect, and grow through in-person events, talks, and community initiatives.",
  },
  {
    question: "Do I need to be a student to join?",
    category: "Community",
    answer:
      "No! While BacktoBase was founded with a student-first philosophy, our editions welcome working professionals, founders, engineers, creators, and mentors who want to collaborate with high-energy talent.",
  },
  {
    question: "What happens at a BacktoBase edition?",
    category: "Events",
    answer:
      "Each edition has its own theme, from AI engineering and resume reviews to founder meetups and creator workshops. Expect talks, interactive panels, and time to connect with the community.",
  },
  {
    question: "How can I get involved or volunteer?",
    category: "Getting involved",
    answer:
      "You can get involved by attending an upcoming edition, joining our WhatsApp/Discord community groups, applying as an organizing volunteer, or proposing a lightning talk.",
  },
];

export const TEAM_MEMBERS = [
  "Sai Venkata Midhilesh Teki",
  "Janardhana Chary Vinukonda",
  "Ujwala Golla",
  "Goutham Sai",
  "Spandhana Chowdhary",
  "Prajwal Kanuparthi",
  "MVS Manvit",
  "Sairam Thatikonda",
  "Thanuja Chintham",
  "Aditi Rathan",
  "Venkata Datta Chaitanya",
  "Hasini Anchoori",
  "Vennela Ankam",
  "Jagan Pallapu",
  "Sonia G",
  "Sahasrika Gowrishetty",
  "Nikhila Ravipati",
];
