M&M Used Auto Sales website
Files:
- index.html = website
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
