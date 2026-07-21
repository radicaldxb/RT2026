# Insights Articles Writing Guide

Insights articles live in code (not a CMS). Each article is defined as a JavaScript object in:

- `src/app/insights/articles.js`

The article body is written in **Markdown** inside a JavaScript template string and rendered with `react-markdown` + `remark-gfm`.

---

## Article data model

Each entry in `articles` has this shape:

```js
{
  slug: "ai-is-rocket-fuel",
  title: "Stop trying to put Rocket Fuel (AI) in a Honda Civic and expect it to fly.",
  description: "Short summary shown in listings and SEO.",
  image: "/Images/insights/rocket-fuel.webp",
  publishedDate: "2026-02-23",
  author: "Stephan Snelder",
  readTime: "4 mins",
  tags: ["Strategy", "AI Transformation", "Future of Work"],
  content: `...markdown...`,
}
```

### Field rules and tips

- **`slug` (required)**: Used for the URL: `/insights/<slug>`.
  - Use lowercase, numbers, and hyphens only (kebab-case).
  - Keep it stable once published (changing it breaks links).
- **`title` (required)**: Page H1 and metadata title.
- **`description` (required)**: Listing blurb + SEO description.
- **`image` (recommended)**: Hero image shown at top of the article.
  - Use a path under `public/` (example: `/Images/insights/your-image.webp`).
  - Paths are **case-sensitive** on many hosts. Match `public/Images/...` exactly.
- **`publishedDate` (recommended)**: ISO date string: `YYYY-MM-DD`.
  - Displayed as `DD-MM-YYYY` on the page.
- **`author` (recommended)**: Used in JSON-LD schema and displayed implicitly via metadata.
- **`readTime` (recommended)**: Short string (example: `"4 mins"`).
- **`tags` (recommended)**: Array of strings displayed as tag pills.
- **`content` (required)**: Markdown string (see below).

---

## Writing the article body (`content`)

The body is Markdown inside a JavaScript template string:

```js
content: `
> **"Optional lead quote."**

## Your first section

Write paragraphs in normal Markdown.

### Sub-sections

- Bullets
- More bullets

1. Numbered list
2. Works too
`,
```

### Supported Markdown features

The renderer uses `remark-gfm`, so you can use:

- **Headings**: `##`, `###` (avoid `#` — the page already has the title as the H1)
- **Emphasis**: `**bold**`, `_italic_`
- **Blockquotes**: `> ...`
- **Lists**: ordered and unordered
- **Links**: `[FluffyFriends.online](https://fluffyfriends.online)`
- **GFM extras**: tables, strikethrough, task lists (if you ever need them)

### Things to avoid

- **Raw HTML** in Markdown (it may render, but it’s easy to create layout/security issues and inconsistencies).
- **Backticks inside template strings**. If you need inline code in the article, use single backticks in Markdown, but don’t accidentally close the JS template string.
  - If you must include a literal backtick-heavy snippet, consider escaping or restructuring the text.

---

## Images

The hero image comes from the article’s `image` field and is rendered with `next/image`.

- Put images under `public/Images/insights/`.
- Prefer modern formats like **WebP**.
- Use a 1200×630-ish crop if you want it to look good for social sharing, but the hero is displayed as an **aspect-video** region.

If you need inline images inside the Markdown body, you can try standard Markdown:

```md
![Alt text](/Images/insights/some-image.webp)
```

Note: Inline image rendering depends on default `react-markdown` behavior (no custom components are wired up right now).

---

## SEO and social sharing

The article page automatically generates metadata from the article object:

- Canonical URL: `https://radical-thinking.net/insights/<slug>`
- OpenGraph title/description/image
- Twitter card (summary large image)
- JSON-LD `Article` schema (uses title/description/image/datePublished/author)

To improve SEO:

- Keep `title` and `description` clear and keyword-relevant.
- Use meaningful `##` headings throughout the body.

---

## “Talk to the Agent” deep link

Each article page links to chat like:

`/chat?ref=<slug>&source=insights`

So if you publish a new article slug, chat will receive:

- **`ref`**: the article slug
- **`source`**: `"insights"`

This is used by the n8n workflow to load context (see `docs/CHAT_REF_AND_GOOGLE_SHEETS.md`).

---

## Publishing checklist

- **Add the hero image** under `public/Images/insights/` (verify casing in the path).
- **Add a new object** to `src/app/insights/articles.js`.
- **Confirm slug uniqueness** (no duplicates).
- **Run locally**:
  - `npm run dev`
  - Visit `/insights` and `/insights/<slug>`
- **Build check**:
  - `npm run build`

