import { useState } from "react";
import { Link } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";
import FooterDock from "../components/FooterDock.jsx";
import IntroOverlay from "../components/IntroOverlay.jsx";
import TravelGlobe from "../components/TravelGlobe.jsx";
import { useIntroDone } from "../hooks/useIntroDone.js";

// SVG icons
const Sparkle = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2 l1.8 6 6 1.8 L13.8 11.6 12 18 10.2 11.6 4.2 9.8 10.2 8 z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 7 9-7" />
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8M8 17h6" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12 h14 M13 6 l 6 6 l -6 6" />
  </svg>
);
const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="9" r="6" />
    <path d="M8 14 l-2 7 l4-2 l4 2 l-2-7 z" />
  </svg>
);
const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4h10v3a5 5 0 1 1-10 0V4z M5 5H3v2a3 3 0 0 0 3 3 M19 5h2v2a3 3 0 0 1-3 3 M10 14h4v3h2v3H8v-3h2z" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2 L14.47 9.6 L22.41 9.6 L16.06 14.29 L18.53 21.89 L12 17.2 L5.47 21.89 L7.94 14.29 L1.59 9.6 L9.53 9.6 Z" />
  </svg>
);
const CapIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3 L1 9 l11 6 11-6z M5 12.5V17c0 1 3 3 7 3s7-2 7-3v-4.5" />
  </svg>
);
const TelescopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7 L15 3 M3 7 L6 14 M15 3 L18 10 M6 14 L18 10 M12 16 L10 21 M12 16 L14 21 M9 16 h6" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5 v14 M5 12 h14" />
  </svg>
);

const ACHIEVEMENTS = [
  { icon: <StarIcon />,      text: "AIR 6253 JEE Advanced 2019 · 99.57th percentile JEE Main 2019" },
  { icon: <TrophyIcon />,    text: "Gold Medalist — International Mathematics Olympiad (IMO)" },
  { icon: <AwardIcon />,     text: "Gold Medalist — International Science Olympiad (ISO)" },
  { icon: <TelescopeIcon />, text: "Vice President — Ashlesha Astronomy Club, VNIT Nagpur" },
  { icon: <CapIcon />,       text: "IELTS Band 7.5 — C1 English Proficiency" },
  { icon: <PlusIcon />,      text: "Anthropic-Certified: Claude, Subagents & Agent Skills" },
];

