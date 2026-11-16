"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { EDITIONS } from "@/data/communityData";

export function EventArchiveSection() {
  const [activeEditionIndex, setActiveEditionIndex] = useState(EDITIONS.length - 1);
  const activeEdition = EDITIONS[activeEditionIndex];
  const editions = EDITIONS.slice().reverse();

  return (
    <section className="py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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

            <svg className="w-8 h-8 text-brand-amber mt-2" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M12 28L4 32M16 20L4 16M22 14L16 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="lg:col-span-8 min-w-0">
            <div role="tablist" aria-label="Choose a BacktoBase edition" className="flex items-end overflow-x-auto px-1 pt-1">
              {editions.map((edition, index) => {
                const isSelected = activeEdition.id === edition.id;

                return (
                  <button
                    key={edition.id}
                    id={`edition-tab-${edition.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="edition-preview"
                    onClick={() => setActiveEditionIndex(EDITIONS.indexOf(edition))}
                    style={{ zIndex: editions.length - index, marginLeft: index ? -8 : 0 }}
                    className={`relative flex min-w-[60px] flex-1 flex-col items-center justify-center gap-0.5 rounded-t-xl border px-2 py-2.5 transition-colors ${
                      isSelected
                        ? "border-border-strong border-b-white bg-white text-brand-orange"
                        : "border-border-subtle bg-[#F1EADF] text-charcoal-700 hover:bg-[#E9E0D2]"
                    }`}
                    aria-label={`Edition ${edition.editionNumber}: ${edition.title}`}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wide">Edition</span>
                    <span className="font-display text-xl font-black leading-none">{String(edition.editionNumber).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>

            <motion.article
              key={activeEdition.id}
              id="edition-preview"
              role="tabpanel"
              aria-labelledby={`edition-tab-${activeEdition.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-5 rounded-b-2xl rounded-tr-2xl border border-border-strong bg-white p-4 sm:p-6"
            >
              <div className="min-w-0 sm:col-span-7 flex flex-col items-start">
                <p className="text-xs font-semibold text-charcoal-600">
                  {activeEdition.date} <span aria-hidden="true">·</span> {activeEdition.venue}
                </p>
                <h3 className="mt-2 font-display text-2xl font-black leading-tight text-charcoal-950">
                  {activeEdition.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-700">
                  {activeEdition.subtitle}
                </p>
                <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-2 border-t border-border-subtle pt-3 sm:mt-5">
                  <span className="text-xs text-charcoal-600">
                    {activeEdition.speakers.length} Featured Speakers
                  </span>
                  <Link
                    href={`/events#edition-${activeEdition.editionNumber}`}
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover"
                  >
                    Explore Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-40 overflow-hidden rounded-lg bg-charcoal-900 sm:col-span-5 sm:min-h-48">
                <Image
                  src={activeEdition.image}
                  alt={`${activeEdition.title} event`}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </motion.article>

            <div className="mt-4 flex justify-end">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-canvas-subtle px-5 py-2.5 text-xs font-semibold text-charcoal-900 transition-colors hover:bg-[#EAE2D4] sm:text-sm"
              >
                Explore All Editions
                <ArrowRight className="h-4 w-4 text-brand-orange" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
