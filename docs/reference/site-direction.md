# ATELIER Site Direction

## Direction

ATELIER is now a premium static restaurant website for a burger, panini, dessert, and drinks concept.

The site should feel:

- Clean
- Elegant
- Food-focused
- Modern
- Premium casual rather than decorative or app-like

## Technical Direction

- Plain static HTML, CSS, and JavaScript only.
- No Vite, npm build setup, React, WordPress, bundlers, or frameworks.
- `index.html` owns the public page structure and most static copy.
- Menu content may live in static JSON under `assets/content` and be rendered by minimal vanilla JavaScript.
- EN/EL language support may use a small translation map and localStorage.
- `assets/css/style.css` owns all styling for now.
- `assets/js/main.js` is limited to simple UI interactions, language switching, and menu rendering.

## Asset Organization

```text
assets/images/logo/
assets/images/food/
assets/images/drinks/
assets/images/atmosphere/
```

## Content Organization

```text
assets/content/menu.en.json
assets/content/menu.el.json
```

Menu JSON is the source of truth for categories, items, descriptions, prices, and useful item tags. Keep English and Greek files aligned by ID.

Current project-bound bitmap assets were generated for the static presentation and copied into the workspace:

- `assets/images/food/atelier-burger-hero.png`
- `assets/images/food/croquant-panini.png`
- `assets/images/drinks/spritz-service.png`
- `assets/images/atmosphere/evening-counter.png`

## Content Notes

Opening details are intentionally not invented. Replace the contact section only when the real address, hours, phone, reservations, delivery links, or social channels are confirmed.

JSON-LD is intentionally omitted for now because there is no confirmed real-world address, opening hours, phone number, reservation URL, or social profile to publish honestly.
