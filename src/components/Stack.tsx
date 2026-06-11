'use client';

import { useEffect, useRef } from 'react';

const GROUPS = [
  {
    head: 'Languages',
    chips: [
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1C5.5 1 4.5 1.7 4.5 3v1.6h3.2v.4H3.6C2.1 5 1 6 1 7.6v1.8c0 1.4.9 2.5 2.4 2.5H5V9.6c0-1.5 1.2-2.6 2.7-2.6h2.6C11.6 7 13 6 13 4.5V3c0-1.3-.9-2-2.4-2H7.5zM6.1 2.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#3776AB"/><path d="M8.5 15c2 0 3-.7 3-2v-1.6H8.3V11h4.1c1.5 0 2.6-1 2.6-2.6V6.6c0-1.4-.9-2.5-2.4-2.5H11V6c0 1.5-1.2 2.6-2.7 2.6H5.7C4.4 8.6 3 9.6 3 11.1V13c0 1.3.9 2 2.4 2h3.1zm1.4-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#FFD43B"/></svg>`, label: 'Python' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><ellipse cx="8" cy="3" rx="6" ry="1.6" fill="#00758F"/><path d="M2 3v3c0 .9 2.7 1.6 6 1.6S14 6.9 14 6V3" fill="#00758F" opacity="0.7"/><path d="M2 6v3c0 .9 2.7 1.6 6 1.6s6-.7 6-1.6V6" fill="#00758F" opacity="0.45"/><path d="M2 9v3c0 .9 2.7 1.6 6 1.6s6-.7 6-1.6V9" fill="#00758F" opacity="0.25"/></svg>`, label: 'SQL' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1.5" width="14" height="13" rx="1.5" fill="#E34F26"/><path d="M5.6 5.5L3.2 8l2.4 2.5M10.4 5.5L12.8 8l-2.4 2.5M9.2 4.5L6.8 11.5" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`, label: 'HTML/CSS' },
    ],
  },
  {
    head: 'Analytics & BI',
    chips: [
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="9.5" width="3" height="4.5" rx="0.4" fill="#F2C811"/><rect x="6.5" y="5.5" width="3" height="8.5" rx="0.4" fill="#F2C811"/><rect x="11" y="2" width="3" height="12" rx="0.4" fill="#F2C811"/></svg>`, label: 'Power BI' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="1.5" width="2" height="13" fill="#1F77B4"/><rect x="1.5" y="7" width="13" height="2" fill="#4E9BC8"/><rect x="3" y="3" width="1.8" height="1.8" fill="#E97625"/><rect x="11.2" y="11.2" width="1.8" height="1.8" fill="#1F77B4"/></svg>`, label: 'Tableau' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="2" width="13" height="12" rx="1.5" fill="#21A366"/><path d="M5 5.5l3 2.5L5 11M11 5.5L8 8l3 3" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`, label: 'Excel' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="2.4" height="12" fill="#150458"/><rect x="6.8" y="2" width="2.4" height="12" fill="#FFCA00"/><rect x="11.6" y="2" width="2.4" height="12" fill="#E70488"/></svg>`, label: 'Pandas' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L15 8L8 15L1 8z" fill="none" stroke="#4D77CF" stroke-width="1.4"/><circle cx="8" cy="8" r="1.4" fill="#013243"/><circle cx="4.5" cy="4.5" r="0.7" fill="#4D77CF"/><circle cx="11.5" cy="4.5" r="0.7" fill="#4D77CF"/><circle cx="4.5" cy="11.5" r="0.7" fill="#4D77CF"/><circle cx="11.5" cy="11.5" r="0.7" fill="#4D77CF"/></svg>`, label: 'NumPy' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="2" width="13" height="12" rx="1.5" fill="#0F9D58"/><line x1="5.5" y1="4" x2="5.5" y2="12" stroke="#fff" stroke-width="0.9" opacity="0.7"/><line x1="10" y1="4" x2="10" y2="12" stroke="#fff" stroke-width="0.9" opacity="0.7"/><line x1="2.5" y1="6.5" x2="13.5" y2="6.5" stroke="#fff" stroke-width="0.9" opacity="0.7"/><line x1="2.5" y1="9.5" x2="13.5" y2="9.5" stroke="#fff" stroke-width="0.9" opacity="0.7"/></svg>`, label: 'Google Sheets' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" fill="none" stroke="#11557C" stroke-width="1.2"/><path d="M8 8 L8 2.5" stroke="#11557C" stroke-width="1.2"/><path d="M8 8 L13.4 9.7" stroke="#E2A82A" stroke-width="1.2"/><path d="M8 8 L3.5 12" stroke="#A33A3A" stroke-width="1.2"/><path d="M8 8 L2.6 6.5" stroke="#2D8C56" stroke-width="1.2"/><circle cx="8" cy="8" r="1" fill="#11557C"/></svg>`, label: 'Matplotlib' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="11" r="1.6" fill="#636EFA"/><circle cx="6.5" cy="6" r="1.6" fill="#EF553B"/><circle cx="10" cy="9" r="1.6" fill="#00CC96"/><circle cx="13" cy="4.5" r="1.6" fill="#AB63FA"/></svg>`, label: 'Plotly' },
    ],
  },
  {
    head: 'Databases',
    chips: [
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" fill="#336791"/><path d="M5.6 4.4h3.5a2 2 0 010 4H6.7v3.2" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="5.6" cy="11.6" r="0.55" fill="#fff"/></svg>`, label: 'PostgreSQL' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 11.5c2-3 4.5-3 7-1.2 2 1.2 4 1.2 6-.6-.5 2.8-3 4.3-7 4.3-3 0-5-1-6-2.5z" fill="#00758F"/><path d="M11.5 6c.5-1 1.5-1.4 2.5-1-1 .2-1.5.7-2 1.6L11.5 6z" fill="#F29111"/><circle cx="12.2" cy="7.4" r="0.5" fill="#fff"/></svg>`, label: 'MySQL' },
    ],
  },
  {
    head: 'Frameworks',
    chips: [
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.7 1.5v4l-3.5 7.5c-.3.7.2 1.5 1 1.5h9.6c.8 0 1.3-.8 1-1.5L10.3 5.5v-4" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/><line x1="4.8" y1="1.5" x2="11.2" y2="1.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M4.4 9.5h7.2l1.4 3c.2.5-.1 1-.7 1H3.7c-.6 0-.9-.5-.7-1l1.4-3z" fill="#fff" opacity="0.18"/></svg>`, label: 'Flask' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 2.5h7.5l3.5 1.7-3.5 1.7H1.5z" fill="#f59e0b"/><path d="M1.5 6.7h7.5l3.5 1.7-3.5 1.7H1.5z" fill="#f59e0b" opacity="0.7"/><path d="M1.5 10.9h7.5l3.5 1.7-3.5 1.7H1.5z" fill="#f59e0b" opacity="0.45"/></svg>`, label: 'ETL Pipelines' },
    ],
  },
  {
    head: 'Methods',
    fullWidth: true,
    chips: [
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 8h5M7 8l5-3.5M7 8l5 3.5" stroke="#f59e0b" stroke-width="1.4" stroke-linecap="round" fill="none"/><circle cx="13" cy="4" r="1.6" fill="#f59e0b"/><circle cx="13" cy="12" r="1.6" fill="#f59e0b"/></svg>`, label: 'A/B Testing' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="3" height="3" fill="#f59e0b"/><rect x="6.5" y="2" width="3" height="3" fill="#f59e0b" opacity="0.7"/><rect x="11" y="2" width="3" height="3" fill="#f59e0b" opacity="0.4"/><rect x="2" y="6.5" width="3" height="3" fill="#f59e0b" opacity="0.7"/><rect x="6.5" y="6.5" width="3" height="3" fill="#f59e0b" opacity="0.5"/><rect x="11" y="6.5" width="3" height="3" fill="#f59e0b" opacity="0.25"/><rect x="2" y="11" width="3" height="3" fill="#f59e0b" opacity="0.4"/><rect x="6.5" y="11" width="3" height="3" fill="#f59e0b" opacity="0.25"/><rect x="11" y="11" width="3" height="3" fill="#f59e0b" opacity="0.15"/></svg>`, label: 'Cohort Analysis' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 2.5h13l-4.2 5.1v5.9l-4.6-1.7V7.6z" fill="#f59e0b"/></svg>`, label: 'Funnel Analysis' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 12a6 6 0 0112 0" stroke="#f59e0b" stroke-width="1.5" fill="none" stroke-linecap="round"/><line x1="8" y1="12" x2="11.4" y2="6.2" stroke="#f59e0b" stroke-width="1.6" stroke-linecap="round"/><circle cx="8" cy="12" r="1.2" fill="#f59e0b"/></svg>`, label: 'KPI Monitoring' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="4.5" fill="none" stroke="#f59e0b" stroke-width="1.5"/><line x1="10.2" y1="10.2" x2="14" y2="14" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg>`, label: 'EDA' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="4" x2="8" y2="8" stroke="#f59e0b" stroke-width="1.2" opacity="0.55"/><line x1="12" y1="4" x2="8" y2="8" stroke="#f59e0b" stroke-width="1.2" opacity="0.55"/><line x1="4" y1="12" x2="8" y2="8" stroke="#f59e0b" stroke-width="1.2" opacity="0.55"/><line x1="12" y1="12" x2="8" y2="8" stroke="#f59e0b" stroke-width="1.2" opacity="0.55"/><circle cx="4" cy="4" r="1.5" fill="#f59e0b"/><circle cx="12" cy="4" r="1.5" fill="#f59e0b"/><circle cx="4" cy="12" r="1.5" fill="#f59e0b"/><circle cx="12" cy="12" r="1.5" fill="#f59e0b"/><circle cx="8" cy="8" r="1.7" fill="#f59e0b"/></svg>`, label: 'Data Modeling' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 12 C 4 12, 4 4, 8 4 C 12 4, 12 12, 14 12" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-linecap="round"/><line x1="8" y1="4" x2="8" y2="13" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="1.5 1.5" opacity="0.6"/></svg>`, label: 'Hypothesis Testing' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><polyline points="2,12 5,9 7,11 10,5 14,3" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="2" cy="12" r="1" fill="#f59e0b"/><circle cx="7" cy="11" r="1" fill="#f59e0b"/><circle cx="10" cy="5" r="1" fill="#f59e0b"/><circle cx="14" cy="3" r="1" fill="#f59e0b"/></svg>`, label: 'Time-Series Analysis' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 6 L8 3 L14 6 L14 13 L2 13 Z" fill="none" stroke="#f59e0b" stroke-width="1.3" stroke-linejoin="round"/><line x1="5" y1="8" x2="5" y2="13" stroke="#f59e0b" stroke-width="1.1"/><line x1="8" y1="8" x2="8" y2="13" stroke="#f59e0b" stroke-width="1.1"/><line x1="11" y1="8" x2="11" y2="13" stroke="#f59e0b" stroke-width="1.1"/></svg>`, label: 'Data Warehousing' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5 L13.5 3.5 L13.5 8 C 13.5 11.2 11 13.4 8 14.5 C 5 13.4 2.5 11.2 2.5 8 L2.5 3.5 Z" fill="none" stroke="#f59e0b" stroke-width="1.3" stroke-linejoin="round"/><polyline points="5.5,8 7.2,9.5 10.5,6.2" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`, label: 'Data Quality Auditing' },
      { icon: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="1.8" width="10" height="12.4" rx="0.8" fill="none" stroke="#f59e0b" stroke-width="1.3"/><line x1="5.5" y1="4.5" x2="10.5" y2="4.5" stroke="#f59e0b" stroke-width="1.1"/><rect x="5" y="7" width="1.6" height="4" fill="#f59e0b"/><rect x="7.2" y="6" width="1.6" height="5" fill="#f59e0b"/><rect x="9.4" y="8" width="1.6" height="3" fill="#f59e0b"/></svg>`, label: 'Stakeholder Reporting' },
    ],
  },
];

export default function Stack() {
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
    <section className="stack section-grid" id="stack" ref={sectionRef}>
      <div className="stack__inner">
        <div className="stack__header">
          <span className="stack__label reveal">STACK</span>
          <hr className="stack__rule reveal" data-delay="1" />
        </div>

        <div className="stack__grid">
          {GROUPS.map((g, gi) => (
            <div
              key={g.head}
              className="group reveal"
              data-delay={gi + 1}
              style={g.fullWidth ? { gridColumn: '1 / -1' } : undefined}
            >
              <h3 className="group__head">{g.head}</h3>
              <div className="group__chips">
                {g.chips.map(chip => (
                  <span key={chip.label} className="chip">
                    <span className="chip__icon" dangerouslySetInnerHTML={{ __html: chip.icon }} />
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal block */}
        <div className="terminal reveal">
          <div className="terminal__bar">
            <span className="dots"><span /><span /><span /></span>
            <span className="title">python</span>
            <span className="path">~/portfolio</span>
          </div>
          <div className="terminal__body">
            <span className="prompt">{'>'}</span> <span className="user">amaan</span> <span className="dim">@</span><span className="user">analyst</span> <span className="dim">%</span>{'\n'}
            <span className="prompt">$ </span><span className="pkg">pip list</span>{'\n\n'}
            <span className="head">Package              Version{'\n'}</span>
            <span className="dim">-------------------- -------{'\n'}</span>
            <span className="pkg">pandas               </span><span className="ver">2.2.2{'\n'}</span>
            <span className="pkg">numpy                </span><span className="ver">1.26.4{'\n'}</span>
            <span className="pkg">matplotlib           </span><span className="ver">3.9.0{'\n'}</span>
            <span className="pkg">plotly               </span><span className="ver">5.22.0{'\n'}</span>
            <span className="pkg">scikit-learn         </span><span className="ver">1.5.0{'\n'}</span>
            <span className="pkg">flask                </span><span className="ver">3.0.3{'\n'}</span>
            <span className="pkg">psycopg2             </span><span className="ver">2.9.9{'\n'}</span>
            <span className="comment"># + Power BI · Tableau · Google Sheets{'\n'}</span>
            <span className="prompt">$ </span><span className="cursor" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
