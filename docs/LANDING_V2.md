# Landing V2 — Architecture, Beats & Styling

**Route:** `/landing` (test / preview — `robots: noindex`)  
**Branch:** `rt2026-v3-homepage`  
**Primary file:** `src/app/landing/landing.js`  
**Last updated:** June 2026

This document describes the new homepage approach: a **split scroll model** where the opening story runs in a sticky viewport, then the rest of the page scrolls normally with entrance animations.

---

## 1. Design intent

The page tells one continuous story in two modes:

| Mode | Scroll behavior | Content |
|------|-----------------|---------|
| **Sticky narrative** | Tall outer container + inner `position: sticky` panel; scroll drives `progress` 0→1 | Beats 1–6: question → dream → reality → gap → formula |
| **Normal flow** | Standard document scroll; Framer Motion `whileInView` | Formula cards, CTA sections, playbook, proof, insights, agent, closing quote |

**Why split?** Beats 1–6 need precise, scroll-linked timing in one viewport. Everything after the formula payoff benefits from natural page flow (no competing sticky layers, easier mobile behavior, simpler section edits).

**Production homepage** (`src/app/home/index.js`) still uses the earlier single-sticky journey. `/landing` is the candidate replacement once approved.

---

## 2. Page structure

```
main
├── Nav (fixed)
├── ScrollNarrative          ← sticky beats 1–6  (1636vh container)
├── LandingFlowSections      ← normal scroll
│   ├── WhenTheyWorkTogether ← formula cards (beat 7, extracted)
│   ├── Let's get started    ← AgentTerminal
│   ├── How We Work
│   ├── The Playbook
│   ├── Proof of formula     ← FluffyFriends
│   ├── Radical Insights
│   └── Talk to Us           ← AgentTerminal
├── What we think            ← closing quote + attribution
└── Footer
```

Background: `SoftBackground` in a fixed layer behind content (`gradient-background`).

---

## 3. Scroll progress engine

All sticky timing uses the same primitives:

### `useNarrativeProgress(containerRef)`

- Measures how far the user has scrolled through a tall outer container.
- `scrollable = containerHeight - viewportHeight`
- `progress = clamp(scrolled / scrollable, 0, 1)`
- Updates every animation frame with **soft-follow blending** (`blend = 0.18`) to reduce jitter between frames.

Used by:

- `ScrollNarrative` (beats 1–6)
- `WhenTheyWorkTogetherDesktop` (formula card fan/flip)

### `mapProgress(p, inputRange, outputRange)`

Piecewise linear interpolation. Each beat defines opacity, position, and scale as keyed ranges on `p`.

### Key constants

| Constant | Value | Purpose |
|----------|-------|---------|
| `NARRATIVE_SCROLLABLE_VH` | 1536 | Scroll distance for beats 1–6 |
| `NARRATIVE_CONTAINER_VH` | 1636 | Outer container height (+100vh buffer) |
| `DESKTOP_FORMULA_SCROLL_VH` | 240 | Separate scroll lane for desktop card animation |
| `DESKTOP_CARD_SPREAD` | 205 | Horizontal fan distance (px from centre) |

---

## 4. Sticky beats (1–6)

Progress ranges are on `p` ∈ [0, 1] within `ScrollNarrative`.

| Beat | Progress | Content | Motion notes |
|------|----------|---------|--------------|
| **1** | 0 – 0.08 | *Is your business today what you imagined it would be?* | Visible on first paint; fades out as beat 2 enters |
| **2** | 0.09 – 0.20 | Eyebrow → headline → body (dream / passion) | Three lines stagger in with 24px rise |
| **3** | 0.21 – 0.29 | **Then.** (orange, large) | Scale 0.65 → 1 |
| **4** | 0.30 – 0.43 | *Reality happened.* + fly-through labels | 9 keyword labels drift outward from centre (CRM, ERP, SEO Agency, etc.) |
| **5** | 0.44 – 0.53 | *The Gap* quote + follow-up line | Headline italic; second line delayed fade |
| **6** | 0.54 – 1.0 | Formula build + payoff | Terms appear one-by-one; gradient `BI = C + Ex × T²`; holds at full opacity until sticky releases |

Beat 6 **does not fade out** — it remains visible through `p = 1` so the formula payoff stays on screen as the sticky section ends.

Scroll indicator (bottom “Scroll” + pulse line) fades out around `p = 0.88`.

### Beat 4 — reality drift labels

Labels are placed on a radial layout and animated with per-item delay:

- `REALITY_BEAT`: `{ start: 0.30, end: 0.43, moveStart: 0.315, moveEnd: 0.43 }`
- Each label drifts along a vector from centre, opacity ~0.38, staggered by `delay: i * 0.011`

---

## 5. Formula cards — “When they all work together” (beat 7)

Extracted from the sticky narrative into `WhenTheyWorkTogether` as the **first normal-flow section** after beat 6.

### Mobile (`md:hidden`)

- Eyebrow title + three `FormulaFlowCard` components in a vertical grid.
- Framer Motion fade-up stagger (`delay: i * 0.08`).
- Card size: **240px / 260px height**, max-width 260px — do not change without explicit reason.

### Desktop (`md:block`)

Separate **240vh scroll lane** with its own sticky panel:

1. Title *When they all work together.* inside sticky (fades with `bridgeOp`) — must stay in sticky or it scrolls away.
2. Three `NarrativeFormulaCard` components with CSS transforms (not Framer scroll templates).

**Animation phases** (remapped from original beat 7, narrative `0.665–0.901` → desktop scroll `0–1`):

