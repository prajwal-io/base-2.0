import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";

export function NextChapterBanner() {
  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-canvas-dark text-white overflow-hidden shadow-xl border border-charcoal-800">
          
          <CustomVisualSlot src="/images/next-chapter-bg.jpg" alt="" sizes="(max-width: 768px) 92vw, 750px" className="pointer-events-none absolute right-0 top-0 h-full w-full !bg-charcoal-900/35 md:w-3/5" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas-dark via-canvas-dark/85 to-transparent" />

          {/* Content Layout */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Headline Column */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-amber">
                  The Journey Continues
                </span>
                <div className="h-[1px] w-12 bg-charcoal-600" />
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.05] tracking-tight uppercase">
                The <span className="text-brand-amber">Next Chapter</span> Is Taking Shape.
              </h2>
            </div>

            {/* Right Subtitle Column with Vertical Divider */}
            <div className="lg:col-span-4 lg:pl-6 lg:border-l border-charcoal-700">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Bigger conversations, deeper collaborations, and more opportunities for our community.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
