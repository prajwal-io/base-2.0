"use client";

import { LayoutGroup, MotionConfig } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { Navbar } from "@/components/layout/Navbar";

type IntroPhase = "loading" | "handoff" | "complete";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("loading");
  const [clientReady, setClientReady] = useState(false);
  const startHandoff = useCallback((cssFallback = false) => {
    setClientReady(true);
    setPhase(cssFallback ? "complete" : "handoff");
  }, []);

  useEffect(() => {
    if (phase !== "handoff") return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;
    const timer = window.setTimeout(() => setPhase("complete"), duration);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const contentBlocked = clientReady && phase !== "complete";

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="backtobase-shell">
        <IntroLoader phase={phase} onReady={startHandoff} />
        <div
          inert={contentBlocked}
          aria-hidden={contentBlocked}
          data-intro-content
          className="flex min-h-screen flex-col"
        >
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[110] -translate-y-[150%] rounded-lg border border-border-strong bg-white px-4 py-3 text-sm font-semibold text-charcoal-950 shadow-card transition-transform duration-150 focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange motion-reduce:transition-none"
          >
            Skip to main content
          </a>
          <Navbar introPhase={phase} />
          {children}
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
