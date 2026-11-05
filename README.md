# illusivelightworks.com

The Illusive Lightworks website: a landing page plus the ILW Light Mapper documentation, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

```
src/pages/index.astro        the landing page (/)
src/content/docs/docs/       the documentation (/docs/…), plain Markdown
src/styles/theme.css         docs colors
astro.config.mjs             site title, sidebar order
public/                      images, favicon, CNAME (custom domain)
```

## Work on it

```bash
npm install
npm run dev        # http://localhost:4321, live reload
npm run build      # checks every page and builds the search index into dist/
```

## Edit the docs

Each page is a `.md` file under `src/content/docs/docs/`. To add one, create the file with a `title:` and `description:` at the top and add it to the `sidebar` in `astro.config.mjs`.

Two working lists live next to this file:
- `SCREENSHOTS_NEEDED.md`: screenshots to capture
- `DOCS_TO_VERIFY.md`: statements to check against the real app

## Publish

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`). The custom domain is set by `public/CNAME`.
