import Image from "next/image";

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

          {/* Panoramic Group Photo */}
          <div className="relative w-full aspect-[21/7] sm:aspect-[21/6] bg-charcoal-900 overflow-hidden">
            <Image
              src="/images/community-panoramic.jpg"
              alt="BacktoBase Community wide group photo on stage"
              fill
              className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Subtle top and bottom dark edge vignettes */}
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-canvas-dark to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-canvas-dark to-transparent pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
