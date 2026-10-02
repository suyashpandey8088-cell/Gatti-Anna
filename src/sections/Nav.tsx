import { useActiveSection, usePageProgress, usePastScroll } from '../lib/scroll';
import { CAFE } from '../data/cafe';

const LINKS = [
  { id: 'mood', label: 'The counter' },
  { id: 'menu', label: 'Menu' },
  { id: 'praise', label: 'Reviews' },
  { id: 'visit', label: 'Visit' },
];

const IDS = LINKS.map((l) => l.id);

export function Nav() {
  const active = useActiveSection(IDS);
  const shown = usePastScroll(520);
  const progress = usePageProgress();

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className={`nav ${shown ? 'nav-on' : ''}`}>
        <a className="nav-mark" href="#top">
          <span className="nav-dot" aria-hidden="true" />
          {CAFE.name}
        </a>

        <nav aria-label="Sections">
          <ul className="nav-links">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={active === link.id ? 'is-active' : ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn-sm btn-solid" href="#visit">
          Plan your visit
        </a>
      </header>
    </>
  );
}
