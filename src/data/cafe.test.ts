import { describe, expect, it } from 'vitest';
import {
  ALL_ITEMS,
  CAFE,
  DISCLOSURE,
  MENU,
  PRICED_ITEMS,
  QUOTES,
  STATS,
  TO_BE_CONFIRMED,
  itemById,
  rupees,
} from './cafe';

/**
 * These tests guard the one thing that matters most on this site: that nothing
 * is invented and nothing drifts. They assert the shape of the data and the
 * exact values supplied by the client.
 */

describe('client-supplied facts', () => {
  it('uses the supplied rating and spend, not aggregator figures', () => {
    expect(CAFE.rating).toBe(4.7);
    expect(CAFE.ratingScale).toBe(5);
    expect(CAFE.spendLow).toBe(200);
    expect(CAFE.spendHigh).toBe(400);
  });

  it('names the neighbourhood but never a street address', () => {
    expect(CAFE.locality).toBe('Viman Nagar');
    expect(CAFE.city).toBe('Pune');
    const blob = JSON.stringify(CAFE).toLowerCase();
    for (const guess of ['shop', 'floor', 'road', 'phoenix', 'marketcity', 'nagar road']) {
      expect(blob).not.toContain(guess);
    }
  });

  it('keeps unverified details in the placeholder list, not in the facts', () => {
    const labels = TO_BE_CONFIRMED.map((p) => p.label);
    expect(labels).toContain('Opening hours');
    expect(labels).toContain('Phone');
    expect(labels).toContain('Street address');
    expect(labels).toContain('Reservations');
    const blob = JSON.stringify(CAFE);
    expect(blob).not.toMatch(/\d{1,2}:\d{2}/); // no times
    expect(blob).not.toMatch(/\+?\d{10}/); // no phone numbers
  });
});

describe('menu integrity', () => {
  it('has every category populated, labelled and uniquely identified', () => {
    expect(MENU.length).toBeGreaterThan(0);
    const ids = MENU.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const cat of MENU) {
      expect(cat.items.length).toBeGreaterThan(0);
      expect(cat.label.trim()).not.toBe('');
      expect(cat.title.trim()).not.toBe('');
      expect(cat.lead.trim()).not.toBe('');
    }
  });

  it('lists 50 items with no duplicates', () => {
    expect(ALL_ITEMS).toHaveLength(50);
    const names = ALL_ITEMS.map((i) => i.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('stores listed menu prices as positive integers (or an explicit null)', () => {
    for (const item of ALL_ITEMS) {
      if (item.price === null) continue;
      expect(Number.isInteger(item.price)).toBe(true);
      expect(item.price).toBeGreaterThan(0);
    }
    // exactly one item has no published price
    expect(ALL_ITEMS.length - PRICED_ITEMS.length).toBe(1);
    expect(itemById('Plain Thatte Idli')?.price).toBeNull();
  });

  it('matches spot-checked prices from the source listing', () => {
    const expected: Record<string, number> = {
      Idli: 45,
      'Medu Vada': 55,
      'Filter Coffee': 59,
      'Masala Chai': 45,
      'Ghee Podi Masala Dosa': 181,
      'Ghee Masala Dosa': 155,
      'Founders Special Dosa': 194,
      'Ghee Tomato Onion Uttapam': 168,
      'Mini Tiffin 1': 235,
      'Mini Tiffin 2': 245,
      'Mini Tiffin 3': 200,
      'Plain Upma': 80,
      'Mineral Water': 20,
    };
    for (const [name, price] of Object.entries(expected)) {
      expect(itemById(name)?.price, name).toBe(price);
    }
  });

  it('every featured dish actually exists in its own category', () => {
    for (const cat of MENU) {
      for (const name of cat.featured ?? []) {
        expect(cat.items.some((i) => i.name === name), `${cat.id}: ${name}`).toBe(true);
      }
    }
  });

  it('only tags Jain items that carry the listing’s Jain note', () => {
    for (const item of ALL_ITEMS) {
      if (item.jain) expect(item.note).toContain('Jain');
    }
    expect(ALL_ITEMS.filter((i) => i.jain)).toHaveLength(2);
  });

  it('derives stats from the data rather than hard-coding them', () => {
    expect(STATS.itemCount).toBe(ALL_ITEMS.length);
    expect(STATS.categoryCount).toBe(MENU.length);
    expect(STATS.dosaCount).toBe(23);
    expect(STATS.minPrice).toBe(20);
    expect(STATS.maxPrice).toBe(245);
    expect(STATS.minPrice).toBeLessThan(STATS.maxPrice);
  });

  it('formats prices in rupees', () => {
    expect(rupees(181)).toBe('₹181');
  });
});

describe('review quotes', () => {
  it('attributes every quote and never invents a reviewer name', () => {
    expect(QUOTES.length).toBeGreaterThan(0);
    for (const q of QUOTES) {
      expect(q.text.trim().length).toBeGreaterThan(20);
      expect(q.source).toMatch(/public .* listing/i);
      // quotes are stored unwrapped; the view adds the quotation marks
      expect(q.text.startsWith('“')).toBe(false);
    }
  });
});

describe('disclosures', () => {
  it('tells visitors where the menu came from and that prices can change', () => {
    expect(DISCLOSURE.menu).toMatch(/public listing/i);
    expect(DISCLOSURE.menu).toMatch(/change/i);
    expect(DISCLOSURE.spend).toMatch(/approximate/i);
    expect(DISCLOSURE.rating).toMatch(/supplied/i);
    expect(DISCLOSURE.photos).toMatch(/not been supplied/i);
  });
});
