"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { FEATURED_HERO, HeroBackground, type HeroDirection } from "./HeroBackground";
import { HeroCrew, type HeroCrewDirection, type RollCallCut } from "./HeroCrew";

const HEADLINE_LINES = [
  "Students",
  "Builders",
  "Creators",
  "Founders &",
  "Professionals",
] as const;
const COMMUNITY_HEADLINE = ["Find your people.", "Build something together."] as const;

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection({
  variant = FEATURED_HERO,
  crew,
  rollCallCut,
  rehearsal,
  communityStage,
  editionCount,
}: {
  variant?: HeroDirection;
  crew?: HeroCrewDirection;
  rollCallCut?: RollCallCut;
  rehearsal?: ReactNode;
  communityStage?: ReactNode;
  editionCount: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pb-12 pt-6 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-14">
      {!crew && !rehearsal && !communityStage && <HeroBackground variant={variant} />}
      <div className={rehearsal ? "mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8" : "px-4 sm:px-6 lg:px-8"}>
      {communityStage ? (
        <AnimatedHero editionCount={editionCount} />
      ) : (
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          className="mb-4"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EDITORIAL_EASE }}
        >
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700">
            A Student-Driven Community
          </span>
        </motion.div>

        {/* Massive Masked Editorial Headline */}
        <h1 className={`mb-6 font-display text-4xl font-extrabold uppercase leading-[0.94] tracking-tight text-charcoal-950 sm:text-5xl ${rehearsal || communityStage ? "xl:text-6xl" : "md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"}`}>
          {(communityStage ? COMMUNITY_HEADLINE : HEADLINE_LINES).map((line, idx) => (
            <span key={line} className="block overflow-y-clip py-[0.02em] -my-[0.02em]">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.68,
                  delay: reduceMotion ? 0 : 0.06 + idx * 0.065,
                  ease: EDITORIAL_EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle Copy */}
        <motion.p
          className="text-base sm:text-lg text-charcoal-700 max-w-xl font-normal leading-relaxed mb-8"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.36, ease: EDITORIAL_EASE }}
        >
          A community to learn, build, share, and grow together — from campuses to the real world.
        </motion.p>

        {/* Action Buttons: 21st.dev FlowButton + Secondary Archive Pill */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.44, ease: EDITORIAL_EASE }}
        >
          <FlowButton text="Partner with us" />

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/85 hover:bg-white border border-border-strong text-charcoal-900 text-sm font-semibold shadow-sm hover:shadow-card transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            <span>Explore {editionCount} Editions</span>
            <ArrowUpRight
              className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
        </div>
      )}
      {rehearsal}
      </div>
      {crew && <HeroCrew variant={crew} cut={rollCallCut} />}
      {communityStage}
    </section>
  );
}
