import { CAFE, STATS, rupees } from '../data/cafe';
import { Blob, PlateRings, ScrollCue, Spiral, Squiggle, Star, Steam } from '../components/Motifs';
import { useScrollVars } from '../lib/scroll';

export function Hero() {
  const stage = useScrollVars<HTMLDivElement>();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-stage" ref={stage} aria-hidden="true">
        <Blob className="hero-blob hero-blob-a" seed={0} />
        <Blob className="hero-blob hero-blob-b" seed={2} />
        <PlateRings className="hero-plate" rings={7} />
        <Spiral className="hero-spiral" />
        <Steam className="hero-steam" />
        <span className="hero-chip-shape" />
      </div>

      <div className="hero-inner">
        <p className="hero-place">
          <span className="hero-pin" aria-hidden="true" />
          {CAFE.locality} · {CAFE.city}
        </p>

        <h1 className="hero-title" id="hero-title">
          <span className="hero-word hero-word-1">Gatti</span>
          <span className="hero-word hero-word-2">Anna</span>
        </h1>

        <p className="hero-lede">
          A pure-vegetarian South Indian tiffin counter in {CAFE.locality}, {CAFE.city} —{' '}
          <em>{STATS.dosaCount} ghee dosas</em>, thatte idli, podi on nearly everything, and filter
          coffee to finish.
        </p>

        <div className="hero-actions">
          <a className="btn btn-solid" href="#menu">
            Explore the menu
            <svg viewBox="0 0 24 24" aria-hidden="true" className="btn-arrow">
              <path d="M4 12h15M13 6l6 6-6 6" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a className="btn btn-ghost" href="#visit">
            Plan your visit
          </a>
        </div>

        <dl className="hero-facts">
          <div className="fact">
            <dt>Rating</dt>
            <dd>
              <Star className="fact-star" />
              {CAFE.rating.toFixed(1)}
              <span className="fact-sub">/ {CAFE.ratingScale}</span>
            </dd>
          </div>
          <div className="fact">
            <dt>Typical spend</dt>
            <dd>
              {rupees(CAFE.spendLow)}–{CAFE.spendHigh}
              <span className="fact-sub">per person</span>
            </dd>
          </div>
          <div className="fact">
            <dt>Kitchen</dt>
            <dd>
              {CAFE.dietary}
              <span className="fact-sub">Jain options listed</span>
            </dd>
          </div>
        </dl>

        <Squiggle className="hero-squiggle" aria-hidden="true" />
      </div>

      <a className="scroll-cue" href="#mood">
        <ScrollCue className="scroll-cue-icon" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
