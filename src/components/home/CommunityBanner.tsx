import Image from "next/image";
import { PixelField } from "@/components/ui/PixelField";

export function CommunityBanner() {
  return (
    <section id="community-photo" className="scroll-mt-24 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-canvas-dark text-white overflow-clip shadow-2xl border border-charcoal-800">
          {/* Header text inside dark banner */}
          <div className="relative isolate flex flex-col items-center p-6 pt-9 text-center sm:p-8 md:p-10">
            <PixelField variant="drift" className="absolute left-1 top-1 -z-10 w-28 -scale-x-100 opacity-80 sm:left-3 sm:w-40 lg:w-52" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">
              Built by students. Open to everyone.
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight">
              More than an event. <span className="text-brand-cyan-bright">A movement.</span>
            </h2>
          </div>

          <div className="community-photo-frame w-full overflow-clip bg-black">
            <Image
              src="/images/community-panoramic.jpg"
              alt="BacktoBase student community group photo"
              width={1024}
              height={229}
              quality={100}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1280px"
              className="community-scroll-photo block w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
