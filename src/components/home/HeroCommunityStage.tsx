"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { backtoBaseCrewArtwork as artwork } from "@/data/crewArtwork";

export const COMMUNITY_STAGES = [
  { id: "room", label: "Make Room", note: "The crew gathers, then opens a place for you in the middle." },
  { id: "journey", label: "From Idea to Action", note: "A conversation leads to a project, then to someone ready to share it." },
  { id: "floor", label: "Take the Floor", note: "The light passes from an introduction to the student builder. A camera captures the moment." },
] as const;

export type CommunityStage = (typeof COMMUNITY_STAGES)[number]["id"];
type Scene = keyof typeof artwork.crops;

const EASE = [0.22, 1, 0.36, 1] as const;
// The hero shows the characters at a larger size than the shared footer treatment.
const HERO_CREW_SRC = "/images/footer-community-crew-v3.png";

function CrewScene({ scene, brandedLaptop = false }: { scene: Scene; brandedLaptop?: boolean }) {
  const crop = artwork.crops[scene];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="block h-full w-auto max-w-full"
      viewBox={`${crop.x} 0 ${crop.width} ${artwork.height}`}
      overflow="hidden"
    >
      <image href={HERO_CREW_SRC} width={artwork.width} height={artwork.height} preserveAspectRatio="none" />
      {brandedLaptop && (
        <g transform="matrix(1 -.08 -.24 1 1133 363)">
          <rect width="75" height="53" rx="7" fill="#f8efe2" stroke="#e2cdb4" strokeWidth="2" />
          <image href="/images/backtobase-logo-full-transparent.png" x="4" y="18" width="67" height="15" preserveAspectRatio="xMidYMid meet" />
        </g>
      )}
    </svg>
  );
}

export function HeroCommunityStage({ variant }: { variant: CommunityStage }) {
  const reduced = useReducedMotion();

  if (variant === "room") {
    return (
      <div className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-end gap-2 px-3 sm:gap-6 sm:px-8">
        {(["founder", "community"] as const).map((scene, index) => (
          <motion.div
            key={scene}
            aria-hidden="true"
            className={`row-start-1 flex h-24 items-end sm:h-44 lg:h-52 ${index === 0 ? "col-start-1 justify-end" : "col-start-3 justify-start"}`}
            initial={reduced ? false : { opacity: 0, clipPath: "inset(100% 0 0)", x: index === 0 ? 32 : -32 }}
            animate={{
              opacity: 1,
              clipPath: "inset(0% 0 0)",
              x: 0,
            }}
            transition={{
              opacity: { duration: reduced ? 0 : 0.45 },
              clipPath: { duration: reduced ? 0 : 0.8, ease: EASE },
              x: { duration: reduced ? 0 : 0.62, delay: reduced ? 0 : 0.62, ease: EASE },
            }}
          >
            <CrewScene scene={scene} />
          </motion.div>
        ))}
        <motion.div
          className="col-start-2 row-start-1 pb-1"
          initial={reduced ? false : { opacity: 0.7, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.92, ease: EASE }}
        >
          <Link
            href="/community"
            className="flex min-h-12 items-center justify-center rounded-[50%] border border-dashed border-[#a45131]/65 bg-[#f6e9dd] px-3 text-center text-[11px] font-semibold text-[#793822] hover:bg-[#f2dcc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-16 sm:px-6 sm:text-sm"
          >
            Meet the crew
          </Link>
        </motion.div>
      </div>
    );
  }

  if (variant === "journey") {
    const stops = [
      { scene: "connector", label: "Meet someone" },
      { scene: "builder", label: "Make something" },
      { scene: "creator", label: "Share what you made" },
    ] as const;

    return (
      <ol className="relative mx-auto mt-8 grid w-full max-w-3xl grid-cols-3 px-3 sm:px-6">
        {stops.map(({ scene, label }, index) => (
          <li key={scene} className="relative flex flex-col items-center justify-end text-center">
            <motion.div
              className="h-24 sm:h-40"
              initial={reduced ? false : { opacity: 0.35, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.15 + index * 0.52, ease: EASE }}
            >
              <CrewScene scene={scene} />
            </motion.div>
            <div aria-hidden="true" className="relative mt-2 flex w-full justify-center border-t border-[#bc8b68]/50">
              <motion.span
                className="-mt-1 size-2 rounded-full bg-brand-orange"
                initial={reduced ? false : { opacity: 0.4, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.57 + index * 0.52 }}
              />
            </div>
            <span className="mt-3 px-2 text-xs font-semibold text-charcoal-800 sm:text-sm">{label}</span>
          </li>
        ))}
      </ol>
    );
  }

  return <TakeTheFloor reduced={Boolean(reduced)} />;
}

