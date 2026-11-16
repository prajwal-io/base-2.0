"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EDITIONS } from "@/data/communityData";

export function EventArchiveSection() {
  const [activeEditionIndex, setActiveEditionIndex] = useState(8); // Edition 9 is index 8
  const activeEdition = EDITIONS[activeEditionIndex];

  return (
    <section className="py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow + Headline Stack */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700">
                Event Archive
              </span>
              <div className="h-[1px] w-12 bg-charcoal-300" />
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-charcoal-950 uppercase mb-4">
              Nine<br />
              Editions.<br />
              <span className="text-brand-amber">A Growing<br />Community.</span>
            </h2>

            {/* Playful Amber Accent doodle */}
            <div className="flex items-center gap-1.5 text-brand-amber mt-2">
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                <path d="M12 28L4 32" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M16 20L4 16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M22 14L16 4" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right Column: Layered Folder-Tab Stack */}
          <div className="lg:col-span-8 flex flex-col items-end">
            <div className="w-full relative min-h-[300px] sm:min-h-[340px] flex items-center justify-center">
              
              {/* Stack of overlapping folders */}
              <div className="relative w-full max-w-2xl h-[280px] sm:h-[300px]">
                {EDITIONS.slice(4, 9).map((edition, idx) => {
                  const reverseIdx = 4 - idx; // 0 for Edition 9, 1 for Edition 8, etc.
                  const isSelected = activeEdition.id === edition.id;
                  
                  return (
                    <motion.div
                      key={edition.id}
                      onClick={() => setActiveEditionIndex(edition.id - 1)}
                      style={{
                        zIndex: isSelected ? 30 : 20 - reverseIdx,
                        top: `${reverseIdx * 12}px`,
                        right: `${reverseIdx * 20}px`,
                        left: `${reverseIdx * 6}px`,
                      }}
                      className={`absolute rounded-2xl cursor-pointer border transition-all duration-300 ${
                        isSelected
                          ? "bg-white border-border-strong shadow-photo"
                          : "bg-[#F3ECE0] hover:bg-[#EDE3D3] border-border-subtle shadow-card"
                      } p-4 sm:p-6 overflow-hidden flex flex-col justify-between`}
                    >
                      {/* Folder tab content */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-full bg-canvas-subtle text-xs font-bold text-charcoal-800">
                            Edition {edition.editionNumber}
                          </span>
                          <span className="text-xs font-semibold text-charcoal-600 hidden sm:inline">
                            {edition.date}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                          {edition.venue}
                        </span>
                      </div>

                      {/* Main Active Preview Body */}
                      {isSelected ? (
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-2">
                          <div className="sm:col-span-7">
                            <h4 className="font-display font-bold text-lg sm:text-xl text-charcoal-950 mb-1 leading-snug">
                              {edition.title}
                            </h4>
                            <p className="text-xs text-charcoal-700 line-clamp-2">
                              {edition.subtitle}
                            </p>
                          </div>
                          <div className="sm:col-span-5 relative h-20 sm:h-24 rounded-xl overflow-hidden bg-charcoal-900">
                            <Image
                              src={edition.image}
                              alt={edition.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="my-auto">
                          <h4 className="font-display font-bold text-base text-charcoal-800 truncate">
                            {edition.title}
                          </h4>
                        </div>
                      )}

                      {/* Footer of folder */}
                      <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
                        <span className="text-xs text-charcoal-600">
                          {edition.speakers.length} Featured Speakers
                        </span>
                        <Link
                          href={`/events#edition-${edition.editionNumber}`}
                          className="flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Bottom-right CTA pill */}
            <div className="mt-4 sm:mt-6">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-canvas-subtle hover:bg-[#EAE2D4] border border-border-strong text-charcoal-900 text-xs sm:text-sm font-semibold transition-all shadow-sm hover:scale-[1.02]"
              >
                <span>Explore All Editions</span>
                <ArrowRight className="w-4 h-4 text-brand-orange" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
