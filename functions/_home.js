// Homepage (/ and /en/). Vehicle cards are rendered here so they are in the HTML for Google;
// assets/home.js only filters them and opens the photo viewer.
import { DEALER, PHONE, TEL, T, esc, money, miles, photos, name, carPath, rootPath, galleryDialog, loadInventory, page } from "./_lib.js";

const BRANDS = ["Honda", "Toyota", "Chevrolet", "Ford", "Nissan", "GMC", "Hyundai", "Kia", "Jeep", "BMW", "Mercedes-Benz", "Lexus", "Mazda"];

export async function renderHome(ctx, lang) {
  const t = T[lang], cars = await loadInventory(ctx);
  const uniq = (xs) => [...new Set(xs)];
  const options = (xs) => xs.map((v) => `<option>${esc(v)}</option>`).join("");

  const card = (c) => {
    const p = photos(c).map(rootPath), n = name(c), url = carPath(lang, c);
    const thumb = p.length
      ? `<button class="vehicle-img" data-name="${esc(n)}" data-photos="${esc(JSON.stringify(p))}" onclick="openCarEl(this)" aria-label="${t.viewPhotos} ${esc(n)}"><img src="${esc(p[0])}" alt="${esc(n)}" loading="lazy">${p.length > 1 ? `<span class="photo-count">📷 ${p.length} ${t.photos}</span>` : ""}</button>`
      : `<div class="vehicle-img">${t.noPhoto}</div>`;
    return `<article class="vehicle" data-make="${esc(c.make)}" data-model="${esc(c.model)}" data-year="${esc(c.year)}">${thumb}<div class="vehicle-body"><h3><a href="${url}">${esc(c.year)} ${esc(String(c.make).toUpperCase())} ${esc(String(c.model).toUpperCase())}</a></h3><div class="price">${money(c.price)}</div><div class="meta">◉ ${miles(c)} ${t.miles}<br>▣ ${esc(c.title)}<br>VIN: ${esc(c.vin)}</div><div class="vehicle-actions"><a class="btn green" href="${url}">${t.details}</a><a class="btn" href="${TEL}">${t.interested}</a></div></div></article>`;
  };

  const body = `<main id="home">
<section class="hero">
<div class="hero-copy"><h1>${t.heroTitle}</h1><p>${t.heroText}</p>
<div class="trust"><div>✓<br>${t.trust[0]}</div><div>🤝<br>${t.trust[1]}</div><div>◎<br>${t.trust[2]}</div></div></div>
</section>

<div class="finder" id="finder"><h2>${t.finderTitle}</h2><div class="fields">
<select id="make" aria-label="${t.anyMake}"><option value="">${t.anyMake}</option>${options(uniq(cars.map((c) => c.make)))}</select>
<select id="model" aria-label="${t.anyModel}"><option value="">${t.anyModel}</option>${options(uniq(cars.map((c) => c.model)))}</select>
<select id="year" aria-label="${t.anyYear}"><option value="">${t.anyYear}</option>${options(uniq(cars.map((c) => c.year)).sort((a, b) => b - a))}</select>
<button class="btn" onclick="filterCars()">${t.findBtn}</button></div></div>

<section class="brands"><h2 class="title">${t.brandsTitle}</h2><p class="sub" style="color:#cfcfcf">${t.brandsSub}</p>
<div class="brand-grid">${BRANDS.map((b) => `<button onclick="pickBrand('${b}')">${b.toUpperCase()}</button>`).join("")}</div></section>

<section><div class="actions">
<div class="action"><h3>${t.actions[0][0]}</h3><p>${t.actions[0][1]}</p><a class="btn" href="#inventory">${t.actions[0][2]}</a></div>
<div class="action" id="apply"><h3>${t.actions[1][0]}</h3><p>${t.actions[1][1]}</p><a class="btn" href="${TEL}">${t.actions[1][2]}</a></div>
<div class="action"><h3>${t.actions[2][0]}</h3><p>${t.actions[2][1]}</p><a class="btn" href="${TEL}">${t.actions[2][2]}</a></div>
</div></section>

<section class="inventory" id="inventory"><h2 class="title">${t.invTitle}</h2><p class="sub">${t.invSub}</p>
<div class="vehicle-grid">${cars.map(card).join("")}</div>
<p id="noResults" class="sub"${cars.length ? " hidden" : ""}>${t.noResults}</p></section>

<section class="about" id="about"><h2 class="title">${t.aboutTitle}</h2><div class="about-inner">${t.aboutText}</div></section>
</main>
${galleryDialog(t)}
<script src="/assets/home.js"></script>`;

  return page({
    lang,
    title: t.homeTitle,
    description: t.homeDesc,
    alternates: { es: "/", en: "/en/" },
    jsonld: [{ "@context": "https://schema.org", ...DEALER }],
    body,
  });
}
