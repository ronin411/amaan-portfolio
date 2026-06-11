'use client';

import { useEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/data';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal');
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
  }, []);

  return (
    <section className="projects section-grid" id="projects" ref={sectionRef}>
      <div className="projects__inner">
        <div className="projects__header">
          <span className="projects__label reveal">PROJECTS</span>
          <hr className="projects__rule reveal" data-delay="1" />
        </div>

        <div className="projects__list">
          {PROJECTS.map((p, i) => (
            <a
              key={p.num}
              className="project reveal"
              data-delay={i + 1}
              href={p.href}
              target="_blank"
              rel="noopener"
            >
              <span className="project__num">{p.num}</span>
              <div className="project__body">
                <h3 className="project__name">{p.name}</h3>
                <p className="project__desc">{p.desc}</p>
              </div>
              <div className="project__tags">
                {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>
              <span className="project__view">
                View <span className="arrow">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
