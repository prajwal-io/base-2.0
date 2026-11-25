"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { PARTNER_CONTACT_URL } from "@/data/contact";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

interface PillarStory {
  word: string;
  eyebrow: string;
  heading: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
}

const PILLARS: readonly PillarStory[] = [
  {
    word: "LEARN.",
    eyebrow: "01 / Beyond the classroom",
    heading: "Real-world insights from people who actually build.",
    copy: "Move past textbook theory with live engineering teardowns, candid founder talks, and practical sessions led by active industry practitioners.",
    ctaLabel: "Explore all editions",
    ctaHref: "/events",
  },
  {
    word: "CONNECT.",
    eyebrow: "02 / High-trust rooms",
    heading: "A student community that turns curiosity into opportunity.",
    copy: "Work on real ideas, meet industry professionals, and build alongside ambitious peers, mentors, and future collaborators.",
    ctaLabel: "Find your people",
    ctaHref: "/community",
  },
  {
    word: "GROW.",
    eyebrow: "03 / From attendee to voice",
    heading: "Step onto the stage and level up your craft together.",
    copy: "Sharpen your skills, get direct feedback from builders and leaders, and grow from attending your first edition to shaping the next one.",
    ctaLabel: "Partner with us",
    ctaHref: PARTNER_CONTACT_URL,
  },
] as const;

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LCG_STYLES = `
.lcg-section {
  --lcg-orange: #EA580C;
  --lcg-ink: var(--color-canvas-dark);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background-color: var(--lcg-ink);
  color: #ffffff;
  min-height: clamp(500px, 58vh, 580px);
  display: flex;
  align-items: center;
}

/* Orange left plane stops cleanly before the right column so blue copy never crosses the seam */
.lcg-wash {
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: -36px;
  right: 45%;
  background-color: var(--lcg-orange);
  clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
  pointer-events: none;
  will-change: transform;
}

.lcg-arrow {
  position: absolute;
  z-index: 2;
  top: clamp(24px, 3.6vw, 40px);
  right: clamp(24px, 4vw, 48px);
  width: clamp(42px, 3.8vw, 54px);
  height: clamp(42px, 3.8vw, 54px);
  color: #ffffff;
  pointer-events: none;
}

.lcg-inner {
  position: relative;
  z-index: 1;
  width: min(1280px, 100%);
  margin: 0 auto;
  padding: clamp(72px, 7.5vw, 108px) clamp(24px, 5vw, 72px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(48px, 6.5vw, 104px);
}

.lcg-headline {
  position: relative;
  min-width: 0;
  padding-right: clamp(12px, 2vw, 32px);
}

.lcg-eyebrow {
  margin: 0 0 22px;
  font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.88);
}

.lcg-title {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.045em;
  font-family: var(--font-display), "Inter Tight", system-ui, sans-serif;
  font-size: clamp(50px, 6.4vw, 96px);
  font-weight: 900;
  line-height: 0.89;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  transform: rotate(-2.5deg);
  transform-origin: left center;
}

.lcg-line-mask {
  display: block;
  overflow-y: clip;
  overflow-x: visible;
  padding: 0.05em 0;
  margin: -0.05em 0;
}

.lcg-line-stride {
  display: block;
  will-change: transform;
}

.lcg-line-word {
  display: inline-block;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: inherit;
  cursor: pointer;
  outline: none;
  border-radius: 6px;
  white-space: nowrap;
  text-align: left;
  will-change: transform, opacity;
}

.lcg-line-word:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.95);
  outline-offset: 6px;
}

/* Right blue story column padded cleanly inside the royal blue half */
.lcg-story {
  min-width: 0;
  max-width: 510px;
  padding: 8px 0 8px clamp(28px, 4.2vw, 64px);
}

.lcg-story-dots {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

.lcg-story-dot {
  height: 3px;
  width: 24px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background: rgba(255, 255, 255, 0.28);
  cursor: pointer;
  transition: width 280ms cubic-bezier(0.16, 1, 0.3, 1), background-color 240ms ease;
}

.lcg-story-dot[data-active="true"] {
  width: 44px;
  background: #ffffff;
}

.lcg-story-dot:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 4px;
}

.lcg-story-stage {
  min-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lcg-eyebrow--story {
  margin: 0 0 16px;
}

.lcg-story-heading {
  margin: 0 0 18px;
  font-family: var(--font-display), "Inter Tight", system-ui, sans-serif;
  font-size: clamp(24px, 2.55vw, 36px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.028em;
  text-transform: uppercase;
  color: #ffffff;
}

.lcg-copy {
  max-width: 430px;
  margin: 0;
  font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
  font-size: clamp(15px, 1.1vw, 16.5px);
  font-weight: 500;
  line-height: 1.64;
  color: rgba(255, 255, 255, 0.88);
}

.lcg-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
  padding: 0 0 10px;
  align-self: flex-start;
  color: #ffffff;
  text-decoration: none;
  font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.42);
}

.lcg-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background-color: #ffffff;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
}

.lcg-link:hover::after,
.lcg-link:focus-visible::after {
  transform: scaleX(1);
}

.lcg-link-arrow {
  font-size: 17px;
  line-height: 1;
  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

.lcg-link:hover .lcg-link-arrow,
.lcg-link:focus-visible .lcg-link-arrow {
  transform: translate(4px, -4px);
}

.lcg-link:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 6px;
  border-radius: 2px;
}

@media (max-width: 900px) {
  .lcg-section {
    min-height: unset;
  }

  .lcg-wash {
    left: -24px;
    right: -24px;
    top: 0;
    bottom: 50%;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }

  .lcg-inner {
    grid-template-columns: 1fr;
    gap: 56px;
    padding: 68px 24px 60px;
  }

  .lcg-headline {
    padding-right: 0;
  }

  .lcg-title {
    font-size: clamp(50px, 13.8vw, 80px);
  }

  .lcg-arrow {
    width: 36px;
    height: 36px;
    top: 22px;
    right: 22px;
  }

  .lcg-story {
    max-width: 100%;
    padding: 12px 0 0;
  }

  .lcg-story-stage {
    min-height: 235px;
    justify-content: flex-start;
  }

  .lcg-story-heading {
    font-size: clamp(23px, 6vw, 32px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lcg-link::after,
  .lcg-link-arrow,
  .lcg-story-dot {
    transition: none;
  }
}
`;

