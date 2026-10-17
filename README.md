## A simple astro website

### Run locally

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

### Structure
- `src/content/pages/` — editable HTML for each migrated page and post. 
- `src/pages/` — one Astro route file per page/post, named for its URL slug.
- `src/pages/index.astro` — the home page.
- `src/layouts/BaseLayout.astro` — shared header/footer and metadata.
- `src/styles/global.css` — responsive base design.
