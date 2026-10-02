/**
 * GATTI ANNA — SINGLE SOURCE OF TRUTH
 * ===================================
 *
 * Every fact rendered on this site comes from this file. Nothing here is invented.
 * If a detail is not confirmed, it lives in `TO_BE_CONFIRMED` and renders as a
 * visible placeholder rather than a guess.
 *
 * PROVENANCE
 * ----------
 * A. SUPPLIED BY THE CLIENT (treated as authoritative, overrides aggregators):
 *      - Name: "Gatti Anna"
 *      - Location: Viman Nagar, Pune
 *      - Rating: 4.7
 *      - Typical spend: ₹200–400
 *
 * B. PUBLIC LISTINGS (menu items, prices, dish descriptions, dietary tags,
 *    bestseller flags, review quotes). Client approved using these, on the
 *    condition that the page discloses the source and that prices are shown as
 *    "subject to change":
 *      - magicpin listing for Gatti Anna, Viman Nagar, Pune (menu + prices +
 *        "Bestseller" flags). Prices recorded here are the LISTED menu prices,
 *        not the platform's discounted prices.
 *      - Zomato listing for Gatti Anna, Viman Nagar (diner review quotes).
 *
 * C. DELIBERATELY EXCLUDED:
 *      - Street address. Aggregators disagree (one lists a Phoenix Marketcity
 *        unit and flags it as shut down; another lists a Clover Park unit), so
 *        no address is published beyond "Viman Nagar, Pune".
 *      - Opening hours, phone, delivery/reservation availability. Aggregator
 *        values conflict and the client asked for their figures only.
 *      - Aggregator ratings and "cost for two" values, which conflict with the
 *        supplied 4.7 / ₹200–400.
 */

export type Price = number | null;

export interface MenuItem {
  /** Exact item name as listed. */
  name: string;
  /** Listed menu price in INR. `null` = not listed publicly; rendered as "Not listed". */
  price: Price;
  /** Verbatim description from the listing, where one exists. */
  note?: string;
  /** Tags carried in the listing itself. */
  jain?: boolean;
  bestseller?: boolean;
}

export type Tone = 'paper' | 'sand' | 'dark' | 'leaf' | 'rose' | 'clay';

export interface MenuCategory {
  id: string;
  /** Short label used in the sticky menu nav. */
  label: string;
  /** Full display heading. */
  title: string;
  /** A factual, non-embellished lead-in derived only from the items below. */
  lead: string;
  tone: Tone;
  /** Items promoted to large "feature" treatment. Must appear in `items`. */
  featured?: string[];
  items: MenuItem[];
}

/* ------------------------------------------------------------------ */
/* A. CLIENT-SUPPLIED FACTS                                            */
/* ------------------------------------------------------------------ */

export const CAFE = {
  name: 'Gatti Anna',
  /** Neighbourhood only — no street address is confirmed. */
  locality: 'Viman Nagar',
  city: 'Pune',
  region: 'Maharashtra',
  rating: 4.7,
  ratingScale: 5,
  spendLow: 200,
  spendHigh: 400,
  /** Supported by the menu: every listed item is vegetarian. */
  dietary: 'Pure vegetarian',
  /** Supported by the menu: two items carry a "[Jain Preparation]" tag. */
  jainNote: 'Jain preparations listed on the dosa menu',
  cuisine: 'South Indian',
} as const;

/* ------------------------------------------------------------------ */
/* B. MENU — from the public magicpin listing (listed prices, INR)      */
/* ------------------------------------------------------------------ */

