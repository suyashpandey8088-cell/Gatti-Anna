import { CAFE, DISCLOSURE, STATS, rupees } from '../data/cafe';
import { LeafRib, Spiral, Steam, Tumbler } from '../components/Motifs';
import { Eyebrow, PhotoSlot, Reveal, SplitText } from '../components/primitives';
import { useScrollVars } from '../lib/scroll';

/** Each figure is grounded in a specific item on the menu. */
const DETAILS = [
  { k: 'Ghee dosas listed', v: String(STATS.dosaCount) },
  { k: 'Items on the menu', v: String(STATS.itemCount) },
  { k: 'Listed price range', v: `${rupees(STATS.minPrice)}–${STATS.maxPrice}` },
  { k: 'Sections', v: String(STATS.categoryCount) },
];

export function Mood() {
  const stage = useScrollVars<HTMLDivElement>();

  return (
    <section className="mood" id="mood" aria-labelledby="mood-title">
      <div className="mood-rib" aria-hidden="true">
        <LeafRib />
      </div>

      <div className="mood-grid">
        {/* sticky visual column */}
        <div className="mood-visual" ref={stage}>
          <div className="mood-sticky">
            <div className="mood-art" aria-hidden="true">
              <Spiral className="mood-spiral" />
              <Tumbler className="mood-tumbler" />
              <Steam className="mood-steam" lines={2} />
            </div>
            <PhotoSlot
              caption="Interior or counter at Gatti Anna"
              ratio="4 / 3"
              tone="dark"
              className="mood-photo"
            />
          </div>
        </div>

        {/* text column */}
        <div className="mood-text">
          <Reveal>
            <Eyebrow>What’s on the counter</Eyebrow>
          </Reveal>

          <SplitText
            as="h2"
            className="display-2 mood-title"
            text="Everything arrives with ghee."
          />
          <p className="sr-only" id="mood-title">
            What’s on the counter
          </p>

          <Reveal delay={80}>
            <p className="lede">
              The menu reads like a tiffin counter rather than a restaurant card. Every dosa on it —
              all {STATS.dosaCount} — is a ghee dosa. Podi turns up across the idli, the dosa and
              even the upma. There are thatte plates, button idli by the dozen, kesari bhat and
              khara bhat, and three mini tiffins that put the whole counter on one plate.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <p className="body">
              It is a {CAFE.dietary.toLowerCase()} kitchen, with {CAFE.jainNote.toLowerCase()}. Drinks
              are short and classic: filter coffee, masala chai, Bournvita.
            </p>
          </Reveal>

          <Reveal delay={200} className="mood-quote-wrap">
            <blockquote className="mood-quote">
              <p>“The ghee roast dosa is just exceptional.”</p>
              <cite>Diner review, public Zomato listing</cite>
            </blockquote>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mood-details">
              {DETAILS.map((d) => (
                <div key={d.k}>
                  <dt>{d.k}</dt>
                  <dd>{d.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={280}>
            <p className="note">{DISCLOSURE.menu}</p>
          </Reveal>

          <Reveal delay={300} className="mood-photo-row">
            <PhotoSlot caption="Dosa on the tawa" ratio="1 / 1" tone="clay" index={0} />
            <PhotoSlot caption="Filter coffee, davara & tumbler" ratio="1 / 1" tone="leaf" index={1} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
