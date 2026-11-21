import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CommunityTestimonials from "@/components/home/CommunityTestimonials";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";
import { TESTIMONIALS } from "@/data/communityData";
import { FOUNDER_PROFILE } from "@/data/founderData";

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
          <article className="max-w-4xl rounded-3xl border border-border-subtle bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <Link
                href="/founder"
                className="w-full sm:w-52 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-2xl"
                aria-label="View Yashwanth Bondapalli's full founder bio"
              >
                <CustomVisualSlot
                  src={FOUNDER_PROFILE.portrait}
                  alt="Yashwanth Bondapalli, Founder of BacktoBase"
                  sizes="(max-width: 640px) 240px, 280px"
                  quality={95}
                  className="w-full aspect-square rounded-2xl border-2 border-brand-amber/40 shadow-photo transition-transform duration-200 group-hover:scale-[1.02]"
                  imgClassName="object-cover object-top"
                />
              </Link>

              <div className="flex flex-col">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange sm:text-xs">
                  Founder Spotlight
                </span>
                <h2
                  id="founder-spotlight-title"
                  className="mb-2 font-display text-2xl font-black text-charcoal-950 sm:text-3xl tracking-tight"
                >
                  <Link href="/founder" className="hover:text-brand-orange transition-colors">
                    {FOUNDER_PROFILE.name}
                  </Link>
                </h2>

                <div className="mb-3.5 flex flex-wrap gap-1.5">
                  {FOUNDER_PROFILE.spotlightHighlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-canvas-subtle border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold text-charcoal-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mb-5 text-sm sm:text-base leading-relaxed text-charcoal-700">
                  {FOUNDER_PROFILE.shortSummary}
                </p>

                <Link
                  href="/founder"
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:text-sm"
                >
                  <span>Meet the Founder &amp; View Full Bio</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
