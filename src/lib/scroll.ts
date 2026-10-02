import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Reduced-motion                                                      */
/* ------------------------------------------------------------------ */

const QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/* Shared rAF ticker — one loop for every scroll-linked element        */
/* ------------------------------------------------------------------ */

type Job = () => void;

const jobs = new Set<Job>();
let frame = 0;
let dirty = true;

function loop() {
  frame = 0;
  if (dirty) {
    dirty = false;
    jobs.forEach((job) => job());
  }
  if (jobs.size) frame = requestAnimationFrame(loop);
}

function invalidate() {
  dirty = true;
  if (!frame && jobs.size) frame = requestAnimationFrame(loop);
}

function subscribe(job: Job): () => void {
  const first = jobs.size === 0;
  jobs.add(job);
  if (first) {
    window.addEventListener('scroll', invalidate, { passive: true });
    window.addEventListener('resize', invalidate);
  }
  invalidate();
  return () => {
    jobs.delete(job);
    if (jobs.size === 0) {
      window.removeEventListener('scroll', invalidate);
      window.removeEventListener('resize', invalidate);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/* ------------------------------------------------------------------ */
/* Parallax / scroll progress                                          */
/* ------------------------------------------------------------------ */

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

/**
 * Writes a `--p` custom property (0 → 1) onto the element describing how far it
 * has travelled through the viewport: 0 when its top edge first enters from the
 * bottom, 1 when its bottom edge leaves past the top.
 *
 * Also writes `--pc` (-1 → 1), centred on the viewport middle, which is the more
 * useful value for parallax offsets.
 *
 * No-ops entirely when the visitor prefers reduced motion.
 */
export function useScrollVars<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.setProperty('--p', '0.5');
      el.style.setProperty('--pc', '0');
      return;
    }
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const travelled = vh - rect.top;
      const p = clamp(travelled / total);
      const centre = rect.top + rect.height / 2;
      const pc = clamp((centre - vh / 2) / (vh / 2 + rect.height / 2), -1, 1);
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--pc', pc.toFixed(4));
    };
    return subscribe(update);
  }, [reduced]);

  return ref;
}

/** Page-level scroll progress 0 → 1, for the thin top progress bar. */
export function usePageProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setP(max > 0 ? clamp(doc.scrollTop / max) : 0);
    };
    return subscribe(update);
  }, []);
  return p;
}

/* ------------------------------------------------------------------ */
/* Reveal on enter                                                     */
/* ------------------------------------------------------------------ */

let revealObserver: IntersectionObserver | null = null;

function getRevealObserver(): IntersectionObserver {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver!.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );
  }
  return revealObserver;
}

export function observeReveal(el: Element | null) {
  if (!el) return;
  if (prefersReducedMotion()) {
    el.classList.add('is-in');
    return;
  }
  getRevealObserver().observe(el);
}

/* ------------------------------------------------------------------ */
/* Which section is on screen (for the nav)                            */
/* ------------------------------------------------------------------ */

export function useActiveSection(ids: string[], offset = 0.35): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * offset;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    return subscribe(update);
  }, [ids.join('|'), offset]);
  return active;
}

/** True once the visitor has scrolled past `px` — used to reveal the nav bar. */
export function usePastScroll(px: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const update = () => {
      const now = window.scrollY > px;
      setPast((prev) => (prev === now ? prev : now));
    };
    return subscribe(update);
  }, [px]);
  return past;
}
