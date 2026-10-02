import { Fragment, useEffect, useRef, type ReactNode } from 'react';
import { observeReveal } from '../lib/scroll';
import { DISCLOSURE } from '../data/cafe';

/* ------------------------------------------------------------------ */
/* Reveal — fades + lifts its children the first time they appear      */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant = 'up',
  className = '',
  ...rest
}: {
  children: ReactNode;
  as?: React.ElementType;
  delay?: number;
  variant?: 'up' | 'fade' | 'left' | 'right' | 'scale';
  className?: string;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => observeReveal(ref.current), []);
  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      style={{ ['--d' as string]: `${delay}ms` }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* SplitText — word-by-word rise. Stays one readable string for AT.    */
/* ------------------------------------------------------------------ */

export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  stagger = 45,
  start = 0,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  stagger?: number;
  start?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => observeReveal(ref.current), []);
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={`split ${className}`} data-reveal="words">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* The inter-word space must sit OUTSIDE the overflow-hidden mask,
              otherwise it is trimmed and the words run together. */}
          <span className="split-w">
            <span className="split-i" style={{ ['--d' as string]: `${start + i * stagger}ms` }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* PhotoSlot — an honest, designed placeholder for real photography    */
/* ------------------------------------------------------------------ */

export function PhotoSlot({
  caption,
  ratio = '4 / 5',
  tone = 'paper',
  className = '',
  index = 0,
}: {
  /** What this frame is reserved for, e.g. "Ghee podi masala dosa". */
  caption: string;
  ratio?: string;
  tone?: 'paper' | 'dark' | 'leaf' | 'clay' | 'sand' | 'rose';
  className?: string;
  index?: number;
}) {
  return (
    <figure
      className={`photo-slot tone-${tone} ${className}`}
      style={{ aspectRatio: ratio, ['--i' as string]: index }}
    >
      <div className="photo-slot-art" aria-hidden="true">
        <span className="ps-ring" />
        <span className="ps-ring" />
        <span className="ps-bar" />
      </div>
      <figcaption>
        <span className="ps-tag">Photo to be supplied</span>
        <span className="ps-sub">{caption}</span>
      </figcaption>
    </figure>
  );
}

export const photoDisclosure = DISCLOSURE.photos;

/* ------------------------------------------------------------------ */
/* Small shared bits                                                   */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="note">{children}</p>;
}
