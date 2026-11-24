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
  {
    slug: "guruvani-binneth",
    quote: "BackToBase is the best student community in Hyderabad to turn classroom theory into real-world tech skills alongside approachable mentors and driven peers.",
    longReview: "Joining the BacktoBase community in Hyderabad has been one of the most practical parts of my college journey so far. Before finding this group, most tech events I attended felt overly theoretical and disconnected from what companies actually look for. At BacktoBase, the sessions focus heavily on real-world skills like AI, data analytics, and building production-ready projects. One of the best parts is that the events are completely free for students, which makes quality mentorship accessible without any financial barrier. Attending offline meetups at actual tech offices around Hyderabad gave me a real glimpse into how industry teams work. The speakers and founders are super approachable, so you never feel awkward asking basic questions after a session. I also found the resume feedback and project review discussions much more honest and actionable than generic online advice. Instead of just listening to long lectures, we actually get to discuss ideas, get code feedback, and network with peers who are equally serious about building things. Meeting students from different colleges across the city helped me break out of my campus bubble and find people to collaborate with. The atmosphere is welcoming even if you are a beginner who is still figuring out your career path. Occasionally, seats fill up fast for popular offline editions, so you have to keep an eye on announcements and register early. Still, the organizers do a solid job keeping the sessions structured and focused on genuine learning rather than hype. It is especially helpful if you are trying to transition from classroom theory to internships or early tech roles. Overall, it feels less like a formal seminar series and more like a supportive peer group pushing each other to grow. I would definitely recommend BacktoBase to any student in Hyderabad looking for hands-on guidance and a strong tech network.",
    author: "Guruvani Binneth",
    role: "Community member",
    avatar: "/images/guruvani-binneth.jpg",
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

// Retained as verified data for integrity checks and future community references.
// The community page intentionally does not render a team roster.
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
