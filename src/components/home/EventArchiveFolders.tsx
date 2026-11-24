"use client";

import { useEffect, useRef, useState } from "react";
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
  background-color: var(--color-canvas-subtle);
  color: #111215;
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
  color: #8a4d2e;
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
  color: #111215;
}

.eaf-copy {
  max-width: 340px;
  margin: 20px 0 26px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.58;
  color: #4a4e57;
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
  border: 1px solid rgba(52, 41, 31, 0.42);
  border-radius: 999px;
  padding: 11px 18px;
  color: #34291f;
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
  color: #111215;
  transform: translateY(-1px);
}

.eaf-all-link:focus-visible,
.eaf-nav-btn:focus-visible,
.eaf-dot:focus-visible,
.eaf-folder:focus-visible {
  outline: 2px solid #9a3412;
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
  border: 1px solid rgba(52, 41, 31, 0.24);
  background: rgba(255, 255, 255, 0.72);
  color: #34291f;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.eaf-nav-btn:hover {
  background-color: var(--eaf-orange);
  border-color: var(--eaf-orange);
  color: #111215;
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
  background: rgba(52, 41, 31, 0.24);
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
  color: #5d626d;
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
  perspective: 1100px;
}

.eaf-folder {
  --folder-paper: #f5e8d0;
  --folder-paper-light: #fff6e8;
  --folder-ink: #34291f;
  --folder-edge: #c9aa80;
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 12px 0 0 10px;
  color: var(--folder-ink);
  isolation: isolate;
  transform-style: preserve-3d;
}

