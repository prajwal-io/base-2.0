import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { EDITIONS, TESTIMONIALS } from "@/data/communityData";
import { getEditionPhoto } from "@/data/editionPhotos";
import { TESTIMONIAL_EDITIONS } from "@/data/phase2-content";

type Props = { params: Promise<{ editionNumber: string }> };

export function generateStaticParams() {
  return EDITIONS.map(({ editionNumber }) => ({ editionNumber }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { editionNumber } = await params;
  const edition = EDITIONS.find((item) => item.editionNumber === editionNumber);
  if (!edition) return { title: "Edition — BacktoBase" };
  return { title: `Edition ${edition.editionNumber}: ${edition.title} — BacktoBase`, description: edition.overview };
}

export default async function EditionPage({ params }: Props) {
  const { editionNumber } = await params;
  const edition = EDITIONS.find((item) => item.editionNumber === editionNumber);
  if (!edition) notFound();
  const photo = getEditionPhoto(edition.editionNumber);
  const relatedReviews = TESTIMONIALS.filter((review) => TESTIMONIAL_EDITIONS[review.slug]?.includes(editionNumber));

  return <div className="flex flex-1 flex-col bg-canvas-base">
    <main id="main-content" tabIndex={-1} className="flex-grow py-10 sm:py-16">
      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href="/editions" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-charcoal-700 hover:text-brand-orange-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"><ArrowLeft aria-hidden="true" className="size-4" />All editions</Link>
        <header className="mt-6 grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-orange-ink">Edition {edition.editionNumber} · {edition.date}{edition.time ? ` · ${edition.time}` : ""}</p><h1 className="mt-3 font-display text-4xl font-black uppercase leading-[.98] tracking-[-.03em] text-charcoal-950 sm:text-6xl">{edition.title}</h1><p className="mt-4 text-lg text-charcoal-700">{edition.subtitle}</p></div>
          <p className="rounded-full border border-border-subtle bg-white px-4 py-2 text-sm font-semibold text-charcoal-800">{edition.venue} · {edition.location}</p>
        </header>
        {photo && <figure className="mt-8 overflow-hidden rounded-3xl border border-border-subtle bg-white"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} quality={95} priority sizes={`(max-width: ${Math.min(photo.width, 1152)}px) 100vw, ${Math.min(photo.width, 1152)}px`} style={{ maxWidth: Math.min(photo.width, 1152) }} className="mx-auto max-h-[70vh] w-full object-contain" /></figure>}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <section aria-labelledby="edition-about"><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-orange-ink">{edition.theme}</p><h2 id="edition-about" className="mt-2 font-display text-2xl font-extrabold text-charcoal-950">About this edition</h2><p className="mt-4 max-w-3xl text-base leading-7 text-charcoal-700">{edition.overview}</p>
            {edition.highlights?.length ? <><h3 className="mt-8 font-display text-xl font-bold text-charcoal-950">Highlights</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-charcoal-700">{edition.highlights.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
          </section>
          <section aria-labelledby="edition-speakers" className="rounded-3xl border border-border-subtle bg-white p-5 sm:p-7"><h2 id="edition-speakers" className="font-display text-2xl font-extrabold text-charcoal-950">Speakers</h2><ul className="mt-4 divide-y divide-border-subtle">{edition.speakers.map((speaker) => <li key={speaker.name} className="py-4 first:pt-0 last:pb-0"><p className="font-semibold text-charcoal-950">{speaker.name}</p><p className="mt-1 text-sm text-charcoal-700">{speaker.role}</p>{speaker.topic && <p className="mt-1 text-sm text-charcoal-600">{speaker.topic}</p>}{speaker.linkedin && <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-brand-orange-ink underline underline-offset-4">LinkedIn<ArrowUpRight aria-hidden="true" className="size-4" /></a>}</li>)}</ul></section>
        </div>
        {(edition.hosts?.length || edition.supporters?.length || edition.organizers?.length) && <section className="mt-10 grid gap-6 sm:grid-cols-2">
          {edition.hosts?.length ? <div><h2 className="font-display text-xl font-bold text-charcoal-950">Hosts</h2><ul className="mt-2 space-y-1 text-sm text-charcoal-700">{edition.hosts.map((person) => <li key={person}>{person}</li>)}</ul></div> : null}
          {edition.supporters?.length ? <div><h2 className="font-display text-xl font-bold text-charcoal-950">Supporters</h2><ul className="mt-2 space-y-1 text-sm text-charcoal-700">{edition.supporters.map((name) => <li key={name}>{name}</li>)}</ul></div> : null}
          {edition.organizers?.length ? <div><h2 className="font-display text-xl font-bold text-charcoal-950">Organizers</h2><ul className="mt-2 space-y-1 text-sm text-charcoal-700">{edition.organizers.map((name) => <li key={name}>{name}</li>)}</ul></div> : null}
        </section>}
        {relatedReviews.length > 0 && <section className="mt-10" aria-labelledby="edition-reviews"><h2 id="edition-reviews" className="font-display text-2xl font-extrabold text-charcoal-950">Community reflections</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{relatedReviews.map((review) => <article key={review.slug} className="rounded-2xl border border-border-subtle bg-white p-5"><blockquote className="font-serif text-base leading-relaxed text-charcoal-900">“{review.quote}”</blockquote><p className="mt-4 text-sm font-semibold text-charcoal-950">{review.author} <span className="font-normal text-charcoal-600">· {review.role}</span></p><Link href={`/testimonials/${review.slug}`} className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-brand-orange-ink underline underline-offset-4">Read full story</Link></article>)}</div></section>}
        <Link href="/highlights" className="mt-12 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-orange-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">See community highlights<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
      </article>
    </main>
    <Footer />
  </div>;
}
