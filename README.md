# ATELIER Website

Premium static website for ATELIER, a burger, panini, dessert, and drinks concept.

The repository is intentionally plain static HTML, CSS, and JavaScript. It does not use Vite, npm, React, WordPress, bundlers, frameworks, or a build step.

## Project Structure

```text
index.html
assets/
  content/
    menu.en.json
    menu.el.json
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

Use a local static server so the browser can fetch the JSON menu files.

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

Any equivalent static server is fine. Opening `index.html` directly may load the page shell, but browser security rules can block `assets/content/*.json` fetches.

## Content

Most page structure and marketing copy lives in `index.html`.

The menu lives in:

- `assets/content/menu.en.json`
- `assets/content/menu.el.json`

`assets/js/main.js` loads the matching menu file based on the selected language. If Greek menu content cannot be loaded, the script falls back to English. If a translation key is missing, the English text remains the fallback.

## Editing Menu Safely

- Keep category and item `id` values stable.
- Keep both locale files aligned by category and item IDs.
- Do not invent products, prices, address details, hours, phone numbers, or social links.
- Use concise descriptions that match the premium ATELIER tone.
- Use `tags` only when useful, for example `signature`, `vegetarian`, or `spicy`.
- Keep prices as numbers and leave currency display to the renderer.

## Styling

Primary styling lives in:

- `assets/css/style.css`

Keep CSS mobile-first, scoped to project classes, and focused on the current premium restaurant direction.

## JavaScript

Primary behavior lives in:

- `assets/js/main.js`

JavaScript is limited to mobile navigation, header scroll state, EN/EL language selection, localStorage persistence, and menu rendering.

## Deployment

Deploy the repository as static files on any static host. No build command is required. Make sure the host serves `.json`, `.css`, `.js`, `.svg`, and image files with normal static file access.
