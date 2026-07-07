// Rotating "scroll down" SVG used at the bottom of the hero.
// Clicking anywhere in the circle scrolls smoothly to the Tech Stack section.
export default function ScrollCircle() {
  const onClick = () => {
    const el = document.getElementById("tech");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="scroll-circle"
      role="button"
      tabIndex={0}
      aria-label="Scroll to tech stack"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <svg className="scroll-circle-text" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path
            id="scrollCirclePath"
            d="M 100,30 a 70,70 0 0,1 0,140 a 70,70 0 0,1 0,-140"
          />
        </defs>
        <text
          className="scroll-circle-label"
          fontFamily="Inter, system-ui, -apple-system, Helvetica, Arial, sans-serif"
          textLength="420"
          lengthAdjust="spacingAndGlyphs"
        >
          <textPath href="#scrollCirclePath" startOffset="0">
            {"Scroll Down ★ Scroll Down ★"}
          </textPath>
        </text>
      </svg>
      <svg className="scroll-circle-arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4 v15 M6 13 l 6 6 l 6 -6"
        />
      </svg>
    </div>
  );
}
