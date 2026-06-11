'use client';

import { useEffect, useRef, useState } from 'react';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let last = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const delta = y - last;
      nav!.classList.toggle('is-top', y < 80);
      if (Math.abs(delta) > 6) {
        if (delta > 0 && y > 120) {
          nav!.classList.add('is-hidden');
          setDrawerOpen(false);
        } else if (delta < 0) {
          nav!.classList.remove('is-hidden');
        }
        last = y;
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className="topnav is-top" ref={navRef} id="topnav" aria-label="Section navigation">
        <div className="topnav__inner">
          <a href="#home" className="topnav__brand" aria-label="Amaan Khan — home">AK</a>

          <div className="topnav__links">
            <a href="#about">About</a><span className="topnav__sep">·</span>
            <a href="#impact">Impact</a><span className="topnav__sep">·</span>
            <a href="#journey">Journey</a><span className="topnav__sep">·</span>
            <a href="#stack">Stack</a><span className="topnav__sep">·</span>
            <a href="#projects">Projects</a><span className="topnav__sep">·</span>
            <a href="#contact">Contact</a>
          </div>

          <button
            className="topnav__menu"
            aria-expanded={drawerOpen}
            aria-controls="navDrawer"
            aria-label="Toggle menu"
            onClick={() => setDrawerOpen(o => !o)}
          >
            <span className="hamburger" aria-hidden="true">
              <span /><span /><span />
            </span>
          </button>
        </div>
      </nav>

      <div className={`topnav__drawer${drawerOpen ? ' is-open' : ''}`} id="navDrawer" role="menu">
        <a href="#about"    role="menuitem" onClick={closeDrawer}>About</a>
        <a href="#impact"   role="menuitem" onClick={closeDrawer}>Impact</a>
        <a href="#journey"  role="menuitem" onClick={closeDrawer}>Journey</a>
        <a href="#stack"    role="menuitem" onClick={closeDrawer}>Stack</a>
        <a href="#projects" role="menuitem" onClick={closeDrawer}>Projects</a>
        <a href="#contact"  role="menuitem" onClick={closeDrawer}>Contact</a>
      </div>
    </>
  );
}
