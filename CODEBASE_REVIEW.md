# RT2026 Codebase Review

**Project:** Radical Thinking website (Next.js 16, React 19)  
**Review date:** March 2026

---

## 1. Overview

The RT2026 codebase is a **Next.js 16** App Router site for Radical Thinking, an AI-native agency. It includes:

- **Tech stack:** Next.js 16.1.5, React 19, Tailwind CSS 4, Framer Motion, `@n8n/chat`, react-markdown
- **Hosting:** Netlify (`netlify.toml` + `@netlify/plugin-nextjs`)
- **Main areas:** Home, Chat (AI agent via n8n webhook), Portfolio, Services, About, Insights, Privacy/Terms

The structure is generally clear: `src/app` for routes and pages, `src/components` for shared UI, and `public` for static assets.

---

## 2. Critical Issues

### 2.1 Insights route is broken (portfolio copy-paste)

**Location:** `src/app/insights/page.js`

The file is a **copy of the portfolio project page**: it uses `portfolio` from `@/app/portfolio/projects`, `generateStaticParams()` with portfolio slugs, and expects `params.slug` to render a single project.

- **`/insights`** (no slug): The page runs with no slug → `project` is undefined → `notFound()` → **404**.
- **`/insights/ai-is-rocket-fuel`** (and any article slug): There is **no** `src/app/insights/[slug]/page.js`, so these URLs **do not exist** and will 404.

The sitemap and `ShareButtons` both point to `/insights/${slug}` (e.g. `/insights/ai-is-rocket-fuel`), so all insight article links are currently broken.

**Recommendation:**  
- Implement a real **Insights index** at `src/app/insights/page.js` that lists entries from `@/app/insights/articles`.  
- Add **`src/app/insights/[slug]/page.js`** that loads an article by slug from `articles.js`, renders title/description/content, and uses `generateStaticParams` from `articles` for static generation.

---

### 2.2 Image path case mismatch (portfolio & insights)

**Public folder:** `public/Images/Portfolio/`, `public/Images/insights/` (capital **I**, capital **P**).  
**Code references:** `/images/portfolio/...`, `/images/insights/...` (lowercase).

Next serves from `public` as-is, so the correct URLs are:

- `/Images/Portfolio/...`  
- `/Images/insights/...`

Using `/images/...` can 404 on case-sensitive environments (e.g. many Linux hosts).

**Locations:**

- `src/app/portfolio/projects.js` – all `image` paths
- `src/app/insights/articles.js` – `image` path
- All portfolio subpages (e.g. `src/app/portfolio/fluffyfriends/page.js`) – `url` and `image` in metadata

**Recommendation:** Either:

- Align code with the current public folder: use `/Images/Portfolio/` and `/Images/insights/` everywhere, or  
- Rename `public/Images` → `public/images` (and `Portfolio` → `portfolio` if desired) and keep lowercase in code. Prefer one convention and stick to it.

---

### 2.3 FluffyFriends logo path case

**Location:** `src/app/home/index.js` line 24

```js
{ src: "/logos/FF-logo.webp", link: "/portfolio/fluffyfriends" },
```

**Actual file:** `public/logos/FF-Logo.webp` (capital **L** in “Logo”).

On case-sensitive systems this will 404. **Recommendation:** Use `/logos/FF-Logo.webp` in code (or rename the file to `FF-logo.webp` and keep the current path).

---

### 2.4 Duplicate Next.js config files

**Files:** `next.config.js` and `next.config.mjs`

- `next.config.js` (CommonJS) defines the `/about-us` → `/about` redirect.
- `next.config.mjs` (ESM) is empty.

When both exist, Next.js typically uses the ESM file (e.g. `next.config.mjs`), so the **redirect may not be applied**.

**Recommendation:** Use a single config file. Either:

- Move the redirect into `next.config.mjs` and delete `next.config.js`, or  
- Put all config in `next.config.js` and remove `next.config.mjs`.

