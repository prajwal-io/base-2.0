"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import { backtoBaseCrewArtwork } from "@/data/crewArtwork";

const CREW = [
  { kind: "builder", x: 154, y: 0, width: 112, height: 153, delay: "0s" },
  { kind: "creator", x: 302, y: 125, width: 86, height: 167, delay: "-1.2s" },
  { kind: "connector", x: 29, y: 140, width: 78, height: 156, delay: "-2.4s" },
  { kind: "founder", x: 140, y: 250, width: 67, height: 103, delay: "-3.6s" },
] as const;

export function FaqGlobeScene() {
  const reducedMotion = useReducedMotion();
  const clipId = `faq-globe-${useId().replace(/:/g, "")}`;

  return (
    <figure className="faq-globe-scene" data-reduced-motion={reducedMotion ? "true" : "false"}>
      <svg
        className="faq-globe-art"
        viewBox="0 0 420 360"
        role="img"
        aria-labelledby={`${clipId}-title ${clipId}-description`}
      >
        <title id={`${clipId}-title`}>BacktoBase people around a connected world</title>
        <desc id={`${clipId}-description`}>
          Illustrated builders, creators, and community members gather around a gently turning globe.
        </desc>
        <defs>
          <clipPath id={clipId}>
            <circle cx="210" cy="184" r="127" />
          </clipPath>
        </defs>

        <circle cx="210" cy="184" r="130" fill="#F8EDDF" stroke="#D9C5B1" strokeWidth="1.5" />
        <circle cx="210" cy="184" r="119" fill="none" stroke="#E7D8C8" strokeWidth="1" />
        <g clipPath={`url(#${clipId})`} className="faq-globe-grid">
          <g className="faq-globe-meridians">
            <ellipse cx="210" cy="184" rx="38" ry="126" />
            <ellipse cx="210" cy="184" rx="82" ry="126" />
            <ellipse cx="210" cy="184" rx="126" ry="126" />
          </g>
          <g className="faq-globe-latitudes">
            <ellipse cx="210" cy="184" rx="126" ry="36" />
            <ellipse cx="210" cy="184" rx="126" ry="76" />
            <path d="M 88 157 Q 210 184 332 157 M 88 211 Q 210 184 332 211" />
          </g>
        </g>

        <ellipse cx="210" cy="184" rx="154" ry="133" fill="none" stroke="#E9A16D" strokeWidth="1.2" strokeDasharray="3 8" opacity=".7" />
        <circle className="faq-globe-star" cx="349" cy="83" r="4" />
        <circle className="faq-globe-star faq-globe-star--small" cx="70" cy="101" r="2.5" />

        {CREW.map((person) => {
          const crop = backtoBaseCrewArtwork.crops[person.kind];
          return (
            <svg
              key={person.kind}
              x={person.x}
              y={person.y}
              width={person.width}
              height={person.height}
              viewBox={`${crop.x} 0 ${crop.width} ${backtoBaseCrewArtwork.height}`}
              preserveAspectRatio="xMidYMax meet"
              overflow="hidden"
              className="faq-globe-person"
              style={{ "--person-delay": person.delay } as React.CSSProperties}
              aria-hidden="true"
            >
              <image
                href="/images/footer-community-crew-v3.png"
                width={backtoBaseCrewArtwork.width}
                height={backtoBaseCrewArtwork.height}
              />
            </svg>
          );
        })}
      </svg>
      <figcaption className="faq-globe-caption">Builders · creators · founders · community</figcaption>

      <style>{`
        .faq-globe-scene { margin: 24px 0 0; max-width: 380px; }
        .faq-globe-art { display: block; width: 100%; height: auto; overflow: visible; }
        .faq-globe-grid ellipse, .faq-globe-grid path { fill: none; stroke: #BD9B7E; stroke-width: 1; opacity: .72; }
        .faq-globe-meridians { transform-origin: 210px 184px; animation: faq-globe-turn 12s ease-in-out infinite; }
        .faq-globe-latitudes { transform-origin: 210px 184px; animation: faq-globe-breathe 8s ease-in-out infinite; }
        .faq-globe-person { transform-origin: 50% 100%; animation: faq-person-float 5.2s ease-in-out var(--person-delay) infinite; }
        .faq-globe-star { fill: #E85B2A; transform-origin: center; animation: faq-star-twinkle 3.6s ease-in-out infinite; }
        .faq-globe-star--small { animation-delay: -1.8s; opacity: .68; }
        .faq-globe-caption { padding-top: 3px; color: #7A6251; font-size: 10px; font-weight: 700; letter-spacing: .12em; line-height: 1.5; text-align: center; text-transform: uppercase; }
        @keyframes faq-globe-turn { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(.16); } }
        @keyframes faq-globe-breathe { 0%, 100% { transform: scaleY(.96); } 50% { transform: scaleY(1.04); } }
        @keyframes faq-person-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -3px; } }
        @keyframes faq-star-twinkle { 0%, 100% { opacity: .48; scale: .82; filter: drop-shadow(0 0 1px #E85B2A); } 50% { opacity: 1; scale: 1.12; filter: drop-shadow(0 0 5px #E85B2A); } }
        @media (prefers-reduced-motion: reduce) { .faq-globe-scene[data-reduced-motion="true"] .faq-globe-meridians, .faq-globe-scene[data-reduced-motion="true"] .faq-globe-latitudes, .faq-globe-scene[data-reduced-motion="true"] .faq-globe-person, .faq-globe-scene[data-reduced-motion="true"] .faq-globe-star { animation: none; } }
      `}</style>
    </figure>
  );
}
