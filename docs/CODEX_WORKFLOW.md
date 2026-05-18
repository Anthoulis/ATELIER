# Codex Workflow

## Working Agreement

This project favors small, reviewable changes over broad rewrites.

Before making non-trivial changes, summarize:

1. The problem.
2. The root cause.
3. The planned fix.
4. The files that will change.

## Before Editing

- Inspect the current files first.
- Identify whether the request touches content, rendering, styling, documentation, or build setup.
- Explain blast radius before touching shared CSS files.
- Avoid changing unrelated sections while working on a focused request.

## Editing Rules

- Keep content in JSON unless the content is structural and belongs in HTML.
- Keep rendering logic in component modules.
- Keep locale behavior in `src/i18n.js`.
- Keep menu data shaping in `src/menu.js`.
- Preserve module boundaries.
- Do not add dependencies without explaining why they are necessary.

## Verification

Run the most relevant commands after changes:

```bash
npm run build
```

For visual or layout work, also run:

```bash
npm run dev
```

Then inspect the page in a browser at the Vite local URL.

## Reporting

After implementation, report:

- What changed.
- Why it changed.
- Verification performed.
- Any assumptions or tradeoffs.
