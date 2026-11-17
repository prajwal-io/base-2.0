import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, Heart, Sparkles, Target } from "lucide-react";

export const metadata = {
  title: "About BacktoBase — Mission, Philosophy & Founder",
  description: "Learn about BacktoBase, founded by Yashwanth Bondapalli to bridge students with the real world.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-orange mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange">
                The BacktoBase Story
              </span>
              <div className="h-[1px] w-12 bg-charcoal-300" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-charcoal-950 mb-4">
              From Campuses<br />
              <span className="text-brand-cyan">To The Real World.</span>
            </h1>
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
              BacktoBase was founded on a simple conviction: classroom theory only becomes career momentum when students step out, speak up, and build alongside actual industry practitioners.
            </p>
          </div>

          {/* Philosophy Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-3xl bg-white border border-border-subtle shadow-card">
              <div className="w-10 h-10 rounded-2xl bg-brand-amber-light flex items-center justify-center text-brand-orange mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-950 mb-2">
                Show Up & Build
              </h3>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                The best growth happens when we step out of passive attendance into active building and direct conversations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-border-subtle shadow-card">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center text-brand-cyan mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-950 mb-2">
                Students as Speakers
              </h3>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                You don&apos;t need to wait until you graduate to have a voice. In Edition 5, 16-year-old builders took the stage at EPAM Systems.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-border-subtle shadow-card">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-brand-amber mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-950 mb-2">
                High Signal, Zero Fluff
              </h3>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                One event. One connection. One insight at a time. Every edition is crafted around actionable skills, recruitment truth, and genuine mentorship.
              </p>
            </div>
          </div>

          {/* Founder Section */}
          <section id="founder" className="rounded-3xl bg-canvas-dark text-white p-8 sm:p-12 lg:p-16 mb-16 overflow-hidden relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 relative aspect-square max-w-sm rounded-2xl overflow-hidden bg-charcoal-900 border-2 border-brand-amber/40 shadow-photo">
                <Image
                  src="/images/founder-portrait.jpg"
                  alt="Yashwanth Bondapalli"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-7 flex flex-col">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-amber mb-2">
                  Founder & Community Architect
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
                  Yashwanth Bondapalli
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
                  <p>
                    Yashwanth created BacktoBase in Hyderabad to solve a chronic problem in tech education: students were graduating with degrees and certificates, but zero practical intuition for real-world enterprise architectures, networking, or how founders think.
                  </p>
                  <p>
                    Over 9 consecutive editions, he brought together industry leaders from Microsoft, Amazon, Thoughtworks, Accenture, and EPAM with hungry student creators and young engineers, turning Hyderabad into a testing ground for accessible mentorship.
                  </p>
                  <p className="text-brand-cyan font-medium italic pt-2 border-t border-charcoal-700">
                    &ldquo;We don&apos;t just build audiences. We create opportunities for people to become voices in the community.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="text-center py-8">
            <h3 className="font-display font-bold text-2xl text-charcoal-950 mb-3">
              Want to speak, volunteer, or partner with us?
            </h3>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide transition-all shadow-md"
            >
              <span>Get in Touch with the Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
