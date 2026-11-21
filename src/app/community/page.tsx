import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { CommunityRosterClient } from "@/components/community/CommunityRosterClient";
import { TEAM_MEMBERS } from "@/data/communityData";
import { ArrowLeft, ArrowRight, Users, ShieldCheck, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "The Community — BacktoBase Hyderabad",
  description: "Meet the people, volunteers, hosts, and anchors who make BacktoBase happen.",
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
              Built By Students.<br />
              <span className="text-brand-cyan">Powered By Community.</span>
            </h1>
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
              Behind every edition is a dedicated crew of students, anchors, photographers, and coordinators who believe in creating inclusive, high-signal spaces.
            </p>
          </div>
          <div className="mb-16 overflow-hidden rounded-3xl border border-border-subtle bg-black shadow-photo">
            <Image
              src="/images/community-panoramic.jpg"
              alt="BacktoBase student community group photo"
              width={1024}
              height={229}
              unoptimized
              className="block w-full h-auto"
            />
          </div>



          {/* Member Journey & Searchable Organizing Roster */}
          <CommunityRosterClient members={TEAM_MEMBERS} />

          {/* Community Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-3xl bg-white border border-border-subtle shadow-card">
              <ShieldCheck className="w-8 h-8 text-brand-cyan mb-3" />
              <h3 className="font-display font-bold text-lg text-charcoal-950 mb-2">
                Psychological Safety
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Whether you are a 1st-year fresher or an AWS architect, every question is treated with respect and genuine encouragement.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-border-subtle shadow-card">
              <Users className="w-8 h-8 text-brand-orange mb-3" />
              <h3 className="font-display font-bold text-lg text-charcoal-950 mb-2">
                No Paywalls to Speak
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Our stages belong to those with genuine ideas and practical experience — not pay-to-play corporate sponsorships.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-border-subtle shadow-card">
              <HeartHandshake className="w-8 h-8 text-brand-amber mb-3" />
              <h3 className="font-display font-bold text-lg text-charcoal-950 mb-2">
                Pay It Forward
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Attendees become speakers, speakers become mentors, and learners become the organizers of future editions.
              </p>
            </div>
          </div>

          {/* Bottom Join CTA */}
          <div className="rounded-3xl bg-canvas-dark text-white p-8 sm:p-12 text-center shadow-xl border border-charcoal-800">
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mb-3">
              Want to join the organizing crew?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-6">
              We are always looking for student anchors, designers, social media strategists, and event coordinators.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide transition-all shadow-glow"
            >
              <span>Apply to Join or Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
