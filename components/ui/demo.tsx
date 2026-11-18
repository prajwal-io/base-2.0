"use client"

import { LiquidAccordion } from "@/components/ui/liquid-glass-accordion"

const FAQ = [
  {
    question: "What is BacktoBase?",
    answer: "BacktoBase is a student-driven community that brings together students, builders, creators, founders, and professionals to learn, connect, and grow through in-person events, talks, and community initiatives.",
  },
  {
    question: "Do I need to be a student to join?",
    answer: "No! While BacktoBase was founded with a student-first philosophy, our editions welcome working professionals, founders, engineers, creators, and mentors who want to collaborate with high-energy talent.",
  },
  {
    question: "What happens at a BacktoBase edition?",
    answer: "Each edition is uniquely themed — from deep-dive AI engineering and resume teardowns to founder-investor connects and creator growth sessions. You experience keynote talks, open interactive panels, and curated networking.",
  },
  {
    question: "How can I get involved or volunteer?",
    answer: "You can get involved by attending an upcoming edition, joining our WhatsApp/Discord community groups, applying as an organizing volunteer, or proposing a lightning talk.",
  },
]

export default function Demo() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: "48px 16px",
        boxSizing: "border-box",
        overflowX: "hidden",
        background: "#FAF7F2",
      }}
    >
      <LiquidAccordion items={FAQ} defaultOpen={0} tone="light" sound={true} style={{ maxWidth: 640 }} />
      <span
        style={{
          font: "500 12px/1 var(--font-sans), ui-sans-serif, -apple-system, sans-serif",
          color: "rgba(17,18,21,.5)",
        }}
      >
        Nimbus UI Liquid Accordion · Tailored for BacktoBase
      </span>
    </div>
  )
}