.eaf-folder-tab {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 18px;
  width: 46%;
  height: 32px;
  padding: 8px 12px 0;
  clip-path: polygon(0 0, 76% 0, 100% 100%, 0 100%);
  border: 1px solid var(--folder-edge);
  border-bottom: 0;
  border-radius: 7px 8px 0 0;
  background: linear-gradient(180deg, #ffefd2, #e9d0a9);
  color: #79441f;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-align: left;
  text-transform: uppercase;
}

.eaf-folder-button {
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  border: 1px solid #c4a57c;
  border-radius: 5px 13px 10px 8px;
  padding: 12px;
  background:
    repeating-linear-gradient(0deg, rgba(126, 87, 51, .025) 0 1px, transparent 1px 5px),
    linear-gradient(145deg, var(--folder-paper-light), var(--folder-paper) 70%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), inset 3px 0 0 rgba(165,124,72,.1), 0 3px 0 #b59368, 0 7px 12px rgba(22, 17, 12, .17);
  color: inherit;
  cursor: pointer;
  text-align: left;
  transition: transform 240ms cubic-bezier(.16,1,.3,1), box-shadow 240ms ease;
}

.eaf-folder-depth { position: absolute; z-index: -1; inset: 4px -4px -6px 4px; border: 1px solid #b99a70; border-radius: 5px 13px 10px 8px; background: linear-gradient(145deg, #f3e2c2, #ddc49d); box-shadow: 0 8px 14px rgba(22,17,12,.12); transform: translateZ(-8px); pointer-events: none; }
.eaf-folder-button:focus-visible, .eaf-folder-link:focus-visible { outline: 2px solid #9a3412; outline-offset: 4px; }
.eaf-folder-button[data-open="true"] { transform: translateY(-2px); }
.eaf-folder-seam { position: absolute; inset: 8px; border: 1px dashed rgba(138, 99, 57, .25); border-radius: 4px 10px 8px 6px; pointer-events: none; }
.eaf-folder-topline { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 3px 3px 12px; color: #805b39; font-size: 9px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.eaf-folder-stamp { display: grid; width: 26px; height: 26px; place-items: center; border: 1px solid #c5a77e; border-radius: 50%; background: #f9ecd7; }
.eaf-folder-content { display: flex; flex: 1; min-width: 0; flex-direction: column; }
.eaf-folder-photo-pop { position: relative; z-index: 3; width: 100%; overflow: hidden; aspect-ratio: 4 / 3; border: 4px solid #fffaf0; background: linear-gradient(145deg, #f3eadb, #dfcfb5); box-shadow: 0 5px 14px rgba(35, 25, 16, .24); transform-origin: center bottom; }
.eaf-folder-photo-pop img { object-fit: contain; }
.eaf-folder-photo-fallback { display: grid; height: 100%; padding: 12px; place-items: center; color: #5b4332; font-size: 12px; text-align: center; }
.eaf-folder-title { margin: 2px 0 12px; font-family: var(--font-display), "Inter Tight", system-ui, sans-serif; font-size: clamp(17px, 1.55vw, 21px); font-weight: 800; line-height: 1.1; letter-spacing: -0.025em; overflow-wrap: anywhere; }
.eaf-folder-foot { display: flex; align-items: center; justify-content: space-between; gap: 5px; margin-top: auto; padding-top: 9px; border-top: 1px solid var(--folder-edge); color: #5b4332; font-size: 11px; font-weight: 600; }
.eaf-folder-meta { display: grid; gap: 4px; }
.eaf-folder-foot-row { display: flex; align-items: center; gap: 5px; }
.eaf-folder-pull { display: inline-flex; align-items: center; gap: 5px; padding: 4px 0 0; color: #84512d; font-size: 10px; font-weight: 700; }
.eaf-folder-link { display: inline-flex; min-height: 40px; align-items: center; justify-content: center; gap: 6px; margin: 9px 4px 0 0; border: 1px solid rgba(52,41,31,.26); border-radius: 999px; color: #5b4332; font-size: 11px; font-weight: 700; text-decoration: none; transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease; }
.eaf-folder-link:hover { border-color: #ef4b13; background: #ef4b13; color: #111215; }
.eaf-folder-reveal { position: relative; z-index: 2; margin: 4px 6px -10px 4px; }
.eaf-folder-reveal[data-open="true"] { margin-bottom: 7px; }
.eaf-folder-reveal-label { display: block; padding: 7px 2px 0; color: #5b4332; font-size: 10px; font-weight: 700; letter-spacing: .04em; text-align: center; }

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .eaf-folder-button:hover,
  .eaf-folder[data-preview="true"] .eaf-folder-button {
    transform: translateY(-4px) rotateX(1deg) rotateY(-1deg) translateZ(8px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9), inset 3px 0 0 rgba(165,124,72,.1), 0 6px 0 #b59368, 0 16px 22px rgba(22, 17, 12, .2);
  }
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
  .eaf-folder-button,
  .eaf-folder-link {
    transition: none;
  }

  .eaf-folder-button:hover,
  .eaf-folder[data-preview="true"] .eaf-folder-button {
    transform: none;
  }
}
`;

export default function EventArchiveFolders({ events, archiveHref }: EventArchiveProps) {
  const reduceMotion = useReducedMotion();
  const [{ page, direction }, setDeck] = useState({ page: 0, direction: 1 });
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [previewFolder, setPreviewFolder] = useState<string | null>(null);
  const [failedPhoto, setFailedPhoto] = useState<string | null>(null);
  const openPhotoRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const safePage = page % totalPages;
  const visibleEvents = events.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    if (!openFolder) return;
    const frame = requestAnimationFrame(() => {
      openPhotoRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [openFolder, reduceMotion]);

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
              <div className="eaf-controls" role="group" aria-label="Browse archive folders">
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
        <div className="eaf-stage-wrap" role="region" aria-label="Featured event editions">
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
              {visibleEvents.map((event) => {
                const isOpen = openFolder === event.href;
                const isPreview = previewFolder === event.href && !isOpen;
                const showPhoto = isOpen || isPreview;
                const photoId = `archive-photo-${event.editionNumber ?? event.edition.replace(/\W+/g, "-")}`;

                return (
                  <article
                    key={event.href}
                    className="eaf-folder"
                    data-preview={isPreview}
                    onPointerEnter={(pointerEvent) => {
                      if (pointerEvent.pointerType !== "touch") setPreviewFolder(event.href);
                    }}
                    onPointerLeave={(pointerEvent) => {
                      if (pointerEvent.pointerType !== "touch") setPreviewFolder(null);
                    }}
                  >
                    <span className="eaf-folder-tab" aria-hidden="true">{event.edition}</span>
                    <div ref={isOpen ? openPhotoRef : undefined} id={photoId} className="eaf-folder-reveal" data-open={isOpen}>
                      <AnimatePresence initial={false}>
                        {showPhoto && (
                          <motion.div
                            className="eaf-folder-photo-pop"
                            aria-hidden={isPreview}
                            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.94, rotate: -1.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.97 }}
                            transition={{ duration: reduceMotion ? 0 : 0.34, ease: EDITORIAL_EASE }}
                          >
                            {event.image && failedPhoto !== event.href ? (
                              <Image
                                src={event.image}
                                alt={`${event.edition} event photo`}
                                fill
                                sizes="(max-width: 680px) 88vw, (max-width: 980px) 38vw, 22vw"
                                quality={95}
                                onError={() => setFailedPhoto(event.href)}
                              />
                            ) : (
                              <span className="eaf-folder-photo-fallback">
                                {failedPhoto === event.href ? "Photo unavailable" : event.venue ?? "Photo unavailable"}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {showPhoto && <span className="eaf-folder-reveal-label" aria-hidden={isPreview} aria-live={isOpen ? "polite" : undefined}>{event.edition} · event photo</span>}
                    </div>
                    <button
                      type="button"
                      className="eaf-folder-button"
                      data-open={isOpen}
                      aria-expanded={isOpen}
                      aria-controls={photoId}
                      onClick={() => {
                        setOpenFolder(isOpen ? null : event.href);
                        if (isOpen) setPreviewFolder(null);
                      }}
                    >
                      <span className="eaf-folder-depth" aria-hidden="true" />
                      <span className="eaf-folder-seam" aria-hidden="true" />
                      <span className="eaf-folder-topline">
                        <span>{event.edition}</span>
                        <span className="eaf-folder-stamp" aria-hidden="true"><ArrowUpRight className="size-3.5" /></span>
                      </span>
                      <span className="eaf-folder-content">
                        <span className="eaf-folder-title">{event.title}</span>
                        <span className="eaf-folder-foot">
                          <span className="eaf-folder-meta">
                            {event.date && <span className="eaf-folder-foot-row"><Calendar className="size-3 shrink-0" aria-hidden="true" /><span>{event.date}</span></span>}
                            {typeof event.speakerCount === "number" && <span className="eaf-folder-foot-row"><Users className="size-3 shrink-0" aria-hidden="true" /><span>{event.speakerCount} {event.speakerCount === 1 ? "Speaker" : "Speakers"}</span></span>}
                          </span>
                        </span>
                        <span className="eaf-folder-pull">{isOpen ? "Tuck photo away" : "Open folder to see photo"}</span>
                      </span>
                    </button>
                    <Link className="eaf-folder-link" href={event.href}>View edition details <ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
