# DESIGN.md — Radical Thinking

> AI-native digital agency. Warm off-white canvas, three-accent formula identity, scroll-driven motion, editorial restraint.

**Canonical homepage:** `src/app/home/index.js` (`/`).  
**Staging alias:** `/landing` (same component, `noindex`).  
**Previous homepage backup:** `src/app/home/home.legacy.js` (pre–split-scroll version).  
**Motion spec:** [LANDING_V2.md](./LANDING_V2.md) — beats, scroll engine, formula card phases.  
**Shared display font:** `src/lib/fonts.js` — single `Roboto_Slab` instance for the whole site.

---

## 1. Visual theme

Radical Thinking is built around `BI = C + Ex × T²`. Every visual decision maps to Creative (blue), Experience (amber), or Technology (purple). The canvas is warm near-white with soft chromatic bleed from three accent blobs. Motion is purposeful: scroll-driven narrative beats and formula card fan/flip on the homepage — not decorative sparkle elsewhere.

**One-line:** Warm editorial white, triadic formula accents, Roboto Light body with Roboto Slab display across the site.

---

## 2. Colour palette

These values are used inline in Tailwind/classes today. CSS custom properties are optional for future refactors.

```
--rt-black:         #0a0a0a   /* Near-black. CTAs, nav fills */
--rt-white:         #fafaf8   /* Warm page base (chat light theme) */
--rt-page-base:     #f9f8ff   /* .gradient-background base on most pages */
--rt-cream:         #f4f2ed   /* Card / section fills where used */
--rt-mid:           #e8e4dc   /* Dividers, borders — always 0.5px */
--rt-muted:         #8a8780   /* Labels, eyebrows, secondary text */

/* Formula accents */
--rt-blue:          #1ACDEB   /* C = Creative. The dream. */
--rt-amber:         #E18949   /* Ex = Experience. The reality. */
--rt-purple:        #6B17DA   /* T² = Technology. The amplifier. */
```

**Badge backgrounds (formula-matched):**
- Blue: `rgba(26, 205, 235, 0.10)`
- Amber: `rgba(225, 137, 73, 0.10)`
- Purple: `rgba(107, 23, 218, 0.08)`

### SoftBackground fog blobs (`src/components/SoftBackground.js`)

RAF-driven — do not replace with CSS keyframes for the live blobs. Respects `prefers-reduced-motion` (blobs static, no RAF loop).

| Blob | Position | Background | Blur |
|------|----------|------------|------|
| 1 | top-left | `rgba(26, 205, 235, 0.20)` | 90px |
| 2 | top-right | `rgba(107, 23, 218, 0.14)` | 90px |
| 3 | bottom-right | `rgba(225, 137, 73, 0.18)` | 90px |
| 4 | bottom-left | `rgba(26, 205, 235, 0.12)` | 90px |
| Centre veil | 50% / 50% | `rgba(255, 255, 255, 0.80)` | 80px |

**Note:** `.gradient-background` in `globals.css` adds a second fixed radial layer (`#f9f8ff`, CSS `background-float` animation). Pages stack `SoftBackground` inside it. Legacy `.fog-blob-*` CSS classes in globals are unused — live blobs are inline in the component. Gradient animation pauses under `prefers-reduced-motion`; `background-attachment` is `scroll` on small screens for scroll performance.

---

## 3. Typography

### Roboto (body, UI, navigation)
- Source: `next/font/google` via **`src/lib/fonts.js`** — weights 300 (default), 400, 500, 700
- Applied globally on `<body>` in `layout.js` with `font-light` (300)
- Labels, nav, buttons, eyebrows, captions, article body, chat page intro
- Use `font-normal` / `font-medium` / `font-bold` where emphasis is needed

### Roboto Slab (display — site-wide)
- Source: `next/font/google` via **`src/lib/fonts.js`** — weights 400 and 700, `display: "swap"`
- Import `{ robotoSlab, serif }` from `@/lib/fonts` for display type — **do not** instantiate fonts per page
- Body Roboto is loaded once in `layout.js` — pages do not need a separate Roboto import
- Mount once per page shell: `<span className={robotoSlab.className} hidden aria-hidden />`
- Apply headlines: `style={serif}` on `h1` / `h2` display type

**Pages using Roboto Slab (headlines):** `/`, `/about`, `/services`, `/work`, `/work/[slug]`, `/insights`, `/insights/[slug]`, `/intelligence`, `/chat` (page shell only), `/privacy-policy`, `/terms-of-use`.

