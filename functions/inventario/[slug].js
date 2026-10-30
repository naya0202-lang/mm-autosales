// GET /inventario/:slug — one crawlable page per vehicle in inventory.json
import { SITE, DEALER, PHONE, TEL, esc, money, photos, name, slug, absUrl, rootPath, jsonForScript, loadInventory, page } from "../_lib.js";

export async function onRequestGet(ctx) {
  const cars = await loadInventory(ctx);
  const car = cars.find((c) => slug(c) === String(ctx.params.slug).toLowerCase());
  if (!car) return notFound();

  const n = name(car), url = `${SITE}/inventario/${slug(car)}`, pics = photos(car);
  const miles = Number(car.miles).toLocaleString("en-US");
  const description = `${n} en venta en Fairdale, KY: ${miles} millas, ${car.title}, ${money(car.price)}. VIN ${car.vin}. Llame al ${PHONE}.`;

  const thumbs = pics.map((p, i) => `<button onclick="openGallery(P,T,${i})" aria-label="Ver foto ${i + 1}"><img src="${esc(rootPath(p))}" alt="${esc(n)} – foto ${i + 1}" loading="lazy"></button>`).join("");
  const body = `<main class="vd">
<nav class="crumbs"><a href="/">Inicio</a> › <a href="/#inventory">Inventario</a> › <span>${esc(n)}</span></nav>
<div class="vd-grid">
<div class="vd-photos">
${pics.length ? `<button class="vd-main" onclick="openGallery(P,T,0)" aria-label="Ver fotos de ${esc(n)}"><img src="${esc(rootPath(pics[0]))}" alt="${esc(n)}"></button>
<div class="vd-thumbs">${thumbs}</div>` : `<div class="vehicle-img" style="height:320px;border-radius:8px">FOTO DEL VEHÍCULO</div>`}
</div>
<aside class="vd-info">
<h1>${esc(n)}</h1>
<div class="price">${money(car.price)}</div>
<table class="specs">
<tr><th>Año</th><td>${esc(car.year)}</td></tr>
<tr><th>Marca</th><td>${esc(car.make)}</td></tr>
<tr><th>Modelo</th><td>${esc(car.model)}</td></tr>
<tr><th>Millas</th><td>${miles}</td></tr>
<tr><th>Título</th><td>${esc(car.title)}</td></tr>
<tr><th>VIN</th><td>${esc(car.vin)}</td></tr>
</table>
<div class="vd-cta">
<a class="btn" href="${TEL}">📞 LLAMAR ${PHONE}</a>
<a class="btn green" href="/#inventory">← VER TODO EL INVENTARIO</a>
</div>
</aside>
</div>
</main>
<dialog id="gallery" aria-label="Fotos del vehículo">
<button class="gal-close" onclick="gallery.close()" aria-label="Cerrar">✕</button>
<button class="gal-nav gal-prev" onclick="step(-1)" aria-label="Foto anterior">‹</button>
<img id="galImg" alt="">
<button class="gal-nav gal-next" onclick="step(1)" aria-label="Foto siguiente">›</button>
<div class="gal-bar"><b id="galTitle"></b><br><span id="galCount"></span></div>
</dialog>
<script src="/assets/gallery.js"></script>
<script>const P=${jsonForScript(pics.map(rootPath))},T=${jsonForScript(n)};</script>`;

  const carData = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: n,
    url,
    image: pics.map(absUrl),
    description,
    vehicleIdentificationNumber: car.vin,
    brand: { "@type": "Brand", name: car.make },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: Number(car.miles), unitCode: "SMI" },
    itemCondition: "https://schema.org/UsedCondition",
    offers: { "@type": "Offer", price: Number(car.price), priceCurrency: "USD", availability: "https://schema.org/InStock", url, seller: DEALER },
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Inventario", item: SITE + "/#inventory" },
      { "@type": "ListItem", position: 3, name: n, item: url },
    ],
  };

  return page({
    title: `${n} – ${money(car.price)} | M&M Used Auto Sales`,
    description,
    canonical: url,
    image: pics.length ? absUrl(pics[0]) : undefined,
    jsonld: [carData, crumbs],
    body,
  });
}

// Sold or mistyped vehicles get a real 404 so Google drops them
function notFound() {
  return page({
    status: 404,
    title: "Vehículo no disponible | M&M Used Auto Sales",
    description: "Este vehículo ya no está disponible.",
    body: `<main class="notfound"><h1>Este vehículo ya no está disponible</h1><p>Puede que ya se haya vendido. Vea los vehículos disponibles en nuestro inventario.</p><p><a class="btn" href="/#inventory">VER INVENTARIO</a></p></main>`,
  });
}
