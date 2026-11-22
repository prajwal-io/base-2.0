import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";
import { FOUNDER_PROFILE } from "@/data/founderData";
import { EDITION_COUNT } from "@/data/communityData";
import { CONTACT_US_URL } from "@/data/contact";

export const metadata = {
  title: "Yashwanth Bondapalli — Founder @ BacktoBase",
  description: "The story of how Yashwanth Bondapalli started BacktoBase and helped students become speakers, collaborators, and builders.",
};

export default function FounderPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-orange transition-colors"
            >
              <span>About BacktoBase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Editorial Founder Hero */}
          <section className="rounded-3xl bg-canvas-dark text-white p-7 sm:p-11 lg:p-14 mb-12 shadow-2xl border border-charcoal-800 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* High-Resolution Founder Portrait */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <CustomVisualSlot
                  src={FOUNDER_PROFILE.portrait}
                  alt="Yashwanth Bondapalli, Founder of BacktoBase"
                  sizes="(max-width: 1024px) 92vw, 480px"
                  quality={95}
                  className="aspect-square w-full max-w-md rounded-2xl border-2 border-brand-amber/50 shadow-photo"
                  imgClassName="object-cover object-top"
                />
              </div>

              {/* Founder introduction */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-amber">
                    {FOUNDER_PROFILE.title}
                  </span>
                </div>

                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95] mb-4">
                  {FOUNDER_PROFILE.name}
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
                  How a gathering in Hyderabad became a place for students to share what they know and build alongside others.
                </p>
              </div>
            </div>
          </section>

          {/* Full Story & Founder Quote */}
          <section
            aria-labelledby="story-heading"
            className="relative isolate overflow-hidden rounded-3xl bg-white border border-border-subtle shadow-card p-7 sm:p-10 mb-12"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange block mb-1">
              The Journey
            </span>
            <h2
              id="story-heading"
              className="font-display font-black text-2xl sm:text-3xl text-charcoal-950 uppercase tracking-tight mb-5"
            >
              From the first gathering to the student stage
            </h2>

            <ol className="max-w-4xl space-y-7 border-l border-[#d9ba9f] pl-5 sm:pl-7">
              {FOUNDER_PROFILE.journey.map(({ title, description }) => (
                <li key={title} className="relative">
                  <span aria-hidden="true" className="absolute -left-[24px] top-2 size-2 bg-brand-orange sm:-left-[32px]" />
                  <h3 className="mb-1 font-display text-base font-bold text-charcoal-950 sm:text-lg">{title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal-700 sm:text-base">{description}</p>
                </li>
              ))}
            </ol>

            <blockquote className="mt-7 pt-6 border-t border-border-subtle text-base sm:text-lg font-display font-bold italic text-charcoal-950">
              &ldquo;{FOUNDER_PROFILE.quote}&rdquo;
            </blockquote>
          </section>

          {/* Complete Verified Credentials Strip */}
          <section
            aria-labelledby="credentials-heading"
            className="rounded-3xl bg-white border border-border-subtle shadow-card p-6 sm:p-8 mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange block mb-1">
                  Profile &amp; Credentials
                </span>
                <h2
                  id="credentials-heading"
                  className="font-display font-black text-2xl sm:text-3xl text-charcoal-950 uppercase tracking-tight"
                >
                  At a Glance
                </h2>
              </div>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {FOUNDER_PROFILE.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-canvas-subtle border border-border-strong/70 px-4 py-2 text-xs sm:text-sm font-semibold text-charcoal-900"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pb-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-dark-pill hover:bg-brand-dark-pill-hover text-white text-sm font-semibold tracking-wide transition-all shadow-md"
            >
              <span>Explore All {EDITION_COUNT} Editions</span>
              <ArrowRight className="w-4 h-4 text-brand-cyan" />
            </Link>
            <Link
              href={CONTACT_US_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide transition-all shadow-md"
            >
              <span>Contact us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
