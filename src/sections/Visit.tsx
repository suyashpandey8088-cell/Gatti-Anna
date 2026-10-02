import { CAFE, DISCLOSURE, STATS, TO_BE_CONFIRMED, rupees } from '../data/cafe';
import { PlateRings, Steam } from '../components/Motifs';
import { Eyebrow, Reveal, SplitText } from '../components/primitives';
import { useScrollVars } from '../lib/scroll';

const CONFIRMED = [
  {
    label: 'Where',
    value: `${CAFE.locality}, ${CAFE.city}`,
    sub: 'Neighbourhood confirmed; street address pending',
  },
  {
    label: 'Typical spend',
    value: `${rupees(CAFE.spendLow)}–${CAFE.spendHigh}`,
    sub: 'Approximate, per person',
  },
  {
    label: 'Kitchen',
    value: CAFE.dietary,
    sub: CAFE.jainNote,
  },
  {
    label: 'Food',
    value: CAFE.cuisine,
    sub: `${STATS.itemCount} items listed, ${rupees(STATS.minPrice)}–${rupees(STATS.maxPrice)}`,
  },
];

export function Visit() {
  const stage = useScrollVars<HTMLDivElement>();

  return (
    <section className="visit" id="visit" aria-labelledby="visit-title">
      <div className="visit-art" ref={stage} aria-hidden="true">
        <PlateRings className="visit-plate" rings={9} />
        <Steam className="visit-steam" lines={3} />
      </div>

      <div className="visit-inner">
        <div className="visit-head">
          <Reveal>
            <Eyebrow>A visit at your pace</Eyebrow>
          </Reveal>
          <SplitText as="h2" className="display-1" text="Viman Nagar, Pune." />
          <p className="sr-only" id="visit-title">
            Plan your visit
          </p>
          <Reveal delay={120}>
            <p className="lede visit-lede">
              Here is everything confirmed so far. Anything still being verified is listed as such
              rather than guessed.
            </p>
          </Reveal>
        </div>

        <div className="visit-cols">
          <Reveal className="visit-card visit-card-known">
            <h3 className="visit-card-title">
              <span className="dot dot-on" aria-hidden="true" />
              Confirmed
            </h3>
            <dl className="visit-list">
              {CONFIRMED.map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>
                    <strong>{d.value}</strong>
                    <span>{d.sub}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="note">{DISCLOSURE.spend}</p>
          </Reveal>

          <Reveal className="visit-card visit-card-pending" delay={120}>
            <h3 className="visit-card-title">
              <span className="dot dot-off" aria-hidden="true" />
              To be confirmed
            </h3>
            <ul className="pending-list">
              {TO_BE_CONFIRMED.map((p) => (
                <li key={p.label}>
                  <strong>{p.label}</strong>
                  <span>{p.hint}</span>
                </li>
              ))}
            </ul>
            <p className="note">
              These are deliberately blank. Nothing on this page claims a service or an opening time
              that has not been verified.
            </p>
          </Reveal>
        </div>

        <Reveal className="visit-cta" delay={160}>
          <a className="btn btn-solid" href="#menu">
            Explore the menu
            <svg viewBox="0 0 24 24" aria-hidden="true" className="btn-arrow">
              <path
                d="M4 12h15M13 6l6 6-6 6"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            className="btn btn-ghost"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${CAFE.name}, ${CAFE.locality}, ${CAFE.city}`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Find {CAFE.locality} on a map
            <span className="sr-only"> (opens Google Maps in a new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
