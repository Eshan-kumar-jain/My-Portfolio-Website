import { useEffect, useState } from "react";

const ADVANCE_MS = 4000;

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <path d="M15 6 l-6 6 l 6 6" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <path d="M9 6 l 6 6 l -6 6" />
  </svg>
);

// Auto-advancing image carousel. Shows a "1 / N" counter in the top-right
// and a row of progress dots at the bottom. Loops infinitely. Reveals
// prev / next chevron buttons on hover.
export default function Slideshow({ images }) {
  const total = images.length;
  const [index, setIndex] = useState(0);

  // The interval depends on `index`, so any manual nav (prev/next click)
  // also resets the 4-second timer — no jarring instant advance after a tap.
  useEffect(() => {
    if (total <= 1) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, ADVANCE_MS);
    return () => clearTimeout(id);
  }, [index, total]);

  if (total === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="slideshow">
      <div className="slideshow-stage">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`Slide ${i + 1} of ${total}`}
            className={`slideshow-img${i === index ? " active" : ""}`}
            draggable={false}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        <div className="slideshow-counter">
          {index + 1} / {total}
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              className="slideshow-nav prev"
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="slideshow-nav next"
              onClick={next}
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          </>
        ) : null}

        <div className="slideshow-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`slideshow-dot${i === index ? " active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
