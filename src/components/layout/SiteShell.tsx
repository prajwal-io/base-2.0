"use client";

import { LayoutGroup, MotionConfig } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { Navbar } from "@/components/layout/Navbar";

type IntroPhase = "loading" | "handoff" | "complete";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("loading");
  const contentRef = useRef<HTMLDivElement>(null);
  const startHandoff = useCallback(() => setPhase("handoff"), []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (phase === "complete") {
      content.removeAttribute("inert");
      content.removeAttribute("aria-hidden");
    } else {
      content.setAttribute("inert", "");
      content.setAttribute("aria-hidden", "true");
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "handoff") return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 100 : 560;
    const timer = window.setTimeout(() => setPhase("complete"), duration);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="backtobase-shell">
        <IntroLoader phase={phase} onReady={startHandoff} />
        <div
          ref={contentRef}
          data-intro-content
          className="flex min-h-screen flex-col"
        >
          <Navbar introPhase={phase} />
          {children}
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
