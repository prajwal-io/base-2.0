import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageSquareQuote, Play } from "lucide-react";

export function HomepageExperienceLinks() {
  return (
    <section aria-labelledby="community-experiences-title" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-3 border-b border-border-subtle pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">Beyond the event day</p>
            <h2 id="community-experiences-title" className="mt-2 max-w-3xl font-display text-3xl font-black uppercase leading-tight tracking-tight text-charcoal-950 sm:text-4xl">
              The movement keeps going.
            </h2>
          </div>
          <Link href="/highlights" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-charcoal-900 underline decoration-brand-orange/50 underline-offset-4 transition-colors hover:text-brand-orange-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:self-auto">
            Explore all highlights <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/highlights" className="group overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-photo motion-reduce:transition-none">
            <Image src="/images/editions/07/photo.png" alt="BacktoBase community gathered during Edition 07" width={1531} height={862} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-[1.8/1] w-full object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none" />
            <div className="flex min-h-24 items-center justify-between gap-4 p-5">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-orange-ink">In pictures</p><h3 className="mt-1 font-display text-xl font-bold text-charcoal-950">Community highlights</h3></div>
              <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-brand-orange-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
          <Link href="/reviews" className="group flex min-h-64 flex-col justify-between rounded-2xl border border-border-subtle bg-canvas-subtle p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-card motion-reduce:transition-none">
            <MessageSquareQuote aria-hidden="true" className="size-7 text-brand-orange-ink" />
            <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-charcoal-500">From the people who make it</p><h3 className="mt-2 font-display text-2xl font-bold leading-tight text-charcoal-950">Community reviews</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-charcoal-800">Read their stories <ArrowUpRight aria-hidden="true" className="size-4 text-brand-orange-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div>
          </Link>
          <a href="https://www.youtube.com/@BacktoBase_xyz" target="_blank" rel="noopener noreferrer" className="group flex min-h-64 flex-col justify-between rounded-2xl bg-canvas-dark p-6 text-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-photo motion-reduce:transition-none">
            <Play aria-hidden="true" className="size-7 text-brand-amber" />
            <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/65">Official channel</p><h3 className="mt-2 font-display text-2xl font-bold leading-tight">Watch the stories. Experience the journey.</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-amber">Visit BacktoBase on YouTube <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div>
          </a>
        </div>
      </div>
    </section>
  );
}

export function UpcomingEventsNote() {
  return (
    <section aria-labelledby="upcoming-title" className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-border-subtle bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange-ink">Upcoming events</p>
          <h2 id="upcoming-title" className="mt-1 font-display text-xl font-bold text-charcoal-950 sm:text-2xl">No upcoming events are published yet.</h2>
          <p className="mt-1 text-sm leading-relaxed text-charcoal-700">Check back for confirmed dates. Until then, explore the editions so far.</p>
        </div>
        <Link href="/editions" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border-strong px-5 text-sm font-semibold text-charcoal-900 transition-colors hover:bg-canvas-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:self-auto">
          Explore editions <ArrowUpRight aria-hidden="true" className="size-4 text-brand-orange-ink" />
        </Link>
      </div>
    </section>
  );
}
