"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const HERO_DIRECTIONS = [
  { id: "daylight", name: "Window light" },
  { id: "press", name: "Print pass" },
  { id: "assembly", name: "Modular assembly" },
  { id: "shadows", name: "Shadow play" },
  { id: "fold", name: "Paper theatre" },
  { id: "letterpress", name: "Letterpress" },
] as const;

export type HeroDirection = (typeof HERO_DIRECTIONS)[number]["id"];
export const FEATURED_HERO: HeroDirection = "fold";

const INK = "#38251c";
const ORANGE = "#c8552b";
const OCHRE = "#e6a050";
const TEAL = "#729c96";
const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroBackground({ variant }: { variant: HeroDirection }) {
  const reduced = useReducedMotion();
  const id = useId();

  function artwork(left: boolean) {
    const accent = left ? OCHRE : TEAL;
    const entry = left ? -1 : 1;

    switch (variant) {
      case "daylight":
        return (
          <motion.g
            initial={reduced ? false : { x: -76, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <path d="M-100 34 373 264 233 557-100 408Z" fill={accent} opacity=".22" />
            <path d="M-55 97 326 283M-48 188 290 353M-44 276 254 422" stroke="#faf7f2" strokeWidth="14" />
            <path d="M130 147-21 467" stroke="#faf7f2" strokeWidth="17" />
          </motion.g>
        );
      case "press":
        return (
          <>
            <motion.path
              d="M-38 114 291 66 332 230 147 391-37 346Z"
              fill={accent}
              initial={reduced ? false : { opacity: 0, x: -58 }}
              animate={{ opacity: 0.3, x: 0 }}
              transition={{ duration: 0.78, ease: EASE }}
            />
            <motion.path
              d="M-38 151 215 117 292 252 147 415-37 365Z"
              fill={`url(#${id}-${left ? "warm" : "cool"}-dots)`}
              initial={reduced ? false : { opacity: 0, y: 43 }}
              animate={{ opacity: 0.55, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            />
          </>
        );
      case "assembly":
        return (
          <>
            {[
              { x: -30, y: 145, w: 130, h: 105, round: 0 },
              { x: 107, y: 145, w: 101, h: 105, round: 48 },
              { x: -30, y: 257, w: 130, h: 102, round: 18 },
              { x: 107, y: 257, w: 162, h: 102, round: 48 },
              { x: 214, y: 174, w: 76, h: 76, round: 0 },
            ].map(({ x, y, w, h, round }, index) => (
              <motion.rect
                key={index}
                x={x}
                y={y}
                width={w}
                height={h}
                rx={round}
                fill={index % 2 === 0 ? accent : ORANGE}
                initial={reduced ? false : { x: -44, y: (index % 2 ? -1 : 1) * 32, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: index === 1 ? 0.42 : 0.22 }}
                transition={{ duration: 0.7, delay: reduced ? 0 : index * 0.1, ease: EASE }}
              />
            ))}
          </>
        );
      case "shadows":
        return (
          <motion.g
            initial={reduced ? false : { rotate: -12, x: -80, opacity: 0 }}
            animate={{ rotate: 0, x: 0, opacity: 1 }}
            transition={{ duration: 1.25, ease: EASE }}
          >
            <path d="M-30 54 310 205 268 296-30 171ZM-30 205 258 320 224 390-30 308Z" fill={INK} opacity=".08" />
            <path d="M-30 36 289 176 248 265-30 150ZM-30 185 237 294 203 364-30 284Z" fill={accent} opacity=".26" />
            <path d="M-30 36 289 176 248 265M-30 185 237 294 203 364" stroke={INK} strokeOpacity=".2" fill="none" />
          </motion.g>
        );
      case "fold": {
        const fold = left
          ? {
              silhouette: "M-38 62 258 115 173 229 296 332 -38 390Z",
              surface: "M-38 62 258 115 137 184 173 229 -38 269Z",
              seam: "M-38 269 173 229 296 332 -38 390Z",
              lip: "M137 184 258 115 173 229Z",
              grain: "M-38 287 171 245 246 319 -38 369Z",
            }
          : {
              silhouette: "M-38 126 265 168 193 270 303 364 41 463 -38 413Z",
              surface: "M-38 126 265 168 153 230 193 270 -38 321Z",
              seam: "M-38 321 193 270 303 364 41 463 -38 413Z",
              lip: "M153 230 265 168 193 270Z",
              grain: "M-38 338 192 287 263 359 41 442 -38 395Z",
            };

        return (
          <>
            <motion.g
              style={{ transformBox: "fill-box", transformOrigin: left ? "left center" : "right center" }}
              initial={reduced ? false : { x: 42 * entry, y: 22 * entry, scaleX: 0.08, opacity: 0 }}
              animate={{ x: 0, y: 0, scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <path d={fold.silhouette} fill={accent} fillOpacity=".22" />
              <path d={fold.silhouette} fill={INK} opacity=".07" transform="translate(7 11)" />
              <path d={fold.surface} fill={accent} fillOpacity=".24" />
              <path d={fold.seam} fill={accent} fillOpacity=".35" />
              <path d={fold.grain} fill={`url(#${id}-${left ? "warm" : "cool"}-dots)`} opacity=".37" />
              <path d={fold.surface} stroke={INK} strokeOpacity=".14" fill="none" />
            </motion.g>
            <motion.path
              d={fold.lip}
              fill={left ? ORANGE : "#4c7671"}
              style={{ transformBox: "fill-box", transformOrigin: "left center" }}
              initial={reduced ? false : { scaleX: 0.24, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.65 }}
              transition={{ duration: 0.78, delay: reduced ? 0 : 0.35, ease: EASE }}
            />
          </>
        );
      }
    }
  }

  if (variant === "letterpress") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 620"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          focusable="false"
        >
          <motion.g
            initial={reduced ? false : { x: -42, y: 36, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.15, ease: EASE }}
          >
            <g transform="rotate(-13 600 310)" fontFamily="var(--font-display), sans-serif" fontWeight="900">
              <text x="-55" y="300" fontSize="282" fill={ORANGE} fillOpacity=".07">BACKTO</text>
              <text x="365" y="562" fontSize="310" fill="#386b65" fillOpacity=".07">BASE</text>
            </g>
          </motion.g>
        </svg>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 mx-auto max-w-[1600px] overflow-hidden">
      {(["left", "right"] as const).map((side) => {
        const left = side === "left";
        return (
          <svg
            key={side}
            viewBox="0 0 370 500"
            className={`absolute top-1/2 w-40 -translate-y-1/2 opacity-55 sm:w-[22%] sm:opacity-100 lg:w-[24%] xl:w-[28%] ${left ? "-left-20 sm:left-0" : "-right-20 -scale-x-100 sm:right-0"}`}
            focusable="false"
          >
            <defs>
              <pattern id={`${id}-${left ? "warm" : "cool"}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.85" fill={left ? ORANGE : "#386b65"} />
              </pattern>
            </defs>
            {artwork(left)}
          </svg>
        );
      })}
    </div>
  );
}
