import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";

// Distance from the viewport bottom where the teaser text lands at the
// moment the ring completes and we navigate.
const PIN_BOTTOM = 110;
// Doc-distance buffer above the inner. Lives in CSS as .about-teaser's
// padding-top; mirrored here so the height math stays in sync.
const SECTION_PAD_TOP = 45;
// Extra scroll room past the navigate point so body's max scroll covers
// the ring's full 360°.
const HEIGHT_BUFFER = 100;
// How much scroll (in px) it takes for the ring to fill from 0 → 360°.
// Larger = less sensitive (the user must scroll farther per degree).
const RING_FILL_RANGE = 400;
// Shifts the entire ring-fill window later in the scroll, so the ring
// doesn't start filling the moment the teaser text peeks in.
const RING_START_DELAY = 200;

// Teaser section with a scroll-tracking ring. The inner stays in natural
// flow throughout so the doc-distance between the Contact email and the
// teaser heading never changes. The ring fills as the inner scrolls from
// "just entering the viewport" up to "teaser text just above the dock";
// when it completes 360°, navigate to /about.
export default function AboutTeaser() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const arcRef = useRef(null);
  const navigate = useNavigate();
  const triggeredRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    const arc = arcRef.current;
    if (!section || !inner || !arc) return;

    const updateLayout = () => {
      const innerH = inner.offsetHeight;
      // Just enough height for the user to scroll the inner all the way
      // through the ring-fill range (including the start delay), plus a
      // small buffer.
      section.style.height =
        `${SECTION_PAD_TOP + innerH + PIN_BOTTOM + RING_START_DELAY + HEIGHT_BUFFER}px`;
    };

    const onScroll = () => {
      const vh = window.innerHeight;
      const innerH = inner.offsetHeight;
      // Ring fill ends RING_START_DELAY pixels past the moment the teaser
      // text reaches PIN_BOTTOM above the viewport bottom (= the navigate
      // point). It starts RING_FILL_RANGE pixels of scroll earlier.
      const ringEnd =
        section.offsetTop + SECTION_PAD_TOP + innerH - vh + PIN_BOTTOM + RING_START_DELAY;
      const ringStart = ringEnd - RING_FILL_RANGE;
      const range = Math.max(1, ringEnd - ringStart);
      const progress = Math.min(
        Math.max((window.scrollY - ringStart) / range, 0),
        1
      );
      arc.style.strokeDashoffset = String(100 - progress * 100);

      if (progress >= 1 && !triggeredRef.current) {
        triggeredRef.current = true;
        navigate("/about");
      }
    };

    const onResize = () => {
      updateLayout();
      onScroll();
    };

    updateLayout();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [navigate]);

  const { about } = SITE_CONTENT;

  return (
    <section className="about-teaser" id="about" ref={sectionRef}>
      <div className="about-teaser-inner" ref={innerRef}>
        <h2>{about.heading}</h2>
        <p>{about.sub}</p>

        <div className="scroll-circle scroll-circle-mini" aria-hidden="true">
          <svg className="scroll-circle-progress" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" fill="none"
                    stroke="currentColor" strokeWidth="6" opacity="0.15" />
            <circle ref={arcRef}
                    cx="100" cy="100" r="95" fill="none"
                    stroke="currentColor" strokeWidth="6"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                    transform="rotate(-90 100 100)" />
          </svg>
          <svg className="scroll-circle-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"
                  d="M5 12 h14 M13 6 l 6 6 l -6 6"/>
          </svg>
        </div>

        <p className="teaser-text">{about.teaser}</p>
      </div>
    </section>
  );
}
