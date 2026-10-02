import { CAFE } from '../data/cafe';

/**
 * Schema.org data for the cafe, generated from the same source of truth as the
 * page so the two can never drift apart.
 *
 * Deliberately omitted: street address, telephone, openingHours and
 * aggregateRating. None of those are confirmed (and aggregateRating is invalid
 * without a verified review count), so publishing them would be a guess.
 */
export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: CAFE.name,
    servesCuisine: CAFE.cuisine,
    priceRange: `₹${CAFE.spendLow}–₹${CAFE.spendHigh}`,
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: `${CAFE.locality}, ${CAFE.city}`,
      addressRegion: CAFE.region,
      addressCountry: 'IN',
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
