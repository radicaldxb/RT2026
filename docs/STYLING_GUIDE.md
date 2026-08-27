# Radical Thinking — Website Styling Guide

Practical visual rules for the Radical Thinking website. Use this when building or editing pages so ambient background, type, weight, and colour stay consistent.

**Related docs**
- Voice and positioning: [`Brand_guidelines.md`](./Brand_guidelines.md)
- Full design system and page patterns: [`DESIGN.md`](./DESIGN.md)
- Homepage motion / scroll beats: [`LANDING_V2.md`](./LANDING_V2.md)

**Source of truth in code**
- Fonts: `src/lib/fonts.js`
- Ambient canvas: `src/app/globals.css` (`.gradient-background`) + `src/components/SoftBackground.js`
- Global body: `src/app/layout.js`

---

## 1. Visual identity in one line

Warm near-white editorial canvas, soft triadic colour fog (Creative blue / Experience amber / Technology purple), Roboto Light for body and UI, Roboto Slab for display headlines. Black for primary actions. Restraint over decoration.

---

## 2. Ambient background

Every branded page should sit on the same two-layer atmosphere. Do not replace this with a flat solid fill unless the surface is intentionally dark (chat terminal only).

### Layer A — page wash (`.gradient-background`)

Defined in `src/app/globals.css`. Canonical CSS:

```css
.gradient-background {
  background-color: #f9f8ff;
  background-image:
    radial-gradient(at 0% 0%, rgba(255, 200, 240, 0.55) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(180, 235, 255, 0.55) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(255, 240, 180, 0.45) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(200, 220, 255, 0.55) 0px, transparent 50%),
    radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.85) 0px, transparent 60%);
  background-size: 200% 200%;
  background-repeat: no-repeat;
  background-attachment: scroll; /* use fixed from 768px up */
  animation: background-float 12s ease infinite;
}

@keyframes background-float {
  0%   { background-position: 0% 0%; }
  25%  { background-position: 100% 0%; }
  50%  { background-position: 100% 100%; }
  75%  { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}

@media (min-width: 768px) {
  .gradient-background {
    background-attachment: fixed;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-background {
    animation: none;
    background-position: 0% 0%;
  }
}
```

| Layer in `background-image` | Position | Colour | Role |
|-----------------------------|----------|--------|------|
| 1 | `0% 0%` top-left | `rgba(255, 200, 240, 0.55)` | Warmth / pink |
| 2 | `100% 0%` top-right | `rgba(180, 235, 255, 0.55)` | Creative cyan |
| 3 | `100% 100%` bottom-right | `rgba(255, 240, 180, 0.45)` | Experience yellow |
| 4 | `0% 100%` bottom-left | `rgba(200, 220, 255, 0.55)` | Cool blue |
| 5 | `50% 50%` centre | `rgba(255, 255, 255, 0.85)` | Readability veil |

Base fill: `#f9f8ff` (cool near-white, not pure `#ffffff`).

### Layer B — SoftBackground fog blobs

Live implementation: `src/components/SoftBackground.js` (RAF drift).  
CSS-equivalent pattern for other tools / static previews:

```css
/* Parent: absolute inset-0 overflow-hidden */
.rs-fog {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  will-change: transform;
  pointer-events: none;
}

.rs-fog-1 { /* Creative — top-left */
  width: 55vw; height: 55vw;
  top: -15vw; left: -15vw;
  background: rgba(26, 205, 235, 0.20); /* #1ACDEB @ 20% */
}

.rs-fog-2 { /* Technology — top-right */
  width: 45vw; height: 45vw;
  top: -8vw; right: -12vw;
  background: rgba(107, 23, 218, 0.14); /* #6B17DA @ 14% */
}

.rs-fog-3 { /* Experience — bottom-right */
  width: 50vw; height: 50vw;
  bottom: -12vw; right: -8vw;
  background: rgba(225, 137, 73, 0.18); /* #E18949 @ 18% */
}

.rs-fog-4 { /* Creative soft — bottom-left */
  width: 40vw; height: 40vw;
  bottom: -10vw; left: -8vw;
  background: rgba(26, 205, 235, 0.12); /* #1ACDEB @ 12% */
}

.rs-fog-center { /* white veil */
  width: 60vw; height: 60vw;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.80);
  filter: blur(80px);
}
```