export default function EditorialLearnConnectGrow() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const hasEntered = useInView(sectionRef, { once: true, amount: 0.2 });

  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);

  const selectStory = (index: number) => {
    setHoveredWord(null);
    setSelectedWord(index);
  };

  const lockedWord = hoveredWord ?? selectedWord;
  const activeIndex = lockedWord ?? 0;
  const activePillar = PILLARS[activeIndex];
  const isUserInteracting = lockedWord !== null;

  // Smooth spring-damped scroll progress for subtle diagonal & word stride parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  const washX = useTransform(smoothProgress, [0, 1], [-12, 12]);
  const line0X = useTransform(smoothProgress, [0, 1], [-8, 8]);
  const line1X = useTransform(smoothProgress, [0, 1], [-2, 4]);
  const line2X = useTransform(smoothProgress, [0, 1], [8, -8]);
  const arrowParallaxY = useTransform(smoothProgress, [0, 1], [8, -8]);

  const lineParallax = [line0X, line1X, line2X];

  return (
    <section
      ref={sectionRef}
      className="lcg-section"
      aria-labelledby="lcg-title"
      onMouseLeave={() => setHoveredWord(null)}
    >
      <style>{LCG_STYLES}</style>

      {/* Diagonal orange plane with left bleed so scroll parallax never exposes a gap */}
      <motion.div
        className="lcg-wash"
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: washX }}
      />

      {/* Oversized kinetic arrow anchored cleanly in upper-right corner */}
      <motion.svg
        className="lcg-arrow"
        viewBox="0 0 80 80"
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: arrowParallaxY }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: isUserInteracting ? 6 : 0,
                scale: isUserInteracting ? 1.06 : 1,
                opacity: isUserInteracting ? 1 : 0.9,
              }
        }
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        <motion.path
          d="M14 66 L66 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="square"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={hasEntered || reduceMotion ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.7, delay: 0.22, ease: EDITORIAL_EASE }}
        />
        <motion.path
          d="M32 14 H66 V48"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="square"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={hasEntered || reduceMotion ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.65, delay: 0.34, ease: EDITORIAL_EASE }}
        />
      </motion.svg>

      <div className="lcg-inner">
        {/* Left Column: Interactive Kinetic LEARN. CONNECT. GROW. */}
        <div className="lcg-headline">
          <motion.p
            className="lcg-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={hasEntered || reduceMotion ? { opacity: 0.88, y: 0 } : undefined}
            transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
          >
            A community in motion
          </motion.p>

          <h2 id="lcg-title" className="lcg-title">
            {PILLARS.map((pillar, idx) => {
              const isActive = activeIndex === idx;

              const targetOpacity = reduceMotion
                ? isActive
                  ? 1
                  : 0.65
                : isActive
                  ? 1
                  : isUserInteracting
                    ? 0.44
                    : 0.68;

              const targetX = reduceMotion
                ? 0
                : isActive
                  ? isUserInteracting
                    ? 14
                    : 6
                  : 0;

              return (
                <span key={pillar.word} className="lcg-line-mask">
                  <motion.span
                    className="lcg-line-stride"
                    style={reduceMotion ? undefined : { x: lineParallax[idx] }}
                  >
                    <motion.button
                      type="button"
                      className="lcg-line-word"
                      aria-pressed={isActive}
                      onPointerEnter={(event) => {
                        if (event.pointerType === "mouse") setHoveredWord(idx);
                      }}
                      onFocus={() => selectStory(idx)}
                      onBlur={() => setHoveredWord((cur) => (cur === idx ? null : cur))}
                      onClick={() => selectStory(idx)}
                      initial={reduceMotion ? false : { y: "108%", skewY: 4, opacity: 0 }}
                      animate={
                        hasEntered || reduceMotion
                          ? {
                              y: "0%",
                              skewY: 0,
                              opacity: targetOpacity,
                              x: targetX,
                            }
                          : undefined
                      }
                      transition={
                        hasEntered
                          ? {
                              y: {
                                duration: 0.72,
                                delay: idx * 0.11,
                                ease: EDITORIAL_EASE,
                              },
                              skewY: {
                                duration: 0.72,
                                delay: idx * 0.11,
                                ease: EDITORIAL_EASE,
                              },
                              opacity: { duration: 0.3, ease: "easeOut" },
                              x: { type: "spring", stiffness: 320, damping: 28 },
                            }
                          : undefined
                      }
                    >
                      {pillar.word}
                    </motion.button>
                  </motion.span>
                </span>
              );
            })}
          </h2>
        </div>

        {/* Right Column: Synced Pillar Story cleanly inside the royal blue half */}
        <motion.div
          className="lcg-story"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={hasEntered || reduceMotion ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.18, ease: EDITORIAL_EASE }}
        >
          {/* Interactive Pillar Indicator Bars */}
          <div className="lcg-story-dots" role="group" aria-label="Community pillars">
            {PILLARS.map((pillar, idx) => (
              <button
                key={pillar.word}
                type="button"
                aria-pressed={activeIndex === idx}
                aria-label={`Show ${pillar.word.replace(".", "")} story`}
                data-active={activeIndex === idx ? "true" : "false"}
                className="lcg-story-dot"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setHoveredWord(idx);
                }}
                onFocus={() => selectStory(idx)}
                onClick={() => selectStory(idx)}
              />
            ))}
          </div>

          <p className="sr-only" role="status">
            {selectedWord === null ? "" : `Showing ${PILLARS[selectedWord].word.replace(".", "").toLowerCase()} story.`}
          </p>
          <div className="lcg-story-stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePillar.word}
                initial={reduceMotion ? false : { opacity: 0, transform: "translateY(4px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={reduceMotion ? undefined : { opacity: 0, transition: { duration: 0.08 } }}
                transition={{ duration: reduceMotion ? 0 : 0.18, ease: EDITORIAL_EASE }}
              >
                <p className="lcg-eyebrow lcg-eyebrow--story">{activePillar.eyebrow}</p>
                <h3 className="lcg-story-heading">{activePillar.heading}</h3>
                <p className="lcg-copy">{activePillar.copy}</p>
                <Link
                  className="lcg-link"
                  href={activePillar.ctaHref}
                  target={activePillar.ctaHref.startsWith("https://mail.google.com/") ? "_blank" : undefined}
                  rel={activePillar.ctaHref.startsWith("https://mail.google.com/") ? "noopener noreferrer" : undefined}
                >
                  <span>{activePillar.ctaLabel}</span>
                  <span className="lcg-link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
