"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-canvas-subtle hover:bg-[#ECE4D8] border border-border-strong text-charcoal-900 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-charcoal-950 text-white text-[10px]">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </span>
                <span>Watch a Highlight</span>
              </button>
            </div>
          </div>

          {/* Right Column: Angled Photographic Hero Collage */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/4.2]">
              {/* Warm golden-amber backdrop geometric plate */}
              <div className="absolute inset-2 -rotate-3 rounded-3xl bg-gradient-to-tr from-brand-amber via-[#FBBF24] to-[#F59E0B] opacity-90 shadow-lg transform-gpu transition-transform hover:-rotate-1" />

              {/* Main Center Photo: Speaker on stage with BacktoBase branding */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 left-4 right-12 bottom-12 rounded-2xl overflow-hidden border-[3px] border-white shadow-photo z-10 bg-charcoal-950"
              >
                <Image
                  src="/images/hero-speaker.jpg"
                  alt="BacktoBase speaker addressing community on stage"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              {/* Inset Top-Right Photo: Attendees networking */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -top-3 -right-2 w-36 sm:w-44 aspect-[4/3] rounded-xl overflow-hidden border-[3px] border-white shadow-photo z-20 bg-charcoal-900 rotate-2"
              >
                <Image
                  src="/images/hero-networking.jpg"
                  alt="Attendees networking at BacktoBase"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Inset Bottom-Left Photo: Auditorium audience */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 -left-3 w-40 sm:w-48 aspect-[16/10] rounded-xl overflow-hidden border-[3px] border-white shadow-photo z-20 bg-charcoal-900 -rotate-2"
              >
                <Image
                  src="/images/hero-audience.jpg"
                  alt="Audience engaged in session"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Inset Bottom-Right Photo: BacktoBase standee */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-2 right-2 w-24 sm:w-28 aspect-[9/16] rounded-xl overflow-hidden border-[3px] border-white shadow-photo z-20 bg-charcoal-900 rotate-1 hidden sm:block"
              >
                <Image
                  src="/images/hero-standee.jpg"
                  alt="BacktoBase event banner standee"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Highlight Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl bg-charcoal-950 border border-charcoal-800 p-6 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
                  <h3 className="font-display font-bold text-lg">BacktoBase Community Highlight Reel</h3>
                </div>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-charcoal-800">
                <Image
                  src="/images/next-chapter-bg.jpg"
                  alt="BacktoBase Highlight reel preview"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="relative z-10 text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/90 flex items-center justify-center mx-auto mb-3 shadow-glow cursor-pointer hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 text-white fill-current ml-1" />
                  </div>
                  <h4 className="font-display font-bold text-xl mb-1">9 Editions Across Hyderabad</h4>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Bringing together students, builders, founders, and creators. Real energy, real connections.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                <span>Featured Venues: Microsoft, EPAM, Thoughtworks, DEVX, Health Catalyst</span>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="underline hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
