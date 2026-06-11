'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ROLES, EXP_CARDS } from '@/lib/data';

const COMPANY_ICONS: Record<string, string> = {
  tunez: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="12" height="9" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6 5V3.5C6 3 6.5 2.5 7 2.5h2c.5 0 1 .5 1 1V5" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="2" y1="9" x2="14" y2="9" stroke="currentColor" stroke-width="1.3"/></svg>`,
  aligner: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3.2c-1.5 0-2.5 1-2.5 2.5 0 .5.2 1 .5 1.4-.7.4-1 1.1-1 1.9s.4 1.6 1.2 1.9c.2 1.4 1.3 2.3 2.8 2.3 1 0 1.7-.5 2-1 .3.5 1 1 2 1 1.5 0 2.6-.9 2.8-2.3.8-.3 1.2-1.1 1.2-1.9s-.3-1.5-1-1.9c.3-.4.5-.9.5-1.4 0-1.5-1-2.5-2.5-2.5-1 0-1.7.5-2 1-.3-.5-1-1-2-1z" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="3.2" x2="8" y2="13.2" stroke="currentColor" stroke-width="0.9" opacity="0.5"/></svg>`,
  outlier: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="5.5" y="5.5" width="5" height="5" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="1" y1="6" x2="3" y2="6" stroke="currentColor" stroke-width="1.2"/><line x1="1" y1="10" x2="3" y2="10" stroke="currentColor" stroke-width="1.2"/><line x1="13" y1="6" x2="15" y2="6" stroke="currentColor" stroke-width="1.2"/><line x1="13" y1="10" x2="15" y2="10" stroke="currentColor" stroke-width="1.2"/></svg>`,
  vit: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1 6L8 3l7 3-7 3-7-3z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M4 7.6v3c0 1 2 1.9 4 1.9s4-.9 4-1.9v-3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="14" y1="6.6" x2="14" y2="10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
};

const COL_MAX_WIDTH = 200;
// Centers at 1/8 intervals → 12.5 / 37.5 / 62.5 / 87.5 %
const COL_PCTS      = [0.125, 0.375, 0.625, 0.875];
const MOBILE_COLS   = 560;   // canvas px below which 2×2 grid kicks in

interface ColLayout { left: number; top: number; width: number; }
interface Layout {
  isMobile: boolean;
  cols: ColLayout[];
  anchors: { x1: number; y1: number; x2: number; y2: number }[];
}

function computeLayout(w: number, activeKey: string | null): Layout {
  if (w > 0 && w < MOBILE_COLS) {
    const pad = 12, gap = 8;
    const half = Math.floor((w - pad * 2 - gap) / 2);
    const x0 = pad, x1 = pad + half + gap;
    const row1 = 200, row2 = 360;
    const cx = w / 2;

    // Grid positions (used for SVG anchors regardless of active state)
    const grid: ColLayout[] = [
      { left: x0, top: row1, width: half },
      { left: x1, top: row1, width: half },
      { left: x0, top: row2, width: half },
      { left: x1, top: row2, width: half },
    ];

    // Active column: move to top-center below root node, full width
    const fullW = w - pad * 2;
    const cols = grid.map((c, i) =>
      ROLES[i].key === activeKey
        ? { left: pad, top: 160, width: fullW }
        : c
    );

    return {
      isMobile: true,
      cols,
      anchors: grid.map(c => ({
        x1: cx, y1: 120, x2: c.left + c.width / 2, y2: c.top,
      })),
    };
  }

  // Desktop: 4 columns at 12.5/37.5/62.5/87.5% of canvas width.
  // Column width is the smaller of COL_MAX_WIDTH or (canvas/4 - 12px gap),
  // which guarantees zero overlap at any canvas size.
  const edgePad = 8;
  const colW    = Math.min(COL_MAX_WIDTH, Math.floor(w / 4) - 12);

  const cols: ColLayout[] = COL_PCTS.map(pct => {
    const cx   = pct * w;
    const left = Math.max(edgePad, Math.min(cx - colW / 2, w - colW - edgePad));
    return { left, top: 230, width: colW };
  });

  return {
    isMobile: false,
    cols,
    anchors: cols.map(c => ({
      x1: w / 2, y1: 120, x2: c.left + c.width / 2, y2: c.top,
    })),
  };
}

export default function Experience() {
  const [isExpanded, setIsExpanded]           = useState(false);
  const [activeCompany, setActiveCompany]     = useState<string | null>(null);
  const [expandedCards, setExpandedCards]     = useState<Set<string>>(new Set());
  const [canvasWidth, setCanvasWidth]         = useState(0);
  const [isGrabbing, setIsGrabbing]           = useState(false);
  const [isCanvasRevealed, setIsCanvasRevealed] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);

  /* ── scroll reveal ──
     The canvas has a dynamic className, so React will overwrite the entire
     class attribute on every state change — stripping any `is-visible` that
     the IO added imperatively. We track reveal in state instead so it
     survives re-renders.  Static-className siblings (journey-left) are fine
     to handle the old way since React won't touch unchanged props.          */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal');
    if (!els || !('IntersectionObserver' in window)) {
      els?.forEach(el => el.classList.add('is-visible'));
      setIsCanvasRevealed(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          if (e.target === canvasRef.current) setIsCanvasRevealed(true);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── measure canvas width via ResizeObserver ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvasWidth(canvas.clientWidth);
    const ro = new ResizeObserver(entries => {
      setCanvasWidth(entries[0].contentRect.width);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  /* ── drag-to-pan ── */
  const isDraggingRef  = useRef(false);
  const dragStartedRef = useRef(false);
  const startPosRef    = useRef({ x: 0, y: 0 });
  const baseScrollRef  = useRef({ left: 0, top: 0 });

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('button, .exp-card-v2, [role="button"], a')) return;
    if (e.button !== 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDraggingRef.current  = true;
    dragStartedRef.current = false;
    startPosRef.current    = { x: e.clientX, y: e.clientY };
    baseScrollRef.current  = { left: canvas.scrollLeft, top: canvas.scrollTop };
    canvas.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    if (!dragStartedRef.current && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      dragStartedRef.current = true;
      setIsGrabbing(true);
    }
    if (dragStartedRef.current) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.scrollLeft = baseScrollRef.current.left - dx;
      canvas.scrollTop  = baseScrollRef.current.top  - dy;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current  = false;
    dragStartedRef.current = false;
    setIsGrabbing(false);
  }, []);

  /* ── interaction handlers ── */
  const handleRootClick = useCallback(() => {
    if (isExpanded) {
      setIsExpanded(false);
      setActiveCompany(null);
      setExpandedCards(new Set());
    } else {
      setIsExpanded(true);
    }
  }, [isExpanded]);

  const handleCompanyClick = useCallback((key: string) => {
    if (activeCompany === key) {
      setActiveCompany(null);
      setExpandedCards(new Set());
    } else {
      setActiveCompany(key);
      setExpandedCards(new Set());
    }
  }, [activeCompany]);

  const handleCardToggle = useCallback((cardId: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      return next;
    });
  }, []);

  const handleRoleClick = useCallback((key: string) => {
    setIsExpanded(true);
    setActiveCompany(key);
    setExpandedCards(new Set());
  }, []);

  /* ── computed layout ── */
  const w      = canvasWidth > 0 ? canvasWidth : 900;
  const layout = computeLayout(w, activeCompany);
  const cx     = w / 2;

  const canvasClass = [
    'exp-canvas reveal',
    isCanvasRevealed ? 'is-visible' : '',
    isExpanded ? 'is-state-companies' : 'is-state-root',
    isGrabbing ? 'is-grabbing' : '',
  ].filter(Boolean).join(' ');

  return (
    <section className="journey" id="journey" ref={sectionRef}>
      <div className="journey__inner">
        <div className="journey__grid">

          {/* LEFT — role list */}
          <aside className="journey-left reveal">
            <span className="journey-left__kicker">Journey</span>
            <h2 className="journey-left__title">Experience</h2>

            <ol className="j-role-list" id="roleList">
              {ROLES.map(r => (
                <li
                  key={r.key}
                  className={`j-role${activeCompany === r.key ? ' is-active' : ''}`}
                  data-key={r.key}
                  style={{ '--col': r.col } as React.CSSProperties}
                  onClick={() => handleRoleClick(r.key)}
                >
                  <span className="j-role__sq" aria-hidden="true" />
                  <span className="j-role__date">{r.date}</span>
                  <span className="j-role__company">{r.company}</span>
                  <span className="j-role__title">{r.title}</span>
                  <div className="j-role__bullets">
                    <ul>
                      {EXP_CARDS[r.key]?.map((c, i) => (
                        <li key={i}>
                          <span className="title">{c.title}</span>
                          {c.bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          {/* RIGHT — interactive canvas */}
          <div className="journey-right">
            <div className="exp-header">
              <span className="exp-header__label">Experience Canvas</span>
              <hr className="exp-header__rule" />
            </div>

            <div
              className={canvasClass}
              data-active={activeCompany ?? undefined}
              data-delay="1"
              id="expCanvas"
              ref={canvasRef}
              aria-label="Career timeline canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <div className="exp-canvas__inner" id="expInner">

                {/* SVG connecting lines */}
                <svg
                  className="exp-lines"
                  width={w}
                  height="1100"
                  viewBox={`0 0 ${w} 1100`}
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {ROLES.map((r, i) => {
                    const a = layout.anchors[i];
                    return (
                      <line
                        key={r.key}
                        className={`line line--${r.key}`}
                        x1={a?.x1 ?? cx} y1={a?.y1 ?? 120}
                        x2={a?.x2 ?? cx} y2={a?.y2 ?? 232}
                        pathLength="800"
                      />
                    );
                  })}
                </svg>

                {/* Root node */}
                <button
                  className="root-node"
                  id="rootNode"
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={(e) => { e.stopPropagation(); handleRootClick(); }}
                >
                  <span className="root-node__avatar" aria-hidden="true">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="6" r="3" fill="none" stroke="#f59e0b" strokeWidth="1.4" />
                      <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" fill="none" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="root-node__body">
                    <span className="root-node__name">Amaan Khan</span>
                    <span className="root-node__hint">Click to explore career</span>
                  </span>
                  {/* always rendered — CSS hides pulse when expanded */}
                  <span className="root-node__pulse" aria-hidden="true" />
                </button>
                {/* Hint lives outside the button so it isn't clipped by button overflow */}
                <span className="root-explore-hint" aria-hidden="true">↓ Click to explore my career journey</span>

                {/* Company columns */}
                {ROLES.map((r, i) => {
                  const isActive = activeCompany === r.key;
                  const col      = layout.cols[i];
                  return (
                    <div
                      key={r.key}
                      className={`column${isActive ? ' is-active' : ''}`}
                      data-key={r.key}
                      style={{
                        '--col': r.col,
                        left:  col ? col.left  + 'px' : undefined,
                        top:   col ? col.top   + 'px' : undefined,
                        width: col ? col.width + 'px' : undefined,
                      } as React.CSSProperties}
                    >
                      <div
                        className="company-node"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCompanyClick(r.key)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleCompanyClick(r.key);
                          }
                        }}
                      >
                        <span
                          className="company-node__icon"
                          aria-hidden="true"
                          dangerouslySetInnerHTML={{ __html: COMPANY_ICONS[r.key] }}
                          style={{ color: r.col }}
                        />
                        <span className="company-node__body">
                          <span className="company-node__name">{r.company}</span>
                          <span className="company-node__dates">{r.date}</span>
                        </span>
                        <span
                          className="company-node__badge"
                          aria-label={`${EXP_CARDS[r.key]?.length ?? 0} achievements`}
                        >
                          {EXP_CARDS[r.key]?.length ?? 0}
                        </span>
                      </div>

                      <div className="card-stack" data-stack={r.key}>
                        {EXP_CARDS[r.key]?.map((c, j) => {
                          const cardId       = `${r.key}-${j}`;
                          const isCardOpen   = expandedCards.has(cardId);
                          const hasStar      = (t: string) => t.includes('⭐');
                          const techLabel    = c.techCount + (c.techCount === 1 ? ' tech' : ' techs');
                          return (
                            <div
                              key={cardId}
                              className={`exp-card-v2${isCardOpen ? ' is-expanded' : ''}`}
                              tabIndex={0}
                              role="button"
                              aria-expanded={isCardOpen}
                              onClick={() => handleCardToggle(cardId)}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleCardToggle(cardId);
                                }
                              }}
                            >
                              <div className="exp-card-v2__tags">
                                {c.tags.map(t => (
                                  <span key={t} className={`tag-mini${hasStar(t) ? ' is-star' : ''}`}>{t}</span>
                                ))}
                              </div>
                              <h4 className="exp-card-v2__title">{c.title}</h4>
                              <div className="exp-card-v2__row">
                                <span className="exp-card-v2__bullet">{c.bullet}</span>
                                <span className="exp-card-v2__count">{techLabel}</span>
                              </div>
                              <div className="exp-card-v2__detail">
                                <ul>
                                  {c.details.map((d, di) => <li key={di}>{d}</li>)}
                                </ul>
                                {c.stack.length > 0 && (
                                  <div className="exp-card-v2__stack">
                                    {c.stack.map(s => (
                                      <span key={s} className="tag-mini">{s}</span>
                                    ))}
                                  </div>
                                )}
                                <div className="exp-card-v2__collapse">
                                  Collapse <span className="arrow">↑</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* BACK button — mobile only, outside inner so it stays fixed to canvas viewport */}
              {layout.isMobile && activeCompany && (
                <button
                  className="mob-back"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCompany(null);
                    setExpandedCards(new Set());
                  }}
                >
                  ← BACK
                </button>
              )}

              <span className="exp-hint">Scroll or drag to explore</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
