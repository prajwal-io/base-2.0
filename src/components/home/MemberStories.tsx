"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/communityData";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";

export function MemberStories() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column (Member Stories) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700 block mb-1">
                  Member Stories
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-charcoal-950 uppercase tracking-tight">
                  Real People. Real Impact.
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white border border-border-strong hover:bg-canvas-subtle transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  aria-label="Show previous member story first"
                >
                  <ArrowLeft className="w-4 h-4 text-charcoal-800" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white border border-border-strong hover:bg-canvas-subtle transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  aria-label="Show next member story first"
                >
                  <ArrowRight className="w-4 h-4 text-charcoal-800" />
                </button>
              </div>
            </div>

            {/* Testimonials 3-Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TESTIMONIALS.slice(startIndex)
                .concat(TESTIMONIALS.slice(0, startIndex))
                .map((item) => (
                <div
                  key={item.author}
                  className="rounded-2xl bg-white border border-border-subtle p-5 shadow-card flex flex-col justify-between hover:shadow-photo transition-all duration-300"
                >
                  <div>
                    {/* Orange Quote Mark */}
                    <span className="font-serif font-black text-3xl leading-none text-brand-orange block mb-2">
                      “
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal-800 font-normal leading-relaxed mb-6">
                      {item.quote}
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="flex items-center gap-3 pt-3 border-t border-border-subtle">
                    <CustomVisualSlot className="size-9 shrink-0 rounded-full border border-border-strong" />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-charcoal-950 leading-tight">
                        {item.author}
                      </h4>
                      <p className="text-[11px] text-charcoal-600 font-medium">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Founder Spotlight) */}
          <div className="lg:col-span-4 flex flex-col">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700 block mb-3">
              Founder Spotlight
            </span>

            <div className="rounded-2xl bg-white border border-border-subtle p-6 shadow-card hover:shadow-photo transition-all duration-300">
              <CustomVisualSlot className="mb-5 aspect-square w-full rounded-xl" />

              <h4 className="font-display font-black text-xl text-charcoal-950 mb-1">
                Yashwanth Bondapalli
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-normal mb-4">
                The founder of BacktoBase. A student-led community built to create high-signal, high-trust spaces for students, builders, and professionals to learn, connect, and grow together.
              </p>

              <Link
                href="/about#founder"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-orange-hover group"
              >
                <span>Meet the Founder</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
