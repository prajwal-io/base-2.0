"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, Mic, RotateCcw, Users } from "lucide-react";
import { normalizeVenue, type Edition } from "@/data/communityData";

type ThemeFilter = "All" | "AI & GenAI" | "Careers & HR" | "Founders & Startups" | "Community & Creators";

const THEME_FILTERS: readonly ThemeFilter[] = [
  "All",
  "AI & GenAI",
  "Careers & HR",
  "Founders & Startups",
  "Community & Creators",
] as const;

const THEME_PATTERNS: Record<Exclude<ThemeFilter, "All">, RegExp> = {
  "AI & GenAI": /\b(ai|genai|agentic|data|llm)\b/i,
  "Careers & HR": /\b(career|careers|resume|hr|recruitment|hiring)\b/i,
  "Founders & Startups": /\b(founder|founders|investor|investors|startup|startups)\b/i,
  "Community & Creators": /\b(creator|creators|community|student|students|networking)\b/i,
};

function matchesTheme(edition: Edition, filter: ThemeFilter): boolean {
  if (filter === "All") return true;
  const blob = `${edition.title} ${edition.theme} ${edition.subtitle}`;
  return THEME_PATTERNS[filter].test(blob);
}

interface UniqueSpeaker {
  name: string;
  role: string;
  linkedin?: string;
  editions: string[];
}

