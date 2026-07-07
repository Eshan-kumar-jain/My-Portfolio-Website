import { Link, useLocation } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";
import { asset } from "../utils/asset.js";

// Floating bottom dock. Every internal icon is a routed page link;
// LinkedIn / GitHub are external links. The icon for the current
// route is highlighted.
const Icons = {
  hero: (
    <path d="M3 10.5V20a1 1 0 0 0 1 1h5v-6h6v6h5a1 1 0 0 0 1-1v-9.5L12 3 3 10.5Z" />
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0v1H4z" />
    </>
  ),
  projects: (
    <>
      <path
        d="M3 5.6 9 3.5l6 2.1 6-2.1v15l-6 2.1-6-2.1-6 2.1V5.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 3.5v15M15 5.6v15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  resume: (
    <>
      <path
        d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5a1 1 0 0 0 1 1h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 13h6M9 16.5h6M9 9.5h1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  github: (
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  ),
};

function IconSvg({ name }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      {Icons[name]}
    </svg>
  );
}

// Internal routed icons, in dock order. Routes with an `image` path use
// the PNG asset instead of the inline SVG glyph.
const ROUTES = [
  { to: "/",         icon: "hero",     title: "Home",     image: asset("/assets/footer-logos/icons8-home-50.png") },
  { to: "/about",    icon: "about",    title: "About" },
  { to: "/projects", icon: "projects", title: "Projects & Certifications", image: asset("/assets/footer-logos/icons8-projects-64.png") },
  { to: "/resume",   icon: "resume",   title: "Resume",   image: asset("/assets/footer-logos/icons8-resume-80.png") },
];

export default function FooterDock() {
  const { social } = SITE_CONTENT;
  const { pathname } = useLocation();

  return (
    <footer className="footer">
      <div className="social-links">
        {ROUTES.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            className={`icon-link${pathname === r.to ? " active" : ""}`}
            title={r.title}
          >
            {r.image ? (
              <img src={r.image} alt="" className="icon-link-img" />
            ) : (
              <IconSvg name={r.icon} />
            )}
          </Link>
        ))}
        <span className="dock-divider" aria-hidden="true" />
        <a href={social.linkedin} className="icon-link" title="LinkedIn"
           target="_blank" rel="noopener">
          <IconSvg name="linkedin" />
        </a>
        <a href={social.github} className="icon-link" title="GitHub"
           target="_blank" rel="noopener">
          <IconSvg name="github" />
        </a>
      </div>
    </footer>
  );
}
