# Content Model

## Source Files

Public content lives in JSON files:

- `public/content/en.json`
- `public/content/el.json`

Both locale files should keep the same structure.

## Top-Level Shape

```json
{
  "meta": {},
  "locales": {},
  "brand": {},
  "navigation": [],
  "hero": {},
  "concept": {},
  "featured": {},
  "menu": {},
  "gallery": {},
  "contact": {},
  "footer": {}
}
```

## Menu Categories

The current category foundation is:

- Starters
- Hot Dogs
- Panini
- Burgers
- Desserts
- Refreshments
- Water
- Beers
- Spirits
- Aperitif

Each category can contain one or more menu items:

```json
{
  "id": "burgers",
  "title": "Burgers",
  "description": "The core burger lineup.",
  "items": [
    {
      "id": "atelier-burger",
      "name": "ATELIER Burger",
      "description": "The future house burger with premium ingredients.",
      "price": "TBD",
      "featured": true
    }
  ]
}
```

## Locale Rules

- Add or change public-facing copy in both locale files.
- Keep IDs stable across locales.
- Translate labels and descriptions, but do not translate IDs.
- Use `featured: true` to allow `src/menu.js` to surface items in the featured section.

## Image Content

Image folders are prepared under:

- `public/images/logo`
- `public/images/food`
- `public/images/drinks`
- `public/images/atmosphere`

Future content can add image paths to JSON once real assets exist.
