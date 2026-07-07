import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";
import FooterDock from "../components/FooterDock.jsx";
import IntroOverlay from "../components/IntroOverlay.jsx";
import { slugify } from "./ProjectDetailPage.jsx";

const Sparkle = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.5 13.6 9 20 10.5 13.6 12 12 18.5 10.4 12 4 10.5 10.4 9z" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <path d="M12 4v12 M8 13l4 4 4-4 M4 20h16" />
  </svg>
);

const ExtLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <path d="M14 4h6v6 M20 4l-9 9 M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
  </svg>
);

const SECTIONS = [
  { id: "contact",         label: "Contact" },
  { id: "education",       label: "Education" },
  { id: "experience",      label: "Experience" },
  { id: "publications",    label: "Publications" },
  { id: "projects",        label: "Projects" },
  { id: "skills",          label: "Skills" },
  { id: "certifications",  label: "Certifications" },
];

export default function ResumePage() {
  const {
    meta, contact, social, tech,
    resume, softSkills, education, publishedWork,
    experience, projects, certifications,
  } = SITE_CONTENT;
  const [active, setActive] = useState("contact");

  // Dedupe skills across all groups (case-insensitive). First mention wins.
  const seenSkills = new Set();
  const keepUnique = (name) => {
    const key = name.toLowerCase();
    if (seenSkills.has(key)) return false;
    seenSkills.add(key);
    return true;
  };
  const dedupedTech = tech.map((group) => ({
    ...group,
    items: group.items.filter((item) => keepUnique(item.name)),
  }));
  const dedupedSoftSkills = softSkills.filter(keepUnique);

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) setActive(id); });
        },
        { rootMargin: "-30% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <IntroOverlay message="Resume" />
      <main className="resume-page">
        <div className="my-projects-grid-bg" aria-hidden="true" />
        <div className="my-projects-glow" aria-hidden="true" />

        <div className="resume-content">
          <header className="resume-header">
            <h1 className="resume-name">
              <Sparkle className="resume-sparkle" /> {meta.author}
            </h1>
            <a
              className="resume-download"
              href={`${import.meta.env.BASE_URL}assets/Eshan_Kumar_Jain_CV.pdf`}
              download="Eshan_Kumar_Jain_CV.pdf"
              aria-label="Download resume as PDF"
            >
              Download Resume <DownloadIcon />
            </a>
            <p className="resume-role">{resume.role}</p>
            <p className="resume-loc">{resume.location}</p>
          </header>

          <div className="resume-divider" />

          {/* Contact */}
          <section id="contact" className="resume-section">
            <dl className="resume-contact">
              <dt>Email:</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>
                  {contact.email} <ExtLinkIcon />
                </a>
              </dd>
              <dt>LinkedIn:</dt>
              <dd>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                  {social.linkedin} <ExtLinkIcon />
                </a>
              </dd>
              <dt>Github:</dt>
              <dd>
                <a href={social.github} target="_blank" rel="noopener noreferrer">
                  {social.github} <ExtLinkIcon />
                </a>
              </dd>
            </dl>
          </section>

          {/* Education */}
          <section id="education" className="resume-section">
            <h2 className="resume-section-heading">EDUCATION</h2>
            {education.map((e) => (
              <div key={e.school} className="resume-edu-item">
                <div className="resume-edu-head">
                  <strong>{e.school}</strong>
                  <span>{e.dates}</span>
                </div>
                <div className="resume-edu-meta">
                  <span>{e.degree}</span>
                  <span>{e.location}</span>
                </div>
                {e.gpa ? <div className="resume-edu-gpa">GPA: {e.gpa}</div> : null}
                {e.coursework ? (
                  <div className="resume-edu-coursework">
                    <strong>Related Coursework:</strong> {e.coursework}
                  </div>
                ) : null}
              </div>
            ))}
          </section>

          {/* Experience */}
          <section id="experience" className="resume-section">
            <h2 className="resume-section-heading">EXPERIENCE</h2>
            <div className="resume-timeline-list">
              {experience.map((e) => (
                <div key={e.title + e.company} className="resume-exp-item">
                  <span className="resume-timeline-dot" aria-hidden="true" />
                  {e.logo ? (
                    <div className="resume-exp-logo">
                      <img src={e.logo} alt={`${e.company} logo`} loading="lazy" />
                    </div>
                  ) : (
                    <div className="resume-exp-logo resume-exp-logo-empty" aria-hidden="true" />
                  )}
                  <div className="resume-exp-body">
                    <div className="resume-exp-head">
                      <strong>{e.title} · {e.company}</strong>
                      <span>{e.startDate} – {e.endDate}</span>
                    </div>
                    <div className="resume-exp-meta">
                      <span>{e.location}</span>
                      <span>{e.type}</span>
                    </div>
                    {e.bullets?.length ? (
                      <ul className="resume-exp-bullets">
                        {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section id="publications" className="resume-section">
            <h2 className="resume-section-heading">PUBLICATIONS</h2>
            {publishedWork && publishedWork.length ? (
              <div className="resume-pub-stack">
                {publishedWork.map((p) => (
                  <div key={p.title} className="resume-pub-item">
                    <div className="resume-pub-title">
                      {p.link ? (
                        <a href={p.link} target="_blank" rel="noopener noreferrer"
                           className="resume-cert-link">
                          <strong>{p.title}</strong> <ExtLinkIcon />
                        </a>
                      ) : (
                        <strong>{p.title}</strong>
                      )}
                    </div>
                    {(p.venue || p.date) ? (
                      <div className="resume-pub-meta">
                        {p.venue}
                        {p.venue && p.date ? " · " : ""}
                        {p.date}
                      </div>
                    ) : null}
                    {p.description ? (
                      <p className="resume-pub-desc">{p.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="resume-empty">Coming soon.</p>
            )}
          </section>

          {/* Projects */}
          <section id="projects" className="resume-section">
            <h2 className="resume-section-heading">PROJECTS</h2>
            <div className="resume-timeline-list resume-project-list">
              {projects.map((p) => (
                <div key={p.title} className="resume-project-item">
                  <span className="resume-timeline-dot" aria-hidden="true" />
                  <div className="resume-project-body">
                    <div className="resume-project-title">
                      <Link
                        to={`/projects/${slugify(p.title)}`}
                        className="resume-project-link"
                      >
                        <strong>{p.title}</strong> <ExtLinkIcon />
                      </Link>
                    </div>
                    {(p.description || p.impact) ? (
                      <ul className="resume-project-bullets">
                        {p.description ? <li>{p.description}</li> : null}
                        {p.impact ? <li>{p.impact}</li> : null}
                      </ul>
                    ) : null}
                    {p.technologies?.length ? (
                      <div className="resume-project-meta">
                        <span className="resume-project-meta-label">Tech:</span>{" "}
                        {p.technologies.join(" · ")}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="resume-section">
            <h2 className="resume-section-heading">SKILLS</h2>

            {dedupedTech.map((group) => (
              group.items.length === 0 ? null : (
                <div key={group.category}>
                  <h3 className="resume-subheading">{group.category.toUpperCase()}:</h3>
                  <p className="resume-skill-list">
                    {group.items.map((item, i) => (
                      <span key={item.name}>
                        <span className="resume-skill">{item.name}</span>
                        {i < group.items.length - 1 ? " " : ""}
                      </span>
                    ))}
                  </p>
                </div>
              )
            ))}
          </section>

          {/* Certifications */}
          <section id="certifications" className="resume-section">
            <h2 className="resume-section-heading">CERTIFICATIONS</h2>
            <ul className="resume-cert-list">
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noopener noreferrer"
                       className="resume-cert-link">
                      {c.name} <ExtLinkIcon />
                    </a>
                  ) : c.name}
                </li>
              ))}
            </ul>
          </section>

        </div>

        <aside className="resume-toc">
          <h3 className="resume-toc-heading" data-mobile-label="Quick Navigation">On This Page</h3>
          <ul>
            {SECTIONS.map(({ id, label }) => (
              <li key={id} className={active === id ? "active" : ""}>
                <a href={`#${id}`}>
                  <span className="resume-toc-dot" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </main>
      <FooterDock />
    </>
  );
}
