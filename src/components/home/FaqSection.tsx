import { FAQS } from "@/data/communityData";
import { LiquidAccordion } from "@/components/ui/liquid-glass-accordion";

export function FaqSection() {
  return (
    <section id="faqs" className="py-12 sm:py-16 lg:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Eyebrow + Headline */}
          <div className="flex flex-col lg:col-span-4">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal-700 sm:text-xs">
              FAQ
            </span>
            <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-charcoal-950 sm:text-4xl lg:text-5xl">
              Questions?<br />
              We&apos;ve Got You.
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed font-normal max-w-sm">
              Everything you need to know about BacktoBase editions, participating as a student, mentoring, or attending.
            </p>
          </div>

          {/* Right Column: Liquid Glass Accordion */}
          <div className="lg:col-span-8 flex justify-center lg:justify-start w-full">
            <LiquidAccordion
              items={FAQS}
              defaultOpen={0}
              headingLevel={3}
              tone="light"
              sound={true}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
