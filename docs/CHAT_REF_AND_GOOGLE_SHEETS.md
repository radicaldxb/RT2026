# Chat ref/source and Google Sheets

When a user opens the chat from a specific page, the site sends **ref** and optional **source** to your n8n webhook so the agent can pull context from Google Sheets.

The **RT - Chatbot** n8n workflow has been updated so the Agent prompt receives this context: it injects `metadata.ref` and `metadata.source` into the system prompt and instructs the agent to use the Portfolio sheet (for portfolio refs), services (for source=services), or insights when relevant, and to prefer the row/slug matching `ref`.

---

## Step-by-step: what to do

**Step 1 – Update the n8n Chatbot workflow**

- Open n8n and your **RT - Chatbot** workflow.
- Open the **AI Agent** node (e.g. “AI Agent1”).
- In the system prompt, near the top (right after “based on official information.”), add this block (or re-import the updated `RT - Chatbot.json` from your `n8n` folder, which already contains it):

```
**Page context (from website)**
The user may have opened this chat from a specific page. Use this to tailor your answer and prefer data from the relevant Google Sheet for that ref.
- ref: {{ $json.metadata && $json.metadata.ref ? $json.metadata.ref : 'none' }}
- source: {{ $json.metadata && $json.metadata.source ? $json.metadata.source : 'none' }}
When ref is not 'none': For source=portfolio, use the Portfolio sheet and prefer the project/slug matching ref. For source=insights, focus on that article/insight if available. For source=services, focus on services. Keep answers relevant to what they were looking at.
```

- Save and activate the workflow.

**Step 2 – Add a slug column to your Portfolio sheet**

- Open the Google Sheet used by the chatbot (same as in your Portfolio tool: `1K4ENdbH3fR32aL9agiTj0m6U0FbNJeUA8vMeuntXRf8`).
- Go to the **Portfolio** tab.
- Add a new column called **slug** (or **ref**). Put it where it fits (e.g. first column or next to the project name).
- Fill each row with the **exact** project slug from the website URL, e.g.:
  - `fluffyfriends`
  - `kahulife`
  - `simon-snelder`
  - `tommy-ellie`
  - `microsoft-ai`
  - etc.  
  (Use the slug from the site URL, e.g. `radical-thinking.net/work/fluffyfriends` → `fluffyfriends`.)

**Step 3 – (Optional) Insights**

- If you want the agent to focus on a specific article when someone comes from an insight page, add an **Insights** tab to the same sheet (or use an existing one) with a **slug** column and rows like `ai-is-rocket-fuel` for each article.

**Step 4 – Test**

- On the website, go to a portfolio project (e.g. FluffyFriends).
- Click **“Talk to the Agent”** / **“Ask the agent about this page”** (or open `/chat?ref=fluffyfriends&source=portfolio`).
- Send a message (e.g. “Tell me more about this project”).
- Confirm the agent’s answer uses details from the **Portfolio** sheet and, if you added the slug column, prefers the row where **slug** = `fluffyfriends`.

**Step 5 – Deploy**

- The RT2026 site already sends `ref` and `source` on every message when the user arrived via a ref link. No extra deploy is needed unless you change the site. Just ensure the site is live (e.g. Netlify) and that `N8N_WEBHOOK_URL` points to your Chat Trigger.

---

## What the frontend sends

- **URL params:** `?ref=<slug>&source=<source>`
  - **Portfolio:** `ref` = project slug (e.g. `fluffyfriends`), `source=portfolio`
  - **Insights:** `ref` = article slug (e.g. `ai-is-rocket-fuel`), `source=insights`
  - **Services:** `ref=services`, `source=services`

- **Every message** to `/api/chatbot` includes:
  - `chatInput` – user message
  - `sessionId` – session id
  - `metadata` – only when the user arrived via a ref/source link:
    - `metadata.ref` – e.g. `fluffyfriends`, `ai-is-rocket-fuel`, `services`
    - `metadata.source` – `portfolio` | `insights` | `services`

The Next.js API forwards this payload to your n8n webhook as-is (including `metadata` when present).

## Using ref/source in n8n to pull from Google Sheets

1. **Webhook node**  
   Read the incoming body and expose:
   - `$json.chatInput`
   - `$json.sessionId`
   - `$json.metadata.ref`
   - `$json.metadata.source`

