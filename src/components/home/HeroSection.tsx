"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";
import { FlowButton } from "@/components/ui/flow-button";

const HEADLINE_LINES = [
  "Students",
  "Builders",
  "Creators",
  "Founders &",
  "Professionals",
] as const;

const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  // Layered depth parallax across the 4 hero collage photos
  const plateY = useTransform(smoothScroll, [0, 1], [0, 26]);
  const speakerY = useTransform(smoothScroll, [0, 1], [0, -18]);
  const audienceY = useTransform(smoothScroll, [0, 1], [0, -34]);
  const networkingY = useTransform(smoothScroll, [0, 1], [0, 22]);
  const standeeY = useTransform(smoothScroll, [0, 1], [0, -24]);

  const toggleCard = (idx: number) => {
    setActiveCard((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typographic Editorial Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow / Overline */}
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EDITORIAL_EASE }}
            >
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-charcoal-700">
                A Student-Driven Community
              </span>
              <motion.div
                className="h-[1px] w-14 bg-charcoal-300 origin-left"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, delay: 0.15, ease: EDITORIAL_EASE }}
              />
            </motion.div>

            {/* Massive Masked Editorial Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[0.94] tracking-tight text-charcoal-950 uppercase mb-6">
              {HEADLINE_LINES.map((line, idx) => (
                <span key={line} className="block overflow-y-clip py-[0.02em] -my-[0.02em]">
                  <motion.span
                    className="block"
                    initial={reduceMotion ? false : { y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.68,
                      delay: reduceMotion ? 0 : 0.06 + idx * 0.065,
                      ease: EDITORIAL_EASE,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle Copy */}
            <motion.p
              className="text-base sm:text-lg text-charcoal-700 max-w-xl font-normal leading-relaxed mb-8"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.36, ease: EDITORIAL_EASE }}
            >
              A community to learn, build, share, and grow together — from campuses to the real world.
            </motion.p>

            {/* Action Buttons: 21st.dev FlowButton + Secondary Archive Pill */}
            <motion.div
              className="flex flex-wrap items-center gap-3 sm:gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.44, ease: EDITORIAL_EASE }}
            >
              <FlowButton text="Join the Community" href="/join" />

              <Link
                href="/events"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/85 hover:bg-white border border-border-strong text-charcoal-900 text-sm font-semibold shadow-sm hover:shadow-card transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
              >
                <span>Explore 9 Editions</span>
                <ArrowUpRight
                  className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive Photo Fan Collage */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/4.2]">
              {/* Warm golden-amber backdrop geometric plate */}
              <motion.div
                style={reduceMotion ? undefined : { y: plateY }}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: -6 }}
                animate={{ opacity: 0.92, scale: 1, rotate: -3 }}
                transition={{ duration: 0.75, delay: 0.1, ease: EDITORIAL_EASE }}
                className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-brand-amber via-[#FBBF24] to-[#F59E0B] shadow-lg"
              />

              {/* Card 0: Main Speaker */}
              <motion.button
                type="button"
                aria-label="Bring speaker highlight photo to front"
                aria-pressed={activeCard === 0}
                onClick={() => toggleCard(0)}
                style={{
                  ...(reduceMotion ? undefined : { y: speakerY }),
                  zIndex: activeCard === 0 ? 40 : 10,
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: activeCard === 0 ? 1.03 : 1,
                  rotate: activeCard === 0 ? 0 : 0,
                }}
                whileHover={reduceMotion ? undefined : { scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="absolute top-4 left-4 right-12 bottom-12 rounded-2xl border-[3px] border-white shadow-photo overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 text-left"
              >
                <CustomVisualSlot
                  src="/images/hero-speaker.jpg"
                  alt="BacktoBase speaker sharing a talk with attendees"
                  priority
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="w-full h-full"
                />
              </motion.button>

              {/* Card 1: Top-Right Audience */}
              <motion.button
                type="button"
                aria-label="Bring event audience photo to front"
                aria-pressed={activeCard === 1}
                onClick={() => toggleCard(1)}
                style={{
                  ...(reduceMotion ? undefined : { y: audienceY }),
                  zIndex: activeCard === 1 ? 40 : 20,
                }}
                initial={reduceMotion ? false : { opacity: 0, x: 24, y: -12, rotate: 6 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: activeCard === 1 ? 0 : 2,
                  scale: activeCard === 1 ? 1.12 : 1,
                }}
                whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="absolute -top-3 -right-2 w-36 sm:w-44 aspect-[4/3] rounded-xl border-[3px] border-white shadow-photo overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 text-left"
              >
                <CustomVisualSlot
                  src="/images/hero-audience.jpg"
                  alt="BacktoBase event audience"
                  sizes="(max-width: 640px) 160px, 200px"
                  className="w-full h-full"
                />
              </motion.button>

              {/* Card 2: Bottom-Left Networking */}
              <motion.button
                type="button"
                aria-label="Bring community networking photo to front"
                aria-pressed={activeCard === 2}
                onClick={() => toggleCard(2)}
                style={{
                  ...(reduceMotion ? undefined : { y: networkingY }),
                  zIndex: activeCard === 2 ? 40 : 20,
                }}
                initial={reduceMotion ? false : { opacity: 0, x: -24, y: 16, rotate: -6 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: activeCard === 2 ? 0 : -2,
                  scale: activeCard === 2 ? 1.12 : 1,
                }}
                whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="absolute -bottom-4 -left-3 w-40 sm:w-48 aspect-[16/10] rounded-xl border-[3px] border-white shadow-photo overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 text-left"
              >
                <CustomVisualSlot
                  src="/images/hero-networking.jpg"
                  alt="Attendees connecting at a BacktoBase event"
                  sizes="(max-width: 640px) 180px, 220px"
                  className="w-full h-full"
                />
              </motion.button>

              {/* Card 3: Bottom-Right Standee */}
              <motion.button
                type="button"
                aria-label="Bring BacktoBase signage photo to front"
                aria-pressed={activeCard === 3}
                onClick={() => toggleCard(3)}
                style={{
                  ...(reduceMotion ? undefined : { y: standeeY }),
                  zIndex: activeCard === 3 ? 40 : 20,
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 22, rotate: 5 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: activeCard === 3 ? 0 : 1,
                  scale: activeCard === 3 ? 1.14 : 1,
                }}
                whileHover={reduceMotion ? undefined : { scale: 1.09, rotate: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="absolute -bottom-2 right-2 w-24 sm:w-28 aspect-[9/16] rounded-xl border-[3px] border-white shadow-photo overflow-hidden hidden sm:block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 text-left"
              >
                <CustomVisualSlot
                  src="/images/hero-standee.jpg"
                  alt="BacktoBase event signage"
                  sizes="(max-width: 640px) 108px, 140px"
                  className="w-full h-full"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
