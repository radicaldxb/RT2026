# Test the site locally before Git & Netlify

Use these steps to run a temporary local version of the site.

## 1. Open a terminal in the project

```bash
cd "/Users/stephanvanwijk/Library/CloudStorage/Dropbox/Radical Thinking/RT Website/2026/RT2026"
```

(Or open the `RT2026` folder in Terminal / Cursor terminal.)

## 2. Install dependencies (if you haven’t already)

```bash
npm install
```

## 3. Start the development server

**Option A – standard dev server**

```bash
npm run dev
```

**Option B – if you see a network/interface error**

```bash
npm run dev:local
```

When it’s ready you’ll see something like:

- **Local:** http://localhost:3000

## 4. Test in the browser

Open **http://localhost:3000** and check:

- [ ] **Home** – hero, ideas section, equation, footer
- [ ] **Insights** – http://localhost:3000/insights (list of articles)
- [ ] **Insight article** – http://localhost:3000/insights/ai-is-rocket-fuel
- [ ] **Portfolio** – http://localhost:3000/portfolio and a few project pages
- [ ] **Chat** – http://localhost:3000/chat (needs `N8N_WEBHOOK_URL` in `.env.local` for real replies)
- [ ] **Redirect** – http://localhost:3000/about-us should redirect to `/about`
- [ ] **Images** – portfolio and insights images load (e.g. FluffyFriends logo on home)

## 5. Optional: production-like build

To test the same build Netlify will run:

```bash
npm run build
npm run start
```

Then open http://localhost:3000 again. Stop with `Ctrl+C` when done.

## 6. Stop the dev server

Press **Ctrl+C** in the terminal.

---

**Chat:** If the chat page doesn’t return real replies locally, add a `.env.local` file with `N8N_WEBHOOK_URL` (or `NEXT_PUBLIC_N8N_WEBHOOK_URL`) set to your n8n webhook URL. Don’t commit `.env.local` to Git.
