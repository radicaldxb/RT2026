-- RT-BOT: shareable brief artefacts at /brief/[slug]

CREATE TABLE IF NOT EXISTS briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  problem TEXT,
  situation_summary TEXT NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS briefs_slug_published_idx
  ON briefs (slug)
  WHERE published = true;

CREATE INDEX IF NOT EXISTS briefs_conversation_id_idx
  ON briefs (conversation_id);
