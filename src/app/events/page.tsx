import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { EDITIONS } from "@/data/communityData";
import { Calendar, MapPin, Users, ArrowUpRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Events Archive (Editions 1–9) — BacktoBase Community",
  description: "Explore all 9 editions of BacktoBase across Hyderabad. Complete speakers, venues, topics, and takeaways.",
};

export default function EventsPage() {
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
                Complete Community Archive
              </span>
              <div className="h-[1px] w-12 bg-charcoal-300" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-charcoal-950 mb-4">
              Nine Editions.<br />
              <span className="text-brand-amber">Hyderabad Tech & Careers.</span>
            </h1>
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
              From our foundational AI clarity session at Health Catalyst to creator summits at Medicover Auditorium, explore the history and speakers of every single BacktoBase edition.
            </p>
          </div>

          {/* Editions Grid / List */}
          <div className="space-y-12">
            {EDITIONS.slice().reverse().map((edition) => (
              <article
                key={edition.id}
                id={`edition-${edition.editionNumber}`}
                className="rounded-3xl bg-white border border-border-subtle p-6 sm:p-8 lg:p-10 shadow-card hover:shadow-photo transition-all duration-300 scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Edition Metadata & Details */}
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-brand-amber-light text-brand-orange text-xs font-bold tracking-wide uppercase">
                        Edition {edition.editionNumber}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-charcoal-600 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
                        {edition.date} {edition.time && `• ${edition.time}`}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-charcoal-600 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
                        {edition.venue}, {edition.location}
                      </span>
                    </div>

                    <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal-950 mb-2">
                      {edition.title}
                    </h2>
                    <p className="text-sm font-medium text-brand-orange mb-4">
                      {edition.subtitle}
                    </p>
                    <p className="text-sm text-charcoal-700 leading-relaxed mb-6 font-normal">
                      {edition.overview}
                    </p>

                    {/* Speakers Section */}
                    <div className="mt-auto pt-6 border-t border-border-subtle">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-brand-orange" />
                        Featured Speakers & Experts
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {edition.speakers.map((speaker, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3 rounded-xl bg-canvas-subtle border border-border-subtle flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <h4 className="font-display font-bold text-sm text-charcoal-950">
                                  {speaker.name}
                                </h4>
                                {speaker.linkedin && (
                                  <a
                                    href={speaker.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-cyan hover:text-brand-teal p-0.5"
                                    aria-label={`${speaker.name} LinkedIn`}
                                  >
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                              <p className="text-xs text-charcoal-600 mt-0.5 line-clamp-2">
                                {speaker.role}
                              </p>
                            </div>
                            {speaker.topic && (
                              <p className="text-[11px] font-medium text-charcoal-800 mt-2 pt-2 border-t border-border-subtle/60">
                                Topic: {speaker.topic}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      {edition.hosts?.length ? (
                        <p className="text-xs text-charcoal-700 mt-4">
                          <span className="font-semibold text-charcoal-900">Hosts:</span> {edition.hosts.join(", ")}
                        </p>
                      ) : null}
                      {edition.supporters?.length ? (
                        <p className="text-xs text-charcoal-700 mt-2">
                          <span className="font-semibold text-charcoal-900">Additional contributors:</span> {edition.supporters.join(", ")}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Right Column: Custom visual slot & key highlights */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {edition.highlights && (
                      <div className="p-4 rounded-2xl bg-canvas-subtle border border-border-subtle">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-2">
                          Key Highlights
                        </h4>
                        <ul className="space-y-1.5 text-xs text-charcoal-700">
                          {edition.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <span className="text-brand-orange font-bold">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                </div>
              </article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
