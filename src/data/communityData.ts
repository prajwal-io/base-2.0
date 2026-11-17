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
  image: string;
  status: "Completed" | "Upcoming";
}

export const EDITIONS: Edition[] = [
  {
    id: 1,
    editionNumber: "01",
    title: "Legends Upgrade – AI with Clarity",
    subtitle: "From AI buzzwords to real-world clarity, learning, and connections!",
    theme: "AI with Clarity",
    date: "November 8, 2025",
    venue: "Health Catalyst",
    location: "Hyderabad, Telangana",
    overview:
      "BacktoBase Edition 1 brought together students, working professionals, technology enthusiasts, and industry experts for an engaging learning and networking experience focused on moving beyond AI buzzwords.",
    image: "/images/hero-speaker.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Om Ashish Mishra",
        role: "Product Data Scientist",
        topic: "WHEN AI – Understanding the Right Time for AI",
        linkedin: "https://www.linkedin.com/in/om-ashish-mishra/",
      },
      {
        name: "Amarnath Sagala",
        role: "AWS/DevOps Architect – Accenture",
        topic: "WHY AI – Understanding the Need for AI",
        linkedin: "https://www.linkedin.com/in/amarnath-sagala/",
      },
      {
        name: "Raghavendra Reddy Thummala",
        role: "Tech Lead – Data/AI ML, TAO Digitals",
        topic: "WHERE AI – AI in Real-World Enterprise Environments",
        linkedin: "https://www.linkedin.com/in/raghavar4u/",
      },
      {
        name: "Jaya Shankar Parimi",
        role: "Growth-focused leader (18+ yrs experience; ex-SVP Health Catalyst)",
        topic: "Professional Journey, Experiences & Career Insights",
      },
    ],
    highlights: [
      "Engaging interactions with Yashwanth Bondapalli, Founder of BacktoBase",
      "Networking with 30+ students, working professionals, founders, and co-founders",
      "Practical discussions around AI strategy, adoption, and enterprise applications",
    ],
  },
  {
    id: 2,
    editionNumber: "02",
    title: "Career Opportunities",
    subtitle: "From understanding what AI engineers do to learning how to land your first opportunity!",
    theme: "AI Beyond the Buzzwords to Career Opportunities",
    date: "January 31, 2026",
    time: "10:00 AM IST",
    venue: "Health Catalyst",
    location: "Hyderabad, Telangana",
    overview:
      "Edition 2 focused on bridging the gap between academic knowledge and industry expectations, helping students understand real-world AI engineering and navigate recruitment.",
    image: "/images/hero-networking.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Prudhvi",
        role: "Data & AI Engineer – TCS",
        topic: "AI Beyond the Buzzwords – What AI Engineers Really Do?",
      },
      {
        name: "Bhargavi M",
        role: "Senior HR Executive – THRIWIN.IO | Founder – Fresh Grad Prep",
        topic: "From Resume to Offer Letter – An HR's Perspective",
      },
    ],
    highlights: [
      "Industry-oriented discussions on AI engineering responsibilities",
      "Practical insights into recruitment, resume building, and hiring",
      "Learning directly from a practitioner and an HR mentor",
    ],
  },
  {
    id: 3,
    editionNumber: "03",
    title: "The AI Shift",
    subtitle: "Valentine’s Day turned into Value Times Day! Agentic AI × AI Market × Data Analytics",
    theme: "Agentic AI × AI Market × Data Analytics",
    date: "February 14, 2026",
    time: "10:00 AM – 1:00 PM",
    venue: "Microsoft",
    location: "Hyderabad, Telangana",
    overview:
      "Hosted at Microsoft Hyderabad, Edition 3 brought together passionate learners, creators, and professionals for high-signal discussions on agentic workflows and data platforms.",
    image: "/images/hero-audience.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Adithya Saladi",
        role: "Senior Software Engineer – Microsoft",
        linkedin: "https://www.linkedin.com/in/adithyasaladi/",
      },
      {
        name: "Sachin Agarwal",
        role: "Tech Project Lead – Blue Yonder",
        linkedin: "https://www.linkedin.com/in/sachinagarwal010/",
      },
      {
        name: "Rudramadhaba Mishra",
        role: "Cloud Engineer – Amazon",
        linkedin: "https://www.linkedin.com/in/rudramadhaba/",
      },
      {
        name: "Rajendra Ongole",
        role: "Power BI, MVP – Data Platforms",
        linkedin: "https://www.linkedin.com/in/rajendra-ongole/",
      },
    ],
    supporters: ["Dileep Sajja", "Dinesh Kaarthik", "Lakshmi Suresh Chandra", "Neeraj Kumar Marupalli"],
    highlights: [
      "Deep dive into Agentic AI architectures and cloud integrations",
      "Participation from notable creators and Instagram tech influencers",
      "Hosted at Microsoft Hyderabad campus",
    ],
  },
  {
    id: 4,
    editionNumber: "04",
    title: "What If Founders Use AI?",
    subtitle: "Empowering founders to explore AI, embrace innovation, and build secure businesses!",
    theme: "The Power of AI with Security",
    date: "March 15, 2026",
    venue: "EPAM Systems (15th Floor)",
    location: "Hyderabad, Telangana",
    overview:
      "Part of the Founders Using AI series, this edition brought together founders, students, and practitioners to analyze secure AI adoption and enterprise protection.",
    image: "/images/pillars-learn.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Ramachandra Vikas Chamarthi",
        role: "CEO, Vector Guard",
      },
      {
        name: "Mythrisri Kurra",
        role: "Featured Speaker & Community Builder",
      },
      {
        name: "Om Ashish Mishra",
        role: "Data Scientist | IIT Kanpur Alumnus | GenAI Builder",
      },
    ],
    hosts: ["Sai Sreekar Tangirala"],
    highlights: [
      "Practical startup frameworks for adopting AI securely",
      "Enterprise threat modeling for modern LLM applications",
      "Held at EPAM Systems 15th-floor campus in Hyderabad",
    ],
  },
  {
    id: 5,
    editionNumber: "05",
    title: "Where Students Become Speakers!",
    subtitle: "Where students get the stage, knowledge gets a voice, and emerging talent gets recognized!",
    theme: "Student Knowledge Sharing & Emerging Technologies",
    date: "March 21, 2026",
    time: "9:00 AM – 1:00 PM",
    venue: "EPAM Systems",
    location: "Hyderabad, Telangana",
    overview:
      "A student-first breakthrough edition breaking the passive audience model by putting rising student builders and young prodigies directly on the main stage.",
    image: "/images/pillars-grow.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Goutham Sai",
        role: "16-Year-Old AI Speaker & Tech Content Creator",
        topic: "Young tech exploration and public speaking",
      },
      {
        name: "Deepthi",
        role: "AI Engineer (5+ Years Experience)",
        topic: "Practical industry realities for upcoming engineers",
      },
    ],
    hosts: ["Ujwala Golla (2nd-Year Student)"],
    highlights: [
      "Student-led stage sessions proving age is never a barrier",
      "Building stage presence, communication, and technical confidence",
      "Interactive mentorship between seasoned engineers and students",
    ],
  },
  {
    id: 6,
    editionNumber: "06",
    title: "Learning, Networking & Community Building",
    subtitle: "Strengthening community connections, governance, risk, and career growth.",
    theme: "Learning, Networking & Community Building",
    date: "May 23, 2026",
    venue: "Thoughtworks Technologies (Rajapushpa Summit)",
    location: "Hyderabad, Telangana",
    overview:
      "Hosted at Thoughtworks Hyderabad, Edition 6 focused on sustainable tech communities, governance, cybersecurity, and career acceleration.",
    image: "/images/pillars-connect.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Bhasker Puppala (Patel)",
        role: "Digital Kshatriya | IIT Delhi & IIM Calcutta Alumnus | CCISO | CSA Hyderabad Chapter President",
      },
      {
        name: "Venkata Sriram",
        role: "HR × AI × Law | Angel Investor | GYES 25 Under 25 | World Record Holder",
      },
      {
        name: "Subbarao Anaparthi",
        role: "17+ Years in Application Development & Microsoft Azure",
      },
      {
        name: "Neeraja Nagarjuna",
        role: "Tech Leader & Community Mentor",
      },
    ],
    highlights: [
      "Thought leadership on cybersecurity and governance in the AI era",
      "Community building at Thoughtworks Rajapushpa Summit campus",
    ],
  },
  {
    id: 7,
    editionNumber: "07",
    title: "Resume Review & HR Insights",
    subtitle: "Come for the conversations. Stay for the connections. Leave with opportunities.",
    theme: "Resume Review & HR Insights",
    date: "September 5, 2026",
    time: "9:30 AM – 12:30 PM",
    venue: "DEVX, Hitech City",
    location: "Hyderabad, Telangana",
    overview:
      "A hands-on career workshop providing deep resume audits, 1-on-1 recruiter feedback, and actionable interview preparation for job seekers.",
    image: "/images/team-2.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Yarlagadda Phani Deepthi",
        role: "Generative AI at Bank of America | Chevening-Adani AI Scholar | MSc Leeds",
      },
      {
        name: "Sachin Agarwal",
        role: "Tech Project Lead, Blue Yonder",
      },
      {
        name: "Hari Pavan",
        role: "People & Culture Partner | Ex-Jio | Ex-Flipkart",
      },
      {
        name: "Venkata Triveni Kothapalli",
        role: "Software Engineer, Tech Mahindra | AWS Solutions Architect",
      },
      {
        name: "Bhargavi M",
        role: "HR Professional (9 Yrs Exp) | Founder, Fresh Grad Prep",
      },
    ],
    highlights: [
      "1-on-1 resume tear-downs by senior HR and engineering leads",
      "Navigating recruitment workflows and recruiter psychology",
    ],
  },
  {
    id: 8,
    editionNumber: "08",
    title: "Founder & Investors Connect",
    subtitle: "Connecting startup founders with early-stage investors, operators, and mentors.",
    theme: "Founder & Investors Connect",
    date: "October 10, 2026",
    venue: "Nanospace",
    location: "Hyderabad, Telangana",
    overview:
      "Edition 8 bridged the startup ecosystem by uniting early-stage founders, angel investors, sustainability pioneers, and creators.",
    image: "/images/team-1.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Gowtham Ambadi",
        role: "Entrepreneur | Technologist | Building YANC | AVETH",
      },
      {
        name: "Vamshi Yadav",
        role: "Building Fanzai | Formerly SucSEED Ventures & SeedCircle",
      },
      {
        name: "Raghu Charan Kancharla",
        role: "Founder & CEO, EcogenX Innovations",
      },
      {
        name: "CA Yashwanth",
        role: "Chartered Accountant & Financial Strategist",
      },
      {
        name: "Janardhana Chary Vinukonda",
        role: "Entrepreneur associated with HAPPENIX",
      },
    ],
    supporters: ["Susmitha", "Chandini", "Anitha Chowdhary Gogeneni (Special Guest - Actor)"],
    hosts: ["Sahasrika Gowrishetty", "Nidhii Shukla"],
    highlights: [
      "Direct investor pitch exchanges and strategic feedback",
      "Special appearance by actor Anitha Chowdhary Gogeneni",
      "Supported by Raffi Shaik (Founder & CEO, Nanospace)",
    ],
  },
  {
    id: 9,
    editionNumber: "09",
    title: "Meet the Creators",
    subtitle: "Content Creation, Personal Branding, Organic Growth & Digital Influence",
    theme: "Meet the Creators",
    date: "November 1, 2026",
    time: "9:30 AM – 1:00 PM",
    venue: "Medicover Blue Planet Auditorium",
    location: "Hyderabad, Telangana",
    overview:
      "A flagship gathering celebrating the digital creator economy, organic growth strategies, storytelling, and professional branding for builders.",
    image: "/images/archive-preview.jpg",
    status: "Completed",
    speakers: [
      {
        name: "Om Ashish Mishra",
        role: "Product Data Scientist at Deloitte & Generative AI Speaker",
      },
      {
        name: "Bhargavi M",
        role: "HR Professional | Founder, Fresh Grad Prep | Public Speaker",
      },
      {
        name: "Sachin Agarwal",
        role: "Tech Project Lead, Blue Yonder",
      },
    ],
    hosts: ["Dileep Sajja (Growth Strategist)", "Divya Prudhvi (Organic Growth Strategist)"],
    supporters: ["Health Navig Private Limited", "Shailaja Kota", "Medicover Hospitals"],
    highlights: [
      "Masterclass on personal branding for tech professionals",
      "Auditorium gathering at Medicover Blue Planet Auditorium",
      "Organic growth systems and audience building",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote: "BacktoBase gave me the right people, the right conversations, and the nudge to actually build.",
    author: "Sriya Reddy",
    role: "Student Builder",
    avatar: "/images/avatar-sriya.jpg",
  },
  {
    quote: "What I love most is the community — it's open, helpful, and genuinely rooted in learning.",
    author: "Aditya Varma",
    role: "Product at Microsoft",
    avatar: "/images/avatar-aditya.jpg",
  },
  {
    quote: "I'm attending my first edition to speaking at a later one — the journey has been incredible.",
    author: "Meghana K.",
    role: "Developer & Creator",
    avatar: "/images/avatar-meghana.jpg",
  },
];

export const FAQS = [
  {
    question: "What is BacktoBase?",
    answer:
      "BacktoBase is a student-driven community that brings together students, builders, creators, founders, and professionals to learn, connect, and grow through in-person events, talks, and community initiatives.",
  },
  {
    question: "Do I need to be a student to join?",
    answer:
      "No! While BacktoBase was founded with a student-first philosophy, our editions welcome working professionals, founders, engineers, creators, and mentors who want to collaborate with high-energy talent.",
  },
  {
    question: "What happens at a BacktoBase edition?",
    answer:
      "Each edition is uniquely themed — from deep-dive AI engineering and resume teardowns to founder-investor connects and creator growth sessions. You experience keynote talks, open interactive panels, and curated networking.",
  },
  {
    question: "How can I get involved or volunteer?",
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
