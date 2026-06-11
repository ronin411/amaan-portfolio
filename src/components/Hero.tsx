'use client';

import { useEffect, useRef } from 'react';
import { MARQUEE_ITEMS } from '@/lib/data';

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function buildGroup() {
      const group = document.createElement('div');
      group.className = 'marquee__group';
      MARQUEE_ITEMS.forEach((label) => {
        const item = document.createElement('span');
        item.className = 'marquee__item';
        item.textContent = label;
        const sep = document.createElement('span');
        sep.className = 'marquee__sep';
        sep.textContent = '*';
        group.appendChild(item);
        group.appendChild(sep);
      });
      return group;
    }

    track.appendChild(buildGroup());
    track.appendChild(buildGroup());
  }, []);

  return (
    <section className="hero" id="home">
      {/* Top bar */}
      <div className="topbar">
        <span className="brand">
          PORTFOLIO<span className="cursor" aria-hidden="true" />
        </span>
        <nav className="nav" aria-label="Primary">
          <a href="https://github.com/ronin411" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56 4.56-1.52 7.84-5.83 7.84-10.9C23.5 5.65 18.35.5 12 .5z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/amaankhan41/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.31a2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z"/>
            </svg>
          </a>
          <a href="mailto:amaankhan.ak421@gmail.com" aria-label="Email" title="Email">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 4 L18 4 L18 16 L2 16 Z"/>
              <path d="M2 4 L10 10 L18 4"/>
            </svg>
          </a>
        </nav>
      </div>

      {/* Center */}
      <div className="center">
        <h1 className="name">AMAAN&nbsp;KHAN</h1>
        <div className="role">
          DATA ANALYST<span className="cursor" aria-hidden="true" />
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track" ref={trackRef} />
      </div>

      {/* Bottom bar */}
      <div className="bottombar">
        <span className="meta">
          BENGALURU, INDIA<span className="dot-sep">·</span>2025 B.TECH CS<span className="dot-sep">·</span>VIT VELLORE
        </span>
        <span className="availability">
          <span className="pulse" aria-hidden="true" />
          AVAILABLE FOR WORK
        </span>
      </div>
    </section>
  );
}
