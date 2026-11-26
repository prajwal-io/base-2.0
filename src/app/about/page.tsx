import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, Hammer, Mic2, MessagesSquare } from "lucide-react";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";
import { FOUNDER_PROFILE } from "@/data/founderData";
import { CONTACT_US_MAILTO_URL, CONTACT_US_URL } from "@/data/contact";
import { ResponsiveEmailLink } from "@/components/ui/ResponsiveEmailLink";

export const metadata = {
  title: "About BacktoBase — Mission, Philosophy & Founder",
  description: "Learn about BacktoBase, founded by Yashwanth Bondapalli to bridge students with the real world.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main id="main-content" tabIndex={-1} className="flex-grow py-10 sm:py-16">
        <div className="relative isolate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-orange-ink mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange-ink">
                The BacktoBase Story
              </span>
              <div className="h-[1px] w-12 bg-charcoal-300" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-charcoal-950 mb-4">
              From Campuses<br />
              <span className="text-brand-cyan">To The Real World.</span>
            </h1>
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
              BacktoBase was founded on a simple idea: students build confidence and career momentum when they learn alongside people working in the industry.
            </p>
          </div>

          {/* Philosophy Pillars */}
          <div className="mb-16 grid grid-cols-1 gap-7 border-y border-[#d5c8b9] py-7 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-0 lg:py-8">
            <article className="lg:pr-7">
              <Hammer aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
              <h3 className="font-display text-lg font-bold text-charcoal-950">
                Show Up & Build
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                The best growth happens when we step out of passive attendance into active building and direct conversations.
              </p>
            </article>

            <article className="sm:border-l sm:border-[#d5c8b9] sm:pl-7 lg:px-7">
              <Mic2 aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
              <h3 className="font-display text-lg font-bold text-charcoal-950">
                Students as Speakers
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                You don&apos;t need to wait until you graduate to have a voice. In Edition 05, 16-year-old builders took the stage at EPAM Systems.
              </p>
            </article>

            <article className="sm:col-span-2 sm:border-t sm:border-[#d5c8b9] sm:pt-7 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <MessagesSquare aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
              <h3 className="font-display text-lg font-bold text-charcoal-950">
                High Signal, Zero Fluff
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                One event. One connection. One insight at a time. Every edition is crafted around actionable skills, recruitment truth, and genuine mentorship.
              </p>
            </article>
          </div>

          {/* Founder Section */}
          <section id="founder" className="rounded-3xl bg-canvas-dark text-white p-8 sm:p-12 lg:p-16 mb-16 overflow-hidden relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <CustomVisualSlot
                src="/images/founder-portrait.jpg"
                alt="Yashwanth Bondapalli, founder of BacktoBase"
                sizes="(max-width: 1024px) 90vw, 520px"
                quality={95}
                className="aspect-square w-full max-w-md rounded-2xl border-2 border-brand-amber/40 shadow-photo lg:col-span-5"
                imgClassName="object-cover object-top"
              />

              <div className="lg:col-span-7 flex flex-col">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-amber mb-2">
                  Why BacktoBase began
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
                  {FOUNDER_PROFILE.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Yashwanth started BacktoBase in Hyderabad to give students more ways to learn alongside people doing the work. The idea was simple: bring students, practitioners, and founders together, then give students a chance to ask questions, share their work, and take the stage themselves.
                </p>
                <div className="mt-6">
                  <Link
                    href="/founder"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-amber hover:bg-amber-400 text-charcoal-950 font-display font-extrabold text-xs sm:text-sm tracking-wide transition-all"
                  >
                    <span>Read Yashwanth’s story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="text-center py-8">
            <h3 className="font-display font-bold text-2xl text-charcoal-950 mb-3">
              Want to speak, volunteer, or partner with us?
            </h3>
            <ResponsiveEmailLink desktopHref={CONTACT_US_URL} mobileHref={CONTACT_US_MAILTO_URL} className="items-center gap-2 px-6 py-3 rounded-full bg-brand-orange-ink hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide transition-all shadow-md">
              <span>Contact us</span>
              <ArrowRight className="w-4 h-4" />
            </ResponsiveEmailLink>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
