"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { TestimonialCard, type TestimonialAuthor } from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(marqueeRef);
  const [paused, setPaused] = useState(false);

  if (testimonials.length === 0) return null;

  return (
    <section
      id="community-stories"
      aria-labelledby="community-stories-title"
      className={cn("border-y border-border-subtle bg-canvas-subtle py-16 sm:py-24", className)}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:gap-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink sm:text-xs">
            Voices of the community
          </p>
          <h2
            id="community-stories-title"
            className="font-display text-3xl font-black uppercase leading-[0.98] tracking-tight text-charcoal-950 sm:text-5xl"
          >
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
            {description}
          </p>
          <button
            type="button"
            aria-controls="community-stories-track"
            aria-pressed={paused}
            onClick={() => setPaused((current) => !current)}
            className="inline-flex min-h-11 items-center rounded-full border border-border-strong bg-white px-4 text-sm font-semibold text-charcoal-800 transition-colors hover:bg-canvas-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            {paused ? "Resume motion" : "Pause & browse reviews"}
          </button>
        </div>

        <div
          ref={marqueeRef}
          data-in-view={inView}
          data-paused={paused}
          className="testimonials-marquee-window w-full overflow-hidden"
          role="region"
          aria-label="Community testimonials"
        >
          <div id="community-stories-track" className="testimonials-marquee-track flex w-max">
            <div className="testimonials-marquee-group flex shrink-0 gap-4 pr-4">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.href}
                  {...testimonial}
                  className="min-h-64"
                />
              ))}
            </div>
            <div
              className="testimonials-marquee-group flex shrink-0 gap-4 pr-4"
              aria-hidden="true"
              inert
            >
              {testimonials.map((testimonial) => (
                <div
                  key={`duplicate-${testimonial.href}`}
                  className="pointer-events-none"
                >
                  <TestimonialCard {...testimonial} className="min-h-64" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