| Phase | Progress | Behavior |
|-------|----------|----------|
| Bridge | 0.064 – 0.144 | Title opacity 0 → 1 |
| Cards in | 0.144 – 0.208 | Cards opacity 0 → 1 |
| Stack → fan | 0.208 – 0.534 | Stack Y offset collapses; T² fans right first, Ex centres, C fans left |
| Flip C | 0.678 – 0.839 | rotateY 0 → 180° |
| Flip Ex | 0.754 – 0.920 | rotateY 0 → 180° |
| Flip T² | 0.839 – 1.0 | rotateY 0 → 180° |

**Fan keyframes (original reference):**

```
t2X: [0.714, 0.757] → [0, 205]
exX: [0.734, 0.784] → [12, 0]
cX:  [0.714, 0.791] → [0, -205]
```

**Card component rules:**

- Use **`FormulaCardFaces` with `compact`** for desktop fan cards — full-size back face overflows 300px height and clips badges.
- Card stage: `max-w-4xl`, height `300px` / `320px`, card width `min(38vw, 200px)`.
- Plain CSS `transform: translate(...)` + `rotateY(...)` on wrapper — same approach as original sticky beat 7.

### Formula card data

| Letter | Label | Color | Badge |
|--------|-------|-------|-------|
| C | Creative | `#1ACDEB` | The dream |
| Ex | Experience | `#E18949` | The reality |
| T² | Technology | `#6B17DA` | The amplifier |

---

## 6. Normal-flow sections

Shared section class: `px-4 py-14 md:py-20 scroll-mt-24`.

| Section | ID | Animation pattern |
|---------|-----|-------------------|
| Let's get started | `get-started` | Title rise + terminal fade |
| How We Work | `how` | Eyebrow blur-in; rows slide from left |
| The Playbook | `playbook` | Rows slide from right |
| Proof of formula | — | FluffyFriends card scale-in; stat counters |
| Radical Insights | `insights` | Article cards fade-up stagger |
| Talk to Us | `agent` | Terminal rise |
| What we think | `radical` | Title + quoted body + attribution |

### Motion defaults

```js
const E = [0.16, 1, 0.3, 1];  // ease curve
const VP = { once: false, margin: "0px 0px -100px 0px" };
```

Sections re-animate when scrolled back into view (`once: false`).

### AgentTerminal

Dark macOS-style terminal linking to `/chat`. Used twice:

- **Get started:** prompt about bold idea vs intention.
- **Talk to Us:** agency line + shorter prompt.

---

## 7. Styling system

### Typography

- **Body:** Helvetica Neue (`globals.css`)
- **Headlines / serif accent:** Roboto Slab via `next/font/google` — applied through `style={serif}`
- **Eyebrows:** `text-xs font-semibold uppercase tracking-[0.22–0.25em] text-[#8a8780]`

### Brand colors

| Token | Hex | Use |
|-------|-----|-----|
| Creative | `#1ACDEB` | C / step 1 / stat |
| Experience | `#E18949` | Ex / step 2 / “Then.” |
| Technology | `#6B17DA` | T² / step 3 |
| Muted text | `#8a8780` | Eyebrows, labels |
| Border / divider | `#e8e4dc` | Cards, borders |
| Terminal bg | `#0d0d0d` / `#181818` | AgentTerminal |

### Formula gradient

Beat 6 equation uses animated gradient text:

```css
.animate-gradient-loop  /* globals.css — 3s ease infinite */
background: linear-gradient(90deg, #1ACDEB, #6B17DA, #E18949, #1ACDEB);
background-size: 200% auto;
```

### Global CSS additions (`globals.css`)

| Class | Purpose |
|-------|---------|
| `overflow-x: clip` on `body` | Prevents horizontal bleed from transforms without breaking `position: sticky` |
| `.animate-gradient-loop` | Formula equation shimmer |
| `.rt-scroll-line` | Sticky narrative scroll indicator pulse |
| `.rt-cursor` / `.rt-cursor-headline` | Terminal and typewriter cursors |
| `@keyframes rt-blink` | Cursor blink |

### Layout principles (intentional)

- **No section dividers** (`rt-divider`, top borders) — free-flowing layout between sections.
- **No blue background overlay** on sticky narrative — removed; caused blocky horizontal bands at transitions.
- **No scroll-linked flip on mobile** — cards leave viewport; use fade-up stack instead.

---

## 8. Files & references

| File | Role |
|------|------|
| `src/app/landing/landing.js` | Main page component (`LandingV2`) |
| `src/app/landing/page.js` | Route wrapper, metadata, noindex |
| `src/app/landing/landing_rebuilt.js` | Local reference only (full single-sticky version) — **not deployed** |
| `src/app/globals.css` | Shared animation utilities |
| `src/app/home/index.js` | Current production homepage |

---

## 9. Do not regress

When editing `/landing`, preserve unless explicitly changing:

1. Mobile formula card heights (240/260px).
2. Desktop card **`compact`** faces on `NarrativeFormulaCard`.
3. Title inside desktop sticky panel for formula section.
4. `useNarrativeProgress` + `mapProgress` for desktop card timing (not Framer `useScroll` on cards).
5. Beat 6 holding visible through `p = 1`.
6. No `bgBlue` / narrative background color overlays.
7. Split architecture: beats 1–6 sticky, everything after in normal flow.

---

## 10. Local development

```bash
npm run dev
# Open http://localhost:3000/landing
```

Build check:

```bash
npm run build
```

---

## 11. Next steps (when promoting to production)

- [ ] Review on real devices (desktop card fan, mobile stack, sticky handoff at beat 6 → flow).
- [ ] Replace or merge into `src/app/home/index.js` / root route.
- [ ] Remove `robots: noindex` from route metadata.
- [ ] Delete or archive `landing_rebuilt.js` reference copy.
- [ ] Update sitemap / nav if `/landing` becomes `/`.
