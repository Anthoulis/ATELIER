# Content Editing Guide

## Menu Files

Menu content lives in:

```text
assets/content/menu.en.json
assets/content/menu.el.json
```

Each file has a `categories` array. Each category uses:

```json
{
  "id": "burgers",
  "title": "Burgers",
  "description": "Category description.",
  "items": []
}
```

Each item uses:

```json
{
  "id": "atelier-burger",
  "name": "Atelier",
  "description": "Double smashed beef, caramelized onions, truffle Graviera, rocket, fig jam.",
  "price": 13.5,
  "tags": ["signature"]
}
```

`description` must always exist. Use an empty string when there is no useful description.

## IDs

- Use stable lowercase kebab-case IDs.
- Do not rename IDs unless the product itself is being intentionally renamed.
- Keep category ID order and item ID order identical in English and Greek.

## Prices

- Store prices as numbers, not strings.
- Do not include the euro symbol in JSON.
- The renderer formats prices as `€5`, `€5.5`, and `€13.5`.

## Tags

Allowed tags:

- `signature`
- `vegetarian`
- `spicy`

Do not add new tags without updating the renderer, site translations, and validation script.

## Site Copy

Site copy lives in:

```text
assets/content/site.en.json
assets/content/site.el.json
```

Keep the key structure aligned. If a Greek key is missing, the page falls back to English for that key.

## Common Mistakes

- Adding an item to one language only.
- Changing an ID in one language only.
- Storing prices as strings.
- Adding a tag outside the allowed set.
- Adding fake address, phone, hours, reservation, social, or legal data.
- Editing visible HTML copy but forgetting the site JSON files.

## Validation

Run:

```bash
python tools/validate-content.py
```

Fix hard errors before deploying. Warnings usually mean translation keys are not aligned.
