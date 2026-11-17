import { FAQS } from "@/data/communityData";
import { LiquidAccordion } from "@/components/ui/liquid-glass-accordion";

export function FaqSection() {
  return (
    <section id="faqs" className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col lg:col-span-4">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal-700 sm:text-xs">
              FAQ
            </span>
            <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-charcoal-950 sm:text-4xl lg:text-5xl">
              Questions?<br />
              We&apos;ve Got You.
            </h3>
          </div>
          <div className="lg:col-span-8">
            <LiquidAccordion items={FAQS} defaultOpen={0} headingLevel={4} />
          </div>
        </div>
      </div>
    </section>
  );
}
