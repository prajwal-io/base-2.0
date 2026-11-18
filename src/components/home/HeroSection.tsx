"use client";

import Link from "next/link";
import { ArrowRight, Film } from "lucide-react";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";

export function HeroSection() {
  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Editorial Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow / Overline */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700">
                A Student-Driven Community
              </span>
              <div className="h-[1px] w-14 bg-charcoal-300" />
            </div>

            {/* Massive Editorial Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[0.92] tracking-tight text-charcoal-950 uppercase mb-6">
              Students<br />
              Builders<br />
              Creators<br />
              Founders &<br />
              Professionals
            </h1>

            {/* Subtitle Copy */}
            <p className="text-base sm:text-lg text-charcoal-700 max-w-xl font-normal leading-relaxed mb-8">
              A community to learn, build, share, and grow together — from campuses to the real world.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-glow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Join the Community</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <span
                aria-label="Highlight video coming soon"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-canvas-subtle border border-border-strong text-charcoal-600 text-sm font-semibold cursor-not-allowed"
              >
                <Film className="w-4 h-4" aria-hidden="true" />
                <span>Highlights Coming Soon</span>
              </span>
            </div>
          </div>

          {/* Right Column: Custom visual component slots */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/4.2]">
              {/* Warm golden-amber backdrop geometric plate */}
              <div className="absolute inset-2 -rotate-3 rounded-3xl bg-gradient-to-tr from-brand-amber via-[#FBBF24] to-[#F59E0B] opacity-90 shadow-lg transform-gpu transition-transform hover:-rotate-1" />

              <CustomVisualSlot className="absolute top-4 left-4 right-12 bottom-12 rounded-2xl border-[3px] border-white shadow-photo z-10" />
              <CustomVisualSlot className="absolute -top-3 -right-2 w-36 sm:w-44 aspect-[4/3] rounded-xl border-[3px] border-white shadow-photo z-20 rotate-2" />
              <CustomVisualSlot className="absolute -bottom-4 -left-3 w-40 sm:w-48 aspect-[16/10] rounded-xl border-[3px] border-white shadow-photo z-20 -rotate-2" />
              <CustomVisualSlot className="absolute -bottom-2 right-2 w-24 sm:w-28 aspect-[9/16] rounded-xl border-[3px] border-white shadow-photo z-20 rotate-1 hidden sm:block" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
