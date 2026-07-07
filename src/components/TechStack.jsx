import { useEffect, useRef } from "react";
import { SITE_CONTENT } from "../data/content.js";

// One horizontal row of skill tiles. The track is duplicated and animated
// via `transform: translateX` (GPU-composited, identical behavior across
// browsers). When the offset reaches the width of one copy we wrap it back
// so the loop is seamless.
//
// Prior versions drove this via `scrollLeft` on the container, but iOS
// Safari's compositing of masked overflow:auto containers broke sub-pixel
// scrollLeft updates — the row appeared frozen on real phones (but not in
// DevTools mobile preview, since that uses the desktop renderer).
//
// We deliberately do NOT gate the tick on `body.intro-active`. On
// backgrounded tabs (Ctrl-click new tab, restored session, public-PC
// Chrome) the intro's setTimeout chain can stall, leaving `intro-active`
// on body forever; that would freeze the marquee while the page's CSS-
// engine animations keep running. The intro overlay covers the viewport
// at z-index 5000 anyway, so animating underneath it is invisible.
function MarqueeRow({ items, direction }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const interacting = useRef(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startPos = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const dir = direction === "right" ? -1 : 1;
    const speedPxPerMs = 0.04;                          // ~40 px/s
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Half-width = width of one copy of the items (track has two copies).
    // Measured lazily because lazy-loaded <img> tags don't have width until
    // they decode; we remeasure as each image loads.
    let halfWidth = track.scrollWidth / 2;
    const remeasure = () => { halfWidth = track.scrollWidth / 2; };
    const imgs = Array.from(track.querySelectorAll("img"));
    const onImgLoad = () => remeasure();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImgLoad);
    });

    // Right-going rows start fully scrolled (so they can move toward 0
    // and wrap on the negative edge). Left-going rows start at 0.
    posRef.current = direction === "right" ? -halfWidth : 0;
    track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;

    let rafId;
    let lastTime = null;
    const tick = (time) => {
      if (
        lastTime != null &&
        !interacting.current &&
        !prefersReducedMotion &&
        halfWidth > 0
      ) {
        const dt = time - lastTime;
        // dir = +1 (left): track moves left → translateX decreases
        // dir = -1 (right): track moves right → translateX increases
        posRef.current -= speedPxPerMs * dt * dir;
        if (posRef.current <= -halfWidth) posRef.current += halfWidth;
        else if (posRef.current >= 0) posRef.current -= halfWidth;
        track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      }
      lastTime = time;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
    };
  }, [direction]);

  // Pause on hover only applies to actual mouse pointers. iOS Safari
  // fires pointerenter on touchstart but rarely fires pointerleave when
  // the finger lifts, which would freeze the marquee.
  const onPointerEnter = (e) => {
    if (e.pointerType === "mouse") interacting.current = true;
  };
  const onPointerLeave = (e) => {
    if (e.pointerType === "mouse") {
      interacting.current = false;
      dragging.current = false;
    }
  };
  const onPointerDown = (e) => {
    const el = containerRef.current;
    dragging.current = true;
    interacting.current = true;
    startX.current = e.clientX;
    startPos.current = posRef.current;
    try { el.setPointerCapture(e.pointerId); } catch {}
    e.preventDefault();
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const delta = e.clientX - startX.current;
    posRef.current = startPos.current + delta;
    const half = track.scrollWidth / 2;
    if (posRef.current <= -half) {
      posRef.current += half;
      startPos.current += half;
    } else if (posRef.current >= 0) {
      posRef.current -= half;
      startPos.current -= half;
    }
    track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
  };
  const onPointerUp = (e) => {
    const el = containerRef.current;
    dragging.current = false;
    // Touch: pointerleave is unreliable — clear `interacting` explicitly
    // so auto-scroll resumes the next frame.
    if (e.pointerType !== "mouse") interacting.current = false;
    try { el && el.releasePointerCapture(e.pointerId); } catch {}
  };

  const renderItem = (t, key) => (
    <div className="tech-item" key={key}>
      <img src={t.icon} alt={t.name} loading="lazy" draggable={false} />
      <span>{t.name}</span>
    </div>
  );

  return (
    <div
      className="tech-marquee"
      ref={containerRef}
      data-direction={direction}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="tech-marquee-track" ref={trackRef}>
        {items.map((t, i) => renderItem(t, `a${i}`))}
        {items.map((t, i) => renderItem(t, `b${i}`))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="tech-stack" id="tech">
      <h2>{"{ TECH STACK }"}</h2>
      <div className="tech-container">
        {SITE_CONTENT.tech.map((group, idx) => (
          <div key={group.category} className="tech-category">
            <h3 className="tech-category-name">{group.category}</h3>
            <MarqueeRow
              items={group.items}
              direction={idx % 2 === 0 ? "left" : "right"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
