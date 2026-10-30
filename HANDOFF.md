# HANDOFF — M&M Used Auto Sales website (mmusedautosales.com)

> Context file for continuing this project in Claude Code. Put it in the repo root (you can also rename/copy it to `CLAUDE.md` so it loads automatically).
> Last updated: 2026-10-30.

---

## 1. Who / what

- **Developer:** Yoba (software developer/architect), helping a friend who runs the dealership.
- **Client:** M&M Used Auto Sales LLC — independent used-car dealer.
  - Address: 410 Fairdale Rd., Suite A, Fairdale, KY 40118
  - Phone: (502) 377-9017
  - Bilingual business (Spanish primary on the site, English too). Sells pre-owned vehicles incl. **rebuilt titles**; mentions financing for qualified buyers.
- **Original request from the owner (Spanish, paraphrased):** finish connecting the site to Google, get it onto **TikTok** and **Facebook**, and let the office **manage the vehicle inventory themselves**.

## 2. Security rules (keep following these)

- The owner shared her Cloudflare login over chat. **Do not use, store, or commit the owner's password anywhere.** Access should be via Yoba's own login (Cloudflare *Manage Account → Members* invite) and his own GitHub.
- Never commit secrets/API tokens. Use Cloudflare Pages secrets / `.dev.vars` (gitignored) for local dev.
- Owner should own the business accounts (Google Business Profile, Meta Business, TikTok Business) and add Yoba as manager — not the other way round.

## 3. Current state (verified 2026-10-30)

### Live site
- https://mmusedautosales.com — live, single-page static site, Spanish UI.
- Sections are anchors on one page: `#home`, `#inventory`, `#finder`, `#apply`, `#about`.
- Has: hero ("Vehículos confiables a precios justos"), make/model/year finder UI, "Buscar por marca", financing CTA, test-drive CTA, inventory section, about, contact footer.
- **Inventory section is empty** — no vehicles listed, no per-vehicle pages.
- Logo at `/assets/logo.jpg`.
- Has `<title>` and `meta description`. **No** Google verification, analytics, Open Graph tags, Meta Pixel or TikTok Pixel observed. No `sitemap.xml`/`robots.txt` confirmed.

