"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Phase2HeroCopy() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
      <h1 className="mb-5 max-w-5xl font-display text-[clamp(2rem,7.4vw,5rem)] font-black uppercase leading-[0.93] tracking-[-0.035em] text-charcoal-950">
        <span className="block overflow-hidden py-[0.02em]">
          <motion.span
            className="block"
            initial={reduceMotion ? false : { opacity: 0, y: "105%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.42, delay: reduceMotion ? 0 : 0.04, ease: EASE }}
          >
            From campus to industry.
          </motion.span>
        </span>
        <span className="block overflow-hidden py-[0.02em]">
          <motion.span
            className="block text-brand-orange-ink"
            initial={reduceMotion ? false : { opacity: 0, y: "105%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.42, delay: reduceMotion ? 0 : 0.09, ease: EASE }}
          >
            From learning to building.
          </motion.span>
        </span>
      </h1>
      <motion.p
        className="mb-7 max-w-3xl text-base leading-relaxed text-charcoal-700 sm:text-lg"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
      >
        A growing community connecting students, professionals, mentors, creators and industry leaders through practical learning, meaningful connections and real-world experiences.
      </motion.p>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.15, ease: EASE }}
      >
        <Link
          href="/connect"
          className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-orange-ink px-6 text-sm font-bold text-white shadow-pill transition-[background-color,transform] duration-150 hover:bg-brand-orange-hover motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          Join BacktoBase <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </Link>
        <Link
          href="/about#journey"
          className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong bg-white/85 px-6 text-sm font-semibold text-charcoal-900 transition-[background-color,border-color,transform] duration-150 hover:border-brand-orange/50 hover:bg-white motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          Explore Our Journey <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </Link>
      </motion.div>
    </div>
  );
}