**Exception — chat terminal:** monospace inside the RT Agent block (`font-mono`). Terminal chrome, messages, and input are unchanged from the macOS-style design. Only the page eyebrow, `h1`, and intro paragraph use the site shell typography.

### Type scale

**Homepage (hero beats):**
```
Beat / hero headline:   clamp(2rem, 5.5vw, 4.5rem) – clamp(2.8rem, 7vw, 5.5rem)  — Roboto Slab
Section h2:             clamp(1.75rem, 3.5vw, 2.75rem)                             — Roboto Slab
Formula card letter:    clamp(4.5rem, 12vw, 6.5rem) front / 1.55rem compact back   — Roboto Slab
```

**Interior pages (shared shell):**
```
Page h1:                clamp(1.75rem, 3.5vw, 2.75rem), leading-[1.1]             — Roboto Slab
Eyebrow:                text-xs, tracking-[0.22em], uppercase, text-[#8a8780]        — Roboto Light + font-semibold
Body / lead:            text-base / text-sm, text-gray-600, leading-relaxed         — Roboto Light (300)
Nav overlay links:      clamp(2.5rem, 7vw, 5rem)                                  — Roboto bold (700)
Article body:           1.0625rem / line-height 1.7 (.rt-article-body)             — Roboto Light
```

---

## 4. Site-wide page shell (interior pages)

Most redesigned routes share this structure:

```jsx
<main className="relative flex flex-col w-full min-h-screen overflow-x-clip">
  <span className={robotoSlab.className} hidden aria-hidden />

  <div className="fixed inset-0 z-0 pointer-events-none gradient-background">
    <SoftBackground />
  </div>

  <Nav />

  <div className="relative z-10 w-full px-4 py-14 md:py-20 pt-24 md:pt-28">
    {/* content: max-w-3xl editorial or max-w-6xl grids */}
  </div>

  <Footer />
</main>
```

**Eyebrow pattern:**
```jsx
<span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
  Label
</span>
```

**Cards:** `rounded-2xl border border-[#e8e4dc]/90 bg-white`  
**Primary CTA:** black pill — `bg-black text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest`  
**Motion:** Framer `E = [0.16, 1, 0.3, 1]`, viewport `{ once: false, margin: "0px 0px -100px 0px" }` where used

### Rollout status

| Route | Status | Key file(s) |
|-------|--------|-------------|
| `/` | ✅ Canonical v3 homepage | `home/index.js` |
| `/about` | ✅ Restyled | `about/about.js` |
| `/services` | ✅ Restyled | `services/services.js` |
| `/work` | ✅ Grid + filters | `work/work.js` |
| `/work/[slug]` | ✅ Unified case studies (19 projects, full copy) | `work/[slug]/page.js`, `projects.js`, `PortfolioProjectLayout.js` |
| `/insights` | ✅ List restyled | `insights/InsightsList.js` |
| `/insights/[slug]` | ✅ Structured articles | `InsightArticleLayout.js`, `articles.js` |
| `/intelligence` | ✅ Restyled; Free AI Roadmap hidden | `intelligence/intelligence.js` |
| `/chat` | ✅ Shell fonts only; terminal unchanged | `chat/chat.js` |
| `/privacy-policy`, `/terms-of-use` | ✅ Shared legal layout | `LegalPageLayout.js` |
| `/playbook` | ✅ Roboto Light + Roboto Slab | `playbook/playbook.js` |
| `/roadmap` | 🔒 Hidden — redirects to `/chat` | `next.config.mjs` |

**Legacy URLs:** `/portfolio` and `/portfolio/*` → `/work` (`next.config.mjs`). Do not re-add case-sensitive `/Services` redirect (caused redirect loops on macOS dev).

---

## 5. Homepage architecture

Two scroll modes — see [LANDING_V2.md](./LANDING_V2.md) for full beat tables.

| Mode | Behaviour | Content |
|------|-----------|---------|
| **Sticky narrative** | `1636vh` container, inner sticky viewport, `useNarrativeProgress` | Beats 1–6: question → dream → Then. → reality → gap → formula |
| **Normal flow** | Document scroll + Framer `whileInView` | Formula cards, sections, closing quote |

### Section IDs (nav / footer hashes)

