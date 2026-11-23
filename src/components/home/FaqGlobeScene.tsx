"use client";

import { useId, useRef } from "react";
import { useInView } from "framer-motion";
import { backtoBaseCrewArtwork } from "@/data/crewArtwork";

const CREW = [
  { kind: "builder", x: 185, y: 0, width: 50, height: 102 },
  { kind: "creator", x: 324, y: 125, width: 56, height: 136 },
  { kind: "connector", x: 40, y: 125, width: 56, height: 136 },
  { kind: "founder", x: 184, y: 284, width: 52, height: 80 },
] as const;

const DOTS = [
  [146, 160], [157, 147], [168, 159], [174, 140], [185, 150], [190, 174],
  [170, 181], [160, 190], [177, 205], [187, 219], [196, 238],
  [225, 134], [235, 143], [246, 148], [256, 157], [266, 148], [273, 166],
  [251, 172], [233, 167], [220, 180], [234, 191], [246, 201], [258, 190],
  [235, 220], [243, 234], [263, 228], [272, 244], [218, 249],
] as const;

export function FaqGlobeScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const inView = useInView(sceneRef);
  const clipId = `faq-globe-${useId().replace(/:/g, "")}`;

  return (
    <figure ref={sceneRef} className="faq-globe-scene mx-auto lg:mx-0" data-in-view={inView}>
      <svg
        className="faq-globe-art"
        viewBox="0 0 420 376"
        role="img"
        aria-labelledby={`${clipId}-title ${clipId}-description`}
      >
        <title id={`${clipId}-title`}>BacktoBase people around a connected world</title>
        <desc id={`${clipId}-description`}>
          Illustrated builders, creators, and community members gather around a gently turning globe.
        </desc>
        <defs>
          <clipPath id={clipId}>
            <circle cx="210" cy="192" r="91" />
          </clipPath>
          <radialGradient id={`${clipId}-surface`} cx="32%" cy="24%" r="75%">
            <stop offset="0%" stopColor="#FFF9F0" />
            <stop offset="75%" stopColor="#F4E5D3" />
            <stop offset="100%" stopColor="#E9CFB6" />
          </radialGradient>
        </defs>

        <circle cx="210" cy="192" r="92" fill={`url(#${clipId}-surface)`} stroke="#B89677" strokeWidth="1.5" />
        <g clipPath={`url(#${clipId})`} className="faq-globe-grid">
          <g className="faq-globe-meridians">
            <path className="faq-globe-land" d="M146 143q10-15 24-13l8 8 13 3 8 10-8 8-2 13-12 8-5 14-12-2-4-13-12-5-4-12-10-5 3-9Zm66 39 11-10 16 2 6 9 16 3 9 11-3 13-12 4-6 11-12-5-5-13-10-2-2-10-8-4Zm-36 45 12-8 11 6-2 12-8 10-8-4-8-10Z" />
            <ellipse cx="210" cy="192" rx="31" ry="91" />
            <ellipse cx="210" cy="192" rx="62" ry="91" />
            <ellipse cx="210" cy="192" rx="89" ry="91" />
            {DOTS.map(([x, y], index) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 6 === 0 ? 2.4 : 1.45} fill={index % 6 === 0 ? "#B55228" : "#4E7977"} opacity={index % 6 === 0 ? 0.9 : 0.58} />
            ))}
          </g>
          <g className="faq-globe-latitudes">
            <path d="M119 192h182 M129 150Q210 182 291 150 M129 234Q210 266 291 234" />
            <ellipse cx="210" cy="192" rx="90" ry="57" />
          </g>
        </g>

        <ellipse className="faq-globe-glint" cx="176" cy="132" rx="45" ry="13" />

        <ellipse cx="210" cy="192" rx="108" ry="100" fill="none" stroke="#CB9670" strokeWidth="1.2" strokeDasharray="2 7" opacity=".72" />
        <circle className="faq-globe-star" cx="301" cy="137" r="3.5" />
        <circle className="faq-globe-star faq-globe-star--small" cx="121" cy="250" r="2.5" />

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
      <figcaption className="faq-globe-caption">
        <span>Builders · creators · founders · community</span>
      </figcaption>

      <style>{`
        .faq-globe-scene { margin-top: 24px; width: 100%; max-width: 380px; }
        .faq-globe-art { display: block; width: 100%; height: auto; overflow: visible; }
        .faq-globe-grid ellipse, .faq-globe-grid path { fill: none; stroke: #BD9B7E; stroke-width: 1; opacity: .72; }
        .faq-globe-grid .faq-globe-land { fill: #8ca69a; stroke: #78978a; stroke-width: 1; opacity: .58; }
        .faq-globe-meridians { transform-box: fill-box; transform-origin: 210px 192px; transform-style: preserve-3d; animation: faq-globe-turn 24s cubic-bezier(.45,0,.55,1) infinite alternate; }
        .faq-globe-glint { fill: #fffaf3; opacity: .25; filter: blur(5px); pointer-events: none; }
        .faq-globe-star { fill: #E85B2A; transform-origin: center; animation: faq-star-twinkle 3.6s ease-in-out infinite; }
        .faq-globe-star--small { animation-delay: -1.8s; opacity: .68; }
        .faq-globe-caption { padding-top: 3px; color: #7A6251; font-size: 10px; font-weight: 700; letter-spacing: .12em; line-height: 1.5; text-align: center; text-transform: uppercase; }
        @keyframes faq-globe-turn {
          from { transform: perspective(900px) rotateY(-16deg) scaleX(.92); }
          to { transform: perspective(900px) rotateY(16deg) scaleX(.92); }
        }
        @keyframes faq-star-twinkle { 0%, 100% { opacity: .48; scale: .82; } 50% { opacity: 1; scale: 1.12; } }
        .faq-globe-scene[data-in-view="false"] :is(.faq-globe-meridians, .faq-globe-star) { animation-play-state: paused; }
        @media (max-width: 1023px) {
          .faq-globe-scene { max-width: 320px; margin-top: 16px; }
        }
        @media (max-width: 639px) {
          .faq-globe-scene { max-width: 260px; margin-top: 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-globe-scene :is(.faq-globe-meridians, .faq-globe-star) { animation: none; }
        }
      `}</style>
    </figure>
  );
}
