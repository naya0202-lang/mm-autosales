// Shared helpers and page layout for every server-rendered page (homepage, vehicle pages, sitemap),
// in Spanish (/) and English (/en/). Inventory data comes from inventory.json.

export const SITE = "https://mmusedautosales.com";
export const PHONE = "(502) 377-9017", TEL = "tel:+15023779017";
export const LANGS = ["es", "en"];

export const DEALER = {
  "@type": "AutoDealer",
  name: "M&M Used Auto Sales LLC",
  url: SITE + "/",
  logo: SITE + "/assets/logo.jpg",
  image: SITE + "/assets/logo.jpg",
  telephone: "+1-502-377-9017",
  address: { "@type": "PostalAddress", streetAddress: "410 Fairdale Rd., Suite A", addressLocality: "Fairdale", addressRegion: "KY", postalCode: "40118", addressCountry: "US" },
  knowsLanguage: ["es", "en"],
};

// All visible text, per language
export const T = {
  es: {
    locale: "es_US",
    nav: ["HOGAR", "INVENTARIO", "BUSCADOR DE COCHES", "SOLICITE EN LÍNEA", "SOBRE NOSOTROS"],
    contact: "CONTÁCTANOS",
    homeTitle: "M&M Used Auto Sales LLC | Fairdale, Kentucky",
    homeDesc: "M&M Used Auto Sales LLC en Fairdale, Kentucky. Quality pre-owned vehicles, rebuilt titles, atención en español e inglés.",
    heroTitle: "Vehículos confiables a precios justos.",
    heroText: "Quality Pre-Owned Vehicles en Fairdale, Kentucky. Atención personalizada en español e inglés.",
    trust: ["TÍTULOS RECONSTRUIDOS", "PROCESO SENCILLO", "ESPAÑOL E INGLÉS"],
    finderTitle: "Encuentra tu próximo vehículo",
    anyMake: "Cualquier marca", anyModel: "Cualquier modelo", anyYear: "Cualquier año", findBtn: "🔎 ENCUENTRA AUTOS",
    brandsTitle: "Buscar por marca", brandsSub: "Selecciona una marca para ver unidades disponibles.",
    actions: [
      ["Consulte el inventario", "Encuentra exactamente lo que buscas entre nuestros vehículos disponibles.", "VER INVENTARIO →"],
      ["Consigue financiamiento", "Pregunta por las opciones de financiamiento disponibles para compradores calificados.", "APLICA AHORA →"],
      ["Programa una prueba de conducción", "Comunícate con nosotros para confirmar disponibilidad y programar tu visita.", "AGENDAR CITA →"],
    ],
    invTitle: "Nuestro Inventario", invSub: "Nuevas unidades se agregan regularmente.",
    noResults: "No hay vehículos de esta selección en este momento.",
    aboutTitle: "Sobre M&M Used Auto Sales",
    aboutText: "Somos un dealer independiente en Fairdale, Kentucky, enfocado en ofrecer vehículos pre-owned y una experiencia de compra sencilla y personalizada. Nuestro equipo atiende en español e inglés.",
    miles: "millas", photos: "fotos", noPhoto: "FOTO DEL VEHÍCULO", viewPhotos: "Ver fotos de", details: "VER DETALLES", interested: "ME INTERESA",
    galleryLabel: "Fotos del vehículo", close: "Cerrar", prev: "Foto anterior", next: "Foto siguiente",
    home: "Inicio", inventory: "Inventario",
    specs: ["Año", "Marca", "Modelo", "Millas", "Título", "VIN"],
    call: "📞 LLAMAR", allInventory: "← VER TODO EL INVENTARIO",
    carDesc: (n, mi, title, price, vin) => `${n} en venta en Fairdale, KY: ${mi} millas, ${title}, ${price}. VIN ${vin}. Llame al ${PHONE}.`,
    goneTitle: "Vehículo no disponible", goneH: "Este vehículo ya no está disponible",
    goneText: "Puede que ya se haya vendido. Vea los vehículos disponibles en nuestro inventario.", goneBtn: "VER INVENTARIO",
    infoTitle: "INFORMACIÓN", rights: "Todos los derechos reservados.",
  },
  en: {
    locale: "en_US",
    nav: ["HOME", "INVENTORY", "CAR FINDER", "APPLY ONLINE", "ABOUT US"],
    contact: "CONTACT US",
    homeTitle: "M&M Used Auto Sales LLC | Used Cars in Fairdale, Kentucky",
    homeDesc: "M&M Used Auto Sales LLC in Fairdale, Kentucky. Quality pre-owned vehicles, rebuilt titles, service in English and Spanish.",
    heroTitle: "Reliable vehicles at fair prices.",
    heroText: "Quality pre-owned vehicles in Fairdale, Kentucky. Personal service in English and Spanish.",
    trust: ["REBUILT TITLES", "SIMPLE PROCESS", "ENGLISH & SPANISH"],
    finderTitle: "Find your next vehicle",
    anyMake: "Any make", anyModel: "Any model", anyYear: "Any year", findBtn: "🔎 FIND CARS",
    brandsTitle: "Shop by make", brandsSub: "Select a make to see available vehicles.",
    actions: [
      ["Browse our inventory", "Find exactly what you're looking for among our available vehicles.", "VIEW INVENTORY →"],
      ["Get financing", "Ask about the financing options available for qualified buyers.", "APPLY NOW →"],
      ["Schedule a test drive", "Contact us to confirm availability and schedule your visit.", "BOOK A VISIT →"],
    ],
    invTitle: "Our Inventory", invSub: "New vehicles are added regularly.",
    noResults: "No vehicles match this selection right now.",
    aboutTitle: "About M&M Used Auto Sales",
    aboutText: "We are an independent dealer in Fairdale, Kentucky, focused on quality pre-owned vehicles and a simple, personal buying experience. Our team serves customers in English and Spanish.",
    miles: "miles", photos: "photos", noPhoto: "VEHICLE PHOTO", viewPhotos: "View photos of", details: "VIEW DETAILS", interested: "I'M INTERESTED",
    galleryLabel: "Vehicle photos", close: "Close", prev: "Previous photo", next: "Next photo",
    home: "Home", inventory: "Inventory",
    specs: ["Year", "Make", "Model", "Mileage", "Title", "VIN"],
    call: "📞 CALL", allInventory: "← VIEW ALL INVENTORY",
    carDesc: (n, mi, title, price, vin) => `${n} for sale in Fairdale, KY: ${mi} miles, ${title}, ${price}. VIN ${vin}. Call ${PHONE}.`,
    goneTitle: "Vehicle no longer available", goneH: "This vehicle is no longer available",
    goneText: "It may have been sold. See the vehicles available in our inventory.", goneBtn: "VIEW INVENTORY",
    infoTitle: "INFORMATION", rights: "All rights reserved.",
  },
};

