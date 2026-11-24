import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { TESTIMONIALS } from "@/data/communityData";

type TestimonialPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TESTIMONIALS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: TestimonialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const testimonial = TESTIMONIALS.find((item) => item.slug === slug);

  if (!testimonial) return { title: "Community Story — BacktoBase" };

  return {
    title: `${testimonial.author}'s Story — BacktoBase`,
    description: testimonial.quote,
  };
}

export default async function TestimonialPage({ params }: TestimonialPageProps) {
  const { slug } = await params;
  const testimonial = TESTIMONIALS.find((item) => item.slug === slug);

  if (!testimonial) notFound();

  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main className="flex flex-1 items-center py-12 sm:py-20">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#community-stories"
            className="group mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-charcoal-700 transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to community stories
          </Link>

          <article className="rounded-3xl border border-border-subtle bg-white p-6 shadow-card sm:p-10 lg:p-14">
            <div className="mx-auto max-w-3xl">
              <header className="mb-8 flex items-center gap-4 border-b border-border-subtle pb-6">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  priority
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-display text-lg font-extrabold text-charcoal-950">
                    {testimonial.author}
                  </p>
                  <p className="mt-1 text-sm text-charcoal-600">{testimonial.role}</p>
                </div>
              </header>
              <div>
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange sm:text-xs">
                  {"longReview" in testimonial ? "Full review" : "Full quote"}
                </p>
                {"longReview" in testimonial ? (
                  <div className="space-y-5 font-serif text-lg leading-relaxed text-charcoal-800 sm:text-xl">
                    <blockquote className="border-l-2 border-brand-amber pl-5 text-charcoal-950">
                      “{testimonial.quote}”
                    </blockquote>
                    <p>{testimonial.longReview}</p>
                  </div>
                ) : (
                  <blockquote className="font-serif text-2xl leading-snug text-charcoal-950 sm:text-3xl lg:text-4xl">
                    “{testimonial.quote}”
                  </blockquote>
                )}
              </div>
            </div>
          </article>

          <Link
            href="/#community-stories"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4"
          >
            More community stories
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
