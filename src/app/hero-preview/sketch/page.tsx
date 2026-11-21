"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HeroSection } from "@/components/home/HeroSection";

const FRAMES = [
  { name: "Bring an idea", x: 151, y: 0, at: 0 },
  { name: "Offer the sketch", x: 841, y: 0, at: 850 },
  { name: "Work it out together", x: 113, y: 493, at: 1630 },
  { name: "Start building", x: 823, y: 494, at: 2650 },
] as const;

const LAST_FRAME = FRAMES.length - 1;
const ARTWORK = "/_next/image?url=%2Fimages%2Fhero-sketch-handoff.png&w=1080&q=75";

function SketchHandoff() {
  const reducedMotion = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const [play, setPlay] = useState<number | null>(0);
  const [ready, setReady] = useState(false);
  const active = play !== null && reducedMotion ? LAST_FRAME : frame;

  useEffect(() => {
    const image = new window.Image();
    const markReady = () => setReady(true);
    image.addEventListener("load", markReady);
    image.src = ARTWORK;
    return () => image.removeEventListener("load", markReady);
  }, []);

  useEffect(() => {
    if (!ready || play === null || reducedMotion) return;
    const timers = FRAMES.slice(1).map(({ at }, index) =>
      window.setTimeout(() => setFrame(index + 1), at),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [play, ready, reducedMotion]);

  return (
    <figure className="mx-auto w-full max-w-lg">
      <svg
        role="img"
        aria-label="Two BacktoBase members pass a sketch across a table and begin building it on a laptop"
        className="mx-auto block w-full"
        viewBox={`${FRAMES[active].x} ${FRAMES[active].y} 540 520`}
      >
        <image href={ARTWORK} width="1536" height="1024" />
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {FRAMES.map(({ name }, index) => (
          <button
            key={name}
            type="button"
            aria-pressed={active === index}
            className="rounded-full border border-border-strong px-3 py-2 text-xs font-semibold aria-pressed:border-charcoal-950 aria-pressed:bg-charcoal-950 aria-pressed:text-white"
            onClick={() => {
              setPlay(null);
              setFrame(index);
            }}
          >
            {name}
          </button>
        ))}
        {!reducedMotion && (
          <button
            type="button"
            className="rounded-full border border-border-strong px-3 py-2 text-xs font-semibold"
            onClick={() => {
              setFrame(0);
              setPlay((value) => (value ?? 0) + 1);
            }}
          >
            Replay
          </button>
        )}
      </figcaption>
    </figure>
  );
}

export default function SketchPreviewPage() {
  return (
    <main className="flex-1 bg-canvas-base">
      <HeroSection rehearsal={<SketchHandoff />} />
    </main>
  );
}
