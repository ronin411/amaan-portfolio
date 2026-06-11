'use client';

import { useEffect, useRef } from 'react';

export default function Contact() {
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
    <section className="contact section-grid" id="contact" ref={sectionRef}>
      <div className="contact__inner">
        <h2 className="contact__heading reveal">
          LET&rsquo;S TURN DATA<br />
          INTO <span className="amp">DECISIONS</span>
        </h2>
        <p className="contact__sub reveal" data-delay="1">
          Open to Data Analyst, Business Analyst roles and freelance analytics
          work. Based in Bengaluru — happy to work across IST or remote.
        </p>

        <div className="contact__ctas reveal" data-delay="2">
          <a className="btn btn--primary" href="mailto:amaankhan.ak421@gmail.com">
            Get in touch <span className="arrow">&rarr;</span>
          </a>
          <a className="btn btn--ghost" href="https://github.com/ronin411" target="_blank" rel="noopener">
            View GitHub <span className="arrow">&rarr;</span>
          </a>
          <a className="btn btn--dashed" href="/resume.pdf" download="Amaan_Khan_Resume.pdf" target="_blank" aria-label="Download resume">
            <span className="dl-icon" aria-hidden="true">&darr;</span> Download Resume
          </a>
        </div>

        <div className="contact__pills reveal" data-delay="3">
          <a className="contact-pill" href="mailto:amaankhan.ak421@gmail.com">amaankhan.ak421@gmail.com</a>
          <a className="contact-pill" href="https://www.linkedin.com/in/amaankhan41/" target="_blank" rel="noopener">linkedin.com/in/amaankhan41</a>
          <a className="contact-pill" href="https://github.com/ronin411" target="_blank" rel="noopener">github.com/ronin411</a>
        </div>
      </div>
    </section>
  );
}