| Blob | Position | Fill | Blur | Brand role |
|------|----------|------|------|------------|
| 1 | Top-left | `rgba(26, 205, 235, 0.20)` | 90px | Creative |
| 2 | Top-right | `rgba(107, 23, 218, 0.14)` | 90px | Technology |
| 3 | Bottom-right | `rgba(225, 137, 73, 0.18)` | 90px | Experience |
| 4 | Bottom-left | `rgba(26, 205, 235, 0.12)` | 90px | Creative soft |
| Centre | Centre | `rgba(255, 255, 255, 0.80)` | 80px | Readability |

Rules:
- Always stack SoftBackground **inside** the fixed `.gradient-background` layer
- Ambient stack must be `pointer-events-none`
- Prefer RAF drift in production; CSS-only fog is fine for static mocks
- Disable motion when `prefers-reduced-motion: reduce`

### Standard page shell

```jsx
<main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
  <span className={robotoSlab.className} hidden aria-hidden />

  <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
    <SoftBackground />
  </div>

  <Nav />
  <div className="relative z-10 ...">{/* content */}</div>
  <Footer />
</main>
```

---

## 3. Colour system

### Core neutrals

| Token | Hex | Use |
|-------|-----|-----|
| Near-black | `#0a0a0a` / Tailwind `black` | Primary CTAs, strong UI chrome |
| Page base | `#f9f8ff` | Ambient canvas base |
| Warm white | `#fafaf8` | Chat light surfaces where needed |
| Soft cream | `#f4f2ed` | Occasional card / panel fill |
| Hairline mid | `#e8e4dc` | Dividers, borders (prefer `0.5px` / low-opacity black) |
| Muted label | `#8a8780` | Eyebrows, section labels, secondary meta |
| Body text | Tailwind `text-gray-600` (`#4b5563`) | Supporting copy |
| Strong text | Tailwind `text-black` / `text-gray-900` | Headlines, emphasis |

### Formula accents (map to BI = C + Ex × T²)

| Role | Token | Hex | Meaning |
|------|-------|-----|---------|
| Creative (C) | Blue | `#1ACDEB` | The human / idea side |
| Experience (Ex) | Amber | `#E18949` | Feeling after every interaction |
| Technology (T²) | Purple | `#6B17DA` | Amplifier |

Accent usage:
- Section markers, formula letters, small badges, chart / card accents
- Gradient strip when the formula is the story: `#1ACDEB → #6B17DA → #E18949`
- Formula wordmark gradient class `.formula-gradient`: `#70a1ff → #ff7eb3 → #ffcc33`

### Soft accent fills (badges / chips)

| Accent | Background |
|--------|------------|
| Blue | `rgba(26, 205, 235, 0.10)` |
| Amber | `rgba(225, 137, 73, 0.10)` |
| Purple | `rgba(107, 23, 218, 0.08)` |

### Do / don’t

- Do keep body copy on dark neutrals (`black` / `gray-600`), never on pale accent colour alone
- Do use muted `#8a8780` for uppercase eyebrows only
- Don’t invent a fourth brand accent
- Don’t default the whole site to purple-on-white marketing gradients or cream + terracotta “AI default” looks
- Don’t use pure white `#ffffff` as the main page background; the ambient system is the brand canvas

---

## 4. Typography

### Families (only these)

| Family | Role | Loaded weights |
|--------|------|----------------|
| **Roboto** | Body, UI, nav, labels, buttons, article text | 300, 400, 500, 700 |
| **Roboto Slab** | Display headlines (`h1` / major `h2`) | 400, 700 |
| **System mono** (`font-mono`) | Chat / RT Agent terminal only | system |

Do not introduce Inter, DM Sans, Geist, or other display families.

### How fonts are applied

1. Roboto is set on `<body>` in `layout.js` with `font-light` (weight **300**) as the site default.
2. Roboto Slab is mounted once per page shell:  
   `<span className={robotoSlab.className} hidden aria-hidden />`
3. Apply Slab to headlines with `style={serif}` from `@/lib/fonts`.
4. Never create a second `next/font` instance on a page. Always import from `src/lib/fonts.js`.

### Font weights — when to use which

