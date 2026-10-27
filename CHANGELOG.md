# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Double opt-in email verification for early-community signups, with a thank-you confirmation page and links to contribute.

### Changed

- Clarified signup confirmation and unsubscribe contact details; added the community contact email to the footer, Privacy Notice, and Code of Conduct.
- Copy refresh: clearer explanation of what joining means today, everyday examples of support, balanced welcome for people seeking and offering help, softer moderation wording, and fewer repeated "not live" disclaimers.

### Added

- Optional "What are you looking for?" free-text field on the early-interest form (up to 1000 characters). Existing databases need `npm run db:migrate`.

### Changed

- Privacy Notice now mentions the free-text note.

## [0.1.0] - 2026-10-25

First public version: the coming-soon landing page.

### Added

- Landing page with the mission, purpose, planned participation features, values, and community standards.
- Red crab logo, helping-crab hero image, and favicon.
- Consent-based early-interest form that stores signups in Cloudflare D1.
- Privacy Notice page.
- Static export for Cloudflare Pages.
- Community files: Code of Conduct, Contributing guide, Security policy, issue and pull request templates, and CI.

[Unreleased]: https://github.com/ShankarSomu/tamilnandu/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ShankarSomu/tamilnandu/releases/tag/v0.1.0
