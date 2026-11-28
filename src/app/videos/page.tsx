import type { Metadata } from "next";
import { CirclePlay } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { VideoGallery } from "@/components/phase2/VideoGallery";

export const metadata: Metadata = {
  title: "BacktoBase Videos — Watch the Stories",
  description: "Watch official BacktoBase edition films and community reviews from the archive.",
};

export default function VideosPage() {
  return <div className="flex flex-1 flex-col bg-canvas-base">
    <main id="main-content" tabIndex={-1} className="flex-grow">
      <header className="mx-auto max-w-7xl px-4 pb-9 pt-14 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-orange/10 text-brand-orange-ink"><CirclePlay aria-hidden="true" className="size-6" /></span>
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-brand-orange-ink">BacktoBase on YouTube</p><h1 className="mt-3 max-w-4xl font-display text-4xl font-black uppercase leading-[.98] tracking-[-.03em] text-charcoal-950 sm:text-6xl">Watch the stories.<br className="hidden sm:block" /> Experience the journey.</h1></div>
        </div>
        <p className="ml-16 mt-4 max-w-2xl text-base leading-7 text-charcoal-700 sm:mt-5 sm:text-lg">From the first gathering to the latest edition, explore the people, ideas and moments that make this community.</p>
      </header>
      <VideoGallery />
    </main>
    <Footer />
  </div>;
}
