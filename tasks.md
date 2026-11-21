# BacktoBase Footer Implementation Tasks

## Checklist

- [x] **Task 1: Inspect repository setup** — Reviewed `package.json`, `tsconfig.json`, `tailwind.config.ts`, `eslint.config.mjs`, `next.config.mjs`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/home/FinalCta.tsx`, and all pages mounting `<Footer />`.
- [x] **Task 2: Tailor bespoke footer typography** — Added `Bricolage_Grotesque` (display wordmark) and `Fraunces` (editorial tagline serif) alongside `Inter` and `Inter_Tight` in `src/app/fonts.ts` and wired their CSS variables in `src/app/layout.tsx`.
- [x] **Task 3: Replace chibi mascots with proportional editorial human doodles & tailored BACKTOBASE wordmark** — Updated `src/components/ui/doodle-crew-footer.tsx`:
  - 5 consistent, proportional, hand-drawn human character doodles (`founder`, `connector`, `builder`, `creator`, `community`) with natural hairstyles, jackets/hoodies/sweaters, props (notebook, lanyard badge, laptop, sketchpad & stylus, coffee cup), subtle idle motion (gentle sway, wave, gesture, typing bob), pointer-tracking eyes, staggered blinking, hop, and viewport-clamped speech bubbles
  - Bespoke layered `BACKTOBASE` print-shop wordmark (`Bricolage Grotesque 800`, warm sand offset depth shadow + subtle `#F4511E` orange offset behind `"TO"` for effortless `BACK · TO · BASE` readability, refined dry-brush edge filter)
  - Fixed counter overlap by seating Creator cleanly cross-legged atop the second `B` and increased vertical scene headroom (`SCENE_HEIGHT = 420`)
  - Hand-drawn ground line and centered `Fraunces` `"Learn. Connect. Grow."` tagline with subtle orange ink underline flourish under `"Grow."`
- [x] **Task 4: Integrate updated `Footer` site-wide** — Wired `footerDisplayFont` and `footerSerifFont` in `src/components/layout/Footer.tsx`.
- [x] **Task 5: Update and run verification suite** — Updated `test/doodle-crew-footer.test.mjs` for the new human crew spacing and headroom; verifying `typecheck`, `lint`, `test`, and `build`.
- [ ] **Task 6: Live visual check in browser** — User to refresh `http://localhost:3000` (automated headless `chrome_devtools` MCP remains blocked by `EBADDEVENGINES` in `package.json`).
