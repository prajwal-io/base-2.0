"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, type AnimationEvent } from "react";

type IntroPhase = "loading" | "handoff" | "complete";

export function IntroLoader({
  phase,
  onReady,
}: {
  phase: IntroPhase;
  onReady: (cssFallback?: boolean) => void;
}) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "loading") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      const cssFallback = loaderRef.current && getComputedStyle(loaderRef.current).visibility === "hidden";
      onReady(Boolean(cssFallback));
    }, reducedMotion ? 0 : 2160);

    return () => window.clearTimeout(timer);
  }, [onReady, phase]);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === "intro-loader-fail-open") onReady(true);
  };

  if (phase === "complete") return null;

  return (
    <div
      className="intro-loader"
      data-state={phase}
      role="status"
      aria-label="Loading BacktoBase"
      aria-hidden={phase === "handoff"}
      onAnimationEnd={handleAnimationEnd}
      ref={loaderRef}
    >
      <div className="intro-loader__mark">
        <span className="intro-loader__ring" aria-hidden="true" />
        {phase === "loading" && (
          <motion.span
            layoutId="backtobase-intro-logo"
            transition={{ type: "spring", duration: 0.14, bounce: 0 }}
            className="intro-loader__logo-shell"
          >
            <Image
              src="/images/backtobase-logo.png"
              alt=""
              width={977}
              height={178}
              unoptimized
              className="intro-loader__logo"
              priority
            />
          </motion.span>
        )}
        {phase === "loading" && (
          <span className="intro-loader__tagline" aria-hidden="true">
            {["Learn.", "Connect.", "Grow."].map((word, index) => (
              <span key={word} style={{ animationDelay: `${index * 70}ms` }}>
                {word}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
