import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";

export function CommunityBanner() {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-canvas-dark text-white overflow-hidden shadow-2xl border border-charcoal-800">
          
          {/* Header text inside dark banner */}
          <div className="p-6 sm:p-8 md:p-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">
              The Community
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight">
              A Community Built By Students, <span className="text-brand-cyan">For Students.</span>
            </h2>
          </div>

          <CustomVisualSlot className="w-full aspect-[21/7] !bg-charcoal-900 sm:aspect-[21/6]" />

        </div>
      </div>
    </section>
  );
}