export function EventsArchiveClient({ editions }: { editions: Edition[] }) {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<ThemeFilter>("All");
  const [venue, setVenue] = useState<string>("All Venues");
  const [pendingEdition, setPendingEdition] = useState<string | null>(null);

  const ordered = useMemo(() => editions.slice().reverse(), [editions]);

  const venues = useMemo(() => {
    const seen = new Set<string>();
    editions.forEach((ed) => seen.add(normalizeVenue(ed.venue)));
    return ["All Venues", ...Array.from(seen)];
  }, [editions]);

  const filtered = useMemo(
    () =>
      ordered.filter((ed) => {
        const okTheme = matchesTheme(ed, theme);
        const okVenue = venue === "All Venues" || normalizeVenue(ed.venue) === venue;
        return okTheme && okVenue;
      }),
    [ordered, theme, venue],
  );

  // Deduplicated verified speakers across all editions
  const speakerDirectory = useMemo<UniqueSpeaker[]>(() => {
    const map = new Map<string, UniqueSpeaker>();
    editions.forEach((ed) => {
      ed.speakers.forEach((sp) => {
        const key = sp.name.trim().toLowerCase();
        const existing = map.get(key);
        if (existing) {
          if (!existing.editions.includes(ed.editionNumber)) {
            existing.editions.push(ed.editionNumber);
          }
          if (!existing.linkedin && sp.linkedin) {
            existing.linkedin = sp.linkedin;
          }
        } else {
          map.set(key, {
            name: sp.name,
            role: sp.role,
            linkedin: sp.linkedin,
            editions: [ed.editionNumber],
          });
        }
      });
    });
    return Array.from(map.values());
  }, [editions]);

  const isFiltered = theme !== "All" || venue !== "All Venues";

  useEffect(() => {
    if (pendingEdition === null || isFiltered) return;
    const frame = window.requestAnimationFrame(() => {
      const id = `edition-${pendingEdition}`;
      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${id}`);
      setPendingEdition(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isFiltered, pendingEdition, reduceMotion]);

  return (
    <>
      {/* Interactive Filter Console */}
      <section
        aria-label="Filter BacktoBase editions"
        className="mb-10 rounded-3xl bg-white border border-border-subtle p-5 sm:p-6 shadow-card"
      >
        <div className="flex flex-col gap-4">
          {/* Theme Filter Pills with Framer Motion active pill */}
          <div className="flex flex-wrap items-center gap-2">
            {THEME_FILTERS.map((item) => {
              const active = theme === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTheme(item)}
                  aria-pressed={active}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    active ? "text-white" : "text-charcoal-700 hover:text-charcoal-950 bg-canvas-subtle"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={reduceMotion ? undefined : "events-theme-pill"}
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-brand-dark-pill"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}
          </div>

          {/* Venue Filter Row + Result Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-subtle">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 mr-1.5">
                Venue:
              </span>
              {venues.map((v) => {
                const active = venue === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVenue(v)}
                    aria-pressed={active}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      active
                        ? "bg-brand-orange text-white border-brand-orange"
                        : "bg-canvas-base text-charcoal-700 border-border-subtle hover:border-border-strong"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-charcoal-600 tabular-nums">
                Showing {filtered.length} of {editions.length} editions
              </span>
              {isFiltered && (
                <button
                  type="button"
                  onClick={() => {
                    setTheme("All");
                    setVenue("All Venues");
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-brand-orange-hover"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editions List */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-white border border-border-subtle p-10 text-center shadow-card mb-16">
          <p className="font-display font-bold text-lg text-charcoal-950 mb-2">
            No editions match that theme and venue combination.
          </p>
          <p className="text-sm text-charcoal-600 mb-5">
            Reset the filters to browse all {editions.length} BacktoBase editions.
          </p>
          <button
            type="button"
            onClick={() => {
              setTheme("All");
              setVenue("All Venues");
            }}
            className="px-5 py-2.5 rounded-full bg-brand-dark-pill text-white text-xs font-bold uppercase tracking-wider"
          >
            Show All {editions.length} Editions
          </button>
        </div>
      ) : (
        <div className="space-y-8 mb-16">
          {filtered.map((edition, idx) => (
            <motion.article
              key={edition.id}
              id={`edition-${edition.editionNumber}`}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.2) }}
              className="rounded-3xl bg-white border border-border-subtle p-6 sm:p-8 lg:p-10 shadow-card hover:shadow-photo transition-shadow duration-300 scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Edition Metadata & Speakers */}
                <div className="lg:col-span-7 flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-brand-amber-light text-brand-orange text-xs font-bold tracking-wide uppercase">
                      Edition {edition.editionNumber}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-charcoal-600 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-charcoal-400" aria-hidden="true" />
                      {edition.date} {edition.time && `• ${edition.time}`}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-charcoal-600 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-charcoal-400" aria-hidden="true" />
                      {edition.venue}, {edition.location}
                    </span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal-950 mb-2">
                    {edition.title}
                  </h2>
                  <p className="text-sm font-medium text-brand-orange mb-4">{edition.subtitle}</p>
                  <p className="text-sm text-charcoal-700 leading-relaxed mb-6 font-normal">
                    {edition.overview}
                  </p>

                  {/* Speakers Section */}
                  <div className="mt-auto pt-6 border-t border-border-subtle">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-orange" aria-hidden="true" />
                      Featured Speakers &amp; Experts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {edition.speakers.map((speaker, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-canvas-subtle border border-border-subtle flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-display font-bold text-sm text-charcoal-950">
                                {speaker.name}
                              </h4>
                              {speaker.linkedin && (
                                <a
                                  href={speaker.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-brand-teal hover:text-brand-orange p-0.5 transition-colors"
                                  aria-label={`${speaker.name} LinkedIn`}
                                >
                                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                                </a>
                              )}
                            </div>
                            <p className="text-xs text-charcoal-600 mt-0.5 line-clamp-2">
                              {speaker.role}
                            </p>
                          </div>
                          {speaker.topic && (
                            <p className="text-[11px] font-medium text-charcoal-800 mt-2 pt-2 border-t border-border-subtle/60">
                              Topic: {speaker.topic}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {edition.hosts?.length ? (
                      <p className="text-xs text-charcoal-700 mt-4">
                        <span className="font-semibold text-charcoal-900">Hosts:</span>{" "}
                        {edition.hosts.join(", ")}
                      </p>
                    ) : null}
                    {edition.supporters?.length ? (
                      <p className="text-xs text-charcoal-700 mt-2">
                        <span className="font-semibold text-charcoal-900">
                          Additional contributors:
                        </span>{" "}
                        {edition.supporters.join(", ")}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Right Column: Key Highlights */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {edition.highlights && (
                    <div className="p-5 rounded-2xl bg-canvas-subtle border border-border-subtle">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-3">
                        Key Highlights
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        {edition.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <span className="text-brand-orange font-bold mt-0.5">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Verified speaker wall across all editions */}
      <section
        id="speakers"
        aria-labelledby="speaker-wall-heading"
        className="rounded-3xl bg-canvas-dark text-white p-7 sm:p-10 lg:p-12 shadow-2xl border border-charcoal-800"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-amber mb-2">
              <Mic className="w-3.5 h-3.5" aria-hidden="true" />
              Verified Speaker Directory
            </span>
            <h2
              id="speaker-wall-heading"
              className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight"
            >
              Voices Who Took The <span className="text-brand-cyan">Stage.</span>
            </h2>
          </div>
          <span className="self-start sm:self-auto rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-200 tabular-nums">
            {speakerDirectory.length} Verified Speakers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakerDirectory.map((speaker) => (
            <div
              key={speaker.name}
              className="rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-4 flex flex-col justify-between gap-3 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-base text-white">{speaker.name}</h3>
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-cyan hover:text-brand-amber p-0.5 transition-colors shrink-0"
                      aria-label={`${speaker.name} LinkedIn profile`}
                    >
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">{speaker.role}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                {speaker.editions.map((edNum) => (
                  <a
                    key={edNum}
                    href={`#edition-${edNum}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setPendingEdition(edNum);
                      setTheme("All");
                      setVenue("All Venues");
                    }}
                    className="rounded-full bg-brand-amber/15 border border-brand-amber/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-amber hover:bg-brand-amber hover:text-charcoal-950 transition-colors"
                  >
                    Edition {edNum}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
