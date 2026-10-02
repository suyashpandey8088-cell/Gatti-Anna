# Gatti Anna

A scroll-led, art-directed single-page site for **Gatti Anna**, a pure-vegetarian South Indian tiffin counter in **Viman Nagar, Pune**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle into dist/
npm test         # data-integrity tests
```

Stack: **React 19 + TypeScript + Vite**. No animation or UI libraries — the motion is hand-rolled CSS driven by a single shared `requestAnimationFrame` ticker and one `IntersectionObserver`. Production bundle is ~78 kB gzipped JS and ~8 kB gzipped CSS.

## Everything factual lives in one file

`src/data/cafe.ts` is the only source of truth. No component hard-codes a dish, a price or a claim, and the figures shown in prose (item counts, price ranges) are **computed** from the data rather than typed out, so they cannot drift.

| Fact | Source |
| --- | --- |
| Name, Viman Nagar / Pune, rating **4.7**, spend **₹200–400** | Supplied by the client. These override the aggregators. |
| 50 menu items, prices, dish descriptions, Jain tags, bestseller flags | Gatti Anna's public **magicpin** listing. Prices stored are the *listed* menu prices, not the platform's discounted prices. |
| Three diner quotes | Gatti Anna's public **Zomato** listing, verbatim. |
| "Pure vegetarian", "Jain preparations" | Derived from the menu itself — every item is tagged veg and two dosas carry a `[Jain Preparation]` note. |

### What is deliberately *not* on the page

Nothing is guessed. These are rendered as visible "to be confirmed" placeholders in the Visit section instead:

- **Street address** — aggregators disagree (one lists a Phoenix Marketcity unit and flags it shut down, another a Clover Park unit), so only the neighbourhood is published.
- **Opening hours, phone number, reservations, delivery/takeaway** — conflicting or unverified.
- **Aggregator ratings and "cost for two"** — these contradict the supplied 4.7 / ₹200–400, so the supplied figures are used alone.
- **Photography** — no images of the cafe were supplied, so no stock or generated photos are used anywhere. Every image slot is an honest, designed placeholder.

The page discloses the menu's source and that prices may change, in the menu intro and again in the footer.

## Filling in the blanks

**Add a confirmed detail** — move it from `TO_BE_CONFIRMED` into `CONFIRMED` in `src/sections/Visit.tsx` (and into `CAFE` in `cafe.ts` if it belongs to the business record). Street address and phone should also be added to `src/components/StructuredData.tsx`.

**Add real photography** — every placeholder is a `<PhotoSlot caption="…">` in `src/components/primitives.tsx`. Replace the component's internals with an `<img>` using the existing `caption` as the basis for real alt text; the surrounding crops, ratios and tones already work. Slots currently reserved: interior/counter, dosa on the tawa, filter coffee, guests, and one per featured dish.

**Change the menu** — edit `MENU` in `cafe.ts`. `npm test` will catch duplicates, bad prices, featured dishes that don't exist, and Jain tags without a supporting note.

## Design

- **Palette** — warm cream paper, espresso brown, chilli red, curry-leaf green, ghee gold. Every text/background pair used for copy was measured at **4.5:1 or better**; body text on paper runs 8.2:1 and headings 15.9:1.
- **Type** — Fraunces (variable, with its `SOFT` and `WONK` axes dialled up) for display, Inter for everything that has to be read, Caveat for a single hand-written margin note. System fallbacks are specified so the page is still legible if Google Fonts is blocked.
- **Motion** — the abstract motifs are thatte-plate rings, a dosa-coil spiral, steam lines, a davara-and-tumbler outline and organic paper blobs, all drawn as SVG. Parallax uses separate `translate`/`rotate` properties so a slow rotation and a scroll offset can coexist without fighting.
- **Colour fields** — each menu category is its own band of colour with a stacked-paper radius; the dosa section, the longest, gets the full espresso treatment.

## Accessibility

Verified in a headless browser, not just by eye:

- Single `<h1>`, no skipped heading levels, correct landmarks, labelled `<nav>`s.
- Skip link; logical tab order; a 3 px visible focus ring on every interactive element; all tap targets ≥ 24 px, buttons ≥ 48 px.
- `prefers-reduced-motion: reduce` disables every animation, reveal transform, parallax offset and smooth scroll — content renders immediately and fully.
- All decorative SVG is `aria-hidden`. The rating renders a text value plus an `aria-label`, not stars alone.
- No horizontal scroll at 360–1920 px; the opening screen fits within the viewport at every tested size, including short laptop displays.
- Scroll is never hijacked and the page has no forced horizontal scrolling.

## Verification

`npm test` (13 tests) asserts the supplied figures, that no street address / phone / opening time has leaked into the data, that all 50 items are unique with valid prices, spot-checked prices against the listing, that featured dishes exist, and that every quote is attributed. Build, typecheck and tests were run before handoff, and the rendered page was diffed against `cafe.ts` to confirm every item and price appears and that no fabricated hours, phone number, address, award, review count or service claim is present.

## Known limitations

- Menu data reflects a public listing at the time of writing and is not a live feed.
- One item, *Plain Thatte Idli*, has no published price and renders as "Not listed".
- The "Find Viman Nagar on a map" button runs a Google Maps search for the name and neighbourhood; it is not a pinned location, because no verified address exists.
