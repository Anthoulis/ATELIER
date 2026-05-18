# ATELIER Website

Phase 0 foundation for ATELIER, a premium burger, panini, dessert, and drinks concept.

This project uses Vite with vanilla JavaScript modules. It does not use React, WordPress, or a page-builder framework.

## Goals

- Keep the HTML minimal and structural.
- Render page sections from small JavaScript component modules.
- Keep editable content in JSON files under `public/content`.
- Prepare bilingual support for English and Greek.
- Keep CSS mobile-first and split by responsibility.
- Provide a clean foundation for later design, imagery, menu, and deployment work.

## Project Structure

```text
docs/
public/
  content/
  images/
src/
  components/
  styles/
```

## Commands

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content

Primary content lives in:

- `public/content/en.json`
- `public/content/el.json`

The JavaScript modules fetch the selected locale file and render the page from that data.

## Styling

CSS is loaded from `src/main.js` in this order:

1. `tokens.css`
2. `base.css`
3. `layout.css`
4. `components.css`
5. `utilities.css`

Keep shared CSS changes deliberate. The project is intentionally a skeleton, not the final design.
