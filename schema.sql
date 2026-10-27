CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  interests TEXT NOT NULL DEFAULT '[]',
  message TEXT,
  consent INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  verified_at TEXT,
  verification_token_hash TEXT,
  verification_expires_at TEXT,
  verification_sent_at TEXT
);
