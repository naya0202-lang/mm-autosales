M&M Used Auto Sales website
Files:
- functions/ = the website pages (homepage and vehicle pages, Spanish and English)
- inventory.json = inventory data
- assets/logo.jpg = official logo
- assets/vehicles/<VIN>/ = photos for each vehicle (one folder per vehicle)

To add a vehicle, duplicate an object in inventory.json and update:
year, make, model, price, miles, vin, title, images.

Photos:
1. Create a folder named after the vehicle's VIN inside assets/vehicles/,
   e.g. assets/vehicles/2HGFE2F20NH509266/
2. Put the photos in that folder (jpg, resized to about 1600px wide to keep the site fast).
3. List them in "images", in the order they should appear. The first one is the card thumbnail.

Example:
  "images": [
    "assets/vehicles/2HGFE2F20NH509266/front.jpg",
    "assets/vehicles/2HGFE2F20NH509266/side.jpg",
    "assets/vehicles/2HGFE2F20NH509266/interior.jpg"
  ]

Leave "images": [] if there are no photos yet. Clicking the card photo opens a viewer
to browse all photos (arrows, keyboard left/right, or swipe on a phone).

The site automatically builds the inventory cards and search filters from inventory.json.

Website pages and languages:
The site is in Spanish (/) and English (/en/), with an ES | EN switch at the top.
Pages are built by Cloudflare Pages Functions in functions/ from inventory.json:
  /                          Spanish homepage      /en/                      English homepage
  /inventario/<car>          Spanish vehicle page  /en/inventory/<car>       English vehicle page
  /sitemap.xml               every page in both languages, for Google
All visible text for both languages is in functions/_lib.js (the T object).
Each vehicle in inventory.json automatically gets its pages in both languages - nothing extra to do.
Shared styles: assets/site.css. Photo viewer: assets/gallery.js. Homepage filters: assets/home.js.
