import { useEffect, useRef, useState } from "react";

const TYPE_SPEED_MS = 70;
// Each intro fills exactly this much wall time, from mount to fully faded.
const TOTAL_INTRO_MS = 4000;
const INITIAL_DELAY_MS = 250;
const FADE_MS = 600; // matches the .intro opacity transition in CSS
const MIN_HOLD_MS = 250;

// Full-screen typewriter intro. Pass a `message` prop to change what's
// typed (defaults to the home-page greeting).
// Click anywhere (or press Esc / Enter / Space) to skip.
export default function IntroOverlay({ message = "Hi, my name is Eshan Kumar Jain", className = "" }) {
  const MESSAGE = message;
  const [typed, setTyped] = useState("");
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const doneRef = useRef(false);

  // Screen size for the perimeter-tracing gradient (read once on mount).
  const [dims] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 720,
  }));
  // Typing time is bounded by the total budget. For very long messages,
  // the per-character speed shrinks so typing fits; for short messages
  // the hold expands to fill the budget.
  const typingBudget = TOTAL_INTRO_MS - INITIAL_DELAY_MS - FADE_MS - MIN_HOLD_MS;
  const typeSpeed = MESSAGE.length * TYPE_SPEED_MS <= typingBudget
    ? TYPE_SPEED_MS
    : typingBudget / MESSAGE.length;
  const typingMs = MESSAGE.length * typeSpeed;
  const HOLD_AFTER_MS = TOTAL_INTRO_MS - INITIAL_DELAY_MS - FADE_MS - typingMs;
  // Perimeter trace finishes the moment dismiss is called (start of fade).
  const traceMs = INITIAL_DELAY_MS + typingMs + HOLD_AFTER_MS;

  // Perimeter trace geometry. Inset by half the stroke width so the thick
  // line sits flush against the screen edge yet stays fully visible.
  const STROKE = 6;
  const i = STROKE / 2;
  const { w, h } = dims;
  // Rounded corners so the dash doesn't jerk direction at 90° turns.
  const R = Math.min(28, Math.min(w, h) / 12);
  // Full perimeter loop with quarter-circle arcs at each corner, starting
  // from the middle of the top edge and going clockwise.
  const tracePath = [
    `M ${w / 2} ${i}`,
    `L ${w - i - R} ${i}`,
    `A ${R} ${R} 0 0 1 ${w - i} ${i + R}`,
    `L ${w - i} ${h - i - R}`,
    `A ${R} ${R} 0 0 1 ${w - i - R} ${h - i}`,
    `L ${i + R} ${h - i}`,
    `A ${R} ${R} 0 0 1 ${i} ${h - i - R}`,
    `L ${i} ${i + R}`,
    `A ${R} ${R} 0 0 1 ${i + R} ${i}`,
    `L ${w / 2} ${i}`,
  ].join(' ');
  // Visible moving segment ≈ 2/3 of the screen height, expressed in the
  // path's normalized 1000-unit length so it travels the whole perimeter.
  // Arcs shorten the perimeter slightly vs. a hard rectangle.
  const perim = 2 * (w + h) - (8 - 2 * Math.PI) * R;
  const segLen = (2 / 3) * h;
  const segUnits = (segLen / perim) * 1000;
  // A 45° repeating gradient: projected equally onto horizontal and
  // vertical edges, so the moving line always shows the full
  // violet→purple→blue→cyan run no matter where it is on the perimeter.
  const gradPeriod = segLen;
  // Travel range. Start slightly ahead of the top-middle start point and
  // finish slightly before the segment fully exits.
  const lead = 150;
  const traceFrom = segUnits - lead;
  const traceTo = -1000 + lead;

  // Type out letters one at a time
  useEffect(() => {
    let i = 0;
    let timeoutId;
    const tick = () => {
      if (doneRef.current) return;
      if (i < MESSAGE.length) {
        i += 1;
        setTyped(MESSAGE.slice(0, i));
        timeoutId = setTimeout(tick, typeSpeed);
      } else {
        timeoutId = setTimeout(dismiss, HOLD_AFTER_MS);
      }
    };
    timeoutId = setTimeout(tick, INITIAL_DELAY_MS);
    document.body.classList.add("intro-active");
    return () => {
      clearTimeout(timeoutId);
      document.body.classList.remove("intro-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setHidden(true);
    document.body.classList.remove("intro-active");
    setTimeout(() => setRemoved(true), 700);
  };

  // Keyboard skip
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (removed) return null;

  return (
    <div
      className={`intro${className ? " " + className : ""}${hidden ? " hidden" : ""}`}
      role="presentation"
      onClick={dismiss}
    >
      <svg
        className="intro-trace"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="introTraceGrad"
            gradientUnits="userSpaceOnUse"
            spreadMethod="repeat"
            x1="0"
            y1="0"
            x2={gradPeriod}
            y2={gradPeriod}
          >
            <stop offset="0%"   style={{ stopColor: "var(--intro-stop-edge)" }} />
            <stop offset="25%"  style={{ stopColor: "var(--intro-stop-mid)" }} />
            <stop offset="50%"  style={{ stopColor: "var(--intro-stop-peak)" }} />
            <stop offset="75%"  style={{ stopColor: "var(--intro-stop-mid)" }} />
            <stop offset="100%" style={{ stopColor: "var(--intro-stop-edge)" }} />
          </linearGradient>
        </defs>
        <path
          className="intro-trace-path"
          d={tracePath}
          pathLength="1000"
          style={{
            strokeDasharray: `${segUnits} 1000`,
            animationDuration: `${traceMs}ms`,
            "--trace-from": traceFrom,
            "--trace-to": traceTo,
          }}
        />
      </svg>
      <div className="intro-inner">
        <span className="intro-text-anim">{typed}</span>
        <span className="intro-caret">_</span>
      </div>
      <p className="intro-skip">click to skip</p>
    </div>
  );
}
