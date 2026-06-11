'use client';

import { useEffect, useRef } from 'react';
import { FOOTER_ITEMS } from '@/lib/data';

export default function Footer() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function buildGroup() {
      const group = document.createElement('div');
      group.className = 'footer__group';
      FOOTER_ITEMS.forEach((label) => {
        const item = document.createElement('span');
        item.className = 'footer__item';
        item.textContent = label;
        const sep = document.createElement('span');
        sep.className = 'footer__sep';
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
    <footer className="footer">
      <div className="footer__marquee" aria-hidden="true">
        <div className="footer__track" ref={trackRef} />
      </div>
      <div className="footer__copy">
        &copy; 2025 Amaan Khan &middot; Built with Next.js
      </div>
    </footer>
  );
}
