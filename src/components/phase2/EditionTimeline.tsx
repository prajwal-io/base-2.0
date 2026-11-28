"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { EDITIONS } from "@/data/communityData";
import { getEditionPhoto } from "@/data/editionPhotos";

export function EditionTimeline() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 72%", "end 72%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 35, mass: 0.35 });

  return <ol ref={timelineRef} aria-label="BacktoBase editions, in chronological order" className="relative space-y-7 before:absolute before:bottom-5 before:left-[1.1rem] before:top-5 before:w-px before:bg-border-strong sm:space-y-9 sm:before:left-[1.35rem]">
    <motion.span aria-hidden="true" className="absolute bottom-5 left-[1.1rem] top-5 z-[1] w-[2px] origin-top bg-brand-orange sm:left-[1.35rem]" style={{ scaleY: reduceMotion ? 1 : progress }} />
    {EDITIONS.map((edition, index) => {
      const photo = getEditionPhoto(edition.editionNumber);
      return <motion.li key={edition.editionNumber} initial={reduceMotion ? false : { opacity: 0, transform: "translateY(14px)" }} whileInView={{ opacity: 1, transform: "translateY(0px)" }} viewport={{ once: true, amount: 0.12, margin: "-40px" }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} className="relative pl-12 sm:pl-16">
        <span aria-hidden="true" className="absolute left-[.61rem] top-6 z-[2] grid size-5 place-items-center rounded-full border-[5px] border-canvas-base bg-brand-orange shadow-[0_0_0_1px_var(--color-brand-orange)] sm:left-[.98rem]" />
        <article className="group grid overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-card transition-[box-shadow,transform] duration-200 hover:shadow-photo motion-reduce:transition-none md:min-h-64 md:grid-cols-[.88fr_1.12fr]">
          {photo && <Link href={`/editions/${edition.editionNumber}`} aria-label={`Explore Edition ${edition.editionNumber}`} className={`relative block min-h-52 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange md:min-h-64 ${index % 2 ? "md:order-2" : ""}`}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 768px) 38vw, 100vw" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" /><span className="absolute left-4 top-4 rounded-full bg-canvas-base/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-charcoal-800">Edition {edition.editionNumber}</span></Link>}
          <div className="flex flex-col justify-center p-5 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-orange-ink">{edition.date} <span className="px-1 text-brand-cyan">/</span> {edition.venue}</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-charcoal-950 sm:text-3xl">{edition.title}</h2>
            <p className="mt-3 text-sm leading-6 text-charcoal-700">{edition.overview}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[.08em] text-charcoal-600">{edition.location}</p>
            <Link href={`/editions/${edition.editionNumber}`} className="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-brand-orange-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">Explore Edition {edition.editionNumber}<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </div>
        </article>
      </motion.li>;
    })}
  </ol>;
}
