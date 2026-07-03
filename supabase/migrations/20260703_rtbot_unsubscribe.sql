-- RT-BOT: unsubscribe tokens, email opt-in, unsubscribes audit table.

ALTER TABLE conversations
ADD COLUMN IF NOT EXISTS unsubscribe_token UUID DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS email_opt_in BOOLEAN DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS conversations_unsubscribe_token_idx
  ON conversations (unsubscribe_token);

CREATE TABLE IF NOT EXISTS unsubscribes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unsubscribe_token UUID NOT NULL,
  session_id TEXT,
  unsubscribed_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS unsubscribes_token_idx ON unsubscribes (unsubscribe_token);
