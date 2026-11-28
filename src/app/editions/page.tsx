import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { EditionTimeline } from "@/components/phase2/EditionTimeline";

export const metadata: Metadata = {
  title: "BacktoBase Editions — A Journey Built One Edition at a Time",
  description: "Explore the verified BacktoBase edition archive, from event themes and speakers to venues and community highlights.",
};

export default function EditionsPage() {
  return <div className="flex flex-1 flex-col bg-canvas-base">
    <main id="main-content" tabIndex={-1} className="flex-grow py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-11 max-w-3xl sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-orange-ink">The BacktoBase archive <span className="mx-2 text-brand-cyan">/</span> 9 editions</p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-[-.03em] text-charcoal-950 sm:text-6xl">A journey built one edition at a time.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-charcoal-700">Scroll through each chapter of the journey. Every edition has its own people, ideas and moments to explore.</p>
        </header>
        <EditionTimeline />
      </div>
    </main>
    <Footer />
  </div>;
}
