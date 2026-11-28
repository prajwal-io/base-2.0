"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type CrewKind = "founder" | "connector" | "builder" | "creator" | "community";
export type CrewSeat = "top" | "front" | "behind";
export type DoodleKind =
  | "rocket"
  | "bulb"
  | "laptop"
  | "base"
  | "star"
  | "sparkle"
  | "bolt"
  | "plane"
  | "sprout";
export type FooterPreset = "paper" | "night";

export interface FooterPalette {
  background?: string;
  ink?: string;
  accent?: string;
}

export interface CrewMember {
  kind: CrewKind;
  letter: number;
  seat: CrewSeat;
  offset?: number;
  scale?: number;
  flip?: boolean;
  name: string;
  says: string;
}

export type SocialKind = "instagram" | "linkedin" | "youtube" | "whatsapp";

export interface FooterSocial {
  kind: SocialKind;
  label: string;
  href: string;
}

export interface FooterNavLink {
  label: string;
  href: string;
  mobileHref?: string;
  emphasis?: boolean;
  target?: "_blank" | "_self";
  rel?: string;
}

export interface DoodleCrewFooterProps {
  id?: string;
  className?: string;
  wordmark?: string;
  tagline?: string;
  crew?: CrewMember[];
  crewArtwork?: {
    src: string;
    width: number;
    height: number;
    crops: Record<CrewKind, { x: number; width: number }>;
  };
  doodles?: DoodleKind[];
  doodleCount?: number;
  crewShower?: boolean;
  preset?: FooterPreset;
  palette?: FooterPalette;
  fontFamily?: string;
  serifFamily?: string;
  tracking?: number;
  interactive?: boolean;
  height?: string | number;
  links?: FooterNavLink[];
  socials?: FooterSocial[];
  showCredit?: boolean;
  closingMarquee?: string;
}

export interface GlyphBox {
  char: string;
  index: number;
  x: number;
  cx: number;
  width: number;
  top: number;
  bottom: number;
}

export interface WordLayout {
  fontSize: number;
  baselineY: number;
  capTopY: number;
  totalWidth: number;
  startX: number;
  glyphs: GlyphBox[];
}

