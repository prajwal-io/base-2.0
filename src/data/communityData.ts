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

export interface Testimonial {
	slug: string;
	quote: string;
	longReview?: string;
	author: string;
	role: string;
	avatar: string;
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

export const TESTIMONIALS: Testimonial[] = [
  {
    slug: "guruvani-binneth",
    quote: "BackToBase is the best student community in Hyderabad to turn classroom theory into real-world tech skills alongside approachable mentors and driven peers.",
    longReview: "Joining the BacktoBase community in Hyderabad has been one of the most practical parts of my college journey so far. Before finding this group, most tech events I attended felt overly theoretical and disconnected from what companies actually look for. At BacktoBase, the sessions focus heavily on real-world skills like AI, data analytics, and building production-ready projects. One of the best parts is that the events are completely free for students, which makes quality mentorship accessible without any financial barrier. Attending offline meetups at actual tech offices around Hyderabad gave me a real glimpse into how industry teams work. The speakers and founders are super approachable, so you never feel awkward asking basic questions after a session. I also found the resume feedback and project review discussions much more honest and actionable than generic online advice. Instead of just listening to long lectures, we actually get to discuss ideas, get code feedback, and network with peers who are equally serious about building things. Meeting students from different colleges across the city helped me break out of my campus bubble and find people to collaborate with. The atmosphere is welcoming even if you are a beginner who is still figuring out your career path. Occasionally, seats fill up fast for popular offline editions, so you have to keep an eye on announcements and register early. Still, the organizers do a solid job keeping the sessions structured and focused on genuine learning rather than hype. It is especially helpful if you are trying to transition from classroom theory to internships or early tech roles. Overall, it feels less like a formal seminar series and more like a supportive peer group pushing each other to grow. I would definitely recommend BacktoBase to any student in Hyderabad looking for hands-on guidance and a strong tech network.",
    author: "Guruvani Binneth",
    role: "Community member",
    avatar: "/images/guruvani-binneth.jpg",
  },
  {
    slug: "bhargavi-m",
    quote: "Every BackToBase event feels like coming home, a community that inspires you to connect, step beyond your comfort zone, and grow together.",
    longReview: `My journey with BackToBase started when I met Yashwanth at an event. We got talking, and he mentioned that he was planning to start a community. I immediately told him, "I'm there whenever you need me!" And here we are today, more than a year later, witnessing that idea grow into a wonderful community.

I've known Yashwanth for over a year now, and one thing I genuinely appreciate about him is his sincerity and dedication towards building something meaningful.

I've had the opportunity to be a speaker at BacktoBase three times, and every experience has been special. But honestly, it's not just about being a speaker. Every time I attend a BacktoBase event, I feel like I'm coming home. The people, the energy, the conversations, and the warmth make it feel like a place where you belong.

What makes BacktoBase special is its intention to encourage people to step out of their comfort zones, explore beyond their boundaries, and pursue things they've always wanted to do.

Whether you're a student, working professional, entrepreneur, creator, or someone looking to meet new people and expand your network, BacktoBase has something to offer.

If you're looking for a platform to connect, share ideas, explore opportunities, and meet a community that encourages you to grow, I would definitely recommend attending a BacktoBase event.

From that first conversation to being part of this growing journey, it's been wonderful to witness. Keep building, Yashwanth and team! ❤️`,
    author: "Bhargavi M",
    role: "Founder of FreshGradPrep Community",
    avatar: "/images/bhargavi-m.png",
  },
  {
    slug: "lohith-sai",
    quote: "BacktoBase has been an incredible platform to learn, build, and grow. It gave me opportunities to turn my ideas into real-world solutions, improve my technical skills, and work with an amazing team. Grateful for the trust, support, and opportunities!",
    longReview: `My journey with BacktoBase has been one of the most valuable learning experiences for me. I joined the community during Edition 4, initially with an interest in contributing through technology and automation. What started as a simple suggestion to automate the manually sent confirmation emails gradually turned into an opportunity to contribute to the community in a bigger way.

From working on automated confirmation emails and certificate generation to developing QR-based check-in software for events, I got opportunities to apply my technical knowledge to real-world problems.

Beyond the technical experience, BacktoBase has taught me the importance of teamwork, taking initiative, problem-solving, communication, and taking responsibility. It gave me the confidence to move beyond simply learning technologies and start building solutions that create an actual impact.

A special thanks to Yashwanth Bondapalli Anna for believing in my ideas, giving me opportunities, and encouraging me to take ownership. Being part of the core team and contributing as a Growth Partner has made this journey even more meaningful.

For me, BacktoBase is more than just a community. It is a place where ideas turn into opportunities, learning turns into implementation, and people grow together.

I'm excited to continue learning, building, and contributing to this journey.

Learn. Grow. Build. Together. ❤️`,
    author: "Lohith Sai",
    role: "Community member",
    avatar: "/images/lohith-sai.png",
  },
  {
    slug: "hasini",
    quote: "The most heartwarming community you can ever find. Maybe you came here expecting to find your technical path and fulfil your career goals, but this is something more than that. Once you're in, you will end up finding a new family. ❤️",
    longReview: `My journey with BacktoBase is probably just sprouting, but it has definitely made a huge impact on me in such a short time.

I was introduced to this community through my friend. My first edition was a meetup in a park. That is where I got to meet some amazing people in the community, see their work, and learn about their journeys. Each one felt unique and special, and that's when I decided I needed to create one such journey of my own.

I remember Yashwanth Anna coming up to me and asking if I wanted to be a core member, and I was just elated to join. Since then, I've learned that if you own the community and work for it, you will definitely get a lot more in return.

Every event teaches you something new, helps you build new connections, becomes part of your growth, and lets you take back valuable skills and become a better person.`,
    author: "Hasini",
    role: "Community member",
    avatar: "/images/hasini.png",
  },
  {
    slug: "vennela",
    quote: "My experience with BacktoBase has been truly rewarding. From learning new skills to working alongside passionate people, every step has helped me build confidence, grow, and network. Truly grateful for the support and guidance throughout! Special thanks to Yashwanth Anna for trusting me and giving me such a great opportunity to work in the core team. ♥️",
    longReview: `My journey with BackToBase has been a truly rewarding and memorable experience. From learning new skills to working alongside passionate and like-minded people, every opportunity has helped me build confidence, expand my network, and grow both personally and professionally.

What makes BackToBase special is its supportive environment, where everyone is encouraged to explore, take initiative, and step outside their comfort zones. Being part of the core team has given me valuable experiences, meaningful connections, and countless opportunities to learn.

I'm truly grateful for the constant support, encouragement, and guidance throughout this journey. A special thanks to Yashwanth Anna for believing in me and giving me such a wonderful opportunity to be part of the core team. Looking forward to growing together and creating many more memories with this amazing community! ❤️`,
    author: "Vennela",
    role: "Community member",
    avatar: "/images/vennela.png",
  },
  {
    slug: "goutham-sai",
    quote: "Without Back to Base and Yashwant Anna, I genuinely wouldn't be the person I am today. The opportunities, guidance, encouragement, and experiences I've received have shaped me in ways I can't fully express. Forever grateful for the people who believed in me and helped me grow.",
    longReview: `My journey with BackToBase has been one of the most meaningful and transformative experiences of my life. Without BackToBase and Yashwanth Anna, I genuinely wouldn't be the person I am today.

The opportunities, guidance, encouragement, and experiences I've received throughout this journey have helped me discover my potential, build confidence, and push myself beyond my comfort zone. Being surrounded by passionate and supportive people has taught me invaluable lessons that go far beyond professional growth.

For me, BackToBase is more than just a community. It's a place where I've found meaningful connections, constant encouragement, and people who genuinely want to see me succeed.

I'm especially grateful to Yashwanth Anna for believing in me, trusting my abilities, and giving me opportunities to learn and grow. I'll always cherish the experiences, memories, and relationships I've built along the way. Forever grateful to be a part of this incredible journey. ❤️`,
    author: "Goutham Sai",
    role: "Community member and content creator",
    avatar: "/images/goutham-sai.png",
  },
  {
    slug: "spandhana-chowdhary",
    quote: "Being part of this community has been a wonderful learning experience. It has helped me connect with like-minded people, explore new opportunities, and improve my skills. What makes this community so special is the supportive environment where everyone encourages each other to learn and grow.",
    longReview: `Being a part of BackToBase has been a wonderful and enriching learning experience. Throughout my journey, I've had the opportunity to connect with like-minded people, explore new possibilities, improve my skills, and gain valuable experiences that have contributed to my personal and professional growth.

What makes BackToBase so special is its welcoming and supportive environment, where everyone genuinely encourages each other to learn, explore, and grow. Every interaction brings a new perspective, and every event provides an opportunity to discover something meaningful.

Being part of this community has also helped me become more confident, step outside my comfort zone, and build meaningful connections with people who share a passion for learning and innovation.

I'm truly grateful for the experiences, opportunities, and friendships I've gained through BackToBase. I'm excited to continue learning, contributing, and growing alongside this wonderful community. ❤️`,
    author: "Spandhana Chowdhary",
    role: "Community member and content creator",
    avatar: "/images/spandhana-chowdhary.png",
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
