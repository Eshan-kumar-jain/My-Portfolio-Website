import { Link } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";
import { useFadeInOnScroll } from "../hooks/useFadeIn.js";
import { slugify } from "../pages/ProjectDetailPage.jsx";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <path d="M5 12 h14 M13 6 l 6 6 l -6 6" />
  </svg>
);

// Home-page Featured Projects whitelist. The /projects page renders the
// full SITE_CONTENT.projects array in its declared order; this set picks
// which three appear on the home page without touching that order.
const HOME_FEATURED = new Set(["WealthIQ", "Multi-Class Skin Disease Classification", "Path to AI Engineer"]);

export default function Projects() {
  useFadeInOnScroll(".projects .project-card");
  const { projects } = SITE_CONTENT;
  const featured = projects.filter((p) => HOME_FEATURED.has(p.title));

  return (
    <section className="projects" id="projects">
      <h2>FEATURED PROJECTS</h2>
      <div className="projects-grid">
        {featured.map((p) => (
          <div className="project-card" key={p.title}>
            <Link
              className="project-card-inner"
              to={`/projects/${slugify(p.title)}`}
              aria-label={`Open ${p.title} project details`}
            >
              <div className="project-card-head">
                <h3>{p.title}</h3>
                <span className="project-arrow" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </div>
              {p.badge ? <p className="project-badge">{p.badge}</p> : null}
              <p>{p.description}</p>
              {(p.image || p.logo) ? (
                <div className="project-thumb">
                  <img src={p.image || p.logo} alt={`${p.title} preview`} loading="lazy" />
                </div>
              ) : null}
            </Link>
            {p.links?.live && (
              <div className="project-card-actions">
                <a
                  className="my-project-live-btn"
                  href={p.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                       aria-hidden="true" width="14" height="14">
                    <path d="M14 4h6v6" /><path d="M20 4 12 12" />
                    <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
                  </svg>
                  Live Demo
                </a>
              </div>
            )}
          </div>
        ))}

        <Link className="project-card project-more" to="/projects">
          <h3 className="more-title">
            More <ArrowIcon />
          </h3>
          <p className="more-subtitle">Checkout all my projects</p>
        </Link>
      </div>
    </section>
  );
}
