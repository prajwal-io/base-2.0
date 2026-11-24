"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

const ACTIONS = ["Learn", "Build", "Create", "Grow"] as const;
const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AnimatedHero({ editionCount }: { editionCount: number }) {
  const [actionNumber, setActionNumber] = useState(0);
  const reduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef);

  useEffect(() => {
    if (reduceMotion || !headingInView) return;

    const intervalId = window.setInterval(() => {
      if (!document.hidden) setActionNumber((current) => (current + 1) % ACTIONS.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [headingInView, reduceMotion]);

  return (
    <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
      <motion.p
        className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal-700 sm:text-xs"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EDITORIAL_EASE }}
      >
        A Student-Driven Community
      </motion.p>

      <h1 ref={headingRef} className="mb-6 font-display text-[clamp(1.9rem,8.8vw,2.25rem)] font-extrabold uppercase leading-[0.94] tracking-tight text-charcoal-950 sm:text-5xl xl:text-6xl">
        <span className="block overflow-hidden py-[0.02em]">Find your people.</span>
        <span className="block py-[0.02em]">
          <span className="sr-only">Learn together.</span>
          <span aria-hidden="true" className="inline-flex items-baseline gap-[0.22em]">
            <span className="relative inline-grid overflow-hidden">
              {ACTIONS.map((action, index) => (
                <motion.span
                  key={action}
                  className="col-start-1 row-start-1 text-[#a45131]"
                  initial={false}
                  animate={
                    actionNumber === index
                      ? { transform: "translateY(0%)", opacity: 1 }
                      : { transform: actionNumber > index ? "translateY(-106%)" : "translateY(106%)", opacity: 0 }
                  }
                  transition={{ duration: reduceMotion ? 0 : 0.32, ease: EDITORIAL_EASE }}
                >
                  {action}
                </motion.span>
              ))}
            </span>
            <span>together.</span>
          </span>
        </span>
      </h1>

      <motion.p
        className="mb-8 max-w-xl text-base font-normal leading-relaxed text-charcoal-700 sm:text-lg"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.2, ease: EDITORIAL_EASE }}
      >
        A community to learn, build, share, and grow together — from campuses to the real world.
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.28, ease: EDITORIAL_EASE }}
      >
        <FlowButton href="/join" text="Join the Community" compactText="Join" />
        <Link
          href="/events"
          className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong bg-white/85 px-5 text-sm font-semibold text-charcoal-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          <span>Explore {editionCount} Editions</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-brand-orange transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </motion.div>
    </div>
  );
}