---

## 3. Moderate Issues

### 3.1 Layout.js – hasPart JSON indentation

**Location:** `src/app/layout.js` lines 148–156

The “Radical Insights” entry in the `hasPart` array has inconsistent indentation (opening brace and `name`/`url`/`description` not aligned with the rest of the array). It’s valid JavaScript but hurts readability and could confuse future edits. Worth normalizing.

### 3.2 Duplicate Google Analytics on portfolio

**Location:** `src/app/portfolio/page.js`

GA scripts are injected again here, while the root `layout.js` already includes the same gtag script and config. Loading GA twice can double-count events. **Recommendation:** Remove the GA block from `portfolio/page.js` and rely on the layout.

### 3.3 Empty `src/app/articles.js`

**Location:** `src/app/articles.js`

The file is empty. Insights data lives in `src/app/insights/articles.js` and is used by the sitemap. **Recommendation:** Delete `src/app/articles.js` if unused, or add a comment explaining why it exists (e.g. future use).

### 3.4 Netlify publish directory

**Location:** `netlify.toml`

```toml
publish = ".next"
```

With `@netlify/plugin-nextjs`, the plugin usually controls the publish directory. If the plugin’s defaults already set this, the explicit `publish` is redundant; if not, it may be correct. Worth confirming in [Netlify’s Next.js plugin docs](https://docs.netlify.com/integrations/frameworks/next-js/) that `publish` is not overriding the plugin in an unwanted way.

---

## 4. Positive Notes

- **SEO:** Root layout has solid metadata, Open Graph, Twitter cards, geo tags, and Organization JSON-LD with `hasPart` for main sections. Portfolio and services use structured data (CollectionPage, FAQPage, etc.).
- **Chat API:** `src/app/api/chatbot/route.js` implements rate limiting, input validation, length cap, and clear error responses. N8n response shape is normalized safely.
- **Static generation:** Portfolio and (once fixed) insights can use `generateStaticParams` for static builds; portfolio already uses it in sub-routes.
- **Accessibility:** Semantic HTML, `aria-label` on links, and focusable controls are used in several places.
- **Performance:** Next.js Image and priority loading are used; Framer Motion is used for animations without obvious over-use.

---

## 5. Recommendations Summary

| Priority | Action |
|----------|--------|
| **High** | Fix Insights: implement insights index page and `insights/[slug]` using `articles.js`. |
| **High** | Unify image paths: use `/Images/Portfolio/` and `/Images/insights/` everywhere (or rename `public` folders to lowercase). |
| **High** | Fix FluffyFriends logo path: use `FF-Logo.webp` in `home/index.js`. |
| **High** | Use a single Next config: move redirect into one file and remove the other. |
| **Medium** | Remove duplicate GA from `portfolio/page.js`. |
| **Medium** | Clean up layout.js `hasPart` indentation. |
| **Low** | Remove or document empty `src/app/articles.js`. |
| **Low** | Confirm Netlify `publish` vs plugin behavior. |

---

## 6. File / Route Reference

- **Home:** `src/app/page.js` → `src/app/home/index.js`
- **Chat:** `src/app/chat/page.js` + `chat.js`, API `src/app/api/chatbot/route.js`
- **Portfolio:** `src/app/portfolio/page.js` + `portfolio.js`, `projects.js`, per-project routes under `portfolio/<slug>/page.js`
- **Insights:** `src/app/insights/page.js` (currently wrong), `articles.js` (data only; no `[slug]` route)
- **Services / About / Privacy / Terms:** Under `src/app/<section>/page.js` and optional local data files
- **Shared:** `Footer`, `SoftBackground`, `ShareButtons` in `src/components`
- **Config:** `next.config.js` (redirect), `next.config.mjs` (empty), `netlify.toml`, `sitemap.js`, `robots.js`

If you want, the next step can be concrete code changes for the high-priority items (insights routes, image paths, logo path, and single Next config).
