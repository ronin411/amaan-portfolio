'use client';

import { useEffect, useRef } from 'react';
import { METRICS } from '@/lib/data';

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    if (!els || !('IntersectionObserver' in window)) {
      els?.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}

function useCounterUp(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const nums = ref.current?.querySelectorAll<HTMLElement>('[data-target]');
    if (!nums?.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate(el: HTMLElement) {
      const target = parseFloat(el.dataset.target!);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      if (prefersReduced) { el.textContent = prefix + target + suffix; return; }
      const duration = 1400;
      const start = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      function tick(now: number) {
        const t = Math.min(1, (now - start) / duration);
        const value = Math.round(target * ease(t));
        el.textContent = prefix + value + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target + suffix;
      }
      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(el => {
        el.textContent = (el.dataset.prefix || '') + el.dataset.target + (el.dataset.suffix || '');
      });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animate(e.target as HTMLElement); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  useCounterUp(sectionRef);

  return (
    <section className="impact section-grid" id="impact" ref={sectionRef}>
      <div className="impact__inner">
        <div className="impact__header">
          <span className="impact__label reveal">IMPACT</span>
          <hr className="impact__rule reveal" data-delay="1" />
        </div>

        <div className="impact__grid">
          {METRICS.map((m, i) => (
            <article className="metric reveal" data-delay={i + 1} key={m.label}>
              <span className="metric__company">{m.company}</span>
              <div className="metric__body">
                <span
                  className="metric__number"
                  data-target={m.target}
                  data-prefix={m.prefix}
                  data-suffix={m.suffix}
                >
                  {m.prefix}0{m.suffix}
                </span>
                <span className="metric__label">{m.label}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
