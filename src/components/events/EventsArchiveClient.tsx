"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, RotateCcw, Users } from "lucide-react";
import { normalizeVenue, type Edition } from "@/data/communityData";
import { getEditionPhoto } from "@/data/editionPhotos";

function EditionPhoto({ editionNumber }: { editionNumber: string }) {
  const photo = getEditionPhoto(editionNumber);
  if (!photo) return null;

  return (
    <figure className="rounded-2xl border border-border-subtle bg-canvas-subtle p-3 sm:p-4">
      <figcaption className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-charcoal-800">
        Edition {editionNumber} photo
      </figcaption>
      <a
        href={photo.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open original photo for Edition ${editionNumber} in a new tab`}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 38vw"
          quality={95}
          className="mx-auto h-auto max-h-[420px] w-full rounded-xl bg-white object-contain"
        />
        <span className="mt-3 flex items-center gap-1 px-1 text-xs font-semibold text-charcoal-800">
          View original photo <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </a>
    </figure>
  );
}

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

export function EventsArchiveClient({ editions }: { editions: Edition[] }) {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<ThemeFilter>("All");
  const [venue, setVenue] = useState<string>("All Venues");

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

  const isFiltered = theme !== "All" || venue !== "All Venues";

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
                        ? "bg-brand-orange-ink text-white border-brand-orange-ink"
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
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange-ink hover:text-brand-orange-hover"
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
              transition={{ duration: 0.32, delay: Math.min(idx * 0.04, 0.12) }}
              className="rounded-3xl bg-white border border-border-subtle p-6 sm:p-8 lg:p-10 shadow-card hover:shadow-photo transition-shadow duration-200 scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Edition Metadata & Speakers */}
                <div className="lg:col-span-7 flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-brand-amber-light text-brand-orange-ink text-xs font-bold tracking-wide uppercase">
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
                  <p className="text-sm font-medium text-brand-orange-ink mb-4">{edition.subtitle}</p>
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

                {/* Right Column: Key Highlights and event photo */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <EditionPhoto editionNumber={edition.editionNumber} />
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

    </>
  );
}
