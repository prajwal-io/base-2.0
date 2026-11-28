"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CirclePlay, ExternalLink } from "lucide-react";
import { BACKTOBASE_VIDEOS } from "@/data/videos";

type VideoFilter = "All videos" | "Event films" | "Community reviews";

function FeaturedVideoPoster({ id }: { id: string }) {
  const [maxResolutionUnavailable, setMaxResolutionUnavailable] = useState(false);

  return <Image
    src={`https://i.ytimg.com/vi/${id}/${maxResolutionUnavailable ? "hqdefault" : "maxresdefault"}.jpg`}
    onError={() => setMaxResolutionUnavailable(true)}
    alt=""
    width={1280}
    height={720}
    sizes="(min-width: 1024px) 58vw, 100vw"
    className="absolute inset-0 size-full object-cover opacity-80"
  />;
}

export function VideoGallery() {
  const [filter, setFilter] = useState<VideoFilter>("All videos");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const videos = BACKTOBASE_VIDEOS.filter((video) => filter === "All videos" || (filter === "Event films" ? video.kind === "Event film" : video.kind === "Community review"));
  const featured = videos.find(({ id }) => id === playingId) ?? videos[0];

  if (!featured) return null;

  return <section aria-label="Official BacktoBase videos" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
    <div className="grid gap-7 lg:grid-cols-[1.45fr_.75fr] lg:items-stretch">
      <div className="overflow-hidden rounded-3xl border border-border-subtle bg-charcoal-950 shadow-card">
        <div className="relative aspect-video bg-charcoal-900">
          {playingId === featured.id ? <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&rel=0`}
            title={featured.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          /> : <>
            <FeaturedVideoPoster key={featured.id} id={featured.id} />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/10 to-transparent" />
            <button type="button" onClick={() => setPlayingId(featured.id)} aria-label={`Play ${featured.title}`} className="absolute inset-0 grid place-items-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-amber">
              <span className="grid size-16 place-items-center rounded-full border border-white/45 bg-charcoal-950/55 backdrop-blur-sm transition-transform duration-200 group-hover:scale-105"><CirclePlay aria-hidden="true" className="size-9" /></span>
            </button>
            <p className="absolute bottom-5 left-5 right-5 text-xs font-bold uppercase tracking-[.16em] text-white/85">Edition {featured.edition} <span className="mx-2 text-brand-amber">/</span> {featured.kind}</p>
          </>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 text-white sm:p-7">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-amber">Featured from the archive</p><h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{featured.title}</h2></div>
          <a href={`https://youtu.be/${featured.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber">Watch on YouTube <ExternalLink aria-hidden="true" className="size-4" /></a>
        </div>
      </div>

      <div className="flex min-w-0 flex-col rounded-3xl border border-border-subtle bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="Filter videos">
          {(["All videos", "Event films", "Community reviews"] as const).map((option) => <button key={option} type="button" onClick={() => { setFilter(option); setPlayingId(null); }} aria-pressed={filter === option} className={`min-h-10 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${filter === option ? "border-charcoal-950 bg-charcoal-950 text-white" : "border-border-strong text-charcoal-700 hover:bg-canvas-subtle"}`}>{option}</button>)}
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:flex-1 lg:grid-cols-1 lg:content-start">
          {videos.map((video) => <button key={video.id} type="button" onClick={() => setPlayingId(video.id)} aria-current={featured.id === video.id ? "true" : undefined} className={`group flex min-w-0 items-center gap-3 rounded-2xl border p-2 text-left transition-[border-color,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${featured.id === video.id ? "border-brand-orange/55 bg-brand-orange/5" : "border-transparent hover:border-border-subtle hover:bg-canvas-subtle"}`}>
            <span className="relative block aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-charcoal-900 sm:w-32 lg:w-28">
              <Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" width={480} height={360} sizes="112px" loading="lazy" className="size-full object-cover transition-transform duration-200 group-hover:scale-[1.04] motion-reduce:transition-none" />
              <span className="absolute inset-0 grid place-items-center bg-black/15 text-white"><CirclePlay aria-hidden="true" className="size-6 drop-shadow" /></span>
            </span>
            <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-brand-orange-ink">Edition {video.edition} · {video.kind}</span><span className="mt-1 block text-sm font-semibold leading-snug text-charcoal-900">{video.title.replace(/^Edition \d+ · /, "")}</span></span>
          </button>)}
        </div>
        <a href="https://www.youtube.com/@BacktoBase_xyz" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-brand-orange-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">More on the official channel <ArrowUpRight aria-hidden="true" className="size-4" /></a>
      </div>
    </div>
  </section>;
}
