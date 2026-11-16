# BacktoBase — Design Tokens Specification

## 1. Color Palette

### 1.1 Foundation & Canvas (Warm Editorial Paper)
| Token | CSS Variable / Tailwind | Hex Value | Purpose |
|---|---|---|---|
| `canvas-base` | `--color-canvas-base` | `#FAF7F2` | Primary background canvas |
| `canvas-subtle` | `--color-canvas-subtle` | `#F3EFE6` | Slightly deeper warm ivory for cards and pills |
| `canvas-card` | `--color-canvas-card` | `#FFFFFF` | Crisp contrast card surfaces |
| `canvas-dark` | `--color-canvas-dark` | `#12161A` | Dark editorial containers, banners, footer |
| `canvas-dark-surface` | `--color-canvas-dark-surface` | `#192026` | Card background inside dark sections |

### 1.2 Charcoal & Typography Scales
| Token | CSS Variable / Tailwind | Hex Value | Purpose |
|---|---|---|---|
| `charcoal-950` | `--color-charcoal-950` | `#111215` | Hero headlines, primary display text |
| `charcoal-900` | `--color-charcoal-900` | `#1C1E22` | Section titles, heavy text |
| `charcoal-700` | `--color-charcoal-700` | `#4A4E57` | Body text, readable longform |
| `charcoal-500` | `--color-charcoal-500` | `#717682` | Eyebrow text, metadata, secondary captions |
| `charcoal-300` | `--color-charcoal-300` | `#A0A5B1` | Inactive pagination, placeholders |

### 1.3 Brand Accents (Logo & Visual Motifs)
| Token | CSS Variable / Tailwind | Hex Value | Purpose |
|---|---|---|---|
| `brand-orange` | `--color-brand-orange` | `#EA580C` | Primary action buttons, logo "Back" base |
| `brand-amber` | `--color-brand-amber` | `#F59E0B` | Glow accents, hero collage backdrop, doodles |
| `brand-amber-light`| `--color-brand-amber-light`| `#FEF3C7` | Subtle badge backgrounds, quote marks |
| `brand-cyan` | `--color-brand-cyan` | `#00C0E8` | Highlight text ("GROW.", "FOR STUDENTS."), logo "Base" |
| `brand-teal` | `--color-brand-teal` | `#0891B2` | Gradient stop for cyan-to-teal elements |
| `brand-dark-pill` | `--color-brand-dark-pill` | `#142528` | Navigation CTA button background |

### 1.4 Borders & Dividers
| Token | CSS Variable / Tailwind | Hex Value | Purpose |
|---|---|---|---|
| `border-subtle` | `--color-border-subtle` | `#E8E3DA` | Pill navigation, cards, hairlines |
| `border-strong` | `--color-border-strong` | `#D4CDC2` | Secondary pill buttons, tab borders |
| `border-dark` | `--color-border-dark` | `#28323B` | Dividers inside dark cards and banners |

---

## 2. Typography System

### 2.1 Font Families
- **Display Headings**: Condensed, bold sans-serif (`font-display` / Inter Tight / Archivo / Oswald / Syne fallback stack).
  ```css
  --font-display: 'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  ```
- **Editorial / Body**: Clean, humanist editorial sans (`font-sans` / Inter / system-ui).
  ```css
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  ```
- **Monospace / Eyebrows**: Crisp geometric mono/sans tracking (`font-mono` / Geist Mono / JetBrains Mono).

### 2.2 Typographic Hierarchy
| Role | Size | Line Height | Tracking | Weight | Case |
|---|---|---|---|---|---|
| **Hero Massive** | `clamp(2.75rem, 6vw, 4.75rem)` | `0.92` | `-0.03em` | `900` | Uppercase |
| **Section Display** | `clamp(2rem, 4vw, 3rem)` | `1.0` | `-0.02em` | `800` | Uppercase |
| **Subsection Heading**| `1.5rem - 1.875rem` | `1.15` | `-0.015em` | `700` | Mixed / Cap |
| **Eyebrow / Overline**| `0.75rem - 0.8125rem` | `1.0` | `+0.08em` | `700` | Uppercase |
| **Lead Paragraph** | `1.125rem - 1.25rem` | `1.5` | `normal` | `400` | Normal |
| **Body Standard** | `0.9375rem - 1.0rem` | `1.6` | `normal` | `400` | Normal |
| **Caption / Meta** | `0.8125rem - 0.875rem` | `1.4` | `+0.01em` | `500` | Normal |

---

## 3. Spacing & Layout Tokens
- **Container Max Width**: `1280px` (`max-w-7xl`).
- **Gutter Padding**:
  - Mobile: `16px` (`px-4`)
  - Tablet: `24px` (`px-6`)
  - Desktop: `32px` to `48px` (`px-8` to `px-12`)
- **Section Vertical Rhythm**: `clamp(4rem, 8vw, 7rem)` (`py-16` to `py-24`).

---

## 4. Radii & Elevation
- **Pill**: `9999px` (`rounded-full`)
- **Cards & Containers**: `16px` (`rounded-2xl`) to `24px` (`rounded-3xl`)
- **Folder Tabs**: `12px` top radius with flat base
- **Shadows**:
  - `shadow-pill`: `0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)`
  - `shadow-photo`: `0 12px 32px -4px rgba(20, 20, 20, 0.12), 0 4px 12px -2px rgba(20, 20, 20, 0.06)`
  - `shadow-card`: `0 8px 24px -2px rgba(28, 25, 23, 0.05)`

---

## 5. Animation & Motion Tokens
- **Eases**:
  - `ease-spring`: `cubic-bezier(0.16, 1, 0.3, 1)`
  - `ease-editorial`: `cubic-bezier(0.25, 1, 0.5, 1)`
- **Durations**:
  - Micro-interactions (hover, tap): `150ms - 200ms`
  - Pill navigation indicator: `250ms`
  - Accordion expansion: `300ms`
  - Folder transitions: `350ms`
