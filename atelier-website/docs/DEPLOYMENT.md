# Deployment

## Build

Create the production bundle with:

```bash
npm run build
```

Vite outputs static files to:

```text
dist/
```

## Preview

Preview the production build locally with:

```bash
npm run preview
```

## Hosting Model

This project is static-hosting friendly. Suitable targets include:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- Any static file host that can serve Vite output

## Content Files

Locale JSON files are copied from `public/content` into the final build. The app fetches them from:

```text
/content/en.json
/content/el.json
```

If the site is deployed under a subpath, confirm that Vite base path and content fetch paths are configured correctly.

## Future Deployment Decisions

Before production launch, decide:

- Final domain
- Hosting provider
- Deployment branch
- Environment-specific base path, if any
- Analytics and consent requirements
- Cache policy for images and content JSON