### Cloudflare
- Domain `mmusedautosales.com` is on Cloudflare (account labelled with the owner's iCloud email).
- **Pages project name: `mm`**
  - Production domains: `mmusedautosales.com`, `mm-20c.pages.dev`
  - Branch label: `main`; deployed ~4–5 hours before 2026-10-30 13:50 ET (2 deployments).
  - **Git repository: NOT connected** → it was a **Direct Upload** project.
  - **Bindings: none** (no D1/R2/KV yet). No env vars. Compatibility date 2026-10-30.
- Yoba now has dashboard access.

### Source code
- Yoba has the uploaded site as a zip: `C:\Users\ycabr\OneDrive\Documents\mm_used_auto_sales_site.zip`
- Yoba created a GitHub account. Repo planned: **`mm-autosales` (private)**.

## 4. Immediate next steps (in order)

- [ ] Unzip, confirm `index.html` + `assets/` are at the top level, commit to `mm-autosales` repo (`main`).
- [ ] Connect repo to Cloudflare Pages:
  - Try **mm → Settings → Git repository → Connect** (install "Cloudflare Workers and Pages" GitHub app, select only this repo). Framework: None, build command: empty, output dir: `/`.
  - Direct-upload projects may not allow switching to Git. If so: create a **new Pages project from the Git repo**, verify on its `*.pages.dev` URL, then move the custom domain `mmusedautosales.com` from `mm` to the new project.
  - Alternative without Git integration: deploy with `npx wrangler pages deploy <dir> --project-name mm`.
  - ⚠️ Never connect/deploy an empty repo to the production project — it would replace the live site.
- [ ] Google Search Console: add **Domain** property `mmusedautosales.com`, verify via DNS TXT record in Cloudflare (`@`, value `google-site-verification=...`).
- [ ] Add `robots.txt` and `sitemap.xml`; submit sitemap in Search Console.

## 5. Full plan

### Phase 1 — Google
1. **Google Business Profile** (highest impact for a local dealer): business.google.com, category "Used car dealer", address/phone/hours/website/photos. Owner completes verification (video/postcard/phone) and adds Yoba as manager.
2. **Search Console** (above).
3. Optional: Google Analytics 4.
4. SEO fix: every vehicle needs its own crawlable URL with its own title/description/images (see Phase 2). Add `AutoDealer` / `Car` structured data (JSON-LD).

### Phase 2 — Inventory system (main dev work) — all on Cloudflare

| Piece | Service |
|---|---|
| Vehicle data | **D1** |
| Photos | **R2** |
| API + server-rendered vehicle pages + feeds | **Pages Functions** (`/functions`) |
| Office admin panel | static `/admin` page + `/api/admin/*`, protected by **Cloudflare Access** (Zero Trust, email allow-list for office staff) |

**Proposed D1 schema (starting point):**
```sql
CREATE TABLE vehicles (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT UNIQUE NOT NULL,          -- e.g. 2018-honda-civic-ex-12
  vin           TEXT,
  year          INTEGER NOT NULL,
  make          TEXT NOT NULL,
  model         TEXT NOT NULL,
  trim          TEXT,
  body_style    TEXT,
  mileage       INTEGER,
  price         INTEGER,                       -- whole dollars
  title_type    TEXT,                          -- clean | rebuilt | salvage
  exterior_color TEXT,
  interior_color TEXT,
  transmission  TEXT,
  drivetrain    TEXT,
  fuel_type     TEXT,
  engine        TEXT,
  description_es TEXT,
  description_en TEXT,
  status        TEXT NOT NULL DEFAULT 'available', -- available | pending | sold | hidden
  featured      INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE vehicle_photos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  vehicle_id  INTEGER NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  r2_key      TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
```

**Proposed routes:**
- Public
  - `GET /api/vehicles` — list (filters: make, model, year, price range, status=available)
  - `GET /api/vehicles/:slug`
  - `GET /inventario/:slug` — **server-rendered** vehicle page (title, meta, Open Graph, JSON-LD) for SEO/social previews
  - `GET /media/*` — photos from R2
  - `GET /sitemap.xml` — generated from D1
  - `GET /feeds/meta.csv` (or .xml) and `/feeds/tiktok.csv` — vehicle catalog feeds
- Admin (behind Cloudflare Access; also validate the `Cf-Access-Jwt-Assertion` header in Functions)
  - `/admin` — UI: list, add, edit, mark sold/hidden, upload/reorder photos, bilingual descriptions
  - `POST/PUT/DELETE /api/admin/vehicles[/:id]`
  - `POST /api/admin/vehicles/:id/photos` (upload to R2), `DELETE .../photos/:photoId`
- Update the existing homepage: inventory grid, brand filter and finder load from `/api/vehicles` instead of being static.

**Setup commands (wrangler):**
```bash
npx wrangler d1 create mm-inventory
npx wrangler r2 bucket create mm-vehicle-photos
# then bind in wrangler.toml (pages_build_output_dir, [[d1_databases]], [[r2_buckets]])
npx wrangler d1 execute mm-inventory --file=./schema.sql --remote
```

Admin UX notes: office staff are non-technical; Spanish-first UI, big buttons, phone-friendly (photos often taken on a phone at the lot), compress/resize images on upload.

### Phase 3 — Facebook & TikTok
1. Facebook Page + **Meta Business Suite** (owner-owned, Yoba added). Link site.
2. **Meta Commerce Manager → Vehicles catalog** pointing at `/feeds/meta.*` (scheduled fetch) → enables automotive inventory ads. Verify the current required feed fields in Meta's docs before building the feed (typically: vehicle id, title, description, URL, make, model, year, mileage + unit, price, image URL(s), address, state/condition, VIN, body style, etc.).
3. Marketplace dealer listings are restricted / partner-based — check current options before promising this to the owner.
4. **TikTok Business** account, website in bio; TikTok Ads Manager vehicle catalog from `/feeds/tiktok.*` when they want ads. Verify current spec.
5. Optional: Meta Pixel + TikTok Pixel on the site (consider a simple cookie notice).
6. Open Graph tags on every page so shared links preview properly.

## 6. Open questions for the owner
- Who built the original site / any design source files?
- Which office emails get admin access?
- Business hours, financing details/partners, what the "Solicite en línea" (apply) form should do and where submissions go (email? stored in D1?).
- Should prices be shown publicly? Show title type (rebuilt) on each listing?
- Does she already have a Google Business Profile / Facebook Page / TikTok?
- Who should own the GitHub repo long-term (consider a GitHub Organization for the business)?

## 7. Suggested first prompt for Claude Code
> Read HANDOFF.md. Inspect the current static site in this repo, then set up the Cloudflare Pages project structure with `wrangler.toml`, the D1 schema, and a Pages Functions skeleton for the public `/api/vehicles` routes. Don't change the site's look. Add `robots.txt` and a generated `sitemap.xml`. Stop and show me the plan before creating Cloudflare resources.
