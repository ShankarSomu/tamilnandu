# Security Policy

## Supported versions

TamilNandu is pre-1.0. Only the latest release on the `main` branch receives fixes.

| Version        | Supported |
| -------------- | --------- |
| latest `0.x`   | Yes       |
| anything older | No        |

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Report it privately using GitHub's
[private vulnerability reporting](https://github.com/ShankarSomu/tamilnandu/security/advisories/new)
(the **Security** tab, then **Report a vulnerability**).

Please include:

- what you found and where (file, page, or endpoint)
- steps to reproduce it
- the impact you expect

What to expect:

- We aim to acknowledge reports within 5 working days.
- We will keep you updated while we investigate and fix the issue.
- With your permission, we will credit you in the release notes.

## What counts

This project collects people's email addresses for the waitlist, so we take these especially seriously:

- anything that exposes or lets someone read stored signups
- bypassing consent checks or input validation in `functions/api/waitlist.ts`
- committed secrets, tokens, or database IDs that grant access

## Please do not

- access, change, or delete other people's data
- run automated scans or load tests against the live site
- include real personal data in reports, issues, or pull requests
