export interface FounderMetric {
  value: string;
  label: string;
}

export interface FounderTrack {
  category: string;
  accent: "orange" | "cyan" | "amber";
  summary: string;
  roles: string[];
}

export const FOUNDER_PROFILE = {
  name: "Yashwanth Bondapalli",
  title: "Founder @ BacktoBase",
  headline:
    "Founder @ BacktoBase | GenAI Developer | 15X Speaker · 35X Mentor | Sakshi TV Featured | Microsoft Speaker | 13+ Institutions | Software Engineer | App & Web Dev | Robotics | Author | Video Editor | Choreographer",
  shortSummary:
    "Founder of BacktoBase, GenAI Developer, Software Engineer, 15X Speaker (including Microsoft), 35X Mentor across 13+ institutions, Sakshi TV Featured, and multidisciplinary creator spanning robotics, authoring, video editing, and choreography.",
  quote:
    "We don't just build audiences. We create opportunities for people to become voices in the community.",
  portrait: "/images/founder-portrait.jpg",
  avatar: "/images/founder-avatar.jpg",
  metrics: [
    { value: "15X", label: "Speaker" },
    { value: "35X", label: "Mentor" },
    { value: "13+", label: "Institutions" },
    { value: "09", label: "BacktoBase Editions" },
  ] as FounderMetric[],
  highlights: [
    "Founder @ BacktoBase",
    "GenAI Developer",
    "15X Speaker",
    "35X Mentor",
    "Sakshi TV Featured",
    "Microsoft Speaker",
    "13+ Institutions",
    "Software Engineer",
    "App & Web Dev",
    "Robotics",
    "Author",
    "Video Editor",
    "Choreographer",
  ],
  spotlightHighlights: [
    "GenAI Developer",
    "15X Speaker",
    "35X Mentor",
    "Microsoft Speaker",
    "Sakshi TV Featured",
    "13+ Institutions",
  ],
  bioParagraphs: [
    "Yashwanth Bondapalli founded BacktoBase in Hyderabad to solve a real gap between classrooms and industry: students were graduating with degrees and certificates, yet lacked direct exposure to real-world engineering, practical AI systems, high-trust networking, and how builders and founders operate.",
    "As a GenAI Developer, Software Engineer, and App & Web Developer with hands-on roots in Robotics, Yashwanth combines deep technical execution with community leadership. He has spoken 15 times on stages including Microsoft, mentored 35+ sessions and cohorts across 13+ institutions, and been featured on Sakshi TV for his work empowering student talent.",
    "Beyond engineering and community building, Yashwanth brings a multidisciplinary creative edge as an Author, Video Editor, and Choreographer—shaping BacktoBase into a space where technical depth and creative expression thrive side by side.",
  ],
  tracks: [
    {
      category: "Leadership, Speaking & Recognition",
      accent: "orange",
      summary:
        "Building student-first communities, sharing practical insights on stage, and mentoring emerging builders across campuses.",
      roles: [
        "Founder @ BacktoBase",
        "15X Speaker",
        "35X Mentor",
        "Microsoft Speaker",
        "Sakshi TV Featured",
        "13+ Institutions",
      ],
    },
    {
      category: "Engineering & Technology",
      accent: "cyan",
      summary:
        "Designing and shipping practical software across generative AI, full-stack web & mobile apps, and robotics.",
      roles: [
        "GenAI Developer",
        "Software Engineer",
        "App & Web Dev",
        "Robotics",
      ],
    },
    {
      category: "Creative & Storytelling",
      accent: "amber",
      summary:
        "Combining engineering clarity with visual storytelling, writing, and stage artistry.",
      roles: ["Author", "Video Editor", "Choreographer"],
    },
  ] as FounderTrack[],
} as const;
