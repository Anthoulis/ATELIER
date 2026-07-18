# ATELIER Site Direction

## Visual Direction

ATELIER should feel:

- Premium casual
- Clean
- Elegant
- Food-focused
- Modern
- Calm rather than noisy or fast-food oriented

Photography, restrained typography, dark stone, warm light, and simple layouts should carry the brand. Avoid decorative UI that competes with the food.

## Technical Direction

- Plain static HTML, CSS, and JavaScript only.
- Static JSON is allowed for bilingual site copy and menu content.
- Native ES modules are allowed.
- No npm, Vite, React, WordPress, framework, bundler, or build step.
- `index.html` owns the semantic page structure.
- `assets/css/style.css` owns styling for now.
- `assets/js/*` should stay small and split by responsibility.

## Content Direction

Menu data is the source of truth in:

```text
assets/content/menu.en.json
assets/content/menu.el.json
```

Site copy and UI strings live in:

```text
assets/content/site.en.json
assets/content/site.el.json
```

Keep English and Greek content aligned by IDs and translation keys. Greek should sound natural and concise, with English product terms kept only when they are brand/product language such as ATELIER, Burger, Panini, BBQ, cheddar, coleslaw, aioli, and Black Angus.

## Confirmed Information Policy

Do not invent:

- Real address
- Opening hours
- Phone numbers
- Reservation links
- Delivery links
- Legal business names
- VAT numbers

Use only details and links confirmed by the owner. The current Instagram profile and Google Maps link are confirmed and may be published.

## Legal And Contact

The footer includes confirmed service information from the supplied menu:

- Market Regulation Officer
- All prices include VAT
- Allergy notice

Restaurant JSON-LD is intentionally omitted until real-world business data exists.

## Future Improvements

- Add address, hours, phone, and reservation details when confirmed.
- Add Restaurant JSON-LD once address, hours, phone, and business identity are confirmed.
- Confirm final product/pricing decisions against the printed menu.
- Add reservation and delivery links when available.
