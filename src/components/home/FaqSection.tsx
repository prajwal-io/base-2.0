"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/data/communityData";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default as in screenshot

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Eyebrow + Headline */}
          <div className="lg:col-span-4 flex flex-col">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700 block mb-2">
              FAQ
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 uppercase tracking-tight leading-[1.0]">
              Questions?<br />
              We've Got You.
            </h3>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-border-strong shadow-card"
                      : "bg-[#F5F0E6] hover:bg-[#EFE9DD] border-border-subtle"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full py-4 px-6 flex items-center justify-between text-left gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-charcoal-950">
                      {faq.question}
                    </span>
                    <span className="shrink-0 p-1 rounded-full bg-canvas-subtle text-charcoal-800">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-700 leading-relaxed font-normal border-t border-border-subtle/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
