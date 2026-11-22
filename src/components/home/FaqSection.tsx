"use client";

import { useMemo, useState } from "react";
import { FAQS } from "@/data/communityData";
import { LiquidAccordion } from "@/components/ui/liquid-glass-accordion";
import { FaqGlobeScene } from "@/components/home/FaqGlobeScene";

const FAQ_CATEGORIES = ["All questions", "Community", "Events", "Getting involved"] as const;

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof FAQ_CATEGORIES)[number]>("All questions");
  const filteredFaqs = useMemo(
    () => activeCategory === "All questions"
      ? FAQS
      : FAQS.filter((faq) => faq.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="faqs" className="py-12 sm:py-16 lg:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Eyebrow + Headline */}
          <div className="flex flex-col lg:col-span-4">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal-700 sm:text-xs">
              Frequently asked questions
            </span>
            <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-charcoal-950 sm:text-4xl lg:text-5xl">
              A few things<br />
              to know.
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed font-normal max-w-sm">
              Get a clearer picture of our editions, community, and ways to take part.
            </p>
            <FaqGlobeScene />
          </div>

          {/* Right Column: category filters and expandable answers */}
          <div className="flex w-full flex-col gap-3 lg:col-span-8">
            <div className="flex flex-wrap gap-2" aria-label="Filter questions by category">
              {FAQ_CATEGORIES.map((category) => {
                const selected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${
                      selected
                        ? "border-charcoal-950 bg-charcoal-950 text-white"
                        : "border-[#E8E3DA] bg-white/75 text-charcoal-700 hover:border-brand-orange/50 hover:text-charcoal-950"
                    }`}
                  >
                    {category}
                    <span className="ml-1.5 tabular-nums opacity-65">
                      {category === "All questions" ? FAQS.length : FAQS.filter((faq) => faq.category === category).length}
                    </span>
                  </button>
                );
              })}
            </div>
            <LiquidAccordion
              items={filteredFaqs}
              defaultOpen={0}
              headingLevel={3}
              tone="light"
              sound={true}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
