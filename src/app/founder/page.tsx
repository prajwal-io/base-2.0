import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Code2,
  Mic,
  Palette,
  Sparkles,
  Tv,
  Users,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";
import { FOUNDER_PROFILE } from "@/data/founderData";

export const metadata = {
  title: "Yashwanth Bondapalli — Founder @ BacktoBase",
  description: FOUNDER_PROFILE.headline,
};

const TRACK_STYLES = {
  orange: {
    iconWrap: "bg-brand-amber-light text-brand-orange",
    badge: "bg-orange-50 text-brand-orange border-orange-200/80",
    Icon: Award,
  },
  cyan: {
    iconWrap: "bg-cyan-50 text-brand-teal",
    badge: "bg-cyan-50 text-brand-teal border-cyan-200/80",
    Icon: Code2,
  },
  amber: {
    iconWrap: "bg-amber-50 text-brand-amber-dark",
    badge: "bg-amber-50 text-amber-800 border-amber-200/80",
    Icon: Palette,
  },
} as const;

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

              {/* Bio Header & Verified Metrics */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-amber">
                    {FOUNDER_PROFILE.title}
                  </span>
                </div>

                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95] mb-4">
                  {FOUNDER_PROFILE.name}
                </h1>

                {/* Featured Highlights Row */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 px-3 py-1 text-xs font-semibold text-amber-200">
                    <Mic className="w-3.5 h-3.5 text-brand-amber" />
                    Microsoft Speaker
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cyan/15 border border-brand-cyan/35 px-3 py-1 text-xs font-semibold text-cyan-200">
                    <Tv className="w-3.5 h-3.5 text-brand-cyan" />
                    Sakshi TV Featured
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-gray-200">
                    <Users className="w-3.5 h-3.5 text-brand-amber" />
                    GenAI Developer &amp; Software Engineer
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-7">
                  {FOUNDER_PROFILE.shortSummary}
                </p>

                {/* Key Verified Impact Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {FOUNDER_PROFILE.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5"
                    >
                      <div className="font-display font-black text-2xl sm:text-3xl text-brand-amber leading-none mb-1">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-300">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

          {/* Three Multidisciplinary Pillars */}
          <section aria-labelledby="pillars-heading" className="mb-12">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal-600 block mb-1">
                Multidisciplinary Builder
              </span>
              <h2
                id="pillars-heading"
                className="font-display font-black text-3xl sm:text-4xl text-charcoal-950 uppercase tracking-tight"
              >
                Tech, Community &amp; <span className="text-brand-orange">Craft.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FOUNDER_PROFILE.tracks.map((track) => {
                const style = TRACK_STYLES[track.accent];
                const Icon = style.Icon;
                return (
                  <div
                    key={track.category}
                    className="rounded-3xl bg-white border border-border-subtle shadow-card p-6 sm:p-7 flex flex-col"
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${style.iconWrap}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-charcoal-950 mb-2">
                      {track.category}
                    </h3>
                    <p className="text-sm text-charcoal-700 leading-relaxed mb-5">
                      {track.summary}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {track.roles.map((role) => (
                        <span
                          key={role}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${style.badge}`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Full Story & Founder Quote */}
          <section
            aria-labelledby="story-heading"
            className="rounded-3xl bg-white border border-border-subtle shadow-card p-7 sm:p-10 mb-14"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange block mb-1">
              The Journey
            </span>
            <h2
              id="story-heading"
              className="font-display font-black text-2xl sm:text-3xl text-charcoal-950 uppercase tracking-tight mb-5"
            >
              About {FOUNDER_PROFILE.name}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-charcoal-700 leading-relaxed max-w-4xl">
              {FOUNDER_PROFILE.bioParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-7 pt-6 border-t border-border-subtle text-base sm:text-lg font-display font-bold italic text-charcoal-950">
              &ldquo;{FOUNDER_PROFILE.quote}&rdquo;
            </blockquote>
          </section>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pb-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-dark-pill hover:bg-brand-dark-pill-hover text-white text-sm font-semibold tracking-wide transition-all shadow-md"
            >
              <span>Explore All 9 Editions</span>
              <ArrowRight className="w-4 h-4 text-brand-cyan" />
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide transition-all shadow-md"
            >
              <span>Connect with BacktoBase</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
