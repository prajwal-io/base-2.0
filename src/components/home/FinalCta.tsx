import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-canvas-dark text-white overflow-hidden shadow-2xl border border-charcoal-800 p-8 sm:p-12 lg:p-14">
          
          {/* Subtle photographic background overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
            <Image
              src="/images/final-cta-bg.jpg"
              alt="BacktoBase audience background"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Top-Right Decorative Amber Burst Rays */}
          <div className="absolute top-5 right-6 text-brand-amber hidden sm:block">
            <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
              <path d="M20 6V0" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M30 10L35 5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M34 20H40" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Content Layout */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            <div className="max-w-xl">
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[1.0] mb-4">
                Be A Part Of<br />
                <span className="text-brand-amber">What&apos;s Next.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
                Join a growing community of students, builders, creators, and professionals shaping meaningful conversations, projects, and opportunities together.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/join"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-amber hover:bg-amber-400 text-charcoal-950 font-display font-extrabold text-sm tracking-wide shadow-glow transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Join the Community</span>
                <ArrowRight className="w-4 h-4 text-charcoal-950" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
