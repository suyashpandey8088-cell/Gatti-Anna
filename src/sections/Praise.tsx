import { CAFE, DISCLOSURE, QUOTES } from '../data/cafe';
import { Blob, Star } from '../components/Motifs';
import { Eyebrow, PhotoSlot, Reveal, SplitText } from '../components/primitives';
import { useScrollVars } from '../lib/scroll';

export function Praise() {
  const stage = useScrollVars<HTMLDivElement>();
  const filled = Math.round(CAFE.rating);

  return (
    <section className="praise" id="praise" aria-labelledby="praise-title">
      <div className="praise-bg" ref={stage} aria-hidden="true">
        <Blob className="praise-blob praise-blob-a" seed={1} />
        <Blob className="praise-blob praise-blob-b" seed={2} />
      </div>

      <div className="praise-inner">
        <div className="praise-score">
          <Reveal variant="scale">
            <p className="score-number">
              {CAFE.rating.toFixed(1)}
              <span className="score-scale">/{CAFE.ratingScale}</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="score-stars" aria-label={`Rated ${CAFE.rating} out of ${CAFE.ratingScale}`}>
              {Array.from({ length: CAFE.ratingScale }, (_, i) => (
                <Star key={i} className={`score-star ${i < filled ? 'on' : 'off'}`} />
              ))}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="note score-note">{DISCLOSURE.rating}</p>
          </Reveal>
        </div>

        <div className="praise-copy">
          <Reveal>
            <Eyebrow>What diners say</Eyebrow>
          </Reveal>
          <SplitText as="h2" className="display-2" text="In their words, not ours." />
          <p className="sr-only" id="praise-title">
            What diners say
          </p>
        </div>

        <ul className="quotes">
          {QUOTES.map((q, i) => (
            <Reveal as="li" key={i} className="quote" delay={i * 110} variant="up">
              <blockquote>
                <p>“{q.text}”</p>
              </blockquote>
              <p className="quote-src">{q.source}</p>
              <span className="quote-tape" aria-hidden="true" />
            </Reveal>
          ))}
          <Reveal as="li" className="quote quote-photo" delay={330}>
            <PhotoSlot caption="Guests at Gatti Anna" ratio="1 / 1" tone="paper" />
          </Reveal>
        </ul>

        <Reveal delay={200}>
          <p className="note praise-foot">
            Quotes are reproduced from Gatti Anna’s public listing. Reviewer names are not published
            there, so none are shown.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
