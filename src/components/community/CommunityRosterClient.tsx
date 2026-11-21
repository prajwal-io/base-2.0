"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Sparkles, Users, Mic, X } from "lucide-react";

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Show Up Curious",
    description:
      "Walk into any Hyderabad edition as a student, fresher, or builder — zero gatekeeping, zero paywalls.",
    Icon: Sparkles,
    badgeClass: "bg-brand-amber-light text-brand-orange",
  },
  {
    step: "02",
    title: "Connect & Build",
    description:
      "Meet engineers, founders, mentors, and peers in high-trust conversations that keep going after the event.",
    Icon: Users,
    badgeClass: "bg-cyan-50 text-brand-teal",
  },
  {
    step: "03",
    title: "Take the Stage",
    description:
      "Grow from attendee to lightning speaker, event host, or core organizer helping shape the next edition.",
    Icon: Mic,
    badgeClass: "bg-amber-50 text-amber-800",
  },
] as const;

export function CommunityRosterClient({ members }: { members: string[] }) {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((name) => name.toLowerCase().includes(q));
  }, [members, query]);

  return (
    <>
      {/* 3-Step Member Journey */}
      <section aria-labelledby="journey-heading" className="mb-16">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange block mb-1">
            How It Works
          </span>
          <h2
            id="journey-heading"
            className="font-display font-black text-3xl sm:text-4xl text-charcoal-950 uppercase tracking-tight"
          >
            Your Journey At <span className="text-brand-cyan">BacktoBase.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {JOURNEY_STEPS.map(({ step, title, description, Icon, badgeClass }, idx) => (
            <motion.div
              key={step}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : idx * 0.08 }}
              className="rounded-3xl bg-white border border-border-subtle p-6 sm:p-7 shadow-card flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${badgeClass}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="font-display font-black text-3xl text-charcoal-200 tabular-nums">
                  {step}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-950 mb-2">{title}</h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Searchable Organizing Roster Grid */}
      <div id="team" className="mb-16 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange block mb-1">
              Our Volunteers &amp; Leaders
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-950 uppercase tracking-tight">
              Organizing Team Roster
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              className="w-4 h-4 text-charcoal-400 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${members.length} team members...`}
              aria-label="Search organizing team roster"
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-border-strong text-xs sm:text-sm text-charcoal-950 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-800"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="rounded-2xl bg-white border border-border-subtle p-8 text-center">
            <p className="text-sm font-semibold text-charcoal-700">
              No organizing team members matched &ldquo;{query}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member}
                className="p-5 rounded-2xl bg-white border border-border-subtle shadow-card hover:shadow-photo hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-brand-amber-light flex items-center justify-center text-brand-orange font-bold text-sm mb-3">
                  {member.charAt(0)}
                </div>
                <h3 className="font-display font-bold text-base text-charcoal-950 mb-1">
                  {member}
                </h3>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                  Organizing Crew
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
