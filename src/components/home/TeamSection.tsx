"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";
import { TEAM_MEMBERS } from "@/data/communityData";

const TEAM_BENTO = [
  {
    src: "/images/team-1.jpg",
    label: "Organizing Crew",
    caption: "Behind every edition's energy and flow",
    gridClass: "md:col-span-6 md:row-span-2 aspect-[16/11] md:aspect-auto md:min-h-[340px]",
    sizes: "(max-width: 768px) 92vw, 600px",
  },
  {
    src: "/images/team-2.jpg",
    label: "Stage & Anchoring",
    caption: "Student voices leading live conversations",
    gridClass: "md:col-span-6 aspect-[16/9] md:aspect-[16/8.2]",
    sizes: "(max-width: 768px) 92vw, 600px",
  },
  {
    src: "/images/team-3.jpg",
    label: "Speaker Support",
    caption: "Coordinating panels & mentorship rooms",
    gridClass: "md:col-span-3 aspect-[16/11] md:aspect-[4/3.2]",
    sizes: "(max-width: 768px) 46vw, 300px",
  },
  {
    src: "/images/team-4.jpg",
    label: "Community Operations",
    caption: "Making every newcomer feel welcome",
    gridClass: "md:col-span-3 aspect-[16/11] md:aspect-[4/3.2]",
    sizes: "(max-width: 768px) 46vw, 300px",
  },
] as const;

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function TeamSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative isolate mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700 block mb-1.5">
              The Team
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-charcoal-950 uppercase tracking-tight">
              People Who Make It <span className="text-brand-cyan">Happen.</span>
            </h3>
          </div>

          <Link
            href="/community#team"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-charcoal-800 hover:text-brand-orange group transition-colors"
          >
            <span>View Full Organizing Team ({TEAM_MEMBERS.length})</span>
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Asymmetric Editorial Magazine Bento Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {TEAM_BENTO.map((card, idx) => (
            <motion.div
              key={card.src}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : idx * 0.08,
                ease: EDITORIAL_EASE,
              }}
              className={`group relative overflow-hidden rounded-2xl border border-border-subtle shadow-card hover:shadow-photo transition-shadow duration-300 ${card.gridClass}`}
            >
              <CustomVisualSlot
                src={card.src}
                alt={`BacktoBase ${card.label}`}
                sizes={card.sizes}
                className="w-full h-full"
                imgClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/35 to-transparent p-4 pt-10 opacity-95 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block rounded-full bg-brand-amber/90 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-charcoal-950 mb-1">
                  {card.label}
                </span>
                <p className="text-xs font-medium text-white/90 leading-snug">{card.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verified 17-Member Organizing Crew Ribbon */}
        <div className="mt-6 rounded-2xl bg-white/85 border border-border-subtle px-5 py-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0 text-xs font-bold uppercase tracking-wider text-charcoal-700">
            <Users className="w-4 h-4 text-brand-orange" aria-hidden="true" />
            <span>Core Crew</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {TEAM_MEMBERS.slice(0, 8).map((member) => (
              <span
                key={member}
                className="rounded-full bg-canvas-subtle border border-border-subtle px-3 py-1 text-[11px] font-semibold text-charcoal-800"
              >
                {member}
              </span>
            ))}
            <Link
              href="/community#team"
              className="rounded-full bg-brand-dark-pill hover:bg-brand-orange px-3 py-1 text-[11px] font-bold text-white transition-colors"
            >
              +{TEAM_MEMBERS.length - 8} more →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