2. **Google Sheets**  
   Structure your sheet so you can look up by `ref` (and optionally `source`), for example:
   - Column **ref** (or **slug**): `fluffyfriends`, `ai-is-rocket-fuel`, `services`, etc.
   - Column **source**: `portfolio`, `insights`, `services`
   - Columns for context: **title**, **summary**, **faq**, **key_points**, etc.

3. **Lookup row**  
   - If `metadata.ref` exists, use **Google Sheets** node to find the row where `ref` = `metadata.ref` (and optionally `source` = `metadata.source`).
   - If no row is found, skip the lookup and let the agent use only the conversation.

4. **Inject into prompt**  
   Use the row data (e.g. summary, faq, key points) in your AI node’s system or user prompt so the agent can answer with that context.

Example (conceptual):

- **Condition:** `metadata.ref` is not empty.
- **Google Sheets – Lookup:** spreadsheet by `ref` (and optionally `source`).
- **Set node:** build a context string from the row, e.g.  
  `Context for this conversation: [title], [summary]. Key points: [key_points].`
- **AI node:** prepend this context to the system prompt or the latest user message.

That way the agent “pulls” the right data from Google Sheets for the page the user came from.

## Portfolio: slugs and URLs (copy into your sheet)

Use these **slug** values in your Portfolio tab so they match the website 1:1. Base URL: `https://radical-thinking.net`.

| slug | Full URL | Title |
|------|----------|--------|
| soundreaver | https://radical-thinking.net/work/soundreaver | Soundreaver |
| ai-networks | https://radical-thinking.net/work/ai-networks | AI Networks |
| bella-conversational-ai | https://radical-thinking.net/work/bella-conversational-ai | Bella Conversational AI |
| 1001-inventions-games | https://radical-thinking.net/work/1001-inventions-games | 1001 Inventions Games |
| akshaak | https://radical-thinking.net/work/akshaak | Akshaak |
| kahulife | https://radical-thinking.net/work/kahulife | Kahulife |
| animal-intelligence | https://radical-thinking.net/work/animal-intelligence | Animal Intelligence |
| austability-web | https://radical-thinking.net/work/austability-web | Austability Web |
| austability-branding | https://radical-thinking.net/work/austability-branding | Austability Branding |
| austability-video | https://radical-thinking.net/work/austability-video | Austability Video |
| crypto-x | https://radical-thinking.net/work/crypto-x | Crypto X |
| flexxpay | https://radical-thinking.net/work/flexxpay | FlexxPay |
| influence-my-world | https://radical-thinking.net/work/influence-my-world | Influence My World |
| kfas-1001-inventions | https://radical-thinking.net/work/kfas-1001-inventions | KFAS 1001 Inventions |
| lenovo-campaigns | https://radical-thinking.net/work/lenovo-campaigns | Lenovo Campaigns |
| payment-partners | https://radical-thinking.net/work/payment-partners | Payment Partners |
| microsoft-ai | https://radical-thinking.net/work/microsoft-ai | Microsoft AI |
| simon-snelder | https://radical-thinking.net/work/simon-snelder | Simon Snelder |
| tommy-ellie | https://radical-thinking.net/work/tommy-ellie | Tommy & Ellie |
| webinarlife | https://radical-thinking.net/work/webinarlife | WebinarLife |
| fluffyfriends | https://radical-thinking.net/work/fluffyfriends | FluffyFriends |

**Slug-only list** (for a single column, e.g. paste into the **slug** column in order):

```
soundreaver
ai-networks
bella-conversational-ai
1001-inventions-games
akshaak
kahulife
animal-intelligence
austability-web
austability-branding
austability-video
crypto-x
flexxpay
influence-my-world
kfas-1001-inventions
lenovo-campaigns
payment-partners
microsoft-ai
simon-snelder
tommy-ellie
webinarlife
fluffyfriends
```

## Recommended Google Sheet structure

- **Portfolio tab:** Include a column **slug** (or **ref**) with values matching the website project slugs (see table above). The agent is instructed to prefer the row where slug/ref matches `metadata.ref` when source=portfolio.
- **Insights:** If you add an Insights tab, use a **slug** column with article slugs (e.g. `ai-is-rocket-fuel`) so the agent can focus on that article when source=insights.
- **Services:** For ref=services the agent already focuses on the Services sheet; no extra column needed.
