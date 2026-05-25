# AGENTS.md

## Scope

These rules apply to all future Codex work in this repository.

## Core Rules

- Do not make broad unrelated changes.
- Do not rewrite the whole project unless explicitly asked.
- Preserve the current static file organization unless there is a documented reason to change it.
- Keep the site focused on premium visual presentation rather than app architecture.
- Prefer small, focused commits.
- Preserve the plain static HTML/CSS/JS setup.
- Do not introduce Vite, npm build tooling, React, WordPress, or a heavy framework without explicit approval.

## Architecture

- `index.html` is the source of truth for public-facing page structure and content.
- Use semantic HTML sections and keep the document easy to review.
- `assets/css/style.css` is the single stylesheet for now.
- `assets/js/main.js` should contain only minimal UI interactions.
- Do not reintroduce JavaScript component rendering or JSON-rendered content without explicit approval.
- Keep imagery organized under `assets/images/logo`, `assets/images/food`, `assets/images/drinks`, and `assets/images/atmosphere`.

## CSS Rules

- Use `assets/css/style.css` as the single CSS file until a split is explicitly justified.
- Explain blast radius before broad shared CSS changes.
- Keep CSS mobile-first.
- Keep selectors scoped to clear project classes such as `site-header`, `hero-section`, `menu-section`, and `signature-card`.
- Keep broad global selectors limited to the reset and element-default section at the top of `assets/css/style.css`.

## Content Rules

- Public content is static in `index.html`.
- Do not invent real address, hours, phone, reservation, or social details.
- Treat menu categories as content unless behavior explicitly requires JavaScript.
- Keep copy aligned with the ATELIER direction: premium, clean, elegant, food-focused, and modern.

## Change Process

Before non-trivial changes, summarize:

1. The problem.
2. The root cause.
3. The planned fix.
4. The files that will change.

After changes:

- Explain what changed and why.
- Run relevant build, test, or lint commands.
- State any verification command that could not be run.

## Quality Bar

- Make the smallest clean change that fully solves the request.
- Avoid clever code when explicit code is clearer.
- Do not leave dead code, commented-out code, placeholder implementations, or TODOs unless explicitly requested.
- Preserve public behavior unless the task explicitly asks for behavior changes.
