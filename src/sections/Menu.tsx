import { useEffect, useRef, useState } from 'react';
import {
  DISCLOSURE,
  MENU,
  STATS,
  rupees,
  type MenuCategory,
  type MenuItem,
  type Tone,
} from '../data/cafe';
import { Eyebrow, PhotoSlot, Reveal, SplitText } from '../components/primitives';
import { PlateRings, Squiggle } from '../components/Motifs';
import { prefersReducedMotion } from '../lib/scroll';

/* ------------------------------------------------------------------ */

function PriceTag({ price }: { price: MenuItem['price'] }) {
  if (price === null) {
    return (
      <span className="price price-missing" title="Price not published on the listing">
        Not listed
      </span>
    );
  }
  return <span className="price">{rupees(price)}</span>;
}

function Tags({ item }: { item: MenuItem }) {
  if (!item.jain && !item.bestseller) return null;
  return (
    <span className="tags">
      {item.bestseller && <span className="tag tag-best">Listed bestseller</span>}
      {item.jain && <span className="tag tag-jain">Jain preparation</span>}
    </span>
  );
}

/** Large treatment for the one or two dishes that anchor a section. */
function FeatureItem({ item, index, tone }: { item: MenuItem; index: number; tone: Tone }) {
  return (
    <Reveal className="feature" variant="up" delay={index * 90}>
      <PhotoSlot caption={item.name} ratio="5 / 4" tone={tone} index={index} />
      <div className="feature-body">
        <h4 className="feature-name">{item.name}</h4>
        {item.note && <p className="feature-note">{item.note}</p>}
        <div className="feature-foot">
          <PriceTag price={item.price} />
          <Tags item={item} />
        </div>
      </div>
      <span className="feature-badge" aria-hidden="true">
        <PlateRings rings={4} />
      </span>
    </Reveal>
  );
}

function ListItem({ item, index }: { item: MenuItem; index: number }) {
  return (
    <Reveal as="li" className="row" variant="fade" delay={Math.min(index, 8) * 40}>
      <span className="row-name">
        {item.name}
        <Tags item={item} />
      </span>
      <span className="row-leader" aria-hidden="true" />
      <PriceTag price={item.price} />
      {item.note && !item.note.startsWith('[') && <span className="row-note">{item.note}</span>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */

function Category({ cat }: { cat: MenuCategory }) {
  const featuredNames = cat.featured ?? [];
  const featured = featuredNames
    .map((n) => cat.items.find((i) => i.name === n))
    .filter((i): i is MenuItem => Boolean(i));
  const rest = cat.items.filter((i) => !featuredNames.includes(i.name));

  return (
    <section
      className="cat"
      data-tone={cat.tone}
      id={`cat-${cat.id}`}
      aria-labelledby={`cat-${cat.id}-title`}
    >
      <div className="cat-inner">
        <header className="cat-head">
          <div>
            <Eyebrow>
              {cat.items.length} {cat.items.length === 1 ? 'item' : 'items'}
            </Eyebrow>
            <h3 className="cat-title display-2" id={`cat-${cat.id}-title`}>
              {cat.title}
            </h3>
            <p className="cat-lead">{cat.lead}</p>
          </div>
          <Squiggle className="cat-squiggle" aria-hidden="true" />
        </header>

        {featured.length > 0 && (
          <div className={`features features-${Math.min(featured.length, 3)}`}>
            {featured.map((item, i) => (
              <FeatureItem key={item.name} item={item} index={i} tone={cat.tone} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <ul className="rows">
            {rest.map((item, i) => (
              <ListItem key={item.name} item={item} index={i} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function CategoryNav() {
  const [active, setActive] = useState(MENU[0].id);
  const barRef = useRef<HTMLElement>(null);

  /* On narrow screens the pill bar scrolls sideways — keep the current
     section's pill in view without ever scrolling the page itself. */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const pill = bar.querySelector<HTMLAnchorElement>('a.is-active');
    if (!pill) return;
    const target = pill.offsetLeft - (bar.clientWidth - pill.offsetWidth) / 2;
    const max = bar.scrollWidth - bar.clientWidth;
    if (max <= 0) return;
    bar.scrollTo({
      left: Math.max(0, Math.min(target, max)),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [active]);

  useEffect(() => {
    const targets = MENU.map((c) => document.getElementById(`cat-${c.id}`)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace('cat-', ''));
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div className="cat-nav-wrap">
      <nav className="cat-nav" aria-label="Menu sections" ref={barRef}>
        <ul>
          {MENU.map((c) => (
            <li key={c.id}>
              <a
                href={`#cat-${c.id}`}
                className={active === c.id ? 'is-active' : ''}
                aria-current={active === c.id ? 'true' : undefined}
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Menu() {
  return (
    <div className="menu" id="menu">
      <div className="menu-intro">
        <Reveal>
          <Eyebrow>The menu</Eyebrow>
        </Reveal>
        <SplitText as="h2" className="display-1 menu-head" text="Read it like a tiffin card." />
        <Reveal delay={120}>
          <p className="lede menu-lede">
            {STATS.itemCount} listed items across {STATS.categoryCount} sections, from{' '}
            {rupees(STATS.minPrice)} to {rupees(STATS.maxPrice)}.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p className="note menu-note">{DISCLOSURE.menu}</p>
        </Reveal>
      </div>

      <CategoryNav />

      <div className="cat-stack">
        {MENU.map((cat) => (
          <Category key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
