import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ReviewBrowser } from "@/components/phase2/ReviewBrowser";

export const metadata: Metadata = {
  title: "BacktoBase Community Reviews — The People Make the Movement",
  description: "Read genuine BacktoBase community reviews and stories, shared with their original names and roles.",
};

export default function ReviewsPage() {
  return <div className="flex flex-1 flex-col bg-canvas-base">
    <main id="main-content" tabIndex={-1} className="flex-grow py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl"><h1 className="font-display text-4xl font-black uppercase leading-none tracking-[-.03em] text-charcoal-950 sm:text-6xl">The people make the movement.</h1><p className="mt-5 text-base leading-7 text-charcoal-700">Words from people who have learned, shared, and grown with BacktoBase.</p></header>
        <ReviewBrowser />
      </div>
    </main>
    <Footer />
  </div>;
}
