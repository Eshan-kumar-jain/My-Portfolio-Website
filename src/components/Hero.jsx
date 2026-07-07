import { SITE_CONTENT } from "../data/content.js";
import ScrollCircle from "./ScrollCircle.jsx";
import BlackHole from "./BlackHole.jsx";
import { useIntroDone } from "../hooks/useIntroDone.js";

export default function Hero() {
  const { meta } = SITE_CONTENT;
  const introDone = useIntroDone();
  return (
    <section className="hero" id="hero" style={{ position: "relative", overflow: "hidden" }}>
      <BlackHole />
      <div className="hero-content" style={{ position: "relative", zIndex: 1 }}>
        <div className="profile-pic-wrap">
          <div className="profile-pic">
            {introDone && (
              <img src={meta.profilePic} alt="Eshan Kumar Jain" className="profile-pic-img" />
            )}
          </div>
          <span className="lab-badge">
            <span className="lab-dot" aria-hidden="true"></span>
            Building ⚡
          </span>
        </div>
        <h2>
          <span className="my-name">I'm Eshan</span> — an AI Specialist & Data
          Analyst who turns complex data into decisions and builds agentic
          workflows that actually ship.
        </h2>
        <p className="intro-text">
          I spent 2 years as a Manager at{" "}
          <span className="highlight-asu">HDFC Bank</span>, leading data
          pipelines, Power BI dashboards, and API integration projects processing
          €1.5M+ daily. Now I'm completing my{" "}
          <span className="highlight-asu">MSc in Data Science & Analytics</span>{" "}
          at Maynooth University, Ireland, while building production AI agents
          with the Claude API, designing subagents, and shipping full-stack
          agentic applications. Certified by Anthropic in Claude, Subagents, and
          Agent Skills. Always open to connecting — reach out!
        </p>
        <ScrollCircle />
      </div>
    </section>
  );
}
