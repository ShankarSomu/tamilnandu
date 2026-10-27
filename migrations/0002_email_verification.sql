ALTER TABLE waitlist ADD COLUMN verified_at TEXT;
ALTER TABLE waitlist ADD COLUMN verification_token_hash TEXT;
ALTER TABLE waitlist ADD COLUMN verification_expires_at TEXT;
ALTER TABLE waitlist ADD COLUMN verification_sent_at TEXT;
