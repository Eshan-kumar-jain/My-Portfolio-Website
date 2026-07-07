import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, .clickable";

export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let angle = 0;
    let lastTime = null;

    // Time-based animation targets so cursor speed stays constant even
    // when the browser throttles rAF below 60fps (macOS Low Power Mode,
    // background tabs, battery saver, etc.).
    const ROTATION_DEG_PER_SEC = 75;       // full revolution ≈ 4.8s
    const LERP_PER_FRAME_AT_60 = 0.12;     // baseline; converted to time-based factor below

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const tick = (time) => {
      // Frame delta in seconds, clamped to avoid huge jumps after the
      // tab becomes visible again or rAF was paused.
      const dt = lastTime == null ? 1 / 60 : Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Convert the per-frame lerp (which assumes 60fps) into a
      // time-based equivalent. Exponential decay form keeps the trail
      // feel identical at any frame rate.
      const lerpFactor = 1 - Math.pow(1 - LERP_PER_FRAME_AT_60, dt * 60);
      rx += (mx - rx) * lerpFactor;
      ry += (my - ry) * lerpFactor;
      angle = (angle + ROTATION_DEG_PER_SEC * dt) % 360;
      ring.style.transform = `translate(${rx}px, ${ry}px) rotate(${angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const onOver = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) {
        ring.classList.add("cursor-hover");
        dot.classList.add("cursor-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) {
        ring.classList.remove("cursor-hover");
        dot.classList.remove("cursor-hover");
      }
    };
    const onDown = () => dot.classList.add("cursor-down");
    const onUp = () => dot.classList.remove("cursor-down");
    const onLeaveWindow = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnterWindow = () => {
      ring.style.opacity = "";
      dot.style.opacity = "";
      forceCursorReapply();
    };

    // macOS Chrome/Safari "forgets" `cursor: none` when the pointer comes
    // back from the address bar or tab strip. Briefly toggling inline cursor
    // styles forces the engine to re-evaluate the cursor on the next frame.
    const forceCursorReapply = () => {
      document.documentElement.style.cursor = "none";
      document.body.style.cursor = "none";
      requestAnimationFrame(() => {
        document.documentElement.style.cursor = "";
        document.body.style.cursor = "";
      });
    };
    const onWindowFocus = () => forceCursorReapply();

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    window.addEventListener("focus", onWindowFocus);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      window.removeEventListener("focus", onWindowFocus);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        {/* Dotted perimeter rendered as an SVG so dot size and gap are
            controlled independently via stroke-dasharray. The 0.001/16
            pair with a round linecap renders each "dash" as a small
            circle separated by a 16-unit gap. */}
        <svg className="cursor-ring-svg" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray="7 11"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
