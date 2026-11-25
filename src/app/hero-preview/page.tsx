"use client";

import { useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { COMMUNITY_STAGES, HeroCommunityStage, type CommunityStage } from "@/components/home/HeroCommunityStage";
import { EDITION_COUNT } from "@/data/communityData";

export default function HeroPreviewPage() {
  const [variant, setVariant] = useState<CommunityStage>("floor");
  const [replay, setReplay] = useState(0);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 bg-canvas-base">
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 px-4 pt-6">
        {COMMUNITY_STAGES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={id === variant}
            onClick={() => {
              setVariant(id);
              setReplay((count) => count + 1);
            }}
            className="rounded-full border border-border-strong px-4 py-2 text-xs font-semibold aria-pressed:border-charcoal-950 aria-pressed:bg-charcoal-950 aria-pressed:text-white"
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setReplay((count) => count + 1)}
          className="rounded-full border border-border-strong px-4 py-2 text-xs font-semibold"
        >
          Replay
        </button>
      </div>
      <p aria-live="polite" className="mx-auto mt-3 max-w-lg px-4 text-center text-sm text-charcoal-700">
        {COMMUNITY_STAGES.find(({ id }) => id === variant)?.note}
      </p>
      <HeroSection communityStage={<HeroCommunityStage key={replay} variant={variant} />} editionCount={EDITION_COUNT} />
    </main>
  );
}
