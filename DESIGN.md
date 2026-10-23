# Design System — الشراره المضيئة

Arabic (RTL) landing page for a Volkswagen/Audi car and parts importer in Tripoli, founded 2025.
Brand source: `logo.jpeg` (navy car outline, amber speed lines, four-point star).

## Aesthetic Direction
**Technical**, read as an official VW/Audi dealer ("Wolfsburg Counter"): bright showroom white,
large precise photography, configurator-style controls, hairline rules. Feeling: confident.
Never: a discount shop, a generic template, a government/bank site, a dark gaming site.
Commit to it for every component. Do not mix directions.

## Typography
- Display: Readex Pro 700 paired with Readex Pro 300 — headlines set as a bold line/phrase plus a light one (dealer style); closest Google font to the logo wordmark
- Body: Readex Pro 400 (500/600 for UI labels and small headings)
- Mono (data/labels): none — phone numbers and years use Readex Pro with `font-variant-numeric: tabular-nums`
- Fallback: `sans-serif` generic only
- FORBIDDEN: Inter, Roboto, Arial, system-ui, Lato, Open Sans

## Color
- Primary: #F6B51E — brand yellow, for buttons, active tab underline, selected states only (no large yellow surfaces)
- Accent: #D9901A — the logo's four-point star (use sparingly, max 1 per view)
- Background: #FFFFFF — showroom white; #F2F3F5 cool panel grey for alternating sections and inputs
- Text: #1B2330 — logo navy (also the footer); #6B7380 for secondary text
- FORBIDDEN: purple/indigo gradients, evenly-distributed pastel palettes, cream backgrounds

## Layout
- Asymmetric splits (60/40 or 70/30), not centered-everything
  - Hero head: headline 60 / subline 40, above a wide photo; the finder bar overlaps the photo's bottom edge
  - Model explorer: photo 60 / generation list 40, under family tabs
  - How to order: steps 40 / whole-car offer 60; Audi: copy 40 / photo 60; Branches: list 60 / map 40
- Containers nest at most 2 levels
- Spacing scale: 4 / 8 / 16 / 32 / 64 / 128 px (no arbitrary values) — CSS tokens `--s1`…`--s6`
- RTL first: use logical properties (`inline-start` = physical right)
- Catalogue images are ~611px (cars) and ~280px (parts) natively: never display them larger than that
- FORBIDDEN: 3-equal-card grids, bento grids, glassmorphism, blob SVGs, text over the car in photos

## Components
- Buttons: flat, 4px radius, no shadow
- Cards/panels: 4px radius, no shadow; no rounded-2xl, no accent bar on left
- Form controls: 4px radius, panel-grey fill
- Icons: Phosphor (regular, web font via jsDelivr), never Lucide by default
- FORBIDDEN: blinking status dots, "Trusted by" logo bars, number counters

## Motion
- One orchestrated page-load sequence (staggered reveals), not scattered micro-interactions
  - Hero only: photo settles from 1.05 scale, headline lines rise, gold speed lines draw, finder bar rises
- User-triggered only otherwise: the explorer photo crossfades when a model is chosen
- Respect `prefers-reduced-motion`
- Prefer CSS-only. No Lottie of abstract shapes.
