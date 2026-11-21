"use client";

import { useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, GripHorizontal } from "lucide-react";

type Testimonial = {
  quote: string;
  role: string;
  name?: string;
};

type CommunityTestimonialsProps = {
  testimonials: Testimonial[];
  title?: string;
};

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CT_STYLES = `
.ct-section {
  --ct-paper: #f7f2e9;
  --ct-orange: #fb5416;
  position: relative;
  background: #171716;
  color: var(--ct-paper);
  padding: clamp(64px, 7.5vw, 100px) 0 clamp(56px, 6.5vw, 84px);
  overflow: hidden;
}

.ct-inner {
  width: min(1260px, 100%);
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 32px);
}

.ct-stage {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
  margin-bottom: clamp(44px, 5.5vw, 68px);
}

.ct-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 16px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(247, 242, 233, 0.72);
}

.ct-eyebrow-line {
  width: 38px;
  height: 1px;
  background: currentColor;
}

.ct-heading {
  max-width: 520px;
  margin: 0 0 18px;
  font-family: var(--font-display), "Inter Tight", system-ui, sans-serif;
  font-size: clamp(34px, 4.8vw, 60px);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  color: var(--ct-paper);
}

.ct-hint {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 26px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(247, 242, 233, 0.65);
}

.ct-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ct-ctrl-btn {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(247, 242, 233, 0.24);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  color: var(--ct-paper);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.ct-ctrl-btn--primary {
  background: var(--ct-paper);
  color: #171716;
  border-color: var(--ct-paper);
}

.ct-ctrl-btn:hover {
  background: var(--ct-orange);
  border-color: var(--ct-orange);
  color: #ffffff;
  transform: translateY(-2px);
}

.ct-ctrl-btn:focus-visible,
.ct-marquee-card:focus-visible {
  outline: 2px solid var(--ct-orange);
  outline-offset: 4px;
}

.ct-counter {
  margin-left: 8px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: rgba(247, 242, 233, 0.62);
  font-variant-numeric: tabular-nums;
}

/* Interactive Draggable Quote Stack */
.ct-deck {
  position: relative;
  height: 310px;
  width: 100%;
  max-width: 540px;
  margin-left: auto;
}

.ct-deck-card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 30px 26px;
  border-radius: 22px;
  border: 1px solid rgba(247, 242, 233, 0.24);
  background: linear-gradient(145deg, #252523, #191918 76%);
  box-shadow: 0 24px 48px -18px rgba(0, 0, 0, 0.65);
  user-select: none;
  -webkit-user-select: none;
}

.ct-deck-card[data-top="true"] {
  cursor: grab;
  border-color: rgba(251, 84, 22, 0.48);
}

.ct-deck-card[data-top="true"]:active {
  cursor: grabbing;
}

.ct-spark {
  color: var(--ct-orange);
  font-size: 20px;
  line-height: 1;
}

.ct-deck-quote {
  margin: 16px 0 22px;
  font-family: Georgia, "Iowan Old Style", serif;
  font-style: italic;
  font-size: clamp(19px, 2vw, 24px);
  font-weight: 500;
  line-height: 1.44;
  color: rgba(247, 242, 233, 0.96);
}

.ct-deck-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(247, 242, 233, 0.12);
}

.ct-deck-author {
  font-family: var(--font-display), "Inter Tight", system-ui, sans-serif;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #ffffff;
}

.ct-role-pill {
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Pause-on-Hover Editorial Marquee Ribbon */
.ct-marquee-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0 4px;
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.ct-marquee-track {
  display: flex;
  gap: 16px;
  width: max-content;
  animation: ct-marquee-scroll 34s linear infinite;
}

.ct-marquee-wrap:hover .ct-marquee-track,
.ct-marquee-wrap:focus-within .ct-marquee-track {
  animation-play-state: paused;
}

@keyframes ct-marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.ct-marquee-card {
  flex: 0 0 clamp(270px, 28vw, 350px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  text-align: left;
  padding: 20px 22px;
  border-radius: 16px;
  border: 1px solid rgba(247, 242, 233, 0.16);
  background: rgba(255, 255, 255, 0.04);
  color: var(--ct-paper);
  cursor: pointer;
  transition: border-color 200ms ease, background-color 200ms ease, transform 200ms ease;
}

.ct-marquee-card[data-selected="true"] {
  border-color: rgba(251, 84, 22, 0.72);
  background: rgba(251, 84, 22, 0.08);
}

.ct-marquee-card:hover {
  border-color: rgba(251, 84, 22, 0.55);
  background: rgba(255, 255, 255, 0.07);
  transform: translateY(-2px);
}

.ct-marquee-quote {
  margin: 0;
  font-family: Georgia, "Iowan Old Style", serif;
  font-style: italic;
  font-size: 14.5px;
  line-height: 1.48;
  color: rgba(247, 242, 233, 0.88);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ct-marquee-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 11px;
  color: rgba(247, 242, 233, 0.65);
}

.ct-marquee-foot strong {
  color: #ffffff;
  font-weight: 700;
}

@media (max-width: 900px) {
  .ct-stage {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .ct-deck {
    margin: 0 auto;
    height: 290px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ct-marquee-track {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    padding: 0 20px;
  }

  .ct-marquee-wrap {
    mask-image: none;
    -webkit-mask-image: none;
  }

  .ct-ctrl-btn,
  .ct-marquee-card {
    transition: none;
  }
}
`;

