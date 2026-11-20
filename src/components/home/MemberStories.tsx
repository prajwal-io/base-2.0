import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CommunityTestimonials from "@/components/home/CommunityTestimonials";
import { TESTIMONIALS } from "@/data/communityData";

export function MemberStories() {
  return (
    <>
      <CommunityTestimonials
        title="Real People. Real Impact."
        testimonials={TESTIMONIALS.map(({ quote, author, role }) => ({
          quote,
          name: author,
          role,
        }))}
      />

      <section className="py-10 sm:py-14" aria-labelledby="founder-spotlight-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl rounded-2xl border border-border-subtle bg-white p-6 shadow-card sm:p-8">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal-700 sm:text-xs">
              Founder Spotlight
            </span>
            <h2 id="founder-spotlight-title" className="mb-2 font-display text-xl font-black text-charcoal-950 sm:text-2xl">
              Yashwanth Bondapalli
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-charcoal-700">
              The founder of BacktoBase. A student-led community built to create high-signal, high-trust spaces for students, builders, and professionals to learn, connect, and grow together.
            </p>
            <Link
              href="/about#founder"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:text-sm"
            >
              <span>Meet the Founder</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
