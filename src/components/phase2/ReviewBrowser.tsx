import Image from "next/image";
import Link from "next/link";
import { TESTIMONIALS } from "@/data/communityData";

export function ReviewBrowser() {
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {TESTIMONIALS.map((review) => <article key={review.slug} className="flex h-full flex-col rounded-3xl border border-border-subtle bg-white p-6 shadow-card">
        <blockquote className="flex-1 font-serif text-lg leading-relaxed text-charcoal-900">“{review.quote}”</blockquote>
        <div className="mt-6 flex items-center gap-3 border-t border-border-subtle pt-5">
          <Image src={review.avatar} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="font-semibold text-charcoal-950">{review.author}</p>
            <p className="text-sm text-charcoal-600">{review.role}</p>
          </div>
        </div>
        <Link href={`/testimonials/${review.slug}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand-orange-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">Read full review</Link>
      </article>)}
    </div>;
}
