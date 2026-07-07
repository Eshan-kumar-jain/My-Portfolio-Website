import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";
import FooterDock from "../components/FooterDock.jsx";

export const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
  </svg>
);

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = SITE_CONTENT.projects.find((p) => slugify(p.title) === slug);
  const [copied, setCopied] = useState(false);
  // src of the currently-enlarged image, or null if the lightbox is closed.
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // Esc closes the lightbox; lock body scroll while it's open.
  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e) => { if (e.key === "Escape") setLightboxSrc(null); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxSrc]);

  if (!project) return <Navigate to="/projects" replace />;

  const overview = project.overview || project.description;
  const details = Array.isArray(project.detailedDescription)
    ? project.detailedDescription
    : project.detailedDescription
      ? [project.detailedDescription]
      : [];

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: project.title, url });
      } catch {
        /* user canceled */
      }
    } else {
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <main className="project-detail-page">
        <div className="my-projects-grid-bg" aria-hidden="true" />
        <div className="my-projects-glow" aria-hidden="true" />

        <div className="project-detail-content">
          <Link to="/projects" className="project-detail-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                 aria-hidden="true">
              <path d="M19 12 H5 M11 6 l -6 6 l 6 6" />
            </svg>
            <span>Back to Projects</span>
          </Link>
          <h1 className="project-detail-title">{project.title}</h1>

          {project.links?.live && (
            <div className="project-detail-hero-cta">
              <a
                className="project-live-btn"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                     aria-hidden="true" width="17" height="17">
                  <path d="M14 4h6v6" />
                  <path d="M20 4 12 12" />
                  <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
                </svg>
                Live Demo
              </a>
              {project.links?.github && (
                <a
                  className="project-gh-btn"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                       width="17" height="17">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.77 1.06.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.22 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}

          <div className="project-detail-grid">
            <div className="project-detail-main">
              <section className="project-detail-card pd-card-overview">
                <h2 className="project-detail-card-heading">Overview</h2>
                {project.badge ? (
                  <p className="project-detail-badge">🏆 {project.badge.replace(/^[^A-Za-z0-9]+/, "")}</p>
                ) : null}
                <p className="project-detail-body">{overview}</p>
              </section>

              <section className="project-detail-card pd-card-description">
                <h2 className="project-detail-card-heading">Detailed Description</h2>
                {details.length ? (
                  details.map((para, i) => (
                    <p className="project-detail-body" key={i}>{para}</p>
                  ))
                ) : (
                  <p className="project-detail-body project-detail-muted">
                    Detailed write-up coming soon.
                  </p>
                )}
              </section>
            </div>

            <aside className="project-detail-side">
              <div className="project-detail-logo-card">
                {project.logo ? (
                  <button
                    type="button"
                    className="project-detail-logo-btn"
                    onClick={() => setLightboxSrc(project.logo)}
                    aria-label={`View ${project.title} logo full size`}
                  >
                    <img src={project.logo} alt={`${project.title} logo`} />
                  </button>
                ) : (
                  <span className="project-detail-logo-placeholder">
                    {project.title}
                  </span>
                )}
              </div>

              <div className="project-detail-card project-detail-share">
                <h3 className="project-detail-card-heading">Share this project</h3>
                <div className="project-detail-share-row">
                  <button
                    type="button"
                    className="project-detail-share-btn share-purple"
                    onClick={handleShare}
                  >
                    <ShareIcon />
                    <span>Share</span>
                  </button>
                  <button
                    type="button"
                    className="project-detail-share-btn share-blue"
                    onClick={handleCopy}
                  >
                    <LinkIcon />
                    <span>{copied ? "Copied!" : "Copy URL"}</span>
                  </button>
                </div>
              </div>

              <div className="project-detail-card pd-card-meta">
                <h3 className="project-detail-card-heading">Project Details</h3>
                <dl className="project-detail-meta">
                  {project.timeline ? (
                    <>
                      <dt>Timeline</dt>
                      <dd>{project.timeline}</dd>
                    </>
                  ) : null}
                  {project.projectType ? (
                    <>
                      <dt>Type</dt>
                      <dd>{project.projectType}</dd>
                    </>
                  ) : null}
                  {project.impact ? (
                    <>
                      <dt>Impact</dt>
                      <dd>{project.impact}</dd>
                    </>
                  ) : null}
                </dl>
              </div>

              {project.technologies?.length ? (
                <div className="project-detail-card pd-card-tech">
                  <h3 className="project-detail-card-heading">Technologies Used</h3>
                  <div className="project-detail-chips">
                    {project.technologies.map((t) => (
                      <span key={t} className="project-detail-chip chip-purple">{t}</span>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.categories?.length ? (
                <div className="project-detail-card pd-card-categories">
                  <h3 className="project-detail-card-heading">Categories</h3>
                  <div className="project-detail-chips">
                    {project.categories.map((c) => (
                      <span key={c} className="project-detail-chip chip-blue">{c}</span>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.links && (project.links.github || project.links.devpost || project.links.live || project.links.chrome) ? (
                <div className="project-detail-card pd-card-links">
                  <h3 className="project-detail-card-heading">Links</h3>
                  <div className="project-detail-links">
                    {project.links.github ? (
                      <a
                        className="project-detail-link link-github"
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.77 1.06.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.22 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    ) : null}
                    {project.links.chrome ? (
                      <a
                        className="project-detail-link link-chrome"
                        href={project.links.chrome}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.5 11h-1.75V7.25c0-.69-.56-1.25-1.25-1.25H13.5V4.25C13.5 3.01 12.49 2 11.25 2S9 3.01 9 4.25V6H5.25C4.56 6 4 6.56 4 7.25V11h1.75c1.24 0 2.25 1.01 2.25 2.25S6.99 15.5 5.75 15.5H4v3.75c0 .69.56 1.25 1.25 1.25H9V18.5c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25v2h3.75c.69 0 1.25-.56 1.25-1.25V15.5h1.75c1.24 0 2.25-1.01 2.25-2.25S21.74 11 20.5 11z" />
                        </svg>
                        <span>Chrome Web Store</span>
                      </a>
                    ) : null}
                    {project.links.devpost ? (
                      <a
                        className="project-detail-link link-devpost"
                        href={project.links.devpost}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-1.34 17.05H7.4V6.97h3.26c2.78 0 5.04 2.26 5.04 5.04s-2.26 5.04-5.04 5.04zm0-7.96H9.55v5.84h1.11c1.61 0 2.92-1.31 2.92-2.92S12.27 9.09 10.66 9.09z" />
                        </svg>
                        <span>Devpost</span>
                      </a>
                    ) : null}
                    {project.links.live ? (
                      <a
                        className="project-detail-link link-live"
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             aria-hidden="true">
                          <path d="M14 4h6v6" />
                          <path d="M20 4 12 12" />
                          <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </main>
      <FooterDock />

      {lightboxSrc && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            className="image-lightbox-close"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={lightboxSrc}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