export interface FloaterState {
  id: number;
  kind: DoodleKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  scale: number;
  phase: number;
  pop: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface TimelineSchedule {
  letter: (index: number) => number;
  crew: (index: number) => number;
  ground: () => number;
  word: (index: number) => number;
}

/* -------------------------------------------------------------------------- */
/* Constants & Defaults                                                       */
/* -------------------------------------------------------------------------- */

export const SCENE_WIDTH = 1200;
export const SCENE_HEIGHT = 420;
const SCENE_MARGIN_X = 86;
const BASE_FONT_SIZE = 204;
const BASELINE_Y = 342;
const CAP_RATIO = 0.72;

const SHOWER_MARKS = [
  { x: 102, y: 22, mark: "spark", delay: 200 },
  { x: 193, y: 48, mark: "dot", delay: 450 },
  { x: 287, y: 18, mark: "dash", delay: 0 },
  { x: 347, y: 58, mark: "link", delay: 320 },
  { x: 417, y: 29, mark: "dot", delay: 510 },
  { x: 510, y: 47, mark: "spark", delay: 160 },
  { x: 597, y: 13, mark: "dash", delay: 610 },
  { x: 655, y: 32, mark: "link", delay: 370 },
  { x: 790, y: 37, mark: "dot", delay: 260, front: true },
  { x: 827, y: 21, mark: "spark", delay: 80 },
  { x: 866, y: 61, mark: "dash", delay: 530 },
  { x: 950, y: 51, mark: "spark", delay: 420, front: true },
  { x: 985, y: 27, mark: "link", delay: 180 },
  { x: 1102, y: 44, mark: "dot", delay: 660 },
];

function CrewShower({ capTop, front = false }: { capTop: number; front?: boolean }) {
  return (
    <g aria-hidden="true" className="dcf-shower">
      {SHOWER_MARKS.map(({ x, y, mark, delay, front: inFront }, index) =>
        Boolean(inFront) === front && (
          <g key={x} transform={`translate(${x} ${y})`}>
            <g
              className="dcf-rain-mark"
              data-extra={index % 2 !== 0}
              data-static={index % 4 === 0}
              data-mark={mark}
              style={{
                "--rain-drop": `${capTop - (front ? 53 : 25) - y}px`,
                "--rain-delay": `${320 + delay}ms`,
                "--rain-drift": `${index % 2 === 0 ? 12 : -9}px`,
              } as React.CSSProperties}
            >
              {mark === "spark" && <path d="M0-7 Q0-1 6 0 Q0 1 0 7 Q0 1-6 0 Q0-1 0-7Z" />}
              {mark === "dot" && <circle r="2.8" />}
              {mark === "dash" && <path d="M2-5 Q0-1-2 4" />}
              {mark === "link" && <path d="M-2 1 2-1 M-2 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0 M6-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />}
            </g>

          </g>
        ),
      )}
    </g>
  );
}

const PRESET_PALETTES: Record<FooterPreset, Required<FooterPalette>> = {
  paper: {
    background: "#FFF8F0",
    ink: "#171717",
    accent: "#F4511E",
  },
  night: {
    background: "#111215",
    ink: "#FAF7F2",
    accent: "#EA580C",
  },
};

export const DEFAULT_CREW: CrewMember[] = [
  {
    kind: "founder",
    letter: 0,
    seat: "top",
    offset: 0.08,
    scale: 1,
    name: "Founder",
    says: "Every idea starts somewhere.",
  },
  {
    kind: "connector",
    letter: 3,
    seat: "top",
    offset: -0.04,
    scale: 1,
    name: "Connector",
    says: "Meet your next collaborator.",
  },
  {
    kind: "builder",
    letter: 4,
    seat: "front",
    offset: -0.14,
    scale: 0.96,
    name: "Builder",
    says: "Let's build it together.",
  },
  {
    kind: "creator",
    letter: 6,
    seat: "top",
    offset: 0.06,
    scale: 1,
    name: "Creator",
    says: "Share what you're making.",
  },
  {
    kind: "community",
    letter: 9,
    seat: "front",
    offset: 0.58,
    scale: 1,
    name: "Community",
    says: "Find your people.",
  },
];

export const DEFAULT_DOODLES: DoodleKind[] = [
  "rocket",
  "bulb",
  "laptop",
  "base",
  "star",
  "sparkle",
  "bolt",
  "plane",
  "sprout",
];

const FALLBACK_CHAR_RATIOS: Record<string, number> = {
  A: 0.69,
  B: 0.66,
  C: 0.67,
  D: 0.69,
  E: 0.59,
  F: 0.56,
  G: 0.7,
  H: 0.7,
  I: 0.32,
  J: 0.52,
  K: 0.66,
  L: 0.56,
  M: 0.84,
  N: 0.7,
  O: 0.73,
  P: 0.63,
  Q: 0.74,
  R: 0.66,
  S: 0.62,
  T: 0.61,
  U: 0.69,
  V: 0.67,
  W: 0.9,
  X: 0.66,
  Y: 0.64,
  Z: 0.62,
  " ": 0.32,
};

/* -------------------------------------------------------------------------- */
/* Pure Helpers                                                               */
/* -------------------------------------------------------------------------- */

export function hash(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function layoutWord(
  word: string,
  options?: {
    sceneWidth?: number;
    marginX?: number;
    baseFontSize?: number;
    baselineY?: number;
    tracking?: number;
    measureChar?: (char: string, fontSize: number) => number;
  },
): WordLayout {
  const sceneWidth = options?.sceneWidth ?? SCENE_WIDTH;
  const marginX = options?.marginX ?? SCENE_MARGIN_X;
  const baseFontSize = options?.baseFontSize ?? BASE_FONT_SIZE;
  const baselineY = options?.baselineY ?? BASELINE_Y;
  const tracking = options?.tracking ?? -0.026;
  const chars = Array.from(word);

  if (chars.length === 0) {
    return {
      fontSize: baseFontSize,
      baselineY,
      capTopY: baselineY - baseFontSize * CAP_RATIO,
      totalWidth: 0,
      startX: sceneWidth / 2,
      glyphs: [],
    };
  }

  const measure =
    options?.measureChar ??
    ((ch: string, size: number) => (FALLBACK_CHAR_RATIOS[ch.toUpperCase()] ?? 0.66) * size);

  const rawWidths = chars.map((ch) => Math.max(measure(ch, baseFontSize), baseFontSize * 0.28));
  const trackingPx = tracking * baseFontSize;
  const rawTotal =
    rawWidths.reduce((sum, w) => sum + w, 0) + Math.max(0, chars.length - 1) * trackingPx;
  const maxWidth = sceneWidth - marginX * 2;
  const scale = rawTotal > maxWidth ? maxWidth / rawTotal : 1;

  const fontSize = baseFontSize * scale;
  const scaledWidths = rawWidths.map((w) => w * scale);
  const scaledTracking = trackingPx * scale;
  const totalWidth =
    scaledWidths.reduce((sum, w) => sum + w, 0) + Math.max(0, chars.length - 1) * scaledTracking;
  const startX = (sceneWidth - totalWidth) / 2;
  const capTopY = baselineY - fontSize * CAP_RATIO;

  const glyphs: GlyphBox[] = [];
  let cursorX = startX;
  for (let i = 0; i < chars.length; i += 1) {
    const width = scaledWidths[i];
    glyphs.push({
      char: chars[i],
      index: i,
      x: cursorX,
      cx: cursorX + width / 2,
      width,
      top: capTopY,
      bottom: baselineY,
    });
    cursorX += width + scaledTracking;
  }

  return {
    fontSize,
    baselineY,
    capTopY,
    totalWidth,
    startX,
    glyphs,
  };
}

export function seatPoint(
  glyph: GlyphBox,
  seat: CrewSeat,
  offset = 0,
  sceneWidth = SCENE_WIDTH,
): Point2D {
  const x = clamp(glyph.cx + offset * glyph.width, 64, sceneWidth - 64);
  if (seat === "top") {
    return { x, y: glyph.top + 6 };
  }
  if (seat === "behind") {
    return { x, y: glyph.top + 12 };
  }
  return { x, y: glyph.bottom + 14 };
}

export function lookAt(
  originX: number,
  originY: number,
  targetX: number,
  targetY: number,
  maxRadius = 2.0,
): { dx: number; dy: number } {
  const vx = targetX - originX;
  const vy = targetY - originY;
  const dist = Math.hypot(vx, vy);
  if (dist < 0.001) {
    return { dx: 0, dy: 0 };
  }
  const strength = Math.min(1, dist / 240) * maxRadius;
  return {
    dx: (vx / dist) * strength,
    dy: (vy / dist) * strength,
  };
}

export function createFloaters(doodles: DoodleKind[], count: number): FloaterState[] {
  const pool = doodles.length > 0 ? doodles : DEFAULT_DOODLES;
  const total = Math.max(0, Math.min(count, 20));
  const out: FloaterState[] = [];

  for (let i = 0; i < total; i += 1) {
    const laneX = ((i + 0.5) / Math.max(1, total)) * (SCENE_WIDTH - 140) + 70;
    const jitterX = (hash(i * 13 + 3) - 0.5) * 90;
    const x = clamp(laneX + jitterX, 52, SCENE_WIDTH - 52);
    const y = 28 + hash(i * 19 + 7) * 140;
    out.push({
      id: i,
      kind: pool[i % pool.length],
      x,
      y,
      vx: (hash(i * 23 + 11) - 0.5) * 8,
      vy: 11 + hash(i * 29 + 5) * 13,
      rot: (hash(i * 31 + 17) - 0.5) * 30,
      vrot: (hash(i * 37 + 19) - 0.5) * 22,
      scale: 0.78 + hash(i * 41 + 23) * 0.34,
      phase: hash(i * 43 + 29) * Math.PI * 2,
      pop: 0,
    });
  }

  return out;
}

export function stepFloater(
  floater: FloaterState,
  dt: number,
  bounds: { width: number; height: number },
  pointer: Point2D | null,
): FloaterState {
  const safeDt = clamp(dt, 0, 0.05);
  let { x, y, vx, vy, rot, pop } = floater;
  const phase = floater.phase + safeDt * 1.4;

  if (pop > 0) {
    pop = Math.max(0, pop - safeDt * 2.6);
    if (pop === 0) {
      x = 64 + hash(floater.id * 97 + phase * 11) * (bounds.width - 128);
      y = 24 + hash(floater.id * 53 + phase * 7) * 40;
      vx = (hash(floater.id * 23 + phase) - 0.5) * 10;
      vy = 12 + hash(floater.id * 29 + phase) * 13;
    }
    return { ...floater, x, y, vx, vy, rot, phase, pop };
  }

  if (pointer) {
    const dx = x - pointer.x;
    const dy = y - pointer.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0.1 && dist < 110) {
      const push = ((110 - dist) / 110) * 140 * safeDt;
      vx += (dx / dist) * push;
      vy += (dy / dist) * push;
    }
  }

  vx *= Math.pow(0.86, safeDt * 10);
  const targetVy = 12 + hash(floater.id * 29 + 5) * 13;
  vy += (targetVy - vy) * safeDt * 1.4;

  x += (vx + Math.sin(phase) * 10) * safeDt;
  y += vy * safeDt;
  rot += floater.vrot * safeDt;

  if (y > bounds.height - 56) {
    y = 22;
    x = clamp(64 + hash(floater.id * 71 + phase * 3) * (bounds.width - 128), 52, bounds.width - 52);
  }
  if (x < 36) {
    x = bounds.width - 40;
  } else if (x > bounds.width - 36) {
    x = 40;
  }

  return { ...floater, x, y, vx, vy, rot, phase, pop };
}

export function timeline(
  letterCount: number,
  crewCount: number,
  wordCount: number,
): TimelineSchedule {
  const lettersEnd = Math.max(0, letterCount - 1) * 40 + 230;
  const crewEnd = lettersEnd + Math.max(0, crewCount - 1) * 65 + 180;
  return {
    letter: (index: number) => index * 40,
    ground: () => Math.max(170, lettersEnd - 60),
    crew: (index: number) => lettersEnd + index * 65,
    word: (index: number) => crewEnd + index * 90 + Math.min(wordCount, 0),
  };
}

export function clampBubblePercent(anchorX: number, sceneWidth = SCENE_WIDTH): number {
  const pct = (anchorX / sceneWidth) * 100;
  return clamp(pct, 16, 84);
}

/* -------------------------------------------------------------------------- */
/* Reduced Motion Hook (React 19 safe)                                        */
/* -------------------------------------------------------------------------- */

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* -------------------------------------------------------------------------- */
/* Hand-Drawn BacktoBase Floating Doodles (32x32 box, max 3 paths each)       */
/* -------------------------------------------------------------------------- */

function DoodleArtwork({ kind }: { kind: DoodleKind }) {
  switch (kind) {
    case "rocket":
      return (
        <>
          <path
            d="M16 4 C20 8 21 15 20 21 L12 21 C11 15 12 8 16 4 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17 L8 22 L12 21 M20 17 L24 22 L20 21"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 22 C14.5 26 16 28 16 28 C16 28 17.5 26 18 22 Z"
            className="dcf-accent-fill"
            stroke="var(--dcf-ink)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </>
      );
    case "bulb":
      return (
        <>
          <path
            d="M16 5 C11.2 5 8.5 8.5 8.5 12.6 C8.5 15.8 10.6 17.6 12 20 L20 20 C21.4 17.6 23.5 15.8 23.5 12.6 C23.5 8.5 20.8 5 16 5 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 23.5 H19 M14 26.5 H18"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M13.5 13.5 C14.5 11.5 17.5 11.5 18.5 13.5 M16 12 V17.5"
            fill="none"
            className="dcf-accent-stroke"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      );
    case "laptop":
      return (
        <>
          <path
            d="M7 8 H25 V20 H7 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20 H28 L25.5 24.5 H6.5 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 13 L13.5 14.5 L11 16 M16 16 H20.5"
            fill="none"
            className="dcf-accent-stroke"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    case "base":
      return (
        <>
          <path
            d="M8 9 H24 V17 L16 24 L8 17 Z"
            className="dcf-accent-fill"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 6 C28 9 28 15 24 19"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <path
            d="M23.5 15.5 L23.5 19.5 L27.5 19"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    case "star":
      return (
        <path
          d="M16 4.5 L19.2 11.6 L27 12.4 L21.1 17.5 L22.8 25.2 L16 21.2 L9.2 25.2 L10.9 17.5 L5 12.4 L12.8 11.6 Z"
          className="dcf-accent-fill"
          stroke="var(--dcf-ink)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "sparkle":
      return (
        <>
          <path
            d="M16 4 C16.6 11.5 20.5 15.4 28 16 C20.5 16.6 16.6 20.5 16 28 C15.4 20.5 11.5 16.6 4 16 C11.5 15.4 15.4 11.5 16 4 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M16 12.5 V19.5 M12.5 16 H19.5"
            className="dcf-accent-stroke"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      );
    case "bolt":
      return (
        <path
          d="M18.5 4 L8.5 17 H15.5 L13.5 28 L23.5 14.5 H16.5 Z"
          className="dcf-accent-fill"
          stroke="var(--dcf-ink)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "plane":
      return (
        <>
          <path
            d="M4.5 15.5 L27 6.5 L20.5 25.5 L14.5 18.5 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 6.5 L14.5 18.5 L14 24.5 L17.8 21"
            fill="none"
            className="dcf-accent-stroke"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    case "sprout":
      return (
        <>
          <path
            d="M16 26 V14"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M16 16 C10 15.5 7 11.5 8 7 C12.5 7 16 10.5 16 16 Z"
            className="dcf-accent-fill"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          <path
            d="M16 19 C22 18.5 25 14.5 24 10 C19.5 10 16 13.5 16 19 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
        </>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Editorial Hand-Drawn Human Crew Illustrations                              */
/* Coordinate origin (0, 0) is bottom-center seat/ground anchor               */
/* Consistent human proportions, expressive hair, clothing & idle motion      */
/* -------------------------------------------------------------------------- */

interface CrewCharacterSvgProps {
  kind: CrewKind;
  eyeOffset: { dx: number; dy: number };
  blinking: boolean;
}

function HumanEyes({
  leftX,
  rightX,
  y,
  eyeOffset,
  blinking,
}: {
  leftX: number;
  rightX: number;
  y: number;
  eyeOffset: { dx: number; dy: number };
  blinking: boolean;
}) {
  if (blinking) {
    return (
      <>
        <path
          d={`M${leftX - 2.6} ${y} Q${leftX} ${y + 1.8} ${leftX + 2.6} ${y}`}
          fill="none"
          stroke="var(--dcf-ink)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d={`M${rightX - 2.6} ${y} Q${rightX} ${y + 1.8} ${rightX + 2.6} ${y}`}
          fill="none"
          stroke="var(--dcf-ink)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    );
  }

  return (
    <>
      <circle cx={leftX + eyeOffset.dx} cy={y + eyeOffset.dy} r="1.9" fill="var(--dcf-ink)" />
      <circle cx={rightX + eyeOffset.dx} cy={y + eyeOffset.dy} r="1.9" fill="var(--dcf-ink)" />
    </>
  );
}

function CrewCharacterSvg({ kind, eyeOffset, blinking }: CrewCharacterSvgProps) {
  switch (kind) {
    case "founder":
      // Editorial human founder seated casually on top of B, legs dangling over edge,
      // open chore jacket over tee, pitching an idea with a glowing orange spark
      return (
        <g className="dcf-human-sway">
          {/* Seated thighs + dangling legs & sneakers */}
          <path
            d="M-12 -14 C-16 -4 -17 7 -15 19 L-6 19 C-7 8 -6 -2 -3 -10 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M4 -12 C9 -3 12 7 10 19 L19 19 C21 7 18 -4 13 -14 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Sneakers */}
          <path
            d="M-16 19 H-5 C-4 24 -11 26 -19 25 C-22 24 -21 20 -16 19 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M9 19 H20 C25 20 25 24 21 25 C14 26 8 24 9 19 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />

          {/* Torso: relaxed jacket over cream tee */}
          <path
            d="M-16 -12 L-19 -44 C-19 -54 -11 -59 0 -59 C11 -59 19 -54 19 -44 L16 -12 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
          {/* Open jacket panels + orange pocket accent */}
          <path
            d="M-16 -12 L-19 -44 C-18 -53 -12 -57 -5 -58 L-6 -12 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M16 -12 L19 -44 C18 -53 12 -57 5 -58 L6 -12 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M-5 -43 H5 M-4 -37 H4"
            className="dcf-accent-stroke"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Left arm resting with pitch notebook */}
          <path
            d="M-18 -47 C-27 -40 -29 -28 -23 -20 L-13 -22"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M-34 -26 L-21 -31 L-17 -18 L-30 -13 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M-29 -23 L-23 -25 M-27 -19 L-21 -21"
            className="dcf-accent-stroke"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Right arm gesturing up toward a bright orange idea spark */}
          <g className="dcf-human-gesture">
            <path
              d="M18 -47 C27 -52 33 -60 32 -71"
              fill="none"
              stroke="var(--dcf-ink)"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
            <circle
              cx="32"
              cy="-73"
              r="3.2"
              fill="var(--dcf-bg)"
              stroke="var(--dcf-ink)"
              strokeWidth="2"
            />
            <path
              d="M32 -91 C27 -91 24 -87 25.5 -82.5 L29 -79 H35 L38.5 -82.5 C40 -87 37 -91 32 -91 Z"
              className="dcf-accent-fill"
              stroke="var(--dcf-ink)"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
            <path
              d="M32 -97 V-94 M23 -93 L25 -91 M41 -93 L39 -91"
              className="dcf-accent-stroke"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* Neck */}
          <path
            d="M-4.5 -58 V-66 H4.5 V-58"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
          />

          {/* Human head */}
          <ellipse
            cx="0"
            cy="-79"
            rx="13.5"
            ry="15.5"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
          />
          {/* Ears */}
          <path
            d="M-13.5 -81 C-16.5 -81 -16.5 -75 -13.5 -75 M13.5 -81 C16.5 -81 16.5 -75 13.5 -75"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
          />
          {/* Expressive swept hair */}
          <path
            d="M-14 -81 C-16 -94 -6 -101 5 -99 C14 -98 18 -90 14 -80 C11 -86 5 -89 -2 -88 C-8 -87 -11 -84 -14 -81 Z"
            fill="var(--dcf-ink)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M-5 -95 C0 -97 6 -96 10 -92"
            fill="none"
            stroke="var(--dcf-bg)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Brows, eyes, subtle nose, warm grin */}
          <path
            d="M-8 -85 Q-5 -87 -2.5 -85.5 M2.5 -85.5 Q5 -87 8 -85"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <HumanEyes leftX={-5.2} rightX={5.2} y={-80} eyeOffset={eyeOffset} blinking={blinking} />
          <path
            d="M0 -79 L-1.2 -74.5 L1 -74"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M-4.5 -69.5 Q0 -66 5 -70"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      );

    case "connector":
      // Editorial human woman connector perched on top of K with one knee drawn up,
      // relaxed sweater, orange BacktoBase event lanyard badge, waving warmly
      return (
        <g className="dcf-human-sway">
          {/* Dangling left leg + raised right knee */}
          <path
            d="M-13 -12 C-17 -1 -17 9 -14 19 L-6 18 C-8 8 -8 -1 -4 -10 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M-15 18 H-5 C-4 23 -12 24 -18 23 C-21 22 -19 18 -15 18 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Raised bent knee resting on letter top */}
          <path
            d="M4 -12 L19 -24 C23 -26 26 -23 25 -18 L18 -2 L9 -3 L14 -14 L2 -6 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M9 -3 H20 C24 -2 24 2 19 2 H10 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Relaxed crewneck sweater torso */}
          <path
            d="M-15 -10 L-18 -43 C-18 -53 -10 -58 0 -58 C10 -58 18 -53 18 -43 L14 -10 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
          {/* BacktoBase lanyard + orange event badge */}
          <path
            d="M-7 -57 L0 -38 L7 -57"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect
            x="-6"
            y="-38"
            width="12"
            height="14"
            rx="2.2"
            className="dcf-accent-fill"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
          />
          <path d="M-3 -33 H3 M-3 -29 H2" stroke="var(--dcf-bg)" strokeWidth="1.6" strokeLinecap="round" />

          {/* Left arm resting down */}
          <path
            d="M-17 -45 C-24 -36 -24 -23 -16 -16"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinecap="round"
          />

          {/* Right arm waving hello */}
          <g className="dcf-human-wave">
            <path
              d="M17 -46 C27 -52 33 -62 31 -74"
              fill="none"
              stroke="var(--dcf-ink)"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
            <path
              d="M28 -74 C28 -80 35 -80 35 -74 C35 -71 32 -69 30 -71 Z"
              fill="var(--dcf-bg)"
              stroke="var(--dcf-ink)"
              strokeWidth="1.9"
            />
            <path
              d="M38 -80 C41 -76 41 -71 38 -68 M42 -82 C46 -77 46 -70 42 -66"
              fill="none"
              className="dcf-accent-stroke"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* Back shoulder-length wavy hair */}
          <path
            d="M-15 -78 C-21 -68 -20 -55 -14 -51 L14 -51 C20 -55 21 -68 15 -78 Z"
            fill="var(--dcf-ink)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Neck */}
          <path
            d="M-4 -57 V-65 H4 V-57"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
          />

          {/* Human head */}
          <ellipse
            cx="0"
            cy="-78"
            rx="13"
            ry="15"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
          />
          {/* Hair bangs + side part */}
          <path
            d="M-14 -77 C-15 -92 -5 -98 5 -97 C14 -95 16 -86 14 -77 C11 -84 5 -88 -3 -86 C-9 -84 -11 -81 -14 -77 Z"
            fill="var(--dcf-ink)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Small orange hair clip */}
          <path
            d="M6 -88 L12 -85"
            className="dcf-accent-stroke"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Brows, eyes, subtle nose, warm smile */}
          <path
            d="M-7.5 -83.5 Q-5 -85.5 -2.5 -84 M2.5 -84 Q5 -85.5 7.5 -83.5"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <HumanEyes leftX={-4.8} rightX={4.8} y={-78.5} eyeOffset={eyeOffset} blinking={blinking} />
          <path
            d="M0 -77.5 L-1 -73.5 L1 -73"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M-4.8 -68.5 Q0 -64.5 4.8 -68.5"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      );

    case "builder":
      // Editorial human developer sitting cross-legged on the ground line under T,
      // wearing round glasses, hoodie with orange strings, coding on a laptop
      return (
        <g className="dcf-human-type">
          {/* Crossed legs sitting on ground */}
          <path
            d="M-24 -2 C-28 -11 -16 -18 -2 -15 L14 -6 C22 -2 25 2 14 2 H-18 C-23 2 -25 0 -24 -2 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M24 -2 C28 -11 16 -18 2 -15 L-12 -6 C-19 -2 -18 2 -8 2 H18 C23 2 25 0 24 -2 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Tucked sneakers */}
          <ellipse
            cx="-23"
            cy="0"
            rx="6"
            ry="3.5"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
          />
          <ellipse
            cx="23"
            cy="0"
            rx="6"
            ry="3.5"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
          />

          {/* Hoodie torso */}
          <path
            d="M-18 -13 L-20 -44 C-20 -55 -11 -60 0 -60 C11 -60 20 -55 20 -44 L18 -13 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
          {/* Hoodie collar + orange drawstrings */}
          <path
            d="M-11 -58 Q0 -50 11 -58"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M-4 -53 V-41 M4 -53 V-43"
            className="dcf-accent-stroke"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Arms reaching forward to laptop */}
          <path
            d="M-19 -45 C-27 -37 -26 -24 -16 -20"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M19 -45 C27 -37 26 -24 16 -20"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinecap="round"
          />

          {/* Open laptop on lap */}
          <path
            d="M-19 -29 H19 L16 -12 H-16 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M-22 -12 H22"
            stroke="var(--dcf-ink)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Orange BacktoBase laptop sticker */}
          <circle cx="0" cy="-21" r="3.4" className="dcf-accent-fill" stroke="var(--dcf-ink)" strokeWidth="1.5" />

          {/* Neck */}
          <path
            d="M-4.5 -59 V-67 H4.5 V-59"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
          />

          {/* Human head */}
          <ellipse
            cx="0"
            cy="-79"
            rx="13.5"
            ry="15"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
          />
          {/* Tousled builder hair */}
          <path
            d="M-14 -80 C-16 -93 -7 -100 3 -98 C9 -101 17 -93 14 -80 C11 -87 6 -90 0 -89 C-6 -89 -10 -86 -14 -80 Z"
            fill="var(--dcf-ink)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Stylish round eyeglasses */}
          <circle
            cx="-5.8"
            cy="-79"
            r="5.2"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
          />
          <circle
            cx="5.8"
            cy="-79"
            r="5.2"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
          />
          <path d="M-0.6 -79 H0.6" stroke="var(--dcf-ink)" strokeWidth="1.9" />
          <HumanEyes leftX={-5.8} rightX={5.8} y={-79} eyeOffset={eyeOffset} blinking={blinking} />
          <path
            d="M-3.5 -69.5 Q0 -67 3.8 -69.5"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </g>
      );

    case "creator":
      // Editorial human designer/creator seated cross-legged atop the second B,
      // wearing an orange cap/beret & relaxed tee, holding a sketchpad + stylus
      return (
        <g className="dcf-human-sway">
          {/* Crossed legs sitting cleanly on top of B */}
          <path
            d="M-21 -1 C-24 -9 -14 -15 -1 -12 L15 -4 C21 -1 21 3 12 3 H-16 C-21 3 -22 1 -21 -1 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M21 -1 C24 -9 14 -15 1 -12 L-13 -4 C-19 -1 -17 3 -8 3 H16 C21 3 22 1 21 -1 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Relaxed creator tee torso */}
          <path
            d="M-15 -11 L-18 -42 C-18 -52 -10 -57 0 -57 C10 -57 18 -52 18 -42 L15 -11 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
          {/* Minimal collar & diagonal tote/strap */}
          <path
            d="M-12 -54 L13 -14"
            className="dcf-accent-stroke"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Left arm holding sketchpad */}
          <path
            d="M-17 -44 C-25 -37 -26 -26 -19 -20"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M-26 -29 L-6 -24 L-9 -10 L-29 -15 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M-21 -22 Q-16 -26 -12 -18"
            fill="none"
            className="dcf-accent-stroke"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Right arm sketching with stylus/pencil */}
          <g className="dcf-human-gesture">
            <path
              d="M17 -44 C26 -48 31 -55 29 -64"
              fill="none"
              stroke="var(--dcf-ink)"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
            <path
              d="M25 -61 L37 -81 L40 -79 L28 -59 Z"
              fill="var(--dcf-bg)"
              stroke="var(--dcf-ink)"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
            <path
              d="M37 -81 L40 -79 L41 -85 Z"
              className="dcf-accent-fill"
              stroke="var(--dcf-ink)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>

          {/* Neck */}
          <path
            d="M-4 -56 V-64 H4 V-56"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
          />

          {/* Human head */}
          <ellipse
            cx="0"
            cy="-77"
            rx="13"
            ry="15"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
          />
          {/* Curly hair tufts peeking below beret */}
          <path
            d="M-14 -76 C-18 -77 -18 -85 -13 -86 M14 -76 C18 -77 18 -85 13 -86"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Signature tilted orange artist beret */}
          <path
            d="M-17 -85 C-19 -97 -4 -103 11 -99 C20 -97 22 -89 15 -84 C6 -87 -6 -87 -17 -85 Z"
            className="dcf-accent-fill"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M0 -100 L2 -105" stroke="var(--dcf-ink)" strokeWidth="2.2" strokeLinecap="round" />

          {/* Face */}
          <path
            d="M-7.5 -82.5 Q-5 -84 -2.5 -82.5 M2.5 -82.5 Q5 -84 7.5 -82.5"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <HumanEyes leftX={-5} rightX={5} y={-77.5} eyeOffset={eyeOffset} blinking={blinking} />
          <path
            d="M0 -76.5 L-1 -72.5 L1 -72"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M-4.2 -67.5 Q0 -64.5 4.5 -68"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </g>
      );

    case "community":
      // Full-height standing human community host leaning casually beside the right edge of E,
      // relaxed trousers & sneakers, jacket + flowing orange scarf, coffee cup + welcoming wave
      return (
        <g className="dcf-human-sway">
          {/* Standing legs with relaxed stance */}
          <path
            d="M-11 -44 L-14 -4 H-5 L-2 -34 L3 -34 L6 -4 H15 L12 -44 Z"
            fill="var(--dcf-shade)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Sneakers planted on ground line */}
          <path
            d="M-15 -4 H-4 C-3 1 -11 2 -19 1 C-22 0 -20 -4 -15 -4 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M5 -4 H16 C21 -3 22 1 17 1 C10 2 4 1 5 -4 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />

          {/* Jacket torso */}
          <path
            d="M-15 -43 L-17 -78 C-17 -88 -10 -92 0 -92 C10 -92 17 -88 17 -78 L15 -43 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
          {/* Flowing orange community scarf */}
          <path
            d="M-11 -91 Q0 -85 11 -91 L14 -84 Q0 -79 -12 -84 Z"
            className="dcf-accent-fill"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          <path
            d="M8 -84 C16 -80 20 -71 23 -66 L15 -64 C13 -70 10 -76 4 -80 Z"
            className="dcf-accent-fill"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />

          {/* Left arm holding warm coffee cup */}
          <path
            d="M-16 -80 C-24 -73 -26 -62 -20 -55"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M-28 -61 H-17 L-18.5 -49 H-26.5 Z"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          <path
            d="M-29 -61 H-16"
            stroke="var(--dcf-ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M-24 -65 Q-22 -69 -24 -72 M-20 -65 Q-18 -69 -20 -72"
            fill="none"
            className="dcf-accent-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Right arm waving warmly */}
          <g className="dcf-human-wave">
            <path
              d="M16 -80 C25 -86 30 -96 28 -108"
              fill="none"
              stroke="var(--dcf-ink)"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
            <path
              d="M25 -108 C25 -114 32 -114 32 -108 C32 -105 29 -103 27 -105 Z"
              fill="var(--dcf-bg)"
              stroke="var(--dcf-ink)"
              strokeWidth="1.9"
            />
          </g>

          {/* Neck */}
          <path
            d="M-4 -91 V-99 H4 V-91"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.1"
          />

          {/* Human head */}
          <ellipse
            cx="0"
            cy="-112"
            rx="12.5"
            ry="14.5"
            fill="var(--dcf-bg)"
            stroke="var(--dcf-ink)"
            strokeWidth="2.3"
          />
          {/* Curly textured hair crown */}
          <path
            d="M-13 -114 C-16 -123 -10 -131 -2 -130 C4 -133 13 -128 14 -119 C16 -115 14 -111 12 -111 C9 -118 4 -121 -2 -120 C-7 -120 -10 -117 -13 -114 Z"
            fill="var(--dcf-ink)"
            stroke="var(--dcf-ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Face */}
          <path
            d="M-7 -117.5 Q-4.5 -119 -2 -117.5 M2 -117.5 Q4.5 -119 7 -117.5"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <HumanEyes leftX={-4.8} rightX={4.8} y={-112.5} eyeOffset={eyeOffset} blinking={blinking} />
          <path
            d="M0 -111.5 L-1 -107.5 L1 -107"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M-4.5 -102.5 Q0 -98.5 4.8 -102.5"
            fill="none"
            stroke="var(--dcf-ink)"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </g>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Scoped Component CSS                                                       */
/* -------------------------------------------------------------------------- */

const DCF_CSS = `
.dcf-root {
  --dcf-bg: #FFF8F0;
  --dcf-ink: #171717;
  --dcf-accent: #F4511E;
  --dcf-accent-ink: #9A3412;
  --dcf-shade: #EFE4D4;
  --dcf-shadow: #E4D6C3;
  --dcf-font: "Bricolage Grotesque", "Inter Tight", sans-serif;
  --dcf-serif: "Fraunces", "Iowan Old Style", Georgia, serif;
  position: relative;
  width: 100%;
  background-color: var(--dcf-bg);
  color: var(--dcf-ink);
  overflow-x: clip;
  border-top: 1px solid rgba(23, 23, 23, 0.1);
  isolation: isolate;
}

.dcf-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: clamp(24px, 4vw, 52px) clamp(12px, 3vw, 32px) clamp(38px, 5vw, 66px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dcf-world {
  position: relative;
  width: 100%;
  max-width: 1200px;
}

.dcf-svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  user-select: none;
  -webkit-user-select: none;
}

.dcf-accent-fill {
  fill: var(--dcf-accent);
}

.dcf-accent-stroke {
  stroke: var(--dcf-accent);
}

.dcf-shower {
  pointer-events: none;
}

.dcf-rain-mark {
  opacity: 0;
  fill: none;
  stroke: var(--dcf-ink);
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.dcf-rain-mark[data-mark="spark"] {
  stroke: var(--dcf-accent);
}

.dcf-rain-mark[data-mark="dot"] {
  fill: var(--dcf-accent);
  stroke: none;
}

@media (prefers-reduced-motion: no-preference) {
  .dcf-root[data-revealed="true"] .dcf-rain-mark {
    animation: dcf-rain-fall 1280ms linear var(--rain-delay) both;
  }
}

@keyframes dcf-rain-fall {
  0% { opacity: 0; transform: translate(0, 0); }
  20%, 62% { opacity: 0.72; }
  100% { opacity: 0; transform: translate(var(--rain-drift), var(--rain-drop)); }
}

@media (max-width: 640px) {
  .dcf-rain-mark[data-extra="true"] { display: none; }
  .dcf-rain-mark { stroke-width: 2.5; }
}

@media (prefers-reduced-motion: reduce) {
  .dcf-rain-mark[data-static="true"] {
    opacity: 0.48;
    transform: translateY(calc(var(--rain-drop) * 0.45));
  }
}

/* Storyboard entrance */
.dcf-letter {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center bottom;
  transform: translateY(18px) scaleY(0.92);
  transition:
    opacity 460ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
}

.dcf-root[data-revealed="true"] .dcf-letter {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

.dcf-ground {
  stroke-dasharray: 1220;
  stroke-dashoffset: 1220;
  transition: stroke-dashoffset 780ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
}

.dcf-root[data-revealed="true"] .dcf-ground {
  stroke-dashoffset: 0;
}

.dcf-crew-entry {
  opacity: 0;
  transform: translateY(16px) scale(0.92);
  transition:
    opacity 440ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0ms);
}

.dcf-root[data-revealed="true"] .dcf-crew-entry {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Subtle idle human life animations */
.dcf-human-sway {
  transform-origin: 0px 0px;
  animation: dcf-sway 4.4s ease-in-out infinite;
}

.dcf-human-type {
  transform-origin: 0px 0px;
  animation: dcf-type 2.8s ease-in-out infinite;
}

.dcf-human-wave {
  transform-origin: 17px -54px;
  animation: dcf-wave 2.6s ease-in-out infinite;
}

.dcf-human-gesture {
  transform-origin: 18px -47px;
  animation: dcf-gesture 3.2s ease-in-out infinite;
}

@keyframes dcf-sway {
  0%, 100% { transform: rotate(0deg) translateY(0px); }
  50% { transform: rotate(1.1deg) translateY(-1.2px); }
}

@keyframes dcf-type {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-1.8px); }
}

@keyframes dcf-wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(6deg); }
  55% { transform: rotate(-4deg); }
  80% { transform: rotate(4deg); }
}

@keyframes dcf-gesture {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-4deg); }
}

.dcf-crew-btn {
  cursor: pointer;
  outline: none;
}

.dcf-crew-btn:focus-visible .dcf-focus-ring {
  opacity: 1;
}

.dcf-focus-ring {
  opacity: 0;
  fill: none;
  stroke: var(--dcf-accent);
  stroke-width: 2.4;
  stroke-dasharray: 5 4;
  transition: opacity 150ms ease;
}

.dcf-crew-hop {
  transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dcf-crew-btn:hover .dcf-crew-hop,
.dcf-crew-btn:focus-visible .dcf-crew-hop {
  transform: translateY(-5px);
}

.dcf-crew-btn[data-hopping="true"] .dcf-crew-hop {
  animation: dcf-hop 440ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes dcf-hop {
  0% { transform: translateY(0) scale(1, 1); }
  22% { transform: translateY(3px) scale(1.05, 0.93); }
  56% { transform: translateY(-16px) scale(0.96, 1.04); }
  82% { transform: translateY(1px) scale(1.02, 0.99); }
  100% { transform: translateY(0) scale(1, 1); }
}

.dcf-doodle {
  cursor: pointer;
  transition: opacity 200ms ease;
}

.dcf-doodle:hover {
  opacity: 0.92;
}

/* Speech bubble overlay (HTML layer for crisp mobile legibility + viewport clamping) */
.dcf-bubble-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
}

.dcf-bubble {
  position: absolute;
  transform: translate(-50%, -100%);
  max-width: min(260px, calc(100% - 24px));
  padding: 8px 13px;
  border-radius: 14px;
  background: var(--dcf-bg);
  color: var(--dcf-ink);
  border: 2px solid var(--dcf-ink);
  box-shadow: 3px 3px 0 var(--dcf-ink);
  font-family: var(--dcf-font);
  font-size: clamp(12px, 1.35vw, 13.5px);
  line-height: 1.3;
  letter-spacing: -0.01em;
  white-space: normal;
  text-align: center;
  animation: dcf-bubble-in 200ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.dcf-bubble-name {
  display: inline-block;
  margin-right: 6px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.78em;
  letter-spacing: 0.05em;
  color: var(--dcf-accent-ink);
}

@keyframes dcf-bubble-in {
  from { opacity: 0; transform: translate(-50%, -86%) scale(0.92); }
  to { opacity: 1; transform: translate(-50%, -100%) scale(1); }
}

/* Tagline */
.dcf-tagline {
  margin: clamp(8px, 1.6vw, 16px) 0 0;
  max-width: 30ch;
  text-align: center;
  font-family: var(--dcf-serif);
  font-size: clamp(1.2rem, 2.5vw, 1.68rem);
  font-weight: 600;
  line-height: 1.28;
  letter-spacing: -0.01em;
  color: var(--dcf-ink);
}

.dcf-word {
  position: relative;
  display: inline-block;
  margin: 0 0.16em;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 460ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
}

.dcf-word-accent::after {
  content: "";
  position: absolute;
  left: 0;
  right: 2px;
  bottom: -4px;
  height: 3px;
  border-radius: 999px;
  background: var(--dcf-accent);
  opacity: 0.55;
  transform: rotate(-1.2deg);
}

.dcf-root[data-revealed="true"] .dcf-word {
  opacity: 1;
  transform: translateY(0);
}

/* Bottom ending bar: centered heart credit + right-aligned social links */
.dcf-bottom {
  width: 100%;
  max-width: 1200px;
  margin-top: clamp(28px, 4vw, 44px);
  padding-top: 20px;
  border-top: 1px solid rgba(23, 23, 23, 0.16);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 18px 16px;
}

.dcf-marquee {
  width: 100%;
  margin-top: clamp(24px, 3.5vw, 38px);
  overflow: hidden;
  border-top: 1px solid rgba(23, 23, 23, 0.16);
  border-bottom: 1px solid rgba(23, 23, 23, 0.16);
  padding: 13px 0 12px;
  color: var(--dcf-ink);
}

.dcf-marquee-track {
  display: flex;
  width: max-content;
  animation: dcf-marquee-scroll 30s linear infinite;
  will-change: transform;
}

.dcf-marquee:hover .dcf-marquee-track {
  animation-play-state: paused;
}

.dcf-root[data-in-view="false"] .dcf-marquee-track {
  animation-play-state: paused;
}

.dcf-marquee-group {
  display: flex;
  flex: none;
  align-items: center;
  gap: clamp(22px, 4vw, 56px);
  padding-right: clamp(22px, 4vw, 56px);
  font-family: var(--dcf-font);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}

.dcf-marquee-divider {
  color: var(--dcf-accent);
  font-size: 14px;
  line-height: 0;
}

@keyframes dcf-marquee-scroll {
  to { transform: translateX(-50%); }
}

.dcf-footer-nav {
  grid-column: 1 / -1;
  justify-self: center;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 2vw, 24px);
}

.dcf-footer-nav a {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  padding: 0 4px;
  color: rgba(23, 23, 23, 0.74);
  font-family: var(--dcf-font);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.055em;
  text-decoration-color: transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  text-transform: uppercase;
  transition: color 160ms ease, text-decoration-color 160ms ease;
}

.dcf-footer-nav .dcf-footer-nav-desktop { display: none; }
.dcf-footer-nav .dcf-footer-nav-mobile { display: inline-flex; }
@media (min-width: 1024px) {
  .dcf-footer-nav .dcf-footer-nav-desktop { display: inline-flex; }
  .dcf-footer-nav .dcf-footer-nav-mobile { display: none; }
}

.dcf-footer-nav .dcf-footer-nav-emphasis {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: #C2410C;
  color: #fff;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
}

.dcf-footer-nav a:not(.dcf-footer-nav-emphasis):hover {
  color: #C2410C;
  text-decoration-color: currentColor;
}

.dcf-footer-nav .dcf-footer-nav-emphasis:hover {
  background: #9A3412;
  color: #fff;
  transform: translateY(-1px);
}

.dcf-footer-nav a:not(.dcf-footer-nav-emphasis):focus-visible {
  color: var(--dcf-accent-ink);
  outline: 2px solid var(--dcf-accent);
  outline-offset: 4px;
}

.dcf-footer-nav .dcf-footer-nav-emphasis:focus-visible {
  background: #9A3412;
  color: #fff;
  outline: 2px solid var(--dcf-ink);
  outline-offset: 4px;
}

.dcf-credit {
  grid-column: 1;
  justify-self: start;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--dcf-serif);
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(23, 23, 23, 0.78);
  text-align: center;
}

.dcf-credit-heart {
  display: inline-flex;
  color: var(--dcf-accent);
  transform: translateY(0.5px);
}

.dcf-socials {
  grid-column: 2;
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.dcf-social-link {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1.8px solid rgba(23, 23, 23, 0.22);
  background: var(--dcf-bg);
  color: var(--dcf-ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
}

.dcf-social-link:hover {
  border-color: var(--dcf-ink);
  background: var(--dcf-accent);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 var(--dcf-ink);
}

.dcf-social-link:focus-visible {
  outline: 2px solid var(--dcf-accent);
  outline-offset: 3px;
}

@media (max-width: 720px) {
  .dcf-bottom {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 14px;
  }

  .dcf-credit,
  .dcf-socials,
  .dcf-footer-nav {
    grid-column: 1;
    justify-self: center;
  }

  .dcf-marquee { margin-top: 24px; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .dcf-letter,
  .dcf-ground,
  .dcf-crew-entry,
  .dcf-word,
  .dcf-crew-hop,
  .dcf-bubble,
  .dcf-human-sway,
  .dcf-human-type,
  .dcf-human-wave,
  .dcf-human-gesture,
  .dcf-social-link {
    transition: none !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    stroke-dashoffset: 0 !important;
  }

  .dcf-marquee-track {
    animation: none !important;
    transform: none !important;
  }

  .dcf-bubble {
    transform: translate(-50%, -100%) !important;
  }
}
`;

function SocialIcon({ kind }: { kind: SocialKind }) {
  switch (kind) {
    case "instagram":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3.01 3.01 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.01 3.01 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3.01 3.01 0 0 0 2.12-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function DoodleCrewFooter({
  id,
  className,
  wordmark = "BACKTOBASE",
  tagline = "Learn. Connect. Grow.",
  crew = DEFAULT_CREW,
  crewArtwork,
  doodles = DEFAULT_DOODLES,
  doodleCount = 8,
  crewShower = false,
  preset = "paper",
  palette,
  fontFamily = '"Bricolage Grotesque", "Inter Tight", sans-serif',
  serifFamily = '"Fraunces", "Iowan Old Style", Georgia, serif',
  tracking = -0.026,
  interactive = true,
  height = "auto",
  links = [],
  socials = [],
  showCredit = false,
  closingMarquee,
}: DoodleCrewFooterProps) {
  const uid = useId().replace(/:/g, "");
  const brushFilterId = `dcf-brush-${uid}`;
  const boilFilterId = `dcf-boil-${uid}`;

  const rootRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pointerRef = useRef<Point2D | null>(null);
  const hopTimersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [activeCrew, setActiveCrew] = useState<number | null>(null);
  const [hoppingCrew, setHoppingCrew] = useState<Record<number, boolean>>({});
  const [blinkingIndex, setBlinkingIndex] = useState<number | null>(null);
  const [boilSeed, setBoilSeed] = useState(1);
  const [pointerSvg, setPointerSvg] = useState<Point2D | null>(null);
  const [measuredWidths, setMeasuredWidths] = useState<number[] | null>(null);
  const [floaters, setFloaters] = useState<FloaterState[]>(() =>
    createFloaters(doodles, doodleCount),
  );

  const colors = useMemo(() => {
    const base = PRESET_PALETTES[preset];
    return {
      background: palette?.background ?? base.background,
      ink: palette?.ink ?? base.ink,
      accent: palette?.accent ?? base.accent,
    };
  }, [preset, palette?.background, palette?.ink, palette?.accent]);

  // Measure real glyph widths via Canvas once fonts are ready
  useEffect(() => {
    if (typeof document === "undefined") return;
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.font = `800 ${BASE_FONT_SIZE}px ${fontFamily}`;
      const chars = Array.from(wordmark);
      const widths = chars.map((ch) => {
        const m = ctx.measureText(ch);
        return Math.max(m.width, BASE_FONT_SIZE * 0.28);
      });
      setMeasuredWidths(widths);
    };

    const rafId = requestAnimationFrame(measure);
    document.fonts?.ready?.then(measure).catch(() => {});

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [wordmark, fontFamily]);

  // Re-initialize floaters if doodles prop or count changes
  const doodleKey = `${doodles.join(",")}:${doodleCount}`;
  const prevDoodleKeyRef = useRef(doodleKey);
  useEffect(() => {
    if (prevDoodleKeyRef.current !== doodleKey) {
      prevDoodleKeyRef.current = doodleKey;
      const rafId = requestAnimationFrame(() => {
        setFloaters(createFloaters(doodles, doodleCount));
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [doodleKey, doodles, doodleCount]);

  // Observe visibility to trigger storyboard reveal and pause animation off-screen
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      const rafId = requestAnimationFrame(() => {
        setRevealed(true);
        setInView(true);
      });
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Subtle hand-drawn line boil (~4fps) when visible and motion allowed
  useEffect(() => {
    if (!inView || reducedMotion) return;
    const id = setInterval(() => {
      setBoilSeed((prev) => (prev % 3) + 1);
    }, 280);
    return () => clearInterval(id);
  }, [inView, reducedMotion]);

  // Periodic natural eye blinking staggered across crew
  useEffect(() => {
    if (!inView || reducedMotion || crewArtwork || crew.length === 0) return;
    let cursor = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    const intervalId = setInterval(() => {
      const target = cursor % crew.length;
      cursor += 1;
      setBlinkingIndex(target);
      resetTimer = setTimeout(() => setBlinkingIndex(null), 150);
    }, 2400);

    return () => {
      clearInterval(intervalId);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [inView, reducedMotion, crewArtwork, crew.length]);

  // Floating doodles physics loop (paused off-screen or under reduced motion)
  useEffect(() => {
    if (!inView || reducedMotion || doodleCount <= 0) return;
    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setFloaters((prev) =>
        prev.map((item) =>
          stepFloater(
            item,
            dt,
            { width: SCENE_WIDTH, height: SCENE_HEIGHT },
            interactive ? pointerRef.current : null,
          ),
        ),
      );
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reducedMotion, doodleCount, interactive]);

  // Cleanup hop timers on unmount
  useEffect(() => {
    const timers = hopTimersRef.current;
    return () => {
      Object.values(timers).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const wordLayout = useMemo(() => {
    const chars = Array.from(wordmark);
    const hasValidMeasurements =
      measuredWidths !== null && measuredWidths.length === chars.length;
    let measureCursor = 0;

    return layoutWord(wordmark, {
      tracking,
      measureChar: hasValidMeasurements
        ? () => {
            const idx = measureCursor++;
            return measuredWidths[idx] ?? BASE_FONT_SIZE * 0.66;
          }
        : undefined,
    });
  }, [wordmark, tracking, measuredWidths]);

  const placedCrew = useMemo(() => {
    const maxIndex = Math.max(0, wordLayout.glyphs.length - 1);
    return crew.map((member, index) => {
      const glyphIndex = clamp(member.letter, 0, maxIndex);
      const glyph = wordLayout.glyphs[glyphIndex];
      const anchor = glyph
        ? seatPoint(glyph, member.seat, member.offset ?? 0, SCENE_WIDTH)
        : { x: SCENE_WIDTH / 2, y: BASELINE_Y };
      return {
        ...member,
        index,
        anchor,
        scale: member.scale ?? 1,
      };
    });
  }, [crew, wordLayout.glyphs]);

  const words = useMemo(
    () => tagline.trim().split(/\s+/).filter(Boolean),
    [tagline],
  );

  const tl = useMemo(
    () => timeline(wordLayout.glyphs.length, placedCrew.length, words.length),
    [wordLayout.glyphs.length, placedCrew.length, words.length],
  );

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive || reducedMotion) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const pt = {
      x: ((e.clientX - rect.left) / rect.width) * SCENE_WIDTH,
      y: ((e.clientY - rect.top) / rect.height) * SCENE_HEIGHT,
    };
    pointerRef.current = pt;
    if (!crewArtwork) setPointerSvg(pt);
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    setPointerSvg(null);
    setActiveCrew(null);
  };

  const triggerCrewHop = (index: number) => {
    if (!interactive) return;
    setActiveCrew(index);
    if (reducedMotion) return;
    setHoppingCrew((prev) => ({ ...prev, [index]: true }));
    if (hopTimersRef.current[index]) {
      clearTimeout(hopTimersRef.current[index]);
    }
    hopTimersRef.current[index] = setTimeout(() => {
      setHoppingCrew((prev) => ({ ...prev, [index]: false }));
    }, 460);
  };

  const popFloater = (id: number) => {
    if (!interactive || reducedMotion) return;
    setFloaters((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pop: 1 } : item)),
    );
  };

  const behindCrew = placedCrew.filter((c) => c.seat === "behind");
  const foregroundCrew = placedCrew.filter((c) => c.seat !== "behind");
  const activeMember = activeCrew !== null ? placedCrew[activeCrew] ?? null : null;

  const isRevealed = revealed || reducedMotion;
  const isBacktoBase = wordmark.toUpperCase() === "BACKTOBASE";

  const rootStyle = {
    "--dcf-bg": colors.background,
    "--dcf-ink": colors.ink,
    "--dcf-accent": colors.accent,
    "--dcf-accent-ink": preset === "night" ? "#F4511E" : "#9A3412",
    "--dcf-shade": preset === "night" ? "#22242A" : "#EFE4D4",
    "--dcf-shadow": preset === "night" ? "#262830" : "#E5D8C5",
    "--dcf-font": fontFamily,
    "--dcf-serif": serifFamily,
    minHeight: typeof height === "number" ? `${height}px` : height,
  } as React.CSSProperties;

  const renderCrewNode = (member: (typeof placedCrew)[number]) => {
    const eyeHeight = member.kind === "community" ? 112 : 79;
    const eyeOriginX = member.anchor.x;
    const eyeOriginY = member.anchor.y - eyeHeight * member.scale;
    const rawEye =
      !crewArtwork && interactive && !reducedMotion && pointerSvg
        ? lookAt(eyeOriginX, eyeOriginY, pointerSvg.x, pointerSvg.y, 1.9)
        : { dx: 0, dy: 0 };
    const eyeOffset = member.flip ? { dx: -rawEye.dx, dy: rawEye.dy } : rawEye;
    const isBlinking = blinkingIndex === member.index;
    const isHopping = Boolean(hoppingCrew[member.index]);
    const flipX = member.flip ? -1 : 1;
    const hitTop = crewArtwork ? -168 : member.kind === "community" ? -136 : -108;
    const hitHeight = crewArtwork ? 172 : member.kind === "community" ? 142 : 132;
    const crop = crewArtwork?.crops[member.kind];
    const artworkHeight = 158;
    const artworkWidth = crop && crewArtwork
      ? (crop.width / crewArtwork.height) * artworkHeight
      : 0;

    return (
      <g
        key={`${member.kind}-${member.index}`}
        transform={`translate(${member.anchor.x.toFixed(1)}, ${member.anchor.y.toFixed(1)})`}
      >
        <g
          className="dcf-crew-entry"
          style={{ "--d": `${tl.crew(member.index)}ms` } as React.CSSProperties}
        >
          <g
            className="dcf-crew-btn"
            role="button"
            tabIndex={interactive ? 0 : -1}
            aria-label={`${member.name}: ${member.says}`}
            data-hopping={isHopping ? "true" : "false"}
            onMouseEnter={() => interactive && setActiveCrew(member.index)}
            onMouseLeave={() => setActiveCrew((cur) => (cur === member.index ? null : cur))}
            onFocus={() => interactive && setActiveCrew(member.index)}
            onBlur={() => setActiveCrew((cur) => (cur === member.index ? null : cur))}
            onClick={() => triggerCrewHop(member.index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerCrewHop(member.index);
              } else if (e.key === "Escape") {
                setActiveCrew(null);
              }
            }}
          >
            <rect x={crewArtwork ? "-56" : "-38"} y={hitTop} width={crewArtwork ? "112" : "76"} height={hitHeight} fill="transparent" />
            <circle
              cx="0"
              cy={member.kind === "community" ? -64 : -48}
              r={crewArtwork ? "54" : "44"}
              className="dcf-focus-ring"
            />
            <g className="dcf-crew-hop">
              <g
                transform={`scale(${(flipX * member.scale).toFixed(3)}, ${member.scale.toFixed(3)})`}
                filter={reducedMotion ? undefined : `url(#${boilFilterId})`}
              >
                {crewArtwork && crop ? (
                  <svg
                    x={-artworkWidth / 2}
                    y={-artworkHeight}
                    width={artworkWidth}
                    height={artworkHeight}
                    viewBox={`${crop.x} 0 ${crop.width} ${crewArtwork.height}`}
                    overflow="hidden"
                    aria-hidden="true"
                  >
                    <image
                      href={crewArtwork.src}
                      width={crewArtwork.width}
                      height={crewArtwork.height}
                      preserveAspectRatio="none"
                    />
                  </svg>
                ) : (
                  <CrewCharacterSvg
                    kind={member.kind}
                    eyeOffset={eyeOffset}
                    blinking={isBlinking}
                  />
                )}
              </g>
            </g>
          </g>
        </g>
      </g>
    );
  };

  return (
    <footer
      id={id}
      ref={rootRef}
      className={className ? `dcf-root ${className}` : "dcf-root"}
      data-revealed={isRevealed ? "true" : "false"}
      data-in-view={inView}
      style={rootStyle}
    >
      <style>{DCF_CSS}</style>

      <div className="dcf-inner">
        <div className="dcf-world">
          <svg
            ref={svgRef}
            className="dcf-svg"
            viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
            role="img"
            aria-label={`${wordmark}: meet the crew`}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <defs>
              {/* Refined editorial dry-brush edge texture for the BACKTOBASE wordmark */}
              <filter id={brushFilterId} x="-4%" y="-8%" width="108%" height="118%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.028 0.065"
                  numOctaves="2"
                  seed="7"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="1.75"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* Subtle hand-drawn line boil for crew & ground */}
              <filter id={boilFilterId} x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.036"
                  numOctaves="1"
                  seed={boilSeed}
                  result="boil"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="boil"
                  scale="1.05"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>

            {/* Layer 1: Floating BacktoBase Doodles */}
            <g aria-hidden="true">
              {floaters.map((item) => {
                const isPopping = item.pop > 0;
                const popScale = isPopping ? item.scale * (1 + (1 - item.pop) * 0.75) : item.scale;
                const popOpacity = isPopping ? item.pop : 0.9;
                return (
                  <g
                    key={item.id}
                    className="dcf-doodle"
                    transform={`translate(${item.x.toFixed(1)}, ${item.y.toFixed(1)}) rotate(${item.rot.toFixed(1)}) scale(${popScale.toFixed(2)}) translate(-16, -16)`}
                    opacity={popOpacity}
                    onClick={() => popFloater(item.id)}
                  >
                    {isPopping ? (
                      <g className="dcf-accent-stroke" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M16 4 V9 M16 23 V28 M4 16 H9 M23 16 H28" />
                        <path d="M7.5 7.5 L11 11 M21 21 L24.5 24.5 M24.5 7.5 L21 11 M11 21 L7.5 24.5" />
                      </g>
                    ) : (
                      <DoodleArtwork kind={item.kind} />
                    )}
                  </g>
                );
              })}
            </g>

            {/* Small star accents frame the wordmark artwork. */}
            <g aria-hidden="true" className="dcf-brand-stars" fill="var(--dcf-accent)">
              <path d="M 38 276 C 39.5 270 41 268.5 47 267 C 41 265.5 39.5 264 38 258 C 36.5 264 35 265.5 29 267 C 35 268.5 36.5 270 38 276 Z" />
              <path d="M 1162 276 C 1163.5 270 1165 268.5 1171 267 C 1165 265.5 1163.5 264 1162 258 C 1160.5 264 1159 265.5 1153 267 C 1159 268.5 1160.5 270 1162 276 Z" />
              <path d="M 600 204 C 601.5 198 603 196.5 609 195 C 603 193.5 601.5 192 600 186 C 598.5 192 597 193.5 591 195 C 597 196.5 598.5 198 600 204 Z" />
              <path d="M 600 388 C 601.2 383 602.5 381.2 607.5 380 C 602.5 378.8 601.2 377 600 372 C 598.8 377 597.5 378.8 592.5 380 C 597.5 381.2 598.8 383 600 388 Z" />
            </g>

            {/* Layer 2: Behind Crew */}
            {crewShower && <CrewShower capTop={wordLayout.capTopY} />}
            <g>{behindCrew.map(renderCrewNode)}</g>

            {/* Layer 3a: Editorial Offset Print Depth Shadow behind BACKTOBASE */}
            <g aria-hidden="true">
              {wordLayout.glyphs.map((glyph) => {
                const isConnectorWord = isBacktoBase && (glyph.index === 4 || glyph.index === 5);
                return (
                  <text
                    key={`shadow-${glyph.char}-${glyph.index}`}
                    x={glyph.cx + 5.5}
                    y={glyph.bottom + 6}
                    textAnchor="middle"
                    fill={isConnectorWord ? "var(--dcf-accent)" : "var(--dcf-shadow)"}
                    opacity={isConnectorWord ? 0.28 : 0.92}
                    className="dcf-letter"
                    style={
                      {
                        fontFamily: "var(--dcf-font)",
                        fontSize: `${wordLayout.fontSize.toFixed(1)}px`,
                        fontWeight: 800,
                        "--d": `${tl.letter(glyph.index)}ms`,
                      } as React.CSSProperties
                    }
                  >
                    {glyph.char}
                  </text>
                );
              })}
            </g>

            {/* Layer 3b: Main Hand-Inked BACKTOBASE Wordmark */}
            <g filter={reducedMotion ? undefined : `url(#${brushFilterId})`}>
              {wordLayout.glyphs.map((glyph) => (
                <text
                  key={`${glyph.char}-${glyph.index}`}
                  x={glyph.cx}
                  y={glyph.bottom}
                  textAnchor="middle"
                  fill="var(--dcf-ink)"
                  stroke="var(--dcf-ink)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  className="dcf-letter"
                  style={
                    {
                      fontFamily: "var(--dcf-font)",
                      fontSize: `${wordLayout.fontSize.toFixed(1)}px`,
                      fontWeight: 800,
                      "--d": `${tl.letter(glyph.index)}ms`,
                    } as React.CSSProperties
                  }
                >
                  {glyph.char}
                </text>
              ))}
            </g>

            {/* Layer 4: Hand-Drawn Ground Line */}
            <g
              aria-hidden="true"
              filter={reducedMotion ? undefined : `url(#${boilFilterId})`}
            >
              <path
                className="dcf-ground"
                style={{ "--d": `${tl.ground()}ms` } as React.CSSProperties}
                d="M 48 356 Q 220 352 395 357 T 765 355 T 1152 356"
                fill="none"
                stroke="var(--dcf-ink)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                className="dcf-ground"
                style={{ "--d": `${tl.ground() + 120}ms` } as React.CSSProperties}
                d="M 118 363 Q 350 360 610 364 T 1074 362"
                fill="none"
                stroke="var(--dcf-ink)"
                strokeWidth="1.35"
                strokeLinecap="round"
                opacity="0.42"
              />
              {/* Tiny editorial ground accent ticks */}
              <path
                d="M 164 354 L 161 347 M 169 354 L 172 348 M 968 354 L 966 347 M 974 354 L 979 349"
                fill="none"
                className="dcf-accent-stroke"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.78"
              />
            </g>

            {/* Layer 5: Human Crew Seated on Top & Ground */}
            <g>{foregroundCrew.map(renderCrewNode)}</g>
            {crewShower && <CrewShower capTop={wordLayout.capTopY} front />}
          </svg>

          {/* Accessible viewport-clamped Speech Bubble Overlay */}
          {activeMember && (
            <div className="dcf-bubble-layer" aria-live="polite">
              <div
                className="dcf-bubble"
                style={{
                  left: `${clampBubblePercent(activeMember.anchor.x, SCENE_WIDTH)}%`,
                  top: `${clamp(
                    ((activeMember.anchor.y -
                      (activeMember.kind === "community" ? 138 : 112) * activeMember.scale) /
                      SCENE_HEIGHT) *
                      100,
                    10,
                    74,
                  )}%`,
                }}
              >
                <span className="dcf-bubble-name">{activeMember.name}</span>
                <span>{activeMember.says}</span>
              </div>
            </div>
          )}
        </div>

        {/* Centered Editorial Tagline */}
        {words.length > 0 && (
          <p className="dcf-tagline">
            {words.map((word, index) => {
              const isLast = index === words.length - 1;
              return (
                <span
                  key={`${word}-${index}`}
                  className={isLast ? "dcf-word dcf-word-accent" : "dcf-word"}
                  style={
                    {
                      "--d": `${tl.word(index)}ms`,
                      ...(isLast ? { color: "var(--dcf-accent-ink)" } : null),
                    } as React.CSSProperties
                  }
                >
                  {word}
                </span>
              );
            })}
          </p>
        )}

        {/* Footer Ending Bar: Centered Credit + Right Social Links */}
        {(showCredit || socials.length > 0) && (
          <div className="dcf-bottom">
            {links.length > 0 && (
              <nav className="dcf-footer-nav" aria-label="Footer navigation">
                {links.map((item) => item.mobileHref ? (
                  <React.Fragment key={item.label}>
                    <Link href={item.href} target={item.target} rel={item.rel} className={`dcf-footer-nav-desktop${item.emphasis ? " dcf-footer-nav-emphasis" : ""}`}>
                      {item.label}
                    </Link>
                    <Link href={item.mobileHref} className={`dcf-footer-nav-mobile${item.emphasis ? " dcf-footer-nav-emphasis" : ""}`}>
                      {item.label}
                    </Link>
                  </React.Fragment>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    className={item.emphasis ? "dcf-footer-nav-emphasis" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}

            {showCredit && (
              <p className="dcf-credit">
                <span>Made with</span>
                <span className="dcf-credit-heart" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
                <span className="sr-only">love</span>
                <span>by the BacktoBase community.</span>
              </p>
            )}

            {socials.length > 0 && (
              <nav className="dcf-socials" aria-label="BacktoBase social links">
                {socials.map((item) => (
                  <a
                    key={item.kind}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="dcf-social-link"
                  >
                    <SocialIcon kind={item.kind} />
                  </a>
                ))}
              </nav>
            )}
          </div>
        )}

        {closingMarquee && (
          <div className="dcf-marquee" aria-hidden="true">
            <div className="dcf-marquee-track">
              {[0, 1].map((copy) => (
                <div className="dcf-marquee-group" key={copy}>
                  {Array.from({ length: 2 }, (_, index) => (
                    <React.Fragment key={`${copy}-${index}`}>
                      {closingMarquee.split(" · ").map((word, wordIndex) => (
                        <React.Fragment key={`${word}-${wordIndex}`}>
                          <span>{word}</span>
                          <span className="dcf-marquee-divider">·</span>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
