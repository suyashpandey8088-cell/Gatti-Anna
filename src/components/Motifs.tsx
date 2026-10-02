/**
 * Abstract motifs. Nothing here depicts Gatti Anna — these are drawn shapes
 * inspired by tableware, steam and batter. All are decorative and hidden from
 * assistive technology.
 */

type SVGProps = React.SVGProps<SVGSVGElement>;

const deco = { 'aria-hidden': true, focusable: 'false' } as const;

/* ---------- Thatte plate: concentric rings ---------- */

export function PlateRings({ rings = 6, ...rest }: SVGProps & { rings?: number }) {
  const r = Array.from({ length: rings }, (_, i) => 50 - i * (46 / rings));
  return (
    <svg viewBox="0 0 100 100" {...deco} {...rest}>
      {r.map((radius, i) => (
        <circle
          key={radius}
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={i === 0 ? 1.4 : 0.5}
          strokeDasharray={i % 3 === 2 ? '2 3' : undefined}
        />
      ))}
    </svg>
  );
}

/* ---------- Dosa coil: archimedean spiral ---------- */

function spiralPath(turns = 5, steps = 420, inner = 3, outer = 47) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const radius = inner + t * (outer - inner);
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(' ');
}

const SPIRAL = spiralPath();

export function Spiral(props: SVGProps) {
  return (
    <svg viewBox="0 0 100 100" {...deco} {...props}>
      <path d={SPIRAL} fill="none" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Steam ---------- */

export function Steam({ lines = 3, ...rest }: SVGProps & { lines?: number }) {
  return (
    <svg viewBox="0 0 60 100" {...deco} {...rest}>
      {Array.from({ length: lines }, (_, i) => {
        const x = 14 + i * 16;
        const flip = i % 2 ? -1 : 1;
        return (
          <path
            key={i}
            className="steam-line"
            style={{ ['--i' as string]: i }}
            d={`M${x} 96 C${x + 9 * flip} 78, ${x - 9 * flip} 62, ${x} 44 S${x + 8 * flip} 18, ${x} 4`}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/* ---------- Davara & tumbler (filter coffee), abstracted ---------- */

export function Tumbler(props: SVGProps) {
  return (
    <svg viewBox="0 0 100 100" {...deco} {...props}>
      {/* tumbler */}
      <path d="M34 24 L66 24 L61 70 L39 70 Z" fill="none" strokeWidth="2.2" strokeLinejoin="round" />
      <line x1="36" y1="37" x2="64" y2="37" strokeWidth="1.4" />
      {/* davara */}
      <path d="M22 84 Q50 96 78 84 L72 76 L28 76 Z" fill="none" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Organic blob ---------- */

export function Blob({ seed = 0, ...rest }: SVGProps & { seed?: number }) {
  const shapes = [
    'M51 7c18 0 39 10 42 30s-15 28-19 44-16 13-33 11S8 76 10 58 33 7 51 7z',
    'M46 5c22-3 45 14 47 35s-20 25-28 40-29 17-40 3S2 47 13 31 24 8 46 5z',
    'M55 4c21 4 37 23 34 45s-22 22-33 35-32 8-39-9S6 37 20 23 34 0 55 4z',
  ];
  return (
    <svg viewBox="0 0 100 100" {...deco} {...rest}>
      <path d={shapes[seed % shapes.length]} />
    </svg>
  );
}

/* ---------- Hand-drawn accents ---------- */

export function Squiggle(props: SVGProps) {
  return (
    <svg viewBox="0 0 120 16" {...deco} {...props}>
      <path
        d="M2 11c10-9 20 5 30-1s20-9 30-2 18 7 28-2"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A loose, left-pointing arrow for margin notes. */
export function ArrowDoodle(props: SVGProps) {
  return (
    <svg viewBox="0 0 72 44" {...deco} {...props}>
      <path
        d="M68 8C50 2 24 6 8 24"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M20 13 7 24.5 22 33"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star(props: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" {...deco} {...props}>
      <path d="M12 2.2l2.9 6.2 6.6.9-4.8 4.7 1.2 6.8L12 17.6 6.1 20.8l1.2-6.8L2.5 9.3l6.6-.9z" />
    </svg>
  );
}

/* ---------- Banana-leaf rib ---------- */

export function LeafRib(props: SVGProps) {
  return (
    <svg viewBox="0 0 200 60" {...deco} {...props} preserveAspectRatio="none">
      <line x1="0" y1="30" x2="200" y2="30" strokeWidth="1.6" />
      {Array.from({ length: 22 }, (_, i) => {
        const x = 6 + i * 9;
        return (
          <g key={i}>
            <line x1={x} y1="30" x2={x + 7} y2="6" strokeWidth="1" />
            <line x1={x} y1="30" x2={x + 7} y2="54" strokeWidth="1" />
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Scroll cue ---------- */

export function ScrollCue(props: SVGProps) {
  return (
    <svg viewBox="0 0 16 30" {...deco} {...props}>
      <rect x="1" y="1" width="14" height="28" rx="7" fill="none" strokeWidth="1.4" />
      <circle className="cue-dot" cx="8" cy="9" r="2.2" />
    </svg>
  );
}
