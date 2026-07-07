import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";
import FooterDock from "../components/FooterDock.jsx";
import IntroOverlay from "../components/IntroOverlay.jsx";
import Certifications from "../components/Certifications.jsx";
import { slugify } from "./ProjectDetailPage.jsx";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <path d="M1 12 h16 M12 6 l 6 6 l -6 6" />
  </svg>
);

const PlayTriangle = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M7 4 L20 12 L7 20 Z" />
  </svg>
);

const hasTag = (p, tags) =>
  Array.isArray(p.categories) &&
  p.categories.some((c) => tags.includes(c));

const FILTERS = [
  { label: "All",                   match: () => true },
  { label: "🏁 Hackathon Submission", match: (p) => hasTag(p, ["Hackathon-Submission", "Hackathon Submission"]) },
  { label: "🌐 Web App",            match: (p) => hasTag(p, ["Web-App", "Web App"]) },
  { label: "🧩 Chrome Extension",   match: (p) => hasTag(p, ["Browser Extension", "Chrome Extension"]) },
  { label: "🔒 Privacy & Security", match: (p) => hasTag(p, ["Privacy", "Security", "Cybersecurity"]) },
  { label: "🤖 AI/ML",              match: (p) => hasTag(p, ["AI/ML"]) },
  { label: "⛓️ Blockchain",         match: (p) => hasTag(p, ["Blockchain", "Web3", "Solana"]) },
  { label: "⚙️ Hardware",           match: (p) => hasTag(p, ["Hardware", "Systems", "Operating-Systems", "Networking"]) },
  { label: "💰 Finance",            match: (p) => hasTag(p, ["Finance", "FinTech"]) },
  { label: "🌱 Sustainability",     match: (p) => hasTag(p, ["Sustainability"]) },
  { label: "🏥 Healthcare",         match: (p) => hasTag(p, ["Healthcare", "Mental-Health"]) },
  { label: "♿ Accessibility",      match: (p) => hasTag(p, ["Accessibility"]) },
  { label: "🎮 Games",              match: (p) => hasTag(p, ["Game", "Games"]) },
  { label: "✈️ Travel",             match: (p) => hasTag(p, ["Travel"]) },
];

export default function ProjectsPage() {
  const { projects } = SITE_CONTENT;
  const [filterIdx, setFilterIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const filter = FILTERS[filterIdx];
  const filtered = useMemo(() => projects.filter(filter.match), [projects, filter]);

  return (
    <>
      <IntroOverlay message="Projects" />
      <main className="my-projects-page">
        <div className="my-projects-grid-bg" aria-hidden="true" />
        <div className="my-projects-glow" aria-hidden="true" />

        <header className="my-projects-header">
          <h1 className="my-projects-title">
            <PlayTriangle className="my-projects-sparkle" /> My Projects
          </h1>

          <div className={`my-projects-filter${open ? " open" : ""}`}>
            <button
              type="button"
              className="my-projects-filter-trigger"
              onClick={() => setOpen((o) => !o)}
              onBlur={() => setTimeout(() => setOpen(false), 120)}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <span>{filter.label}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {open && (
              <ul className="my-projects-filter-menu" role="listbox">
                {FILTERS.map((f, i) => (
                  <li key={f.label}>
                    <button
                      type="button"
                      className={i === filterIdx ? "active" : ""}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { setFilterIdx(i); setOpen(false); }}
                    >
                      {f.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <div className="my-projects-grid">
          {filtered.map((p) => {
            const to = `/projects/${slugify(p.title)}`;
            const thumbSrc = p.image || p.logo;
            return (
              <div className="my-project-card" key={p.title}>
                <Link to={to} className="my-project-card-inner" aria-label={`Open ${p.title}`}>
                  <div className="my-project-head">
                    <h2 className="my-project-title">
                      <span>{p.title}</span>
                    </h2>
                    <span className="my-project-arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </div>

                  <p className="my-project-desc">
                    {p.badge ? <span className="my-project-trophy">🏆 </span> : null}
                    {p.description}
                  </p>

                  {thumbSrc ? (
                    <div className="my-project-thumb">
                      <img src={thumbSrc} alt={`${p.title} preview`} loading="lazy" />
                    </div>
                  ) : (
                    <div className="my-project-thumb my-project-thumb-empty" />
                  )}
                </Link>

                {p.links?.live && (
                  <div className="my-project-actions">
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
            );
          })}
        </div>

        <Certifications />
      </main>
      <FooterDock />
    </>
  );
}
