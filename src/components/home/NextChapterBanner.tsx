"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function NextChapterBanner() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [spot, setSpot] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setSpot((prev) => ({ ...prev, active: false }))}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: EDITORIAL_EASE }}
          className="group relative rounded-3xl bg-canvas-dark text-white overflow-hidden shadow-xl border border-charcoal-800 hover:border-brand-amber/35 transition-colors duration-300"
        >
          <CustomVisualSlot
            src="/images/next-chapter-bg.jpg"
            alt=""
            sizes="(max-width: 768px) 92vw, 750px"
            className="pointer-events-none absolute right-0 top-0 h-full w-full !bg-charcoal-900/35 md:w-3/5 transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas-dark via-canvas-dark/88 to-transparent" />

          {/* 21st.dev-style Cursor-Tracked Warm Amber Spotlight Glow */}
          {!reduceMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: spot.active ? 1 : 0,
                background: `radial-gradient(440px circle at ${spot.x}px ${spot.y}px, rgba(245, 158, 11, 0.16), transparent 65%)`,
              }}
            />
          )}

          {/* Content Layout */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-2 w-2 rounded-full bg-brand-amber animate-pulse motion-reduce:animate-none" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-amber">
                  The Journey Continues
                </span>
                <div className="h-[1px] w-12 bg-charcoal-600" />
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.05] tracking-tight uppercase">
                The <span className="text-brand-amber">Next Chapter</span> Is Taking Shape.
              </h2>
            </div>

            {/* Right Subtitle & Action Column */}
            <div className="lg:col-span-5 lg:pl-7 lg:border-l border-charcoal-700 flex flex-col items-start gap-4">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Bigger conversations, deeper collaborations, and more opportunities for our community.
              </p>

              <Link
                href="/join"
                className="group/cta inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-brand-amber border border-white/15 hover:border-brand-amber px-4 py-2 text-xs sm:text-sm font-bold tracking-wide text-white hover:text-charcoal-950 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
              >
                <span>Get Notified for Edition 10</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
