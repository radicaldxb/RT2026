-- RT-BOT direct API: extend conversations table for qualification tracking.
-- Run in Supabase SQL editor if not already applied.

ALTER TABLE conversations
ADD COLUMN IF NOT EXISTS qualification_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'unknown'
  CHECK (category IN ('unknown', 'prospect', 'vendor', 'jobseeker', 'spam', 'warm'));

ALTER TABLE conversations
ADD COLUMN IF NOT EXISTS meta JSONB DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS conversations_session_id_idx ON conversations (session_id);
