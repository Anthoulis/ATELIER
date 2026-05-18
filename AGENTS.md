# AGENTS.md

## Scope

These rules apply to all future Codex work in this repository.

## Core Rules

- Do not make broad unrelated changes.
- Do not rewrite the whole project unless explicitly asked.
- Preserve the current file organization unless there is a documented reason to change it.
- Keep content separate from layout and rendering logic.
- Prefer small, focused commits.
- Preserve the vanilla JavaScript and Vite setup.
- Do not introduce React, WordPress, or a heavy framework without explicit approval.

## Architecture

- `index.html` should remain minimal and load `src/main.js`.
- Page sections should be rendered by small modules in `src/components`.
- Shared content should live in `public/content/en.json` and `public/content/el.json`.
- Menu shaping and menu-specific rules belong in `src/menu.js`.
- Locale loading and language persistence belong in `src/i18n.js`.

## CSS Rules

- Maintain the existing CSS split:
  - `tokens.css` for design variables only.
  - `base.css` for reset and global element defaults.
  - `layout.css` for page and section layout.
  - `components.css` for section, card, button, header, and footer styling.
  - `utilities.css` for small single-purpose helpers.
- Explain blast radius before touching shared CSS.
- Keep CSS mobile-first.
- Keep selectors scoped to clear project classes such as `site-header`, `hero-section`, `menu-section`, and `menu-card`.
- Avoid broad global selectors outside `base.css`.

## Content Rules

- Do not hard-code replaceable business content in components.
- Update both `en.json` and `el.json` when adding or changing public content.
- Keep JSON structures aligned across locales.
- Treat menu categories as content unless behavior requires logic in `src/menu.js`.

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
