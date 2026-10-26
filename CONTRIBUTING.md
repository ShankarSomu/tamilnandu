# Contributing to TamilNandu

Thank you for helping build TamilNandu, a Tamil-rooted mutual-help community that is open to everyone.
Developers, designers, writers, and community builders are all welcome, at any experience level.

By taking part you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
By contributing, you agree your work is released under the project's [MIT License](./LICENSE).

## Ways to help

- **Report a bug** or **suggest an idea** using the [issue forms](https://github.com/ShankarSomu/tamilnandu/issues/new/choose).
- **Pick up an issue.** Look for `good first issue` and `help wanted`.
- **Improve the page:** copy, accessibility, design, translations.
- **Review pull requests.** Kind, specific feedback is a real contribution.

Security problems must not go in public issues. See [SECURITY.md](./SECURITY.md).

## Before you start

1. Search existing issues and pull requests to avoid duplicates.
2. For anything bigger than a small fix, **open an issue first** and wait for a maintainer to agree on the approach. This saves your time.
3. Comment on an issue to say you are working on it. If you go quiet for two weeks, a maintainer may offer it to someone else.

## Set up

You need Node.js 20 or newer.

1. [Fork](https://github.com/ShankarSomu/tamilnandu/fork) the repository and clone your fork.
2. Add the original repository as `upstream`:
   `git remote add upstream https://github.com/ShankarSomu/tamilnandu.git`
3. `npm install`
4. `npm run dev` to work on the page with live reload.
5. To test the signup form, run `npm run db:init:local` once, then `npm run preview` (opens at `http://localhost:8788`).

You do not need a Cloudflare account to contribute. Everything runs locally.

## Making a change

1. Sync, then branch from `main`:
   `git fetch upstream && git checkout -b <type>/<short-name> upstream/main`
   Branch types: `feat/`, `fix/`, `docs/`, `chore/`, for example `fix/form-error-focus`.
2. Keep the change small and focused on one thing.
3. Run `npx tsc --noEmit` and `npm run build`. Both must pass. CI runs the same checks.
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   `feat: add Tamil language toggle`, `fix: keep focus on error message`, `docs: clarify setup`.
5. Push to your fork and open a pull request against `main`. Fill in the template.

## Pull request rules

- One topic per pull request. Unrelated changes will be asked to split.
- Include screenshots for any visual change, on mobile and desktop widths.
- Be patient. Maintainers are volunteers. A first response usually takes a few days.
- Be open to feedback. Review comments are about the code, never about you.
- Pull requests are merged with **squash merge**, so the pull request title becomes the commit message. Please write it as a Conventional Commit.
- Do not force-push over a review in progress without saying so. Pushing new commits is fine.

## Project principles

These come from the community's values. Changes that go against them will not be accepted.

- **Privacy and consent first.** Do not add trackers, analytics, third-party scripts, or extra data collection without an agreed issue. Never commit real emails or personal data.
- **Honest copy.** Features that do not exist yet must be described as planned, not live. The first version is still being built.
- **Inclusive by default.** Welcoming to people of every background, caste, and belief. Use plain, kind language.
- **Accessible.** Real labels, keyboard use, visible focus, good contrast, and meaningful `alt` text.
- **Small and simple.** Prefer fewer dependencies and less code. No heavy animations or stock photos.
- **Mobile-first and responsive.**

## Code style

- TypeScript with strict mode on. Avoid `any`.
- Tailwind CSS for styling, using the existing palette in `tailwind.config.ts`: off-white `#FAF8F5`, teal `#115E59`, amber `#F4B860`, charcoal `#1F2937`.
- Match the style of the code around your change.
- Only comment code that needs clarification.

## Secrets and configuration

Never commit secrets, tokens, or `.dev.vars` files. The `database_id` in `wrangler.toml` is a placeholder; do not commit your own.

## Versioning

TamilNandu uses [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`), currently in the `0.x` range:

- **PATCH** (`0.1.1`): fixes and small copy or style tweaks.
- **MINOR** (`0.2.0`): new sections, features, or noticeable changes.
- **MAJOR** (`1.0.0`): the first version of the community platform is live. Before 1.0, breaking changes may happen in a MINOR release.

Contributors do **not** change the version number. Instead, add a line under `## [Unreleased]` in [CHANGELOG.md](./CHANGELOG.md) for any user-visible change, grouped under `Added`, `Changed`, `Fixed`, or `Removed`.

## Releasing (maintainers)

1. Move the `Unreleased` notes in `CHANGELOG.md` into a new dated version heading, and update the compare links at the bottom.
2. Set the same version in `package.json` (`npm version <patch|minor|major> --no-git-tag-version`).
3. Open a pull request titled `chore(release): vX.Y.Z` and merge it.
4. Tag the merge commit `vX.Y.Z` and create a GitHub Release using the changelog notes.
5. Run `npm run deploy` to publish.

## Questions

Open an issue and ask. There are no silly questions here.
