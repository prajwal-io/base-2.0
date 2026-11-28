import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { HighlightGallery } from "@/components/phase2/HighlightGallery";

export const metadata: Metadata = {
  title: "BacktoBase Highlights — The Experiences That Define Us",
  description: "Browse authentic photographs from the BacktoBase editions archive.",
};

export default function HighlightsPage() {
  return <div className="flex flex-1 flex-col bg-canvas-base">
    <main id="main-content" tabIndex={-1} className="flex-grow py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-brand-orange-ink">BacktoBase moments</p><h1 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-[-.03em] text-charcoal-950 sm:text-6xl">The experiences that define us.</h1><p className="mt-5 text-base leading-7 text-charcoal-700">A photographic archive of the people and gatherings documented across our editions.</p></header>
        <HighlightGallery />
      </div>
    </main>
    <Footer />
  </div>;
}
