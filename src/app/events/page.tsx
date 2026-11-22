import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { EventsArchiveClient } from "@/components/events/EventsArchiveClient";
import { EDITIONS, EDITION_COUNT } from "@/data/communityData";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: `Events Archive (Editions 01–${String(EDITION_COUNT).padStart(2, "0")}) — BacktoBase Community`,
  description:
    `Explore all ${EDITION_COUNT} editions of BacktoBase across Hyderabad. Complete speakers, venues, topics, and takeaways.`,
};

export default function EventsPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main className="flex-grow py-10 sm:py-16">
        <div className="relative isolate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-orange mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange">
                Complete Community Archive
              </span>
              <div className="h-[1px] w-12 bg-charcoal-300" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-charcoal-950 mb-4">
              {EDITION_COUNT} Editions.
              <br />
              <span className="text-brand-amber">Hyderabad Tech &amp; Careers.</span>
            </h1>
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
              Explore all {EDITION_COUNT} BacktoBase editions across Hyderabad, from AI and career
              sessions to founder and creator gatherings.
            </p>
          </div>

          <EventsArchiveClient editions={EDITIONS} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