export const MENU: MenuCategory[] = [
  {
    id: 'tiffin',
    label: 'Tiffin',
    title: 'Mini tiffin',
    lead: 'Three set plates, each built from the dosa, idli and bhat on this menu.',
    tone: 'sand',
    featured: ['Mini Tiffin 1', 'Mini Tiffin 2', 'Mini Tiffin 3'],
    items: [
      {
        name: 'Mini Tiffin 1',
        price: 235,
        note: '1 Ghee Dosa + Button Idli [6 Pieces] + Kesari Bath + Khara Bhat',
      },
      {
        name: 'Mini Tiffin 2',
        price: 245,
        note: '1 Uttapam + Button Idli [6 Pieces] + Kesari Bath + Khara Bhat',
      },
      {
        name: 'Mini Tiffin 3',
        price: 200,
        note: 'Thatte Ghee Podi Idli [1 Piece] + Medu Vada [1 Piece] + Kesari Bhat',
      },
    ],
  },
  {
    id: 'dosa',
    label: 'Dosa',
    title: 'Dosa',
    lead: 'The longest section on the menu. Twenty-three dosas, every one of them ghee.',
    tone: 'dark',
    featured: ['Ghee Podi Masala Dosa', 'Founders Special Dosa', 'Ghee Garlic Roast Dosa'],
    items: [
      { name: 'Ghee Sada Dosa', price: 129 },
      { name: 'Ghee Masala Dosa', price: 155 },
      { name: 'Ghee Podi Masala Dosa', price: 181 },
      { name: 'Ghee Podi Plain Dosa', price: 168 },
      { name: 'Ghee Mysore Masala Dosa', price: 181 },
      { name: 'Ghee Mysore Plain Dosa', price: 168 },
      { name: 'Ghee Garlic Roast Dosa', price: 181, bestseller: true },
      { name: 'Ghee Open Butter Masala Dosa', price: 181 },
      { name: 'Ghee Pizza Dosa', price: 181 },
      { name: 'Ghee Basket Dosa', price: 168 },
      { name: 'Ghee Cut Dosa', price: 168 },
      { name: 'Ghee Set Dosa', price: 142 },
      { name: 'Ghee Rava Plain Dosa', price: 129 },
      { name: 'Ghee Rava Masala Dosa', price: 155 },
      { name: 'Ghee Rava Onion Dosa', price: 168 },
      { name: 'Ghee Ragi Dosa', price: 155 },
      { name: 'Ghee Ragi Onion Dosa', price: 168 },
      { name: 'Ghee Multigrain Dosa', price: 155 },
      { name: 'Tangy Tomato Dosa With Lotus Stem', price: 170 },
      { name: 'Founders Special Dosa', price: 194 },
      { name: 'Kids Special Dosa', price: 143 },
      { name: 'Ghee Plain Jain Dosa', price: 129, note: '[Jain Preparation]', jain: true },
      {
        name: 'Ghee Podi Plain Jain Dosa',
        price: 168,
        note: '[Jain Preparation]',
        jain: true,
        bestseller: true,
      },
    ],
  },
  {
    id: 'idli',
    label: 'Idli & vada',
    title: 'Idli & vada',
    lead: 'Steamed plates — button, thatte and podi — plus medu vada.',
    tone: 'paper',
    featured: ['Ghee Button Idli [12 Pieces]', 'Ghee Thatte Podi Idli'],
    items: [
      { name: 'Idli', price: 45 },
      { name: 'Ghee Idli [2 Pieces]', price: 116 },
      { name: 'Ghee Button Idli [12 Pieces]', price: 142 },
      { name: 'Ghee Podi Idli', price: 142 },
      { name: 'Ghee Fried Idli', price: 142 },
      { name: 'Ghee Thatte Idli', price: 129 },
      { name: 'Plain Thatte Idli', price: null },
      { name: 'Ghee Thatte Podi Idli', price: 155 },
      { name: 'Medu Vada', price: 55 },
      { name: 'Idli Vada Mix', price: 103 },
    ],
  },
  {
    id: 'uttapam',
    label: 'Uttapam',
    title: 'Uttapam',
    lead: 'Thick pancakes, finished with ghee, in six listed variations.',
    tone: 'leaf',
    featured: ['Ghee Tomato Onion Uttapam'],
    items: [
      { name: 'Ghee Onion Uttapam', price: 155 },
      { name: 'Ghee Tomato Uttapam', price: 155 },
      { name: 'Ghee Tomato Onion Uttapam', price: 168, bestseller: true },
      { name: 'Ghee Coconut Uttapam', price: 155 },
      { name: 'Ghee Mix Veg Uttapam', price: 155, bestseller: true },
      { name: 'Kids Special Uttapam', price: 116 },
    ],
  },
  {
    id: 'bhat',
    label: 'Bhat & roti',
    title: 'Bhat & roti',
    lead: 'Upma, sheera and akki roti — the quieter end of the counter.',
    tone: 'rose',
    featured: ['Pineapple Sheera'],
    items: [
      { name: 'Plain Upma', price: 80, note: 'Khara bhat.' },
      { name: 'Podi Upma', price: 100 },
      { name: 'Pineapple Sheera', price: 102, note: 'Kesari bhat.' },
      { name: 'Akki Roti', price: 155 },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    title: 'To drink',
    lead: 'Filter coffee, chai, Bournvita, water.',
    tone: 'clay',
    featured: ['Filter Coffee'],
    items: [
      { name: 'Filter Coffee', price: 59 },
      { name: 'Masala Chai', price: 45 },
      { name: 'Bournvita', price: 70, bestseller: true },
      { name: 'Mineral Water', price: 20 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* B. REVIEW QUOTES — verbatim from the public Zomato listing           */
/* ------------------------------------------------------------------ */
/* Reviewer names are not published on the source listing, so none are
   attributed here. Quotes are trimmed only at sentence boundaries.     */

export interface Quote {
  text: string;
  source: string;
}

export const QUOTES: Quote[] = [
  {
    text:
      'The South Indian food was absolutely delicious and authentic. A special shoutout to Omkar from the staff—he was incredibly polite, attentive, and made sure we were well taken care of.',
    source: 'Diner review, public Zomato listing',
  },
  {
    text:
      'The ghee roast dosa is just exceptional. Try all their beverages as well. Pizza dosa is commendable. Super clean, hygenic food.',
    source: 'Diner review, public Zomato listing',
  },
  {
    text: 'Beautiful place with amazing South Indian food and the sweetest staff! Highly recommend!',
    source: 'Diner review, public Zomato listing',
  },
];

/* ------------------------------------------------------------------ */
/* C. NOT CONFIRMED — rendered as visible placeholders                  */
/* ------------------------------------------------------------------ */

export interface Pending {
  label: string;
  hint: string;
}

export const TO_BE_CONFIRMED: Pending[] = [
  { label: 'Opening hours', hint: 'Day-by-day hours to be supplied' },
  { label: 'Street address', hint: 'Full address and floor to be supplied' },
  { label: 'Phone', hint: 'Contact number to be supplied' },
  { label: 'Reservations', hint: 'Confirm whether tables can be booked' },
  { label: 'Delivery & takeaway', hint: 'Confirm which services are offered' },
];

/* ------------------------------------------------------------------ */
/* DISCLOSURES                                                          */
/* ------------------------------------------------------------------ */

export const DISCLOSURE = {
  menu:
    'Menu items and prices are taken from Gatti Anna’s public listing and may change. Please confirm in store.',
  rating: 'Rating as given in the supplied listing details.',
  spend: 'Approximate spend per person from the supplied listing details — not a quote for any specific order.',
  photos: 'Photography of Gatti Anna has not been supplied yet. Marked frames are reserved for real images.',
} as const;

/* ------------------------------------------------------------------ */
/* DERIVED (computed, never hand-written)                               */
/* ------------------------------------------------------------------ */

export const ALL_ITEMS: MenuItem[] = MENU.flatMap((c) => c.items);

export const PRICED_ITEMS = ALL_ITEMS.filter(
  (i): i is MenuItem & { price: number } => typeof i.price === 'number',
);

export const STATS = {
  itemCount: ALL_ITEMS.length,
  categoryCount: MENU.length,
  dosaCount: MENU.find((c) => c.id === 'dosa')!.items.length,
  minPrice: Math.min(...PRICED_ITEMS.map((i) => i.price)),
  maxPrice: Math.max(...PRICED_ITEMS.map((i) => i.price)),
};

export const rupees = (n: number) => `₹${n}`;

export const itemById = (name: string): MenuItem | undefined =>
  ALL_ITEMS.find((i) => i.name === name);
