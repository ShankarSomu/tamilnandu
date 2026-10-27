ALTER TABLE waitlist ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';
UPDATE waitlist SET status = 'verified' WHERE verified_at IS NOT NULL;
