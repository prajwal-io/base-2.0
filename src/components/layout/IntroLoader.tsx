"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

type IntroPhase = "loading" | "handoff" | "complete";

export function IntroLoader({
  phase,
  onReady,
}: {
  phase: IntroPhase;
  onReady: () => void;
}) {
  useEffect(() => {
    if (phase !== "loading") return;

    const startedAt = performance.now();
    let finished = false;
    let minimumTimer: number | undefined;
    const minimumDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 550 : 1050;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackTimer);
      onReady();
    };

    const onLoad = () => {
      window.clearTimeout(fallbackTimer);
      minimumTimer = window.setTimeout(
        finish,
        Math.max(0, minimumDuration - (performance.now() - startedAt)),
      );
    };

    const fallbackTimer = window.setTimeout(finish, 2400);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [onReady, phase]);

  if (phase === "complete") return null;

  return (
    <div
      className="intro-loader"
      data-state={phase}
      role="status"
      aria-label="Loading BacktoBase"
      aria-hidden={phase === "handoff"}
    >
      <div className="intro-loader__mark">
        <span className="intro-loader__ring" aria-hidden="true" />
        {phase === "loading" && (
          <motion.span
            layoutId="backtobase-intro-logo"
            transition={{ type: "spring", duration: 0.58, bounce: 0 }}
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
            Learn. Connect. Grow.
          </span>
        )}
      </div>
    </div>
  );
}
