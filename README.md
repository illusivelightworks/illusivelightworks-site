# illusivelightworks.com

The Illusive Lightworks website: a landing page plus the ILW Light Mapper documentation, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

```
src/pages/index.astro        the landing page (/)
src/pages/watch.astro        the Watch page (/watch/)
src/data/videos.ts           videos shown on Watch
src/data/site.ts             App Store link, social links
src/layouts/Site.astro       header and footer for the non-docs pages
src/components/Screenshot.astro  screenshot slots used in the docs
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

## Add screenshots

Save a PNG (or JPG/WebP) into `public/img/docs/` using the file name listed in `SCREENSHOTS_NEEDED.md` (for example `mask-main.png`). It appears on its page automatically. In the local preview, anything still missing shows as a dashed "screenshot needed" box; on the published site it is hidden (or shows the old App Store slide where one was used as a stand-in).

## Add videos to the Watch page

The page shows your YouTube channel's latest **Shorts** (12) and **videos** (up to 6) by itself. They are read from YouTube when the site is built, and GitHub rebuilds the site every morning, so new uploads appear without any work. The channel is set in `src/data/site.ts` (`youtubeHandle`). A saved copy in `src/data/youtube-cache.json` is used if YouTube can't be reached during a build.

To pin hand-picked clips from any platform (TikTok, Instagram reel, YouTube) at the top under "Featured", add a line to `src/data/videos.ts`. Videos only load when someone presses play.

## Edit the docs

Each page is a `.md` or `.mdx` file under `src/content/docs/docs/`. To add one, create the file with a `title:` and `description:` at the top and add it to the `sidebar` in `astro.config.mjs`.

Two working lists live next to this file:
- `SCREENSHOTS_NEEDED.md`: screenshots to capture
- `DOCS_TO_VERIFY.md`: statements to check against the real app

## Publish

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`). The custom domain is set by `public/CNAME`.
