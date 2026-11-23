import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { CommunityJourney } from "@/components/community/CommunityJourney";
import { ArrowLeft, ArrowRight, Users, ShieldCheck, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "The Community — BacktoBase Hyderabad",
  description: "See how BacktoBase brings students, builders, and industry professionals together to learn, share, and grow.",
};

export default function CommunityPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main className="flex-grow py-10 sm:py-16">
        <div className="relative isolate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                People First
              </span>
              <div className="h-[1px] w-12 bg-charcoal-300" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-charcoal-950 mb-4">
              Built by students.<br />
              <span className="text-brand-cyan">Open to everyone.</span>
            </h1>
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
              Every edition brings students, builders, and industry professionals together to learn, share, and grow alongside one another.
            </p>
          </div>
          <div className="mb-16 overflow-hidden rounded-2xl border border-border-subtle bg-black">
            <Image
              src="/images/community-panoramic.jpg"
              alt="BacktoBase student community group photo"
              width={1024}
              height={229}
              unoptimized
              className="block w-full h-auto"
            />
          </div>



          <CommunityJourney />

          {/* Community Values */}
          <section aria-labelledby="community-values-heading" className="mb-16">
            <div className="mb-7 max-w-2xl">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                What guides us
              </span>
              <h2 id="community-values-heading" className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-charcoal-950 sm:text-4xl">
                Room to learn. <span className="text-brand-cyan">Space to share.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-7 border-y border-[#d5c8b9] py-7 md:grid-cols-3 md:gap-0 md:py-8">
              <article className="md:pr-7">
                <ShieldCheck aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
                <h3 className="font-display text-lg font-bold text-charcoal-950">
                Psychological Safety
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                Whether you are a 1st-year fresher or an AWS architect, every question is treated with respect and genuine encouragement.
                </p>
              </article>

              <article className="md:border-l md:border-[#d5c8b9] md:px-7">
                <Users aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
                <h3 className="font-display text-lg font-bold text-charcoal-950">No paywalls to speak</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                Our stages belong to those with genuine ideas and practical experience — not pay-to-play corporate sponsorships.
                </p>
              </article>

              <article className="md:border-l md:border-[#d5c8b9] md:pl-7">
                <HeartHandshake aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
                <h3 className="font-display text-lg font-bold text-charcoal-950">Pay it forward</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                Attendees become speakers, speakers become mentors, and learners become the organizers of future editions.
                </p>
              </article>
            </div>
          </section>

          {/* A community-first next step */}
          <div className="flex flex-col gap-5 border-t border-[#d5c8b9] py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-charcoal-950 sm:text-3xl">
                Find your next conversation.
            </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
                Browse the editions and find a topic, speaker, or idea that makes you curious.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-brand-orange px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:self-center"
            >
              <span>Explore the editions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