| ID | Section |
|----|---------|
| `#formula` | When they all work together (formula cards) |
| `#get-started` | Let's get started (terminal) |
| `#how` | How We Work |
| `#playbook` | The Playbook |
| `#insights` | Radical Insights |
| `#agent` | Talk to Us |
| `#radical` | What we think (closing quote) |

Sticky beats 1–6 have no hash anchors — they live inside `ScrollNarrative`.

---

## 6. Spacing & layout

**Homepage sections:** `px-4 py-14 md:py-20 scroll-mt-24` (free-flowing — no `rt-divider` between sections).

**Interior pages:** `px-4 py-14 md:py-20 pt-24 md:pt-28` under fixed `Nav`.

**Content widths (actual):**
- Narrative beats: centred, `max-w-3xl` / `max-w-4xl` per beat
- Editorial pages: `max-w-3xl`
- Grids (work, insights): `max-w-6xl`
- Closing quote: `max-w-[660px]`
- Chat terminal column: `max-w-[700px]`

**Border radius:** Cards `rounded-2xl`; pills/buttons `rounded-full`; formula stripe `h-1.5`.

**Borders:** `0.5px solid rgba(232, 228, 220, 0.9)` or `#e8e4dc`. Avoid `1px` on structural card borders.

**Dividers:** `.rt-divider` exists in globals and is used on **legacy** pages and `home.legacy.js`. **Not** used on the current homepage or redesigned interior pages.

---

## 7. Components

### Nav (`src/components/Nav.js`)
- Always `bg-transparent`
- Logo → `/` (Next `Image`, `priority`)
- Header CTA: **Talk to Us** → `/#agent` (hidden on `/chat`)
- Menu: **How We Work** (`/#how`), **Playbook**, **Chat**, **Insights**, **Work** (`/work`), **About**
- No formula link — equation is in sticky beat 6 (not hash-targetable)

### Footer (`src/components/Footer.js`)

| Column | Links |
|--------|--------|
| 1 | HOW WE WORK (`#how`), PLAYBOOK, CHAT |
| 2 | INSIGHTS, WORK (`/work`), ABOUT |
| 3 | INTELLIGENCE, PRIVACY, TERMS OF USE |

Hash links smooth-scroll on `/` and `/landing`. Copyright: **RADICAL THINKING © 2026**.

### LegalPageLayout (`src/components/LegalPageLayout.js`)
Shared shell for privacy and terms: eyebrow, Roboto Slab `h1`, optional date, prose body in `max-w-3xl`.

### Work case studies (`PortfolioProjectLayout.js`)
Reference layout: hero image (`priority`, `aspect-[16/9]`, `object-contain`), key facts card, structured body, share buttons, black pill CTA. All projects served from `work/[slug]/page.js` + `projects.js`.

### Insights articles (`InsightArticleLayout.js`)
- Intro: centred card with `leadQuote` + `intro` (editorial, not a giant hero quote)
- Sections: unnumbered, conversational (`InsightStructuredBody.js`)
- Hero image: full column width, `object-contain`, `aspect-[16/9]`
- Bottom: **Read other articles** — tag overlap + date ranking (up to 4 cards)
- Structured content defined in `articles.js` (reference: `what-actually-works`)

### Formula cards (homepage only)

Order: **C (blue) → Ex (amber) → T² (purple)**.

**Locked copy (do not alter):**
```js
{ letter: "C",  label: "Creative",   color: "#1ACDEB", badge: "The dream", ... }
{ letter: "Ex", label: "Experience", color: "#E18949", badge: "The reality", ... }
{ letter: "T²", label: "Technology", color: "#6B17DA", badge: "The amplifier", ... }
```

**Structure:**
```
rounded-2xl bg-white
border: 0.5px solid rgba(232,228,220,0.9)
shadow: 0 2px 12px rgba(0,0,0,0.04)
colour stripe: h-1.5 top + bottom
RT logo watermark: top-left + bottom-right (bottom rotated 180°)
```

**Desktop (`md+`):** separate `240vh` sticky lane, fan spread `205px`, staggered scroll `rotateY` flips. Use **`FormulaCardFaces` with `compact`** — full back face overflows 300px height.

**Mobile:** vertical `FormulaFlowCard` stack, fade-up stagger. Heights **240px / 260px** — do not change without reason.

**Motion engine:** `useNarrativeProgress` + `mapProgress` — not Framer `useScroll` on desktop cards.

### AgentTerminal (homepage)
Dark macOS-style block linking to `/chat`. Used in `#get-started` and `#agent`.

