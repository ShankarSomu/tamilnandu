-- Run once on a database created before this column existed:
--   npm run db:migrate         (remote)
--   npm run db:migrate:local   (local)
ALTER TABLE waitlist ADD COLUMN message TEXT;