| Weight | Tailwind | Use |
|--------|----------|-----|
| 300 | `font-light` (default) | Body, leads, long reading text |
| 400 | `font-normal` | Neutral body when light feels too thin on small type |
| 500 | `font-medium` | Occasional mid emphasis |
| 600 | `font-semibold` | Eyebrows, nav labels, button labels, uppercase trackers |
| 700 | `font-bold` | Display headlines, card titles, strong UI |
| 900 | Avoid except `.formula-gradient` | Formula lockup only |

### Type roles and colour pairing

| Role | Size / tracking | Weight | Colour | Font |
|------|-----------------|--------|--------|------|
| Eyebrow / section label | `text-xs`, `tracking-[0.22em]`–`[0.25em]`, uppercase | `font-semibold` | `#8a8780` | Roboto |
| Page / section headline | `clamp(1.75rem, 3.5vw, 2.75rem)`+, tight leading | `font-bold` | `text-black` | Roboto Slab |
| Hero display (homepage) | larger clamps, `leading-[1.04]`–`[1.1]` | `font-bold` | `text-black` (accent sparingly) | Roboto Slab |
| Supporting sentence | `text-base` / `text-lg`, `leading-relaxed` | light / normal | `text-gray-600` | Roboto |
| Card title | `text-base`–`text-xl` | `font-bold` / `font-semibold` | `text-black` | Slab or Roboto |
| Card / list body | `text-sm` / `text-base` | light | `text-gray-600` | Roboto |
| Primary CTA | `text-xs`, uppercase, `tracking-widest` | `font-semibold` | white on black | Roboto |
| Nav overlay links | `clamp(2.5rem, 7vw, 5rem)` | `font-bold` | `text-black` | Roboto |
| Article body | ~`1.0625rem`, line-height ~1.7 | light | dark gray | Roboto |

### Legibility rules

- Eyebrows: `#8a8780` maximum lightness for labels
- Body / descriptions: at least `text-gray-600` — never lighter for main reading text
- Headlines: black, not muted
- On dark terminal chrome: keep terminal body at readable gray-on-black contrast

---

## 5. Components and chrome

### Primary CTA

- Fill: black
- Text: white
- Shape: `rounded-full`
- Type: `text-xs font-semibold uppercase tracking-widest`
- Hover: opacity ~80%, not a colour swap

### Secondary / menu control

- Transparent or white pill
- Border: `border-black/20` where outlined
- Same uppercase tracking language as primary

### Cards

Default stance: **no cards** on marketing heroes.  
Use bordered / filled cards only when the container is the interaction (flip cards, selectable items). If removing border, shadow, or radius does not hurt understanding, remove it.

### Separators

Prefer hairline rules (`border-black/10` or mid `#e8e4dc`) over heavy blocks.

### Glass / overlays

Chat / tray glass: translucent white + backdrop blur (see `.glass-bottom-tray`). Keep rare; do not glass every section.

---

## 6. Motion

- Purpose: hierarchy and reading flow, not noise
- Homepage: scroll-driven narrative + formula motion (see `LANDING_V2.md`)
- Interior pages: simple entrance fades / short Framer Motion reveals
- Always honour `prefers-reduced-motion`
- SoftBackground drift and gradient float are the ambient motion language — do not add competing particle systems

---

## 7. Chat / terminal exception

The RT Agent block is intentionally separate:

- Dark surface, monospace type, functional chrome
- Page shell around chat still uses the ambient background + Roboto / Slab for eyebrow, title, and intro
- Do not restyle the whole marketing site to match the terminal

---

## 8. Quick checklist for any new section

1. Ambient stack present (`gradient-background` + `SoftBackground`)?
2. Eyebrow muted (`#8a8780`), uppercase, tracked?
3. Headline Roboto Slab, bold, black?
4. Body Roboto light, `text-gray-600` or darker?
5. Accents only from blue / amber / purple, used sparingly?
6. Primary action black pill, uppercase tracked label?
7. No extra font families, no flat white canvas, no em dashes in copy?
8. Motion subtle and reduced-motion safe?

---

## 9. Reference hex strip

```
Canvas:   #f9f8ff
Muted:    #8a8780
Body:     #4b5563  (gray-600)
Ink:      #000000 / #0a0a0a
Creative: #1ACDEB
Experience:#E18949
Technology:#6B17DA
```
