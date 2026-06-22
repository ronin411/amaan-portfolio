'use client';

import { useEffect, useRef } from 'react';

export default function About() {
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
    <section className="about section-grid" id="about" ref={sectionRef}>
      <div className="about__inner">
        <div className="about__main">
          <div className="about__label reveal">ABOUT</div>

          <h2 className="about__heading reveal" data-delay="1">
            The&nbsp;Analyst<br />Behind&nbsp;The&nbsp;Numbers
          </h2>

          <div className="about__copy">
            <p className="reveal" data-delay="2">
              <span className="lead-marker">/</span>
              I translate messy, fragmented data into clear decisions. My focus is on
              the unglamorous middle of analytics — cleaning it, modeling it,
              and asking the question that turns a dashboard into a direction.
            </p>
            <p className="reveal" data-delay="3">
              <span className="lead-marker">/</span>
              I&rsquo;ve identified $697K in churned MRR, built end-to-end funnel
              pipelines, and benchmarked 100+ ML algorithms — across early-stage
              startups, AI model evaluation firms, and consumer electronics.
            </p>
          </div>
        </div>

        <aside className="about__aside">
          <div className="currently-card reveal" data-delay="2">
            <span className="currently-card__corner">
              <span className="live" aria-hidden="true" />LIVE
            </span>
            <div className="currently-card__label">// CURRENTLY</div>
            <h3 className="currently-card__company">Tunez</h3>
            <p className="currently-card__role">CEO Intern</p>
            <hr className="currently-card__divider" />
            <p className="currently-card__desc">
              Building <strong>competitor intelligence</strong> across Amazon,
              Flipkart &amp; D2C — pricing, listings, review velocity.
            </p>
            <div className="currently-card__tags">
              <span className="pill">Bengaluru</span>
              <span className="pill">Apr 2026 — Present</span>
            </div>
          </div>

          <div className="stats reveal" data-delay="3">
            <div className="stat">
              <span className="stat__num">4</span>
              <span className="stat__label">Years Learning</span>
            </div>
            <div className="stat">
              <span className="stat__num">3</span>
              <span className="stat__label">BI Tools Mastered</span>
            </div>
            <div className="stat">
              <span className="stat__num">1000+</span>
              <span className="stat__label">Job Posts Scraped</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
