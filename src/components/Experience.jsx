import { Link } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";
import { useFadeInOnScroll } from "../hooks/useFadeIn.js";

// One accent color per row, cycled if there are more than the array length.
// Green (#10b981) is reserved for the "View Full Resume" CTA, so it's omitted here.
const ROW_COLORS = ["#f59e0b", "#d71e28", "#a78bfa", "#22d3ee"];

// Home-page timeline shows only these companies; the Resume page renders all
// entries from SITE_CONTENT.experience.
const HOME_COMPANIES = new Set([
  "HDFC Bank Ltd",
]);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <path d="M5 12 h14 M13 6 l 6 6 l -6 6" />
  </svg>
);

export default function Experience() {
  useFadeInOnScroll(".experience .exp-item");
  const experience = SITE_CONTENT.experience.filter((e) =>
    HOME_COMPANIES.has(e.company)
  );

  return (
    <section className="experience" id="experience">
      <h2>EXPERIENCE</h2>
      <div className="experience-items">
        {experience.map((e, i) => {
          const color = ROW_COLORS[i % ROW_COLORS.length];
          return (
            <div
              className="exp-item"
              key={e.title + e.company}
              style={{ "--exp-color": color }}
            >
              <span className="exp-marker" aria-hidden="true"></span>

              {/* Faint watermark logo, clipped to the card shape */}
              {e.logo ? (
                <div className="exp-watermark-clip" aria-hidden="true">
                  <img className="exp-logo-watermark" src={e.logo} alt="" />
                </div>
              ) : null}

              <div className="exp-content">
                <div className="exp-content-left">
                  <div className="exp-index">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="exp-title">{e.title}</h3>
                  {e.logo ? (
                    <img
                      className="exp-logo-inline"
                      src={e.logo}
                      alt={`${e.company} logo`}
                      loading="lazy"
                    />
                  ) : null}
                  <p className="exp-company">{e.company}</p>
                </div>

                <div className="exp-content-right">
                  {e.shortName ? (
                    <div className="exp-shortname">{e.shortName}</div>
                  ) : null}
                  <div className="exp-date-end">{e.endDate}</div>
                  <span className="exp-bar" aria-hidden="true"></span>
                  <div className="exp-date-start">{e.startDate}</div>
                  {e.type ? (
                    <div className="exp-type">{e.type}</div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}

        {/* Resume CTA — styled as a final timeline item with a green dot */}
        <Link
          className="resume-banner"
          to="/resume"
          style={{ "--exp-color": "#10b981" }}
        >
          <span className="exp-marker" aria-hidden="true"></span>
          <div className="resume-banner-text">
            <span className="resume-banner-label">
              Interested in the full story?
            </span>
            <span className="resume-banner-title">View Full Resume</span>
          </div>
          <span className="resume-banner-arrow">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}
