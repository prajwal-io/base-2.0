"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="hero-section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Typographic Editorial Content */}
          <div className="min-w-0 lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow / Overline */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700">
                A Student-Driven Community
              </span>
              <div className="h-[1px] w-14 bg-charcoal-300" />
            </div>

            {/* Massive Editorial Headline */}
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] leading-[0.86] tracking-[-0.035em] text-charcoal-950 uppercase mb-5">
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/join"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-glow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Join the Community</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2.5 px-5 py-3 rounded-full bg-canvas-subtle hover:bg-[#ECE4D8] border border-border-strong text-charcoal-900 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-charcoal-950 text-white text-[10px]">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </span>
                <span>Watch a Highlight</span>
              </button>
            </div>
          </div>

          {/* Right Column: Angled Photographic Hero Collage */}
          <div className="min-w-0 lg:col-span-7 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] aspect-[5/4]">
              {/* Warm golden-amber backdrop geometric plate */}
              <div className="absolute inset-2 -rotate-3 rounded-3xl bg-brand-amber opacity-90 shadow-lg transform-gpu transition-transform hover:-rotate-1" />

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
                  sizes="(max-width: 1024px) 90vw, 48vw"
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
                  sizes="(max-width: 640px) 44vw, 18vw"
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
                  sizes="(max-width: 640px) 28vw, 10vw"
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
                  sizes="(max-width: 768px) 100vw, 65vw"
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
