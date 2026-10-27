# TamilNandu

TamilNandu is a Tamil-rooted global mutual-help community, open to everyone. Its symbol is a red crab helping another crab climb, the opposite of the "crab bucket" story. This repository holds the public landing page and waitlist, and it will grow into the community platform, built together with the community.

Live site: https://tamilnandu.org

## Help build it

You don't need to run the site to help. Developers, designers, writers and community builders are all welcome.

- **Start here:** [CONTRIBUTING.md](./CONTRIBUTING.md) explains how to fork, branch and open a pull request.
- **Find something to do:** look for issues labeled [`good first issue`](https://github.com/ShankarSomu/tamilnandu/labels/good%20first%20issue) or [`help wanted`](https://github.com/ShankarSomu/tamilnandu/labels/help%20wanted).
- **Share an idea or ask a question:** use [Discussions](https://github.com/ShankarSomu/tamilnandu/discussions).
- **Report a bug or suggest a feature:** open an [issue](https://github.com/ShankarSomu/tamilnandu/issues/new/choose).
- **Report a security problem:** privately, as described in [SECURITY.md](./SECURITY.md).

Everyone follows the [Code of Conduct](./CODE_OF_CONDUCT.md). Changes reach `main` only through a reviewed pull request. Releases are listed in [CHANGELOG.md](./CHANGELOG.md) and use [Semantic Versioning](https://semver.org/).

Licensed under the [MIT License](./LICENSE).

## Run it locally

Contributors only need this. Hosting and deployment are handled by the maintainers.

- `npm install`
- `npm run dev` starts the page with live reload. The signup form needs the Function, so it only works in preview.
- `npm run db:init:local` once, then `npm run preview`, builds and runs the full site with signups at `http://localhost:8788`.
- To test email verification, put a Resend API key in the ignored `.dev.vars` file as `RESEND_API_KEY=...`; use a verified sender and an address you control.
- Before opening a PR: `npx tsc --noEmit` and `npm run build`.

## Stack

- Next.js (static export), TypeScript and Tailwind CSS
- Cloudflare Pages for hosting
- A Pages Function (`functions/api/waitlist.ts`) saves signups to a Cloudflare D1 database

## For maintainers

Deployment and signup data need Cloudflare access, so contributors don't do these.

**Deploy**

1. `npx wrangler login`
2. `npx wrangler d1 create tamilnandu-waitlist`, then paste the printed `database_id` into [wrangler.toml](./wrangler.toml).
3. `npm run db:init` creates the current `waitlist` schema. For an existing database, run `npm run db:migrate:verification` once to add email-verification columns, then `npm run db:migrate:status` to add the `status` column (`pending` or `verified`). If it predates the optional message field, apply `npm run db:migrate` first.
4. Verify `tamilnandu.org` as a sending domain in Resend, including its DNS records.
5. Add the Resend API key as a Pages secret: `npx wrangler pages secret put RESEND_API_KEY --project-name=tamilnandu`. Never put the key in source control or `wrangler.toml`.
6. `npm run deploy` builds and publishes to the `tamilnandu` Pages project.

The custom domain is set under Custom domains in the Pages project. `wrangler.toml` configures the public verification URL and sender address.

**Reading signups**

`npx wrangler d1 execute tamilnandu-waitlist --remote --command "SELECT email, name, status, verified_at, interests, message, created_at FROM waitlist"`

Add `--json` to export. Email updates only people who consented and have `status = 'verified'`. The verification email is sent after consent and contains a one-time link that expires after 24 hours.
