import { CAFE, DISCLOSURE, STATS, rupees } from '../data/cafe';
import { ArrowDoodle, PlateRings, Spiral, Steam } from '../components/Motifs';
import { Reveal } from '../components/primitives';
import { useScrollVars } from '../lib/scroll';

export function Closing() {
  const stage = useScrollVars<HTMLDivElement>();

  return (
    <>
      <section className="closing" aria-labelledby="closing-title">
        <div className="closing-art" ref={stage} aria-hidden="true">
          <PlateRings className="closing-plate" rings={7} />
          <Spiral className="closing-spiral" />
          <Steam className="closing-steam" lines={3} />
        </div>

        <div className="closing-inner">
          <Reveal variant="scale">
            <p className="closing-kicker">
              <span className="closing-pin" aria-hidden="true" />
              {CAFE.locality} · {CAFE.city}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="closing-title" id="closing-title">
              <span>Pull up a</span>
              <span className="closing-em">thatte plate.</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="closing-lede">
              {STATS.dosaCount} ghee dosas, idli by the dozen and a filter coffee, typically{' '}
              {rupees(CAFE.spendLow)}–{CAFE.spendHigh} a head.
            </p>
          </Reveal>

          <Reveal delay={220} className="closing-actions">
            <a className="btn btn-cream" href="#menu">
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
            <a className="btn btn-outline" href="#visit">
              Plan your visit
            </a>
            <span className="closing-doodle" aria-hidden="true">
              <ArrowDoodle />
              <em>start with the podi masala</em>
            </span>
          </Reveal>
        </div>
      </section>

      <footer className="foot">
        <div className="foot-inner">
          <div className="foot-brand">
            <p className="foot-name">{CAFE.name}</p>
            <p className="foot-place">
              {CAFE.cuisine} · {CAFE.dietary}
              <br />
              {CAFE.locality}, {CAFE.city}, {CAFE.region}
            </p>
          </div>

          <nav className="foot-nav" aria-label="Footer">
            <ul>
              <li>
                <a href="#top">Top</a>
              </li>
              <li>
                <a href="#mood">The counter</a>
              </li>
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#praise">Reviews</a>
              </li>
              <li>
                <a href="#visit">Visit</a>
              </li>
            </ul>
          </nav>

          <div className="foot-notes">
            <p className="note">{DISCLOSURE.menu}</p>
            <p className="note">{DISCLOSURE.photos}</p>
            <p className="note">
              Opening hours, phone number, full address and service options are not published here
              because they have not been confirmed.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
