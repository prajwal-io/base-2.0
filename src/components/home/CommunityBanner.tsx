import Image from "next/image";

export function CommunityBanner() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[4/3] sm:aspect-[21/7] rounded-2xl bg-charcoal-900 text-white overflow-hidden">
          <Image
            src="/images/community-panoramic.jpg"
            alt="BacktoBase community gathered on stage after an event"
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas-dark/90 via-canvas-dark/45 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex w-full max-w-2xl flex-col justify-center p-6 sm:p-8 md:p-10">
            <span className="text-xs font-bold tracking-[0.16em] uppercase text-white mb-2">
              The Community
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase leading-[0.92] tracking-tight">
              A Community Built By Students, <span className="text-brand-cyan">For Students.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