### Chat terminal (`/chat`)
Full-page terminal widget — **do not restyle** when updating site fonts. Page shell only gets eyebrow + Roboto Slab `h1` + Roboto intro. Terminal uses `font-mono`, formula accent labels (`#1ACDEB` bot, `#6B17DA` user light / `#E18949` challenge), dark title bar `#181818`.

### Buttons (site CTAs)
```
bg-black text-white px-8 py-3.5 rounded-full
text-xs font-semibold uppercase tracking-widest
hover:opacity-85 transition-opacity
```

### Section eyebrow
```jsx
<span className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#8a8780] mb-2">
  Label
</span>
```

### Closing — “What we think” (homepage)
Light section (not a dark band): `h2` title, quoted body (`&ldquo;…&rdquo;`), **Radical Thinking.** attribution in Roboto Slab.

### Insight cards
```
border border-[#e8e4dc]/90 rounded-2xl
Image aspect-[16/9]
Title: Roboto Slab text-lg
hover: shadow elevation
```

### How We Work rows (homepage)
Numbered `01` / `02` / `03` in formula accent colours. Grid rows **without** `.pb-line` connector.

---

## 8. Motion & animation

**Easing:** `const E = [0.16, 1, 0.3, 1]`

**Viewport:** `{ once: false, margin: "0px 0px -100px 0px" }` — re-triggers on scroll back.

**Nav entrance:** `opacity 0, y: -16` → visible, `duration: 0.6`.

**Section reveals:** typically `opacity: 0, y: 32–48` → visible on `whileInView`.

**Formula desktop lane:** `DESKTOP_FORMULA_SCROLL_VH = 240`, `DESKTOP_CARD_SPREAD = 205`. See [LANDING_V2.md](./LANDING_V2.md) for remapped keyframes.

**SoftBackground RAF** (do not replace; skipped when `prefers-reduced-motion`):
```js
blob1: sin(t*0.38)*6vw, cos(t*0.29)*5vw
blob2: cos(t*0.33)*5vw, sin(t*0.41)*7vw
blob3: sin(t*0.47+1)*-6vw, cos(t*0.37+1)*5vw
blob4: cos(t*0.28+2)*5vw, sin(t*0.33+2)*-6vw
```

**Perspective:** `1200px` on formula flip cards. `1000px` on `.card-flip-container` (legacy hover utility — not used on homepage cards).

**Body scroll:** `overflow-x: clip` (not `hidden`) — required for sticky sections.

**Accessibility:** honour `prefers-reduced-motion` for SoftBackground RAF and `.gradient-background` CSS animation.

---

## 9. Do's and don'ts

### Do
- Map accents to formula elements: blue = C, amber = Ex, purple = T²
- Keep nav `bg-transparent`
- Use `clamp()` for display sizes
- Use `compact` faces on desktop `NarrativeFormulaCard`
- Keep beats 1–6 in sticky lane; everything after formula payoff in normal flow
- Import `{ robotoSlab, serif }` from `@/lib/fonts` on every page that needs display type
- Use `next/image` with `sizes` and `priority` only for above-the-fold heroes
- Keep chat terminal styling isolated from page-shell typography updates

### Don't
- Don't instantiate `Roboto_Slab` in individual page files
- Don't load external Google Fonts via CSS `@import` (use `next/font` only)
- Don't use Framer `useScroll` for desktop formula fan/flip
- Don't remove title from inside desktop formula sticky panel
- Don't add `bgBlue` / narrative colour overlays on sticky beats
- Don't change locked formula card copy
- Don't use full-size card back faces in 300px desktop cards
- Don't replace SoftBackground RAF blobs with CSS animation (except static fallback for reduced motion)
- Don't use `1px` structural borders on formula cards
- Don't add nav background on scroll
- Don't re-add case-insensitive redirects that match the destination path

### Content guidelines (aspirational — not fully enforced in CMS copy yet)
- Avoid em dashes in new marketing UI copy where possible
- Avoid "Dubai" in hero / above-fold headlines

---

## 10. Responsive rules

```
Breakpoint:     md (768px)
Gutters:        px-4 (sections) / px-6 md:px-12 (nav)
Section pad:    py-14 → py-20; pt-24 md:pt-28 under nav

Formula cards:  stack + fade-up (mobile) → sticky fan/flip lane (desktop)
Insights grid:  1 col → 3 col
Work grid:      1 col → 2 col → 3 col
Nav:            logo + menu mobile; CTA visible desktop
```

---

