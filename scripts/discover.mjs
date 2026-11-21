#!/usr/bin/env node
/**
 * keralam.eat — nearby kitchen discovery
 *
 * Finds real eating places around a location from OpenStreetMap and
 * prints them as data.js-shaped candidate stubs. Discovery, not onboarding:
 * every candidate must still be confirmed by the kitchen itself
 * (WhatsApp number, menu, delivery terms) before it joins data.js.
 *
 * Usage:
 *   node scripts/discover.mjs "Vyttila, Kochi"                 # Nominatim mode (default)
 *   node scripts/discover.mjs --overpass 9.9678 76.3194 1500   # Overpass mode (bulk)
 *
 * Data © OpenStreetMap contributors (ODbL). If you import entries from
 * this into data.js, keep the credit in your README.
 */

const UA = "keralam-eat-discovery/0.1 (https://keralam.eat; contact: hello@neerajajithkumar.com)";

function stub(name, lat, lng, extra = {}) {
  return JSON.stringify({
    name,
    lat: +(+lat).toFixed(4),
    lng: +(+lng).toFixed(4),
    source: "osm",
    note: "candidate — kitchen must confirm WhatsApp + menu + delivery before joining data.js",
    ...extra
  });
}

/* ---------- Nominatim mode ---------- */

async function nominatim(place) {
  const geo = await fetch(
    "https://nominatim.openstreetmap.org/search?q=" +
      encodeURIComponent(place) + "&format=json&limit=1",
    { headers: { "User-Agent": UA } }
  );
  const geoJson = await geo.json();
  if (!geoJson.length) {
    console.error("Could not geocode: " + place);
    process.exit(1);
  }
  const { lat, lon, display_name } = geoJson[0];
  console.error("center: " + display_name + " (" + lat + ", " + lon + ")\n");

  const res = await fetch(
    "https://nominatim.openstreetmap.org/search?q=" +
      encodeURIComponent("restaurants near " + place) +
      "&format=json&limit=50&extratags=1",
    { headers: { "User-Agent": UA } }
  );
  const rows = await res.json();
  for (const r of rows) {
    const ex = r.extratags || {};
    console.log(stub(r.name || r.display_name.split(",")[0], r.lat, r.lon, {
      cuisine: ex.cuisine || "",
      phone: ex.phone || ex["contact:phone"] || ""
    }));
  }
  console.error("\n" + rows.length + " named places found via Nominatim keyword search.");
}

/* ---------- Overpass mode (bulk, with mirror fallback) ---------- */

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass.osm.jp/api/interpreter"
];

async function overpass(lat, lng, radius) {
  const q =
    `[out:json][timeout:60];` +
    `(node["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${lat},${lng},${radius});` +
    `way["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${lat},${lng},${radius}););` +
    `out center tags;`;

  for (const ep of OVERPASS_ENDPOINTS) {
    let res;
    try {
      res = await fetch(ep, {
        method: "POST",
        body: new URLSearchParams({ data: q }),
        headers: { "User-Agent": UA, Accept: "application/json" },
        signal: AbortSignal.timeout(45000)
      });
      if (!res.ok) continue;
      const data = await res.json();
      const seen = new Set();
      let n = 0;
      for (const el of data.elements) {
        const t = el.tags || {};
        if (!t.name || seen.has(t.name)) continue;
        seen.add(t.name);
        const la = el.lat ?? el.center?.lat;
        const lo = el.lon ?? el.center?.lon;
        console.log(stub(t.name, la, lo, {
          cuisine: t.cuisine || "",
          phone: t.phone || t["contact:phone"] || "",
          hours: t.opening_hours || ""
        }));
        n++;
      }
      console.error(`\n${n} named places within ${radius} m of ${lat},${lng} — via ${ep}`);
      return;
    } catch (e) {
      console.error("(endpoint unreachable: " + ep.replace("https://", "").split("/")[0] + ")");
    }
  }
  console.error(
    "\nAll Overpass endpoints are unreachable right now (they have outages). " +
    "Try again later — or use Nominatim mode, which works independently:\n" +
    '  node scripts/discover.mjs "Vyttila, Kochi"'
  );
  process.exit(1);
}

/* ---------- run ---------- */

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('usage: node scripts/discover.mjs "<place>"   |   --overpass <lat> <lng> [radius]');
  process.exit(1);
}

if (args[0] === "--overpass") {
  const [lat, lng, radius = "1500"] = args.slice(1);
  if (!lat || !lng) { console.error("--overpass needs <lat> <lng> [radius]"); process.exit(1); }
  await overpass(lat, lng, radius);
} else {
  await nominatim(args.join(" "));
}
