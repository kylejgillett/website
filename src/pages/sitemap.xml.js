// Lists every top-level page, so new pages are picked up automatically.
// Left out: the 404 page, and aliases whose canonical address is another page.
// The about_and_work/[slug] pages repeat /about_and_work/, so they aren't listed either.
const excluded = new Set(['404', 'about', 'work']);

const pages = Object.keys(import.meta.glob('./*.astro'))
  .map((file) => file.slice(2, -'.astro'.length))
  .filter((name) => !excluded.has(name))
  .map((name) => (name === 'index' ? '/' : `/${name}/`))
  .sort();

export function GET({ site }) {
  const urls = pages.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
