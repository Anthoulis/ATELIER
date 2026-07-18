# ATELIER Website

ATELIER is a premium static restaurant website for a burger, panini, dessert, and drinks concept.

The project is intentionally lightweight:

- Plain static HTML
- Plain CSS
- Vanilla JavaScript
- Static JSON content
- No npm, Vite, React, WordPress, framework, bundler, or build step

## Project Structure

```text
index.html
assets/
  content/
    menu.en.json
    menu.el.json
    site.en.json
    site.el.json
  css/
    style.css
  js/
    dom-utils.js
    i18n.js
    main.js
    menu-renderer.js
  images/
    logo/
    food/
docs/
  reference/
tools/
  validate-content.py
```

## Local Preview

Use a local static server so the browser can fetch the JSON content files.

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

Opening `index.html` directly may display the shell, but browser security rules can block `assets/content/*.json` fetches.

## Content Model

Menu content lives in:

- `assets/content/menu.en.json`
- `assets/content/menu.el.json`

Site copy and UI strings live in:

- `assets/content/site.en.json`
- `assets/content/site.el.json`

The language toggle loads the matching site and menu JSON files. English is the default and the fallback when a Greek content file or key is missing.

## Editing Menu Content

- Keep category and item `id` values stable.
- Keep English and Greek category/item ID order exactly aligned.
- Keep prices as numbers, not strings.
- Keep `description` present even when it is an empty string.
- Use only these optional tags: `signature`, `vegetarian`, `spicy`.
- Do not invent products, prices, address details, hours, phone numbers, reservation links, or social links.
- Keep wording concise and aligned with the premium ATELIER tone.

## Validation

Run the content validator after editing JSON:

```bash
python tools/validate-content.py
```

The script checks menu structure, bilingual ID alignment, allowed tags, numeric prices, and site translation key alignment.

## JavaScript

JavaScript is split by responsibility:

- `assets/js/dom-utils.js`: small DOM and storage utilities
- `assets/js/i18n.js`: language selection, JSON site copy loading, metadata updates
- `assets/js/menu-renderer.js`: menu JSON loading, category navigation, item rendering
- `assets/js/main.js`: orchestration, mobile nav, header scroll state

The scripts use native ES modules and run directly in the browser from a static server.

## Deployment

Deploy the repository as static files on any static host. No build command is required.

The host must serve `.html`, `.css`, `.js`, `.json`, `.svg`, and image files as static assets.

## SEO Note

The site has static title, meta description, Open Graph metadata, `theme-color`, and `robots` metadata. Restaurant JSON-LD is intentionally omitted until real address, hours, phone, reservation URL, and business identity details are confirmed.