export default function About() {
  const { social, contact } = SITE_CONTENT;
  const [toast, setToast] = useState("");
  const introDone = useIntroDone();

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(""), 1800);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      showToast("Email copied ✓");
    } catch {
      showToast("Could not copy — " + contact.email);
    }
  };

  return (
    <>
      <IntroOverlay message="About me" className="intro-about" />

      <div className="about-me-page">
        <h1 className="about-me-title">
          <Sparkle className="about-me-sparkle" /> About Me
        </h1>

        <div className="about-me-grid">
          <div className="about-me-photo">
            {introDone && <img src={`${import.meta.env.BASE_URL}assets/profile-pic.jpeg`} alt="Eshan Kumar Jain" />}
          </div>

          <div className="about-me-content">
            <div className="about-me-socials">
              <a href={social.github}    className="social-pill" target="_blank" rel="noopener" aria-label="GitHub"><GitHubIcon /></a>
              <a href={social.linkedin}  className="social-pill" target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedInIcon /></a>
              <button type="button" className="copy-email-btn" onClick={copyEmail}>
                <MailIcon /> Copy Email
              </button>
            </div>

            <p className="about-me-bio">
              Hey, I'm{" "}
              <span className="bio-name">Eshan Kumar Jain</span> — an AI
              Specialist & Data Analyst who spent 2 years as a Manager at{" "}
              <span className="bio-name">HDFC Bank</span>, leading API
              integration initiatives, Power BI dashboards, and data pipelines
              that processed €1.5M+ daily. I graduated with a B.Tech in
              Computer Science from{" "}
              <span className="bio-name">NIT Nagpur (VNIT)</span> and I'm
              currently completing my{" "}
              <span className="bio-name">MSc in Data Science & Analytics</span>{" "}
              at Maynooth University, Ireland. I build production AI agents
              using the Claude API, design agentic workflows and subagents, and
              ship full-stack applications with Next.js and Vercel. I'm
              Anthropic-certified in Claude, Subagents, and Agent Skills.
            </p>

            <ul className="quick-facts">
              <li>📍 Maynooth, Ireland</li>
              <li>🎓 MSc Data Science @ Maynooth University (2025–2026)</li>
              <li>🎓 BTech CSE @ NIT Nagpur (VNIT) (2019–2023)</li>
              <li>💼 Ex-Manager @ HDFC Bank · 2 Years in Data & AI</li>
              <li>🤖 Certified: Claude · Subagents · Agent Skills (Anthropic)</li>
              <li>🌐 Open to Remote / Relocate · Available Sept 2026</li>
              <li>✅ Open to: AI Engineer · Data Analyst · ML Engineer</li>
            </ul>

            <h2 className="achievements-title">Notable Achievements</h2>
            <ul className="achievements-list">
              {ACHIEVEMENTS.map((a, i) => (
                <li key={i}>
                  <span className="ach-icon">{a.icon}</span>
                  <span className="ach-text">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cta-buttons">
          <Link className="cta-btn" to="/resume">
            <DocIcon /> <span>View My Resume</span> <Arrow />
          </Link>
          <Link className="cta-btn" to="/projects">
            <DocIcon /> <span>View My Projects</span> <Arrow />
          </Link>
        </div>
      </div>

      {/* Story section #1 — The beginning */}
      <section className="more-about-me">
        <h2 className="more-about-me-title">
          <Sparkle className="more-about-me-sparkle" /> more about me
        </h2>
        <div className="more-about-me-grid">
          <div className="more-about-me-text">
            <p>
              It started with a second-grade computer class in Nagpur and never
              really stopped. That same curiosity grew into a B.Tech in Computer
              Science at <strong>VNIT Nagpur</strong>, where I led the Ashlesha
              Astronomy Club as Vice President, competed at national olympiad
              level in mathematics and science, and earned AIR 6253 in JEE
              Advanced. I've always been drawn to problems that sit at the edge
              of what's solvable — whether that's classifying 23 skin diseases
              with a 93% accurate ensemble model, or designing an AI agent that
              turns dense financial reports into plain-English stock analysis.{" "}
              <strong>
                I'd rather build something real that pushes the boundary than
                play it safe.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Story section #2 — HDFC years */}
      <section className="more-about-me">
        <div className="more-about-me-grid reverse">
          <div className="more-about-me-text">
            <p>
              After graduating I joined <strong>HDFC Bank</strong> as a Manager
              in their Tech & Digital division. Two years of real-world data
              engineering: SQL pipelines, Power BI dashboards, API integration
              projects handling €1.5M+ daily transaction volume, and UAT
              execution across 5+ major product releases. I reduced average
              operational turnaround by 25%, cut data reconciliation errors by
              30%, and delivered 100% regulatory compliance on every EPFO
              project I owned. It was the kind of environment that teaches you
              how to translate messy business requirements into technical
              specifications that 5 developers can actually build from — and how
              to own the outcome end-to-end.{" "}
              <strong>
                That ownership instinct is something I carry into every project
                I build.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Travel globe */}
      {introDone && <TravelGlobe />}

      {/* Story section #3 — AI & what's next */}
      <section className="more-about-me">
        <div className="more-about-me-grid">
          <div className="more-about-me-text">
            <p>
              Now I'm at <strong>Maynooth University</strong> in Ireland,
              deepening my ML and statistical modelling foundations while
              building the agentic AI systems I want to ship professionally.
              WealthIQ, Path to AI Engineer, custom Claude Code subagents — these
              aren't just portfolio pieces. They're proof that I can design,
              build, and deploy AI systems end-to-end. I'm Anthropic-certified
              in Claude, Subagents, and Agent Skills. The way I think about
              agentic workflows — bounded context, specialised tools,
              human-in-the-loop control, grounded output — comes from actually
              building them, not just reading about them.{" "}
              <strong>
                There's a lot more coming. This is just the beginning.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <FooterDock />

      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
