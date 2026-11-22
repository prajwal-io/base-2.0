"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Users } from "lucide-react";

export type ArchiveEvent = {
  edition: string;
  editionNumber?: string;
  title: string;
  date?: string;
  venue?: string;
  speakerCount?: number;
  href: string;
  image?: string;
};

type EventArchiveProps = {
  events: ArchiveEvent[];
  archiveHref: string;
};

const PAGE_SIZE = 3;
const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DECK_VARIANTS = {
  enter: (direction: number) => ({ opacity: 0, transform: `translateX(${direction * 12}px)` }),
  visible: {
    opacity: 1,
    transform: "translateX(0px)",
    transition: { duration: 0.18, ease: EDITORIAL_EASE },
    transitionEnd: { transform: "none" },
  },
  exit: (direction: number) => ({
    opacity: 0,
    transform: `translateX(${direction * -8}px)`,
    transition: { duration: 0.08, ease: EDITORIAL_EASE },
  }),
};

const EAF_STYLES = `
.eaf-section {
  --eaf-orange: #ef4b13;
  position: relative;
  overflow: hidden;
  background-color: var(--color-canvas-dark);
  background-image: radial-gradient(rgba(255, 255, 255, 0.12) 0.85px, transparent 0.85px);
  background-size: 16px 16px;
  color: #f8f4eb;
  padding: clamp(68px, 8vw, 112px) clamp(20px, 4vw, 32px);
  scroll-margin-top: 76px;
}

.eaf-inner {
  width: min(1260px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(250px, 0.82fr) minmax(0, 1.48fr);
  align-items: center;
  gap: clamp(36px, 5.5vw, 84px);
}

.eaf-intro {
  position: relative;
  z-index: 4;
}

.eaf-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 18px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(248, 244, 235, 0.72);
}

.eaf-eyebrow-line {
  width: 36px;
  height: 1px;
  background: currentColor;
}

.eaf-heading {
  max-width: 400px;
  margin: 0;
  font-family: var(--font-display), "Inter Tight", system-ui, sans-serif;
  font-size: clamp(38px, 4.6vw, 60px);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #f8f4eb;
}

.eaf-copy {
  max-width: 340px;
  margin: 20px 0 26px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.58;
  color: rgba(248, 244, 235, 0.76);
}

.eaf-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}

.eaf-all-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(248, 244, 235, 0.65);
  border-radius: 999px;
  padding: 11px 18px;
  color: #ffffff;
  text-decoration: none;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: background-color 200ms ease, border-color 200ms ease, transform 200ms ease;
}

.eaf-all-link:hover {
  background-color: var(--eaf-orange);
  border-color: var(--eaf-orange);
  transform: translateY(-1px);
}

.eaf-all-link:focus-visible,
.eaf-nav-btn:focus-visible,
.eaf-dot:focus-visible,
.eaf-folder:focus-visible {
  outline: 2px solid #ff6a35;
  outline-offset: 4px;
}

.eaf-controls {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.eaf-nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(248, 244, 235, 0.28);
  background: rgba(255, 255, 255, 0.05);
  color: #f8f4eb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.eaf-nav-btn:hover {
  background-color: var(--eaf-orange);
  border-color: var(--eaf-orange);
  transform: translateY(-1px);
}

.eaf-dots {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
}

.eaf-dot {
  height: 6px;
  width: 24px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background: rgba(248, 244, 235, 0.22);
  cursor: pointer;
  transition: width 240ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease;
}

.eaf-dot[data-active="true"] {
  width: 44px;
  background: var(--eaf-orange);
}

.eaf-page-label {
  margin-left: 6px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(248, 244, 235, 0.56);
}

.eaf-stage-wrap {
  position: relative;
  min-width: 0;
}

.eaf-stage {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}

.eaf-folder {
  --folder-paper: #f6ecd9;
  --folder-ink: #242722;
  --folder-edge: #d5c5a8;
  display: flex;
  min-width: 0;
  flex-direction: column;
  color: var(--folder-ink);
  text-decoration: none;
}

.eaf-folder-tab {
  align-self: flex-start;
  max-width: 100%;
  padding: 8px 24px 7px 13px;
  border-radius: 6px 12px 0 0;
  background: var(--folder-paper);
  color: #79441f;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eaf-folder-sheet {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  padding: 10px;
  border-radius: 0 8px 8px 8px;
  background: var(--folder-paper);
}

.eaf-folder-photo {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  max-height: 260px;
  border: 1px solid var(--folder-edge);
  background: #e9dcc4;
  color: #5b4332;
  font-size: 12px;
}

.eaf-folder-photo-fallback {
  padding: 12px;
  text-align: center;
}

.eaf-folder-photo img {
  object-fit: contain;
}

.eaf-folder-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 4px 3px;
}

.eaf-folder-title {
  margin: 0 0 12px;
  font-family: var(--font-display), "Inter Tight", system-ui, sans-serif;
  font-size: clamp(17px, 1.55vw, 21px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.025em;
  overflow-wrap: anywhere;
}

.eaf-folder-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  margin-top: auto;
  padding-top: 9px;
  border-top: 1px solid var(--folder-edge);
  color: #5b4332;
  font-size: 11px;
  font-weight: 600;
}

.eaf-folder-meta {
  display: grid;
  gap: 4px;
}

.eaf-folder-foot-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.eaf-folder-open {
  display: grid;
  flex: none;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid var(--folder-edge);
  border-radius: 50%;
  color: var(--folder-ink);
  transition: background-color 160ms ease, color 160ms ease;
}

.eaf-folder:hover .eaf-folder-open,
.eaf-folder:focus-visible .eaf-folder-open {
  background: var(--folder-ink);
  color: var(--folder-paper);
}

@media (max-width: 980px) {
  .eaf-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .eaf-copy {
    max-width: 520px;
  }
}

@media (max-width: 680px) {
  .eaf-nav-btn {
    width: 44px;
    height: 44px;
  }

  .eaf-dots {
    margin-top: 8px;
  }

  .eaf-dot {
    height: 44px;
    min-width: 44px;
    border-block: 19px solid transparent;
    background-clip: padding-box;
  }

  .eaf-stage {
    grid-template-columns: 1fr;
    gap: 16px;
  }

}

@media (prefers-reduced-motion: reduce) {
  .eaf-all-link,
  .eaf-nav-btn,
  .eaf-dot,
  .eaf-folder-open {
    transition: none;
  }
}
`;

