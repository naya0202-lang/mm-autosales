// Shared helpers for the server-rendered pages (vehicle pages, sitemap).
// Inventory data comes from the same inventory.json the homepage uses.

export const SITE = "https://mmusedautosales.com";
const PHONE = "(502) 377-9017", TEL = "tel:+15023779017";

export const DEALER = {
  "@type": "AutoDealer",
  name: "M&M Used Auto Sales LLC",
  url: SITE + "/",
  telephone: "+1-502-377-9017",
  image: SITE + "/assets/logo.jpg",
  address: { "@type": "PostalAddress", streetAddress: "410 Fairdale Rd., Suite A", addressLocality: "Fairdale", addressRegion: "KY", postalCode: "40118", addressCountry: "US" },
};

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
export const money = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
export const photos = (c) => (Array.isArray(c.images) ? c.images.filter(Boolean) : c.image ? [c.image] : []);
export const name = (c) => `${c.year} ${c.make} ${c.model}`;
// must match slug() in index.html — it is the vehicle page URL
export const slug = (c) => `${c.year} ${c.make} ${c.model} ${c.vin}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const absUrl = (p) => (/^https?:/.test(p) ? p : `${SITE}/${p.replace(/^\//, "")}`);
export const rootPath = (p) => (/^https?:/.test(p) ? p : "/" + p.replace(/^\//, ""));
// JSON placed inside <script> must not be able to close the tag
export const jsonForScript = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

export async function loadInventory({ request, env }) {
  const res = await env.ASSETS.fetch(new URL("/inventory.json", request.url));
  return res.ok ? res.json() : [];
}

export function page({ title, description, canonical, image, jsonld = [], body, status = 200 }) {
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">
<meta property="og:url" content="${esc(canonical)}">` : `<meta name="robots" content="noindex">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="M&amp;M Used Auto Sales">
<meta property="og:locale" content="es_US">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image || SITE + "/assets/logo.jpg")}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/site.css">
${jsonld.map((j) => `<script type="application/ld+json">${jsonForScript(j)}</script>`).join("\n")}
</head>
<body>
<div class="top"><span>📍 410 Fairdale Rd., Suite A, Fairdale, KY 40118</span><span>📞 ${PHONE}</span></div>
<header>
<a href="/"><img class="logo" src="/assets/logo.jpg" alt="M&M Used Auto Sales LLC"></a>
<nav><a href="/#home">HOGAR</a><a href="/#inventory">INVENTARIO</a><a href="/#finder">BUSCADOR DE COCHES</a><a href="/#apply">SOLICITE EN LÍNEA</a><a href="/#about">SOBRE NOSOTROS</a></nav>
<a class="contact-btn" href="${TEL}">CONTÁCTANOS</a>
</header>
${body}
<footer><div class="footer-grid"><div><img class="footer-logo" src="/assets/logo.jpg" alt="M&M Used Auto Sales"><p class="small">QUALITY PRE-OWNED VEHICLES</p></div><div><h3>CONTÁCTANOS</h3><p class="small">📞 ${PHONE}<br>📍 410 Fairdale Rd., Suite A<br>Fairdale, KY 40118</p></div><div><h3>INFORMACIÓN</h3><p class="small">Hogar<br>Inventario<br>Buscador de coches<br>Solicite en línea<br>Sobre nosotros</p></div></div><p class="small" style="text-align:center;margin-top:30px">© 2026 M&M Used Auto Sales LLC. Todos los derechos reservados.</p></footer>
</body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}

export { PHONE, TEL };
