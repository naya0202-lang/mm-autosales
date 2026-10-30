// GET /sitemap.xml — homepage plus one entry (with photos) per vehicle in inventory.json
import { SITE, esc, photos, slug, absUrl, loadInventory } from "./_lib.js";

export async function onRequestGet(ctx) {
  const cars = await loadInventory(ctx);
  const entry = (loc, imgs = []) => `<url><loc>${esc(loc)}</loc>${imgs.map((i) => `<image:image><image:loc>${esc(i)}</image:loc></image:image>`).join("")}</url>`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[entry(SITE + "/", [SITE + "/assets/logo.jpg"]), ...cars.map((c) => entry(`${SITE}/inventario/${slug(c)}`, photos(c).map(absUrl)))].join("\n")}
</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
