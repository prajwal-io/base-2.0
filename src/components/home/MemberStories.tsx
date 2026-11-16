"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/communityData";

export function MemberStories() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };
  const stories = [...TESTIMONIALS.slice(startIndex), ...TESTIMONIALS.slice(0, startIndex)];

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

              {/* Prev / Next circular buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white border border-border-strong hover:bg-canvas-subtle transition-colors shadow-sm"
                  aria-label="Previous story"
                >
                  <ArrowLeft className="w-4 h-4 text-charcoal-800" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white border border-border-strong hover:bg-canvas-subtle transition-colors shadow-sm"
                  aria-label="Next story"
                >
                  <ArrowRight className="w-4 h-4 text-charcoal-800" />
                </button>
              </div>
            </div>

            {/* Testimonials 3-Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stories.map((item) => (
                <div
                  key={item.author}
                  className="story-card p-4 flex flex-col justify-between"
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
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-charcoal-800 shrink-0 border border-border-strong">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
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

            <div className="founder-card grid grid-cols-[minmax(96px,0.8fr)_1.2fr] gap-4 items-start">
              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-charcoal-900">
                <Image
                  src="/images/founder-portrait.jpg"
                  alt="Yashwanth Bondapalli, Founder of BacktoBase"
                  fill
                  sizes="(max-width: 768px) 100px, 12vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
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
      </div>
    </section>
  );
}
