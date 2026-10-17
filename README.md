## Run locally

Requirements: Node.js 20.3+ recommended.

```bash
npm install
npm run dev
```

Build the static site:

```bash
npm run build
npm run preview
```

## Structure
- `src/content/pages/` — editable HTML for each migrated page and post. Edit `about.html` for the combined About and Work page content.
- `src/pages/` — one Astro route file per page/post, named for its URL slug. The consolidated About and Work page is at `/about_and_work/`.
- `src/pages/index.astro` — the custom home page.
- `src/components/AboutWorkPage.astro` — the combined About and Work page with background, embedded CV, research, tools, and resources.
- `src/pages/about_and_work/` — the canonical `/about_and_work/` route and direct-link routes for opening individual accordions, such as `/about_and_work/sounderpy/`. `/about/` and `/work/` remain as legacy entry pages linking to the combined page.
- `src/pages/plots.astro` — the separate Python plotting gallery, linked from the Tools section.
- `src/layouts/BaseLayout.astro` — shared header/footer and metadata.
- `src/styles/global.css` — responsive base design.
- `public/placeholders/image-landscape.svg` — temporary image placeholder.
