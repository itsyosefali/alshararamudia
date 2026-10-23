# Design System — الشراره المضيئة

Arabic (RTL) landing page for a Volkswagen/Audi car and parts importer, founded 2025.
Brand source: `logo.jpeg` (navy car outline, amber speed lines, four-point star).

## Aesthetic Direction
**Technical** — the supplier parts catalogue and the parts counter: model/year indexes,
hairline rules, part data set in mono, flat signage-yellow surfaces.
Commit to it for every component. Do not mix directions.

## Typography
- Display: Reem Kufi, weight 700, tracking -0.005em — headings h1/h2 and model-family names only (crowds below ~24px)
- Body: IBM Plex Sans Arabic, weight 400 (500/600/700 for labels, small headings and buttons)
- Mono (data/labels): IBM Plex Mono, weight 500 — phone numbers, model years, Latin model names, Audi model codes, counts
- Fallbacks: `sans-serif` / `monospace` generics only
- FORBIDDEN: Inter, Roboto, Arial, system-ui, Lato, Open Sans

## Color
- Primary: #F6B51E — Signal Yellow (hero surface, primary buttons, selected states, link underlines)
- Accent: #D9901A — Amber Gold, the logo star (use sparingly, max 1 per view; never for text)
- Background: #F4F5F2 — Bay White sections; #FFFFFF for the nav and part/model surfaces
- Text: #1B2330 — Logo Navy (also the dark panels); #5B6573 for secondary text on light
- FORBIDDEN: purple/indigo gradients, evenly-distributed pastel palettes

## Layout
- Asymmetric splits (60/40 or 70/30), not centered-everything
  - Hero: copy + finder 40 / photo 60 (photo bleeds off the physical-left edge)
  - Steps, branches: section heading 30 / content 70
  - Whole-car panel: text 40 / photo 60
- Containers nest at most 2 levels
- Spacing scale: 4 / 8 / 16 / 32 / 64 / 128 px (no arbitrary values) — CSS tokens `--s1`…`--s6`
- RTL first: use logical properties (`inline-start` = physical right)
- FORBIDDEN: 3-equal-card grids, bento grids, glassmorphism, blob SVGs

## Components
- Buttons: flat, 4px radius, no shadow
- Cards: 4px radius, 1px hairline border, no shadow; no rounded-2xl, no accent bar on left
- Form controls and choice chips: 4px radius, same as buttons
- Icons: Phosphor (regular, web font via jsDelivr) or text glyphs, never Lucide by default
- FORBIDDEN: blinking status dots, "Trusted by" logo bars, number counters

## Motion
- One orchestrated page-load sequence (staggered reveals), not scattered micro-interactions
  - Hero only: headline lines rise → subline → finder; photo wipes in right-to-left; gold speed lines draw
- No hover/scroll animations elsewhere; state changes are instant
- Respect `prefers-reduced-motion`
- Prefer CSS-only. No Lottie of abstract shapes.
