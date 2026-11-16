# AGENTS.md — BacktoBase Community Website Engineering Guide

## Project Overview
BacktoBase is a student-driven, real-world community founded by Yashwanth Bondapalli that bridges student talent with founders, industry professionals, creators, and builders. The website is an editorial, photography-led digital flagship replicating the approved visual specification with pixel precision, rock-solid accessibility, and production-grade engineering.

## Core Rules & Guardrails
1. **Source of Truth**: The approved homepage visual screenshot (`dd801826.jpg`) and original logo (`97a303f0.png`) are absolute references. Never redesign, re-theme, or substitute with generic templates.
2. **Design Direction Ratio**:
   - **70% Photographic Editorial Design**: Warm ivory canvas (`#FAF7F2`), high-contrast condensed charcoal headlines, authentic event photos, elegant layout pacing.
   - **20% Refined Creative-Studio Minimalism**: Frosted glass floating navigation, fine hairlines, generous whitespace, pill tags.
   - **10% Playful Community Personality**: Dynamic angled collage cards, folder-tab archive stack, warm amber bursts, bright cyan accents.
3. **No Fabricated Content**:
   - All 9 editions, speaker names, venue partners, dates, and topics must match the verified BacktoBase archive documents.
   - Member testimonials, founder statements, and team credits must adhere to verified data or use explicit development placeholders tracked in `docs/content-checklist.md`.
4. **Engineering Standards**:
   - Next.js App Router (TypeScript, React 19 / 18, Tailwind CSS, Motion for React).
   - Component-driven architecture with atomic decomposition and strict TypeScript interfaces.
   - Next.js Image optimization with responsive sizes and clean fallbacks.
   - WCAG 2.1 AA accessible: semantic landmarks, screen-reader text, focus rings, keyboard navigability, `prefers-reduced-motion` compliance.
5. **Phase-by-Phase Discipline**:
   - Execute strictly according to the Phase Tracker.
   - Verify every phase with lint, typecheck, build, and visual browser checks.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
