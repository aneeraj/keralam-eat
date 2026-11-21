# keralam.eat — order direct

An open-source food ordering platform for the kitchens of Keralam,
built on one deliberate refusal: **the platform does not take a cut
and does not run the delivery.**

Zomato and Swiggy are storefronts attached to a toll booth. This is
just the storefront. Every kitchen keeps its own menu, takes its own
orders, delivers with its own people, and keeps every rupee.

## What it is

- A shared directory of kitchens, each at `keralam.eat/<their-name>`
- Each kitchen's menu with honest delivery terms — its own fee, its own radius, its own ETA
- An order flow that ends as a **WhatsApp message from the customer
  straight to the kitchen** — no backend, no order queue, no database,
  nothing stored anywhere
- Zero commission, forever, by design: there is no payment rail here to
  skim with

## What it deliberately is not

- Not a dispatch system. No rider network, no route algorithms.
  Self-delivery is the feature, not the gap.
- Not a payments company. Money moves between customer and kitchen,
  in person or over UPI, exactly as it already does.
- Not a data company. No accounts, no tracking, no order history
  except in the customer's own browser.

## Run it

It is static files. No build, no server, no dependencies.

```sh
open index.html        # or serve the folder with any static host
```

To put it live on the domain: drag this folder into Netlify Drop or
Cloudflare Pages, attach `keralam.eat`, done. (`.eat` is on the HSTS
preload list — HTTPS is mandatory, and both hosts provide it free.)

## Hyper-local, on purpose

The directory is organised around *where you are*, not around categories:

- **"Kitchens near me"** asks the browser for your location once. It is
  never sent anywhere — the whole calculation happens on your device,
  against the coordinates in `data.js`.
- Kitchens are then split honestly: **"Delivers to you"** (inside their
  own, self-declared radius, sorted by distance) and **"Outside their
  own delivery radius"** — still browsable, but not pretending.
- **Manual fallback**: pick your area from the list (anchored to that
  city's kitchens). Your choice is remembered on your device only.
- Each kitchen's page tells you your distance and whether you're
  inside *their* radius — because with self-delivery, the radius is the
  kitchen's own promise, not a platform's algorithm.

Note: browser geolocation only works over **https** (or localhost).
Since `.eat` is HSTS-preloaded anyway, a real deployment gets it for free.

## How a kitchen joins

Everything lives in `data.js`. A kitchen adds its own entry —
name, area, WhatsApp number, delivery fee and radius, and the menu —
and opens a pull request. That's the whole onboarding.

For kitchens that don't use git: the plan is a submission form that
generates the entry for them. It doesn't exist yet, and that's the
next thing to build.

## Kitchen schema

```js
{
  slug: "ammas-kitchen",       // shows as keralam.eat/ammas-kitchen
  name: "Amma's Kitchen",
  area: "Beach Road", city: "Kozhikode",
  lat: 11.2588, lng: 75.7804, // approximate location, for "near me"
  cuisine: "Malabar home food",
  tagline: "One sentence in the kitchen's own voice.",
  hours: "11:00 – 22:30",
  open: true,                  // v1: manual; roadmap: kitchen-managed toggle
  whatsapp: "919800000001",   // country code + number, digits only
  delivery: { fee: 30, radiusKm: 4, eta: "30–40 min" },
  menu: [
    { category: "Meals & rice",
      items: [
        { name: "Fish moilee", desc: "…", price: 180, veg: false }
      ]}
  ]
}
```

The five kitchens currently in `data.js` are demo placeholders.
They are meant to be replaced by real ones, not launched.

## Roadmap, in the order that matters

1. **Submission form** for kitchens that don't use git — generates
   the `data.js` entry for them, so onboarding is a form, not a PR
2. **Open/closed toggle** each kitchen controls (a phone bookmark
   that flips their own flag — no accounts)
3. **UPI payment link** added to the order message, so payment is
   also direct
4. **Live menu updates** the same way
5. Later, if it earns it: **ONDC integration**, so kitchens that
   *want* outside delivery can join the open network — opt-in,
   never forced

## License

MIT for the code. Menu data belongs to the kitchens that wrote it.

## The honest limits

This solves discovery and ordering, not demand. A free storefront
gets kitchens their margin back, but people still have to be told the
site exists — that is field work: one city, one junction, one thattu
kada at a time. Start with a handful of kitchens in one neighbourhood
that already deliver for themselves, and grow at the speed of trust.
