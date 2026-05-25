# ATELIER Website

Premium static website for ATELIER, a burger, panini, dessert, and drinks concept.

The repository is intentionally plain static HTML, CSS, and JavaScript. It does not use Vite, npm, React, WordPress, JSON-rendered content, or a page-builder framework.

## Goals

- Keep the website premium, clean, elegant, and food-focused.
- Use semantic static HTML as the source of truth.
- Keep all styling in one main CSS file for now.
- Use minimal JavaScript only for simple UI behavior.
- Keep imagery organized by logo, food, drinks, and atmosphere.

## Project Structure

```text
index.html
assets/
  css/
    style.css
  js/
    main.js
  images/
    logo/
    food/
    drinks/
    atmosphere/
docs/
  reference/
```

## Local Preview

No install or build step is required. Open `index.html` directly in a browser, or serve the folder with any static file server.

## Content

Public-facing content now lives directly in `index.html`. Keep copy edits deliberate and aligned with the premium ATELIER direction.

## Styling

Primary styling lives in:

- `assets/css/style.css`

Keep the stylesheet mobile-first, scoped to project classes, and focused on presentation rather than framework patterns.

## JavaScript

Primary behavior lives in:

- `assets/js/main.js`

Keep JavaScript limited to simple interface interactions such as the mobile navigation state and header scroll state.
