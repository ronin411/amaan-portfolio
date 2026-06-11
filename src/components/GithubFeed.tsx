'use client';

import { useEffect, useRef, useState } from 'react';

const USER = 'ronin411';
const REFRESH_MS = 5 * 60 * 1000;

const LOCK_ICON = (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="10" height="7" rx="1.2"/>
    <path d="M5 7 V5 a3 3 0 0 1 6 0 V7"/>
    <circle cx="8" cy="10.5" r="0.9" fill="currentColor" stroke="none"/>
  </svg>
);

type FeedRow = { repo: string; sha: string; date: string };

function fmtDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function GithubFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const [rows, setRows]   = useState<FeedRow[] | null>(null);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !('IntersectionObserver' in window)) return;
    let loaded = false;
    let intervalId: ReturnType<typeof setInterval>;

    async function load() {
      try {
        const res = await fetch(`https://api.github.com/users/${USER}/events/public`, {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!res.ok) throw new Error('http ' + res.status);
        const data = await res.json();
        const pushes = (data as any[]).filter(e => e.type === 'PushEvent').slice(0, 5);
        if (!pushes.length) { setError(true); return; }
        setRows(pushes.map(e => {
          const commits = e.payload?.commits ?? [];
          const sha = commits.length ? String(commits[commits.length - 1].sha).slice(0, 7) : '';
          return { repo: '[CLASSIFIED]', sha, date: fmtDate(e.created_at) };
        }));
      } catch {
        setError(true);
      }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !loaded) {
          loaded = true;
          load();
          intervalId = setInterval(load, REFRESH_MS);
          io.disconnect();
        }
      });
    }, { threshold: 0.1 });
    io.observe(card);
    return () => { io.disconnect(); if (intervalId) clearInterval(intervalId); };
  }, []);

  return (
    <section className="live-feed section-grid" id="live" ref={sectionRef}>
      <div className="live-feed__inner">

        <div className="live-left reveal">
          <span className="live-left__kicker">LIVE</span>
          <h2 className="live-left__title">GitHub Activity</h2>
          <div className="live-left__status">
            <span className="live-badge">
              <span className="live-badge__dot" aria-hidden="true" />
              LIVE
            </span>
            <span className="live-left__sub">Live Feed · 5 min cache</span>
          </div>
          <span className="live-left__source">Source: GitHub API</span>
        </div>

        <div className="live-right reveal" data-delay="1">
          <div className="feed-card" ref={cardRef} aria-live="polite">
            <div className="feed-list">
              {!rows && !error && (
                <div className="feed-loading">Fetching latest commits</div>
              )}
              {error && (
                <div className="feed-empty">FEED UNAVAILABLE</div>
              )}
              {rows?.map((row, i) => (
                <div className="feed-row" key={i}>
                  <span className="feed-row__icon" aria-hidden="true">{LOCK_ICON}</span>
                  <span className="feed-row__meta">
                    <span className="feed-row__repo">{row.repo}</span>
                    {row.sha && <span className="feed-row__sha">{row.sha}</span>}
                  </span>
                  {row.date && <span className="feed-row__date">{row.date}</span>}
                  <span className="feed-row__msg">[REDACTED]</span>
                </div>
              ))}
            </div>
            <div className="feed-foot">
              <a href={`https://github.com/${USER}`} target="_blank" rel="noopener">
                View Profile <span className="arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