function TakeTheFloor({ reduced }: { reduced: boolean }) {
  const stageRef = useRef<HTMLElement>(null);
  const inView = useInView(stageRef);

  return (
    <figure ref={stageRef} data-in-view={inView} className="hero-crew-stage relative mx-auto mt-5 w-full max-w-4xl px-3 sm:mt-6 sm:px-8">
      <div aria-hidden="true" className="relative isolate px-1 sm:px-4">
        <motion.div
          className="absolute inset-x-[12%] inset-y-0 -z-10 origin-bottom bg-[radial-gradient(ellipse_at_bottom,#efbf86_0%,#f6e2c5_32%,transparent_71%)]"
          initial={reduced ? false : { opacity: 0, scaleX: 0.38 }}
          animate={{ opacity: 0.9, scaleX: 1 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.52, ease: EASE }}
        />

        <div className="relative grid grid-cols-[1fr_1.16fr_0.9fr] items-end border-b border-[#956040]/30">
          <motion.div
            className="relative flex h-[clamp(7.5rem,29vw,10rem)] min-w-0 justify-center sm:h-52 lg:h-64"
            initial={reduced ? false : { opacity: 0.45, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.64, delay: reduced ? 0 : 0.28, ease: EASE }}
          >
            <div className="hero-crew-float h-full min-w-0">
              <CrewScene scene="founder" />
            </div>
          </motion.div>

          <div className="relative flex h-[clamp(11.5rem,46vw,15rem)] min-w-0 justify-center sm:h-[18rem] lg:h-[22rem]">
            <motion.div
              className="absolute bottom-0 left-1/2 h-3 w-5/6 -translate-x-1/2 rounded-[50%] bg-[#b46528]/20"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.65 }}
            />
            <motion.div
              className="relative h-full min-w-0"
              initial={reduced ? false : { opacity: 0.45, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.68, delay: reduced ? 0 : 0.46, ease: EASE }}
            >
              <div className="hero-crew-float h-full min-w-0 [--crew-delay:-2s]">
                <CrewScene scene="builder" brandedLaptop />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex h-[clamp(8.5rem,33vw,11rem)] min-w-0 justify-center sm:h-56 lg:h-[17rem]"
            initial={reduced ? false : { opacity: 0.45, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.62, delay: reduced ? 0 : 0.64, ease: EASE }}
          >
            <div className="hero-crew-float relative h-full min-w-0 [--crew-delay:-4s]">
              <CrewScene scene="creator" />
              <span
                className="hero-crew-star absolute right-[12%] top-[13%] size-3 bg-[#fff5da] [--crew-delay:-0.8s] [clip-path:polygon(50%_0,62%_37%,100%_50%,62%_63%,50%_100%,38%_63%,0_50%,38%_37%)]"
              />
              <span
                className="hero-crew-star absolute right-[27%] top-[7%] size-2 bg-[#fff5da] [--crew-delay:-2.7s] [clip-path:polygon(50%_0,62%_37%,100%_50%,62%_63%,50%_100%,38%_63%,0_50%,38%_37%)]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <figcaption className="mt-4 text-center">
        <Link
          href="/events#edition-05"
          className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-[#843918] hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <span className="relative">
            See students take the stage
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-1 h-px origin-left bg-[#c88866]"
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : 0.75, ease: EASE }}
            />
          </span>
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </figcaption>
    </figure>
  );
}
