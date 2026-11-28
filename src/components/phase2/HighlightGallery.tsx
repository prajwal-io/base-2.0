"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { EDITIONS } from "@/data/communityData";
import { getEditionPhoto } from "@/data/editionPhotos";

const photos = EDITIONS.map((edition) => ({ edition, photo: getEditionPhoto(edition.editionNumber) })).filter(
  (item): item is { edition: (typeof EDITIONS)[number]; photo: NonNullable<ReturnType<typeof getEditionPhoto>> } => Boolean(item.photo),
);

export function HighlightGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const visiblePhotos = photos;
  const active = activeIndex === null ? undefined : visiblePhotos[activeIndex];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (active && !element.open) element.showModal();
    if (!active && element.open) element.close();
  }, [active]);

  const move = (step: number) => setActiveIndex((index) => index === null ? null : (index + step + visiblePhotos.length) % visiblePhotos.length);

  return <>
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {visiblePhotos.map(({ edition, photo }, index) => <figure key={edition.editionNumber} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-card">
        <button type="button" onClick={() => setActiveIndex(index)} aria-label={`View Edition ${edition.editionNumber} photograph`} className="group block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange">
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} quality={95} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" loading="lazy" className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.015] motion-reduce:transition-none" />
        </button>
        <figcaption className="flex items-start justify-between gap-4 p-4">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-orange-ink">Edition {edition.editionNumber}</p><h2 className="mt-1 font-display text-lg font-bold text-charcoal-950">{edition.title}</h2><p className="mt-1 text-sm text-charcoal-600">{edition.date}</p></div>
          <Link href={`/editions/${edition.editionNumber}`} className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-brand-orange-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">Details</Link>
        </figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} aria-label="Edition photograph viewer" onCancel={() => setActiveIndex(null)} onClose={() => setActiveIndex(null)} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } else if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }} className="m-auto max-h-[92dvh] max-w-[min(96vw,80rem)] overflow-hidden rounded-2xl border-0 bg-charcoal-950 p-0 text-white backdrop:bg-black/85">
      {active && <div className="relative grid max-h-[92dvh] grid-rows-[auto_1fr_auto]">
        <div className="flex items-center justify-between gap-4 px-4 py-3"><p className="text-sm font-semibold">Edition {active.edition.editionNumber} · {active.edition.title}</p><button autoFocus type="button" onClick={() => setActiveIndex(null)} aria-label="Close photograph viewer" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><X aria-hidden="true" /></button></div>
        <div className="relative min-h-0 px-3" onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const start = touchStartX.current; const end = event.changedTouches[0]?.clientX; touchStartX.current = null; if (start !== null && end !== undefined && Math.abs(end - start) > 48) move(end < start ? 1 : -1); }} onTouchCancel={() => { touchStartX.current = null; }}><Image src={active.photo.src} alt={active.photo.alt} width={active.photo.width} height={active.photo.height} quality={95} sizes={`(max-width: ${active.photo.width}px) 100vw, ${active.photo.width}px`} style={{ maxWidth: active.photo.width }} className="mx-auto max-h-[74dvh] w-full object-contain" /></div>
        <div className="flex justify-between px-4 py-3"><button type="button" onClick={() => move(-1)} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><ArrowLeft aria-hidden="true" />Previous</button><button type="button" onClick={() => move(1)} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Next<ArrowRight aria-hidden="true" /></button></div>
      </div>}
    </dialog>
  </>;
}