export default function CommunityTestimonials({
  testimonials,
  title = "What our community says",
}: CommunityTestimonialsProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const count = testimonials.length;
  if (count === 0) return null;

  const safeActive = ((active % count) + count) % count;

  const step = (delta: -1 | 1) => {
    setActive((prev) => (prev + delta + count) % count);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -300) {
      step(1);
    } else if (info.offset.x > 70 || info.velocity.x > 300) {
      step(-1);
    }
  };

  // Duplicate items cleanly for seamless infinite marquee loop
  const marqueeLoop = reduceMotion
    ? testimonials.map((item, idx) => ({ item, idx, copy: 0 }))
    : [0, 1, 2, 3].flatMap((copy) =>
        testimonials.map((item, idx) => ({ item, idx, copy })),
      );

  // Order cards back-to-front so active card sits on top of the interactive deck
  const deckOrder = Array.from({ length: count }, (_, offset) => {
    const idx = (safeActive + offset) % count;
    return { item: testimonials[idx], idx, depth: offset };
  }).reverse();

  return (
    <section className="ct-section" aria-labelledby="quotes-title">
      <style>{CT_STYLES}</style>

      <div className="ct-inner">
        <div className="ct-stage">
          {/* Left: Editorial Header + Deck Controls */}
          <div>
            <p className="ct-eyebrow">
              <span className="ct-eyebrow-line" aria-hidden="true" />
              Voices of the community
            </p>
            <h2 id="quotes-title" className="ct-heading">
              {title}
            </h2>
            <p className="ct-hint">
              <GripHorizontal className="w-4 h-4 text-[#fb5416]" aria-hidden="true" />
              <span>Drag the spotlight card or pick any story from the ribbon below.</span>
            </p>

            <div className="ct-controls" aria-label="Testimonial deck controls">
              <button
                type="button"
                className="ct-ctrl-btn"
                onClick={() => step(-1)}
                aria-label="Show previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="ct-ctrl-btn ct-ctrl-btn--primary"
                onClick={() => step(1)}
                aria-label="Show next testimonial"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="ct-counter">
                {String(safeActive + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right: Interactive Draggable Quote Stack */}
          <div className="ct-deck" role="region" aria-label="Featured testimonial card stack">
            {deckOrder.map(({ item, idx, depth }) => {
              const isTop = depth === 0;
              const rotate = depth === 0 ? 0 : depth === 1 ? 2.5 : -2.5;
              const translateY = depth * 12;
              const translateX = depth === 1 ? 10 : depth === 2 ? -8 : 0;
              const scale = 1 - depth * 0.045;
              const opacity = Math.max(0.45, 1 - depth * 0.25);

              return (
                <motion.article
                  key={`${item.name ?? item.role}-${idx}`}
                  className="ct-deck-card"
                  data-top={isTop ? "true" : "false"}
                  style={{ zIndex: count - depth }}
                  drag={isTop && !reduceMotion ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.42}
                  onDragEnd={isTop ? handleDragEnd : undefined}
                  onClick={isTop ? () => step(1) : () => setActive(idx)}
                  animate={{
                    y: translateY,
                    x: translateX,
                    scale,
                    rotate: reduceMotion ? 0 : rotate,
                    opacity,
                  }}
                  whileDrag={isTop ? { scale: 1.02, rotate: -1.5 } : undefined}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.42, ease: EDITORIAL_EASE }
                  }
                >
                  <div>
                    <span className="ct-spark" aria-hidden="true">
                      ✦
                    </span>
                    <blockquote className="ct-deck-quote">“{item.quote}”</blockquote>
                  </div>

                  <footer className="ct-deck-meta">
                    {item.name && <strong className="ct-deck-author">{item.name}</strong>}
                    <span className="ct-role-pill">{item.role}</span>
                  </footer>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pause-on-Hover Editorial Marquee Ribbon */}
      <div
        className="ct-marquee-wrap"
        role="region"
        aria-label="Scrolling community voices ribbon"
      >
        <div className="ct-marquee-track">
          {marqueeLoop.map(({ item, idx, copy }) => (
            <button
              key={`${copy}-${idx}`}
              type="button"
              className="ct-marquee-card"
              data-selected={safeActive === idx ? "true" : "false"}
              onClick={() => setActive(idx)}
              aria-label={`Spotlight testimonial by ${item.name ?? item.role}`}
            >
              <p className="ct-marquee-quote">“{item.quote}”</p>
              <div className="ct-marquee-foot">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