export default function EventArchiveFolders({ events, archiveHref }: EventArchiveProps) {
  const reduceMotion = useReducedMotion();
  const [{ page, direction }, setDeck] = useState({ page: 0, direction: 1 });

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const safePage = page % totalPages;
  const visibleEvents = events.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const step = (direction: number) =>
    setDeck(({ page }) => ({ page: (page % totalPages + direction + totalPages) % totalPages, direction }));

  const selectPage = (target: number) =>
    setDeck((current) => {
      const active = current.page % totalPages;
      if (target === active) return current;
      return { page: target, direction: target > active ? 1 : -1 };
    });

  return (
    <section id="event-archive" className="eaf-section" aria-labelledby="archive-title">
      <style>{EAF_STYLES}</style>

      <div className="eaf-inner">
        {/* Left Column: Intro + Controls */}
        <div className="eaf-intro">
          <p className="eaf-eyebrow">
            <span className="eaf-eyebrow-line" aria-hidden="true" />
            Our event archive
          </p>
          <h2 id="archive-title" className="eaf-heading">
            Explore the journey so far.
          </h2>
          <p className="eaf-copy">
            Browse all {events.length} BacktoBase editions across Hyderabad, from AI clarity
            sessions and resume reviews to founder meetups and creator summits.
          </p>

          <div className="eaf-actions">
            <Link className="eaf-all-link" href={archiveHref}>
              <span>Explore all editions</span>
              <span aria-hidden="true">→</span>
            </Link>

            {totalPages > 1 && (
              <div className="eaf-controls" aria-label="Browse archive folders">
                <button
                  type="button"
                  className="eaf-nav-btn"
                  onClick={() => step(-1)}
                  aria-label="Show previous editions"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="eaf-nav-btn"
                  onClick={() => step(1)}
                  aria-label="Show next editions"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="eaf-dots" role="group" aria-label="Archive deck pages">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-pressed={safePage === idx}
                  aria-label={`View archive set ${idx + 1} of ${totalPages}`}
                  data-active={safePage === idx ? "true" : "false"}
                  className="eaf-dot"
                  onClick={() => selectPage(idx)}
                />
              ))}
              <span className="eaf-page-label">
                {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, events.length)} of{" "}
                {events.length}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Event folders */}
        <div className="eaf-stage-wrap" aria-label="Featured event editions">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={safePage}
              className="eaf-stage"
              custom={direction}
              variants={reduceMotion ? undefined : DECK_VARIANTS}
              initial={reduceMotion ? false : "enter"}
              animate={reduceMotion ? undefined : "visible"}
              exit={reduceMotion ? undefined : "exit"}
            >
              {visibleEvents.map((event) => (
                <Link key={event.href} href={event.href} className="eaf-folder">
                  <span className="eaf-folder-tab">{event.edition}</span>
                  <div className="eaf-folder-sheet">
                    <div className="eaf-folder-photo">
                      {event.image ? (
                        <Image src={event.image} alt="" fill unoptimized />
                      ) : (
                        <span className="eaf-folder-photo-fallback">
                          {event.venue ?? "Photo unavailable"}
                        </span>
                      )}
                    </div>

                    <div className="eaf-folder-info">
                      <h3 className="eaf-folder-title">{event.title}</h3>

                      <div className="eaf-folder-foot">
                        <div className="eaf-folder-meta">
                          {event.date && (
                            <span className="eaf-folder-foot-row">
                              <Calendar className="size-3 shrink-0" aria-hidden="true" />
                              <span>{event.date}</span>
                            </span>
                          )}
                          {typeof event.speakerCount === "number" && (
                            <span className="eaf-folder-foot-row">
                              <Users className="size-3 shrink-0" aria-hidden="true" />
                              <span>
                                {event.speakerCount} {event.speakerCount === 1 ? "Speaker" : "Speakers"}
                              </span>
                            </span>
                          )}
                        </div>
                        <span className="eaf-folder-open" aria-hidden="true">
                          <ArrowUpRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