## 11. Performance & security

Guidelines for PageSpeed / Core Web Vitals and safe operation:

### Fonts
- One `Roboto` + one `Roboto_Slab` export in `src/lib/fonts.js`; body applied in `layout.js`
- No render-blocking `@import` from Google Fonts in CSS

### Images
- Always `next/image` for static assets; set `sizes` on responsive heroes
- `priority` only for LCP candidates (nav logo, page hero)
- Prefer `.webp` / `.svg` in `/public`

### Scripts
- Google Analytics: `strategy="lazyOnload"` in `layout.js`
- JSON-LD structured data: inline `application/ld+json` scripts (no external fetch)

### CSS / motion
- `background-attachment: scroll` on viewports `< 768px` for `.gradient-background`
- Pause `.gradient-background` animation under `prefers-reduced-motion`
- SoftBackground skips RAF when user prefers reduced motion

### API (`/api/chatbot`)
- Rate limit: 40 req/min per IP
- Input capped at 500 characters; `sessionId` and `metadata` validated/sanitized server-side
- Webhook URL from `N8N_WEBHOOK_URL` env (server-only); never expose in client bundle
- 30s upstream timeout; generic error messages in production

### HTTP headers (`next.config.mjs`)
- `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- API routes: `Cache-Control: no-store`

### Dependencies
- Remove unused packages (e.g. `@n8n/chat` — custom chat UI is in `chat/chat.js`)

---

## 12. Agent prompt guide

**New homepage section:**
> Follow `docs/DESIGN.md` and `docs/LANDING_V2.md`. Use existing `flowSection` pattern in `home/index.js`. Eyebrow in `#8a8780` uppercase. Headlines via `style={serif}` from `@/lib/fonts`. Animate with Framer `whileInView`, ease `E`, viewport `VP`.

**New interior page:**
> Use site shell from §4. Import `{ robotoSlab, serif }` from `@/lib/fonts`. `SoftBackground` + `gradient-background`. Eyebrow + Roboto Slab `h1`. Body inherits Roboto Light from layout. Cards `rounded-2xl border-[#e8e4dc]/90`. Black pill CTA.

**New work case study:**
> Add entry to `work/projects.js`; page auto-generated at `/work/[slug]`. Follow `PortfolioProjectLayout.js` (FluffyFriends reference).

**New insight article:**
> Add structured entry to `insights/articles.js`. Follow `what-actually-works` pattern: `leadQuote`, `intro`, unnumbered `sections`, hero image.

**Chat page changes:**
> Update page shell (eyebrow, h1, intro) only. Do **not** change terminal title bar, mono transcript, quick replies, or dark/light toggle unless explicitly asked.

**New formula card:**
> Use locked card data in §7. White card, 0.5px border, colour stripes, `compact` on desktop narrative cards. Mobile: `FormulaFlowCard` at 240/260px height.

**Accent lookup:** Blue `#1ACDEB` = C · Amber `#E18949` = Ex · Purple `#6B17DA` = T²

---

## 13. File map

| File | Role |
|------|------|
| `src/lib/fonts.js` | **Shared Roboto + Roboto Slab** — import display type; body via layout |
| `src/app/home/index.js` | **Canonical homepage** (`/`) |
| `src/app/home/home.legacy.js` | Pre-v3 homepage backup |
| `src/app/landing/page.js` | Staging alias (`/landing`, noindex) |
| `src/app/page.js` | Root → `home` |
| `src/components/Nav.js` | Global navigation |
| `src/components/Footer.js` | Global footer |
| `src/components/LegalPageLayout.js` | Privacy + terms shell |
| `src/components/SoftBackground.js` | RAF fog blobs |
| `src/app/work/projects.js` | Case study content (source of truth for `/work/[slug]`) |
| `src/app/work/[slug]/page.js` | Dynamic case study pages |
| `docs/CASE_STUDIES.md` | Original case study copy (reference) |
| `src/app/work/PortfolioProjectLayout.js` | Case study template |
| `src/app/insights/InsightArticleLayout.js` | Article template |
| `src/app/insights/articles.js` | Structured article content |
| `src/app/chat/chat.js` | Chat page + terminal |
| `src/app/api/chatbot/route.js` | Chat API proxy + rate limit |
| `src/app/globals.css` | Fonts, gradient, utilities |
| `next.config.mjs` | Redirects, security headers |
| `docs/LANDING_V2.md` | Beat timing, scroll constants, regression list |
