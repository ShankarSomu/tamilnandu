# TamilNandu Landing Page

Coming-soon page for TamilNandu, a Tamil-rooted global mutual-help community open to everyone.

## Stack

- Next.js (static export) + TypeScript + Tailwind CSS
- Cloudflare Pages for hosting
- A Pages Function (`functions/api/waitlist.ts`) saves signups to a Cloudflare D1 database

## Contributing

Contributions of every size are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) first, and follow the [Code of Conduct](./CODE_OF_CONDUCT.md). Report security problems privately as described in [SECURITY.md](./SECURITY.md). Releases are listed in [CHANGELOG.md](./CHANGELOG.md) and use [Semantic Versioning](https://semver.org/).

Licensed under the [MIT License](./LICENSE).

## Local development

- `npm install`
- `npm run dev` for the page with live reload. The signup form needs the Function, so it only works in preview.
- `npm run db:init:local` once, then `npm run preview` to build and run the full site, including signups, at `http://localhost:8788`.

## Deploy to Cloudflare

1. `npx wrangler login`
2. `npx wrangler d1 create tamilnandu-waitlist`, then paste the printed `database_id` into [wrangler.toml](./wrangler.toml).
3. `npm run db:init` creates the `waitlist` table in the remote database.
4. `npm run deploy` builds and publishes. The first run creates the `tamilnandu` Pages project.

Wrangler may offer to create the Pages project when you run step 4. Accept it, and use `main` as the production branch.

To use a custom domain, open the Pages project in the Cloudflare dashboard and go to Custom domains.

## Reading signups

`npx wrangler d1 execute tamilnandu-waitlist --remote --command "SELECT email, name, interests, created_at FROM waitlist"`

Export for a mailing tool by adding `--json`. Only email people who ticked consent, which every stored row has.