export const homePath = (lang) => (lang === "en" ? "/en/" : "/");
export const carPath = (lang, c) => (lang === "en" ? "/en/inventory/" : "/inventario/") + slug(c);

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
export const money = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
export const miles = (c) => Number(c.miles).toLocaleString("en-US");
// "images" is a list of photo paths; the old single "image" field is still accepted
export const photos = (c) => (Array.isArray(c.images) ? c.images.filter(Boolean) : c.image ? [c.image] : []);
export const name = (c) => `${c.year} ${c.make} ${c.model}`;
// the vehicle part of the page URL, same in both languages
export const slug = (c) => `${c.year} ${c.make} ${c.model} ${c.vin}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const absUrl = (p) => (/^https?:/.test(p) ? p : `${SITE}/${p.replace(/^\//, "")}`);
export const rootPath = (p) => (/^https?:/.test(p) ? p : "/" + p.replace(/^\//, ""));
// JSON placed inside <script> must not be able to close the tag
export const jsonForScript = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

export async function loadInventory({ request, env }) {
  const res = await env.ASSETS.fetch(new URL("/inventory.json", request.url));
  return res.ok ? res.json() : [];
}

export const galleryDialog = (t) => `<dialog id="gallery" aria-label="${t.galleryLabel}">
<button class="gal-close" onclick="gallery.close()" aria-label="${t.close}">✕</button>
<button class="gal-nav gal-prev" onclick="step(-1)" aria-label="${t.prev}">‹</button>
<img id="galImg" alt="">
<button class="gal-nav gal-next" onclick="step(1)" aria-label="${t.next}">›</button>
<div class="gal-bar"><b id="galTitle"></b><br><span id="galCount"></span></div>
</dialog>
<script src="/assets/gallery.js"></script>`;

// Small inline flags for the ES | EN switch (emoji flags show as letters on Windows)
export const FLAGS = {
  es: `<svg width="20" height="14" viewBox="0 0 750 500" aria-hidden="true"><rect width="750" height="500" fill="#c60b1e"/><rect y="125" width="750" height="250" fill="#ffc400"/></svg>`,
  en: `<svg width="20" height="14" viewBox="0 0 190 100" aria-hidden="true"><rect width="190" height="100" fill="#b22234"/><path d="M0 11.54h190M0 26.92h190M0 42.31h190M0 57.69h190M0 73.08h190M0 88.46h190" stroke="#fff" stroke-width="7.69"/><rect width="76" height="53.85" fill="#3c3b6e"/></svg>`,
};
const LANG_NAMES = { es: "Español", en: "English" };

const SECTIONS = ["home", "inventory", "finder", "apply", "about"];

// alternates: { es: "/path", en: "/en/path" } — drives canonical, hreflang tags and the ES | EN switch.
// Without alternates (error pages) the page is marked noindex.
// Browsers may cache /assets/* for hours, so CSS/JS links carry ?v=<version>. The version is derived
// from the files' ETags once per deployment (module state resets on every deploy).
const VERSIONED = ["/assets/site.css", "/assets/gallery.js", "/assets/home.js"];
let assetVersion;
async function getAssetVersion({ request, env }) {
  if (!assetVersion) {
    const tags = await Promise.all(VERSIONED.map(async (p) => (await env.ASSETS.fetch(new URL(p, request.url))).headers.get("etag") || ""));
    let h = 5381;
    for (const ch of tags.join("|")) h = ((h * 33) ^ ch.charCodeAt(0)) >>> 0;
    assetVersion = h.toString(36);
  }
  return assetVersion;
}

export async function page(ctx, { lang, title, description, alternates, image, jsonld = [], body, status = 200 }) {
  const t = T[lang], home = homePath(lang), other = lang === "en" ? "es" : "en";
  const sw = alternates || { es: "/", en: "/en/" };
  const head = alternates
    ? [`<link rel="canonical" href="${SITE + alternates[lang]}">`, `<meta property="og:url" content="${SITE + alternates[lang]}">`,
       ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE + alternates[l]}">`),
       `<link rel="alternate" hreflang="x-default" href="${SITE + alternates.es}">`].join("\n")
    : `<meta name="robots" content="noindex">`;
  const langLink = (l) => `<a href="${sw[l]}" hreflang="${l}" lang="${l}" aria-label="${LANG_NAMES[l]}"${l === lang ? ' class="on" aria-current="true"' : ""}>${FLAGS[l]}${l.toUpperCase()}</a>`;
  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${head}
<meta property="og:type" content="website">
<meta property="og:site_name" content="M&amp;M Used Auto Sales">
<meta property="og:locale" content="${t.locale}">
<meta property="og:locale:alternate" content="${T[other].locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image || SITE + "/assets/logo.jpg")}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/icon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/icon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/site.css">
${jsonld.map((j) => `<script type="application/ld+json">${jsonForScript(j)}</script>`).join("\n")}
</head>
<body>
<div class="top"><span>📍 410 Fairdale Rd., Suite A, Fairdale, KY 40118</span><span>📞 ${PHONE}</span><span class="lang">${langLink("es")}${langLink("en")}</span></div>
<header>
<a href="${home}"><img class="logo" src="/assets/logo.jpg" alt="M&M Used Auto Sales LLC"></a>
<nav>${SECTIONS.map((id, i) => `<a href="${home}#${id}">${t.nav[i]}</a>`).join("")}</nav>
<a class="contact-btn" href="${TEL}">${t.contact}</a>
</header>
${body}
<footer><div class="footer-grid"><div><img class="footer-logo" src="/assets/logo.jpg" alt="M&M Used Auto Sales"><p class="small">QUALITY PRE-OWNED VEHICLES</p></div><div><h3>${t.contact}</h3><p class="small">📞 ${PHONE}<br>📍 410 Fairdale Rd., Suite A<br>Fairdale, KY 40118</p></div><div><h3>${t.infoTitle}</h3><p class="small">${SECTIONS.map((id, i) => `<a href="${home}#${id}">${t.nav[i][0] + t.nav[i].slice(1).toLowerCase()}</a>`).join("<br>")}</p></div></div><p class="small" style="text-align:center;margin-top:30px">© 2026 M&M Used Auto Sales LLC. ${t.rights}</p></footer>
</body></html>`;
  const v = await getAssetVersion(ctx);
  const out = VERSIONED.reduce((h, p) => h.replaceAll(`"${p}"`, `"${p}?v=${v}"`), html);
  return new Response(out, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
