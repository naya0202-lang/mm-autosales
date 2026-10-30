// One crawlable page per vehicle in inventory.json: /inventario/:slug (es) and /en/inventory/:slug (en)
import { SITE, DEALER, PHONE, TEL, T, esc, money, miles, photos, name, slug, carPath, homePath, absUrl, rootPath, jsonForScript, galleryDialog, loadInventory, page } from "./_lib.js";

export async function renderVehicle(ctx, lang) {
  const t = T[lang], cars = await loadInventory(ctx);
  const car = cars.find((c) => slug(c) === String(ctx.params.slug).toLowerCase());
  if (!car) return notFound(ctx, lang);

  const n = name(car), pics = photos(car), mi = miles(car);
  const alternates = { es: carPath("es", car), en: carPath("en", car) };
  const url = SITE + alternates[lang];
  const description = t.carDesc(n, mi, car.title, money(car.price), car.vin);

  const thumbs = pics.map((p, i) => `<button onclick="openGallery(P,T,${i})" aria-label="${t.viewPhotos} ${esc(n)} – ${i + 1}"><img src="${esc(rootPath(p))}" alt="${esc(n)} – ${i + 1}" loading="lazy"></button>`).join("");
  const specs = [car.year, car.make, car.model, mi, car.title, car.vin].map((v, i) => `<tr><th>${t.specs[i]}</th><td>${esc(v)}</td></tr>`).join("\n");
  const body = `<main class="vd">
<nav class="crumbs"><a href="${homePath(lang)}">${t.home}</a> › <a href="${homePath(lang)}#inventory">${t.inventory}</a> › <span>${esc(n)}</span></nav>
<div class="vd-grid">
<div class="vd-photos">
${pics.length ? `<button class="vd-main" onclick="openGallery(P,T,0)" aria-label="${t.viewPhotos} ${esc(n)}"><img src="${esc(rootPath(pics[0]))}" alt="${esc(n)}"></button>
<div class="vd-thumbs">${thumbs}</div>` : `<div class="vehicle-img" style="height:320px;border-radius:8px">${t.noPhoto}</div>`}
</div>
<aside class="vd-info">
<h1>${esc(n)}</h1>
<div class="price">${money(car.price)}</div>
<table class="specs">
${specs}
</table>
<div class="vd-cta">
<a class="btn" href="${TEL}">${t.call} ${PHONE}</a>
<a class="btn green" href="${homePath(lang)}#inventory">${t.allInventory}</a>
</div>
</aside>
</div>
</main>
${galleryDialog(t)}
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
      { "@type": "ListItem", position: 1, name: t.home, item: SITE + homePath(lang) },
      { "@type": "ListItem", position: 2, name: t.inventory, item: SITE + homePath(lang) + "#inventory" },
      { "@type": "ListItem", position: 3, name: n, item: url },
    ],
  };

  return page(ctx, {
    lang,
    title: `${n} – ${money(car.price)} | M&M Used Auto Sales`,
    description,
    alternates,
    image: pics.length ? absUrl(pics[0]) : undefined,
    jsonld: [carData, crumbs],
    body,
  });
}

// Sold or mistyped vehicles get a real 404 so Google drops them
function notFound(ctx, lang) {
  const t = T[lang];
  return page(ctx, {
    lang,
    status: 404,
    title: `${t.goneTitle} | M&M Used Auto Sales`,
    description: t.goneH,
    body: `<main class="notfound"><h1>${t.goneH}</h1><p>${t.goneText}</p><p><a class="btn" href="${homePath(lang)}#inventory">${t.goneBtn}</a></p></main>`,
  });
}
