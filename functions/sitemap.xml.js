// GET /sitemap.xml — both homepages plus every vehicle page in both languages, with
// hreflang alternates so Google pairs the Spanish and English versions
import { SITE, LANGS, esc, photos, absUrl, carPath, loadInventory } from "./_lib.js";

export async function onRequestGet(ctx) {
  const cars = await loadInventory(ctx);
  const groups = [
    { paths: { es: "/", en: "/en/" }, imgs: [SITE + "/assets/logo.jpg"] },
    ...cars.map((c) => ({ paths: { es: carPath("es", c), en: carPath("en", c) }, imgs: photos(c).map(absUrl) })),
  ];
  const alts = (p) => [...LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${esc(SITE + p[l])}"/>`), `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(SITE + p.es)}"/>`].join("");
  const urls = groups.flatMap((g) => LANGS.map((l) => `<url><loc>${esc(SITE + g.paths[l])}</loc>${alts(g.paths)}${g.imgs.map((i) => `<image:image><image:loc>${esc(i)}</image:loc></image:image>`).join("")}</url>`));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
