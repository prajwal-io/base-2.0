"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";

function NumberTicker({
  target,
  padTwo = false,
  suffix = "",
}: {
  target: number;
  padTwo?: boolean;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let rafId = 0;
    const duration = 900;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Cubic ease-out for crisp landing
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reduceMotion, target]);

  const formatted = padTwo ? String(value).padStart(2, "0") : String(value);

  return (
    <span
      ref={ref}
      className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-charcoal-950 tabular-nums"
    >
      {formatted}
      {suffix}
    </span>
  );
}

export function StatsBar({ editionCount, venueCount }: { editionCount: number; venueCount: number }) {
  return (
    <section className="py-6 sm:py-8 border-y border-border-subtle bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-border-subtle">
          {/* Stat 1: editions in the shared event catalogue */}
          <div className="flex items-center gap-4 justify-start md:justify-center pt-2 md:pt-0">
            <NumberTicker target={editionCount} padTwo />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-900 leading-tight">
                Editions
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-500 leading-tight">
                So Far
              </span>
            </div>
          </div>

          {/* Stat 2: unique venue brands in the shared event catalogue */}
          <div className="flex items-center gap-4 justify-start md:justify-center pt-4 md:pt-0 md:pl-8">
            <NumberTicker target={venueCount} />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-900 leading-tight">
                Host Venues
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-500 leading-tight">
                Across Editions
              </span>
            </div>
          </div>

          {/* Stat 3: Founder (preserved untouched per lock) */}
          <Link
            href="/founder"
            className="flex items-center gap-4 justify-start md:justify-center pt-4 md:pt-0 md:pl-8 group"
          >
            <CustomVisualSlot
              src="/images/founder-avatar.jpg"
              alt="Yashwanth Bondapalli, Founder of BacktoBase"
              sizes="112px"
              quality={95}
              className="size-14 sm:size-16 shrink-0 rounded-full border-2 border-brand-amber/60 shadow-sm transition-transform group-hover:scale-105"
              imgClassName="object-cover object-top"
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                Founded By
              </span>
              <span className="text-sm sm:text-base font-display font-bold uppercase tracking-wide text-charcoal-950 group-hover:text-brand-orange transition-colors">
                Yashwanth Bondapalli
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
