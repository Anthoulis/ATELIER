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
  "price": 14
}
```

`description` is optional for both categories and items. Omit it when there is no useful description. When present, it must be a string.

Keep menu items limited to `id`, `name`, optional `description`, and `price`. Tags and notes are not part of the menu schema.

## IDs

- Use stable lowercase kebab-case IDs.
- Do not rename IDs unless the product itself is being intentionally renamed.
- Keep category ID order and item ID order identical in English and Greek.

## Prices

- Store prices as numbers, not strings.
- Do not include the euro symbol in JSON.
- The renderer formats prices as `€5`, `€5.5`, and `€13.5`.

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
- Keeping an empty `description` instead of omitting it.
- Adding unsupported item fields such as tags or notes.
- Adding fake address, phone, hours, reservation, social, or legal data.
- Editing visible HTML copy but forgetting the site JSON files.

## Validation

Run:

```bash
python tools/validate-content.py
```

Fix hard errors before deploying. Warnings usually mean translation keys are not aligned.
