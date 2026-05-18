# Design System

## Status

This is a Phase 0 design foundation. The current styles are intentionally restrained and should not be treated as the final ATELIER visual identity.

## Direction

ATELIER should feel premium, focused, modern, and food-led. The design should support quick scanning on mobile while leaving enough structure for richer photography and brand assets later.

## CSS Layers

- `src/styles/tokens.css`: colors, spacing, type scale, radii, shadows, and layout tokens.
- `src/styles/base.css`: reset and global defaults.
- `src/styles/layout.css`: shell, sections, and responsive layout primitives.
- `src/styles/components.css`: header, hero, cards, menu, gallery, contact, buttons, and footer.
- `src/styles/utilities.css`: small single-purpose helpers.

## Token Rules

- Add reusable values to `tokens.css`.
- Do not add component selectors to `tokens.css`.
- Prefer semantic token names over one-off values.
- Avoid turning tokens into a full theme system until the brand direction requires it.

## Component Rules

- Keep component class names explicit and scoped.
- Use project prefixes such as `site-`, `hero-section`, `menu-section`, `menu-card`, and `contact-section`.
- Do not rely on element selectors for component styling.
- Avoid nested cards and decorative layout complexity during foundation work.

## Mobile-First Rules

- Base styles target narrow screens.
- Add enhancements with `min-width` media queries.
- Keep touch targets large enough for mobile.
- Ensure cards and section headers stack cleanly before adding desktop grids.

## Future Design Work

Future phases can add:

- Final color palette and typography
- Logo assets
- Food and drinks photography
- Menu photography rules
- Motion rules
- Button and form variants
- Dark or evening service variants, if needed
