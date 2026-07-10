# n8n: RT-BOT Shareable Brief (rt-qualified-lead)

Add these nodes to the **qualified lead** workflow (`rt-qualified-lead`) **before** the email send node.

Prerequisites:

- Supabase migration `20260710_rtbot_briefs.sql` applied
- Webhook payload includes `sessionId`, `situation_read`, and `unsubscribe_token` (from `/api/chat`)

---

## 1. Generate Brief Content

**Node type:** HTTP Request  
**Method:** POST  
**URL:** `https://api.anthropic.com/v1/messages`

**Headers:**

| Name | Value |
|------|-------|
| `x-api-key` | `{{ $env.RT_ANTHROPIC_API_KEY }}` (or your n8n Anthropic credential) |
| `anthropic-version` | `2023-06-01` |
| `content-type` | `application/json` |

**Body (JSON):**

```json
{
  "model": "claude-haiku-4-5-20251001",
  "max_tokens": 600,
  "messages": [{
    "role": "user",
    "content": "Based on this conversation summary, write a brief strategy document with three sections.\n\nConversation summary: {{ $json.body.situation_read }}\n\nWrite exactly three sections with these headings:\n\n**The situation**\nTwo to three sentences describing the business context and what they are trying to achieve. Use general terms only. No names, no company names, no personal details.\n\n**The gap**\nTwo sentences identifying the real gap between where they are and where they want to be. Frame it as a thinking or clarity problem, not a technology problem.\n\n**Where to start**\nThree concrete stepping stones they can act on. Use plain language, not technical terms. Each stepping stone on its own line starting with a number.\n\nTone: direct, honest, British English, no em dashes, no emojis, no corporate filler. Write as if you are a sharp strategist leaving someone with genuine clarity."
  }]
}
```

**Expression note:** If your webhook node is named differently, replace `$json.body.situation_read` with the correct path (e.g. `$('RT Chat Webhook').item.json.body.situation_read`).

**Output:** `{{ $json.content[0].text }}`

---

## 2. Write Brief to Supabase

**Node type:** HTTP Request  
**Method:** POST  
**URL:** `https://jpqxyqnrejhycetehynx.supabase.co/rest/v1/briefs`

**Headers:**

| Name | Value |
|------|-------|
| `apikey` | Supabase service role key |
| `Authorization` | `Bearer [service role key]` |
| `Content-Type` | `application/json` |
| `Prefer` | `return=representation` |

**Body (JSON):**

```json
{
  "conversation_id": "{{ $('RT Chat Webhook').item.json.body.sessionId }}",
  "slug": "{{ $('RT Chat Webhook').item.json.body.unsubscribe_token }}",
  "problem": "{{ $('RT Chat Webhook').item.json.body.situation_read }}",
  "situation_summary": "{{ $('Generate Brief Content').item.json.content[0].text }}",
  "generated_at": "{{ $now.toISO() }}",
  "published": true
}
```

**Slug:** Reuses `unsubscribe_token` (UUID) — unique, unguessable, already on the conversation record.

---

## 3. Update qualified visitor email

After the Supabase write, pass the brief URL into the email node.

**Brief URL:**

```
https://radical-thinking.net/brief/{{ $('RT Chat Webhook').item.json.body.unsubscribe_token }}
```

**HTML block** — place **above** the "Continue the conversation" button:

```html
<p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">
  We also put together a short summary of what we discussed.
</p>
<a href="https://radical-thinking.net/brief/{{ $('RT Chat Webhook').item.json.body.unsubscribe_token }}"
   style="display:inline-block;border:0.5px solid #0a0a0a;color:#0a0a0a;padding:12px 24px;border-radius:100px;font-size:13px;font-weight:600;text-decoration:none;margin-bottom:16px;">
  View your brief
</a>
```

---

## Workflow order

```
RT Chat Webhook
  → [existing qualification logic]
  → Generate Brief Content
  → Write Brief to Supabase
  → Send qualified visitor email (with brief CTA)
```

---

## Privacy rules (enforced by design)

- Brief page shows only `situation_summary` (synthesised markdown)
- No name, email, company, or transcript on `/brief/[slug]`
- Slug is a UUID (`unsubscribe_token`)
- `robots.txt` disallows `/brief/`
- Page meta: `noindex, nofollow`
- No index route listing briefs

---

## Test checklist

1. Complete a qualifying chat (score ≥ 9, wrap-up confirmed)
2. Confirm row in Supabase `briefs` with `published = true`
3. Open `https://radical-thinking.net/brief/{unsubscribe_token}`
4. Confirm email contains "View your brief" above "Continue the conversation"
5. Confirm brief has three sections, no PII
