# Contributing to EstateX

Thank you for your interest in contributing to EstateX — a Real Estate Investment Tracker built with Next.js, Firebase, and Chart.js. Your contributions make this project better for everyone. This guide is focused on making contributions easy to review and Hacktoberfest-friendly.

---

## Table of contents

- What to expect
- Quick start
- Local setup
- Branching & workflow
- Making changes
- Commit message conventions
- Pull request checklist
- Hacktoberfest guidelines
- Contribution ideas & good first issues
- Code style
- Tests & CI
- Documentation
- Code of conduct
- Need help?

---

## What to expect

- We welcome contributions of any size: bug fixes, docs, tests, UI improvements, or new features.
- Keep PRs focused and atomic — this helps reviewers and speeds up merges.
- Maintainers may request changes; please respond to review comments.

---

## Quick start

1. Fork this repository.
2. Clone your fork:
   git clone https://github.com/<your-username>/EstateX.git
   cd EstateX
3. Create a branch:
   git checkout -b feature/short-description
4. Install dependencies and run locally:
   npm install
   npm run dev
5. Make changes, run lint/tests, then push and open a PR.

---

## Local setup

- Install dependencies:
  npm install

- Run the app locally:
  npm run dev
  The app runs at: http://localhost:3000

- Lint and (if present) run tests:
  npm run lint
  npm run test

If you add tests or change behavior, include or update tests accordingly.

---

## Branching & workflow

- Always work in a branch — never commit directly to main.
- Use descriptive branch names:
  - feature/add-property-filter
  - fix/dashboard-responsive
  - docs/update-contributing
- Rebase or merge main before opening a PR to minimize conflicts:
  git fetch origin
  git checkout your-branch
  git rebase origin/main
  (or git merge origin/main)

---

## Making changes

- Keep changes small and scoped to a single purpose.
- Update or add documentation when behavior or APIs change.
- For UI changes, include screenshots or short GIFs in the PR description.
- If adding data or secrets for local testing, never commit real credentials. Use .env.example for sample keys.

---

## Commit message conventions

Follow concise, conventional commit-style messages:

- feat: add ROI trend chart to dashboard
- fix: correct mobile layout for dashboard
- docs: update contributing guide
- chore: update dependencies

Keep commits atomic and descriptive.

---

## Pull request checklist

Before opening a PR:

- [ ] Branch is up to date with main and merges cleanly
- [ ] Code follows project style and lint rules
- [ ] Tests pass locally (and new tests are included when applicable)
- [ ] Documentation updated for any behavior changes
- [ ] PR title and description clearly explain what, why, and any trade-offs
- [ ] Reference related issues (e.g., "Fixes #12") where applicable

In your PR description, include steps to reproduce and screenshots for UI changes.

---

## Hacktoberfest guidelines

We welcome Hacktoberfest contributions. To make your PRs eligible and easy to review, follow these rules:

- Work on issues labeled `hacktoberfest` or explicitly marked as suitable for beginners.
- Keep each PR focused and small — avoid large sweeping changes in a single PR.
- Do not submit spammy, trivial, or automated PRs. PRs must add meaningful value.
- Tag your PR description with the word `hacktoberfest`. Maintainers may add the official label.
- Include a clear title, description, and related issue references (e.g., "Fixes #<issue>").
- Add tests or documentation updates if your change affects behavior.
- Be responsive to review feedback — maintainers may request edits.

Maintainers reserve the right to mark PRs invalid if they do not follow these guidelines.

---

## Contribution ideas & good first issues

If you're looking for something to do, consider:

- Add a new dashboard graph for market trends
- Implement property comparison or advanced filters
- Improve Firebase authentication (e.g., Google login)
- Add dark/light mode and persist setting
- Improve UI transitions/animations with Tailwind
- Create realistic dummy API data for local testing
- Fix accessibility issues

Look for issues labeled `good first issue` or `hacktoberfest`. If none exist, open an issue proposing your change before submitting a large PR.

---

## Code style

- Follow Next.js best practices.
- Use Tailwind CSS for styles and keep utility classes readable.
- Keep functions small and single-purpose.
- Prefer descriptive names over overly-short identifiers.
- Avoid commented-out code; remove dead code instead.
- Explain complex logic with brief comments, not obvious comments.

---

## Tests & CI

- Add tests for bug fixes and new features where reasonable.
- Run tests and linters locally before submitting a PR.
- CI may run automated checks on every PR — fix any issues the CI reports.

---

## Documentation

- Update README, component-level docs, or the wiki when you change behavior.
- Include usage examples and screenshots for UI additions.
- Add or update an entry in CHANGELOG.md when adding visible features (if present).

---

## Code of conduct

Be respectful and inclusive. Harassment, discrimination, or toxic behavior will not be tolerated. By contributing, you agree to follow the project's code of conduct.

---

## Need help?

If you get stuck:

- Search existing issues first.
- Open a new issue describing the problem, expected behavior, and steps to reproduce.
- Ask for help on your PR if you need guidance from maintainers.

When opening an issue, provide: environment, steps to reproduce, expected vs actual behavior, and any error messages.

---

## Thanks

Thanks for contributing — your work helps make EstateX better for real estate investors everywhere.
