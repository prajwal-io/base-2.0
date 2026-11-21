"use client";

import { motion, useReducedMotion } from "framer-motion";
import { backtoBaseCrewArtwork as artwork } from "@/data/crewArtwork";

export const HERO_CREW_DIRECTIONS = [
  { id: "welcome", name: "The Welcome" },
  { id: "makers", name: "In the Making" },
  { id: "roll-call", name: "Crew Roll Call" },
] as const;

export type HeroCrewDirection = (typeof HERO_CREW_DIRECTIONS)[number]["id"];
type Scene = keyof typeof artwork.crops;
type RollCallRole = Exclude<Scene, "founder">;

export const ROLL_CALL_CUTS = [
  { id: "introductions", name: "First Introduction", note: "An introduction leads to a laptop demo, a photo, and an invitation into the group." },
  { id: "demo", name: "Show and Tell", note: "The builder shares a project first. The connector and host bring people closer, and the creator captures the moment." },
  { id: "welcome-in", name: "Come On In", note: "The host welcomes someone first. The connector, builder, and creator each pick up the exchange." },
] as const;

export type RollCallCut = (typeof ROLL_CALL_CUTS)[number]["id"];

const ROLL_CALL_TIMING: Record<RollCallCut, Record<RollCallRole, number>> = {
  introductions: { connector: 0.45, builder: 1.22, creator: 2.02, community: 2.78 },
  demo: { builder: 0.48, connector: 1.16, community: 1.94, creator: 2.78 },
  "welcome-in": { community: 0.42, connector: 1.14, builder: 1.97, creator: 2.78 },
};

const ROLL_CALL_GESTURES: Record<RollCallRole, { x: number[]; y: number[]; rotate: number[] }> = {
  connector: { x: [0, 7, 3, 0], y: [0, -1, 0, 0], rotate: [0, 3, 2, 0] },
  builder: { x: [0, 0, 6, 0], y: [0, 0, -5, 0], rotate: [0, -1, 3, 0] },
  creator: { x: [0, -3, -3, 0], y: [0, -3, -3, 0], rotate: [0, -3, -3, 0] },
  community: { x: [0, -9, -4, 0], y: [0, 0, 0, 0], rotate: [0, -3, -2, 0] },
};

const CAST: Record<HeroCrewDirection, readonly [readonly Scene[], readonly Scene[]]> = {
  welcome: [["founder"], ["community"]],
  makers: [["builder"], ["creator"]],
  "roll-call": [["connector", "builder"], ["creator", "community"]],
};

export function HeroCrew({ variant, cut }: { variant: HeroCrewDirection; cut?: RollCallCut }) {
  const reduced = useReducedMotion();
  const rollCall = variant === "roll-call";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none mx-auto mt-7 flex w-full max-w-[1400px] justify-center gap-4 px-4 sm:gap-8 lg:absolute lg:inset-0 lg:mt-0 lg:justify-between lg:gap-0"
    >
      {CAST[variant].map((scenes, side) => (
        <div
          key={side}
          className={`flex items-center gap-3 lg:w-[22%] lg:flex-col lg:justify-center ${side === 0 ? "lg:-translate-y-10" : "lg:translate-y-10"}`}
        >
          {scenes.map((scene, index) => {
            const crop = artwork.crops[scene];
            const direction = side === 0 ? -1 : 1;
            const delay = 0.12 + side * 0.24 + index * 0.16;
            const role = cut && rollCall && scene !== "founder" ? scene : undefined;
            const beat = cut && role ? ROLL_CALL_TIMING[cut][role] : 0;
            const gesture = role ? ROLL_CALL_GESTURES[role] : undefined;

            return (
              <motion.div
                key={scene}
                className={`relative grid shrink-0 origin-bottom place-items-center ${role && side === 1 ? "hidden lg:grid" : ""}`}
                initial={reduced || gesture ? false : {
                  opacity: 0,
                  x: variant === "welcome" ? direction * 24 : 0,
                  y: variant === "welcome" ? 0 : 22,
                  rotate: variant === "makers" ? direction * 4 : 0,
                }}
                animate={gesture && !reduced ? gesture : { opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{
                  duration: reduced ? 0 : gesture ? 0.86 : 0.72,
                  delay: reduced ? 0 : gesture ? beat : delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={`absolute inset-x-[8%] bottom-0 h-2 rounded-[50%] ${side === 0 ? "bg-[#a96325]/15" : "bg-[#457269]/15"}`} />
                <svg
                  viewBox={`${crop.x} 0 ${crop.width} ${artwork.height}`}
                  className={`relative block w-auto ${rollCall ? "h-20 lg:h-36 xl:h-40" : "h-28 lg:h-56 xl:h-64"}`}
                  style={{ aspectRatio: `${crop.width} / ${artwork.height}` }}
                  overflow="hidden"
                  focusable="false"
                >
                  <image href={artwork.src} width={artwork.width} height={artwork.height} preserveAspectRatio="none" />
                </svg>
                {role === "creator" && !reduced && (
                  <motion.span
                    className="absolute right-[11%] top-[14%] h-3 w-3 rounded-full bg-[#fff1ca] shadow-[0_0_12px_4px_#f8bd59]"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1, 0.8] }}
                    transition={{ duration: 0.22, delay: beat + 0.37 }}
                  />
                )}
                {variant === "makers" && side === 1 && (
                  <motion.span
                    className="absolute right-[12%] top-[15%] text-xl leading-none text-brand-orange"
                    initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                    animate={reduced ? { opacity: 0.65 } : { opacity: [0, 0.85, 0], scale: [0.7, 1, 1.2] }}
                    transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.83 }}
                  >
                    ✦
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
