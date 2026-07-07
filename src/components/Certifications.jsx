import { useFadeInOnScroll } from "../hooks/useFadeIn.js";

// Drop the saved screenshots into public/assets/certs/ using the filenames below.
const CERTS = [
  {
    name: "Introduction to Subagents",
    issuer: "Anthropic",
    image: "/assets/certs/anthropic-subagents.png",
    link: null,
    accent: "#7aaf9e",   // sage-green matches the cert bg
  },
  {
    name: "Introduction to Agent Skills",
    issuer: "Anthropic",
    image: "/assets/certs/anthropic-agent-skills.png",
    link: null,
    accent: "#6a9fd8",   // blue matches the cert bg
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    image: "/assets/certs/anthropic-claude101.png",
    link: null,
    accent: "#c8b99a",   // beige matches the cert bg
  },
  {
    name: "SQL",
    issuer: "HackerRank",
    image: "/assets/certs/hackerrank-sql.png",
    link: null,
    accent: "#2ec866",
  },
  {
    name: "Prompt Engineering for Generative AI",
    issuer: "LinkedIn Learning",
    image: "/assets/certs/linkedin-prompt-engineering.png",
    link: null,
    accent: "#0a66c2",
  },
  {
    name: "Understanding APIs & RESTful APIs",
    issuer: "Udemy",
    image: "/assets/certs/udemy-apis.png",
    link: "https://ude.my/UC-471e458c-5c25-4724-b527-f2062e449e56",
    accent: "#a435f0",
  },
  {
    name: "AI Foundations: Machine Learning",
    issuer: "LinkedIn Learning",
    image: "/assets/certs/linkedin-ai-ml.png",
    link: null,
    accent: "#0a66c2",
  },
];

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="13" height="13" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Certifications() {
  useFadeInOnScroll(".certifications .cert-card");

  return (
    <section className="certifications" id="certifications">
      <h2>CERTIFICATIONS</h2>
      <div className="cert-cards-grid">
        {CERTS.map((c) => {
          const inner = (
            <>
              <div className="cert-img-wrap" style={{ "--accent": c.accent }}>
                <img
                  src={c.image}
                  alt={`${c.name} — ${c.issuer}`}
                  className="cert-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "flex";
                  }}
                />
                <div className="cert-img-placeholder" style={{ display: "none" }}>
                  <span className="cert-placeholder-initial" style={{ color: c.accent }}>
                    {c.issuer[0]}
                  </span>
                </div>
              </div>
              <div className="cert-info">
                <span className="cert-issuer" style={{ color: c.accent }}>
                  {c.issuer}
                </span>
                <span className="cert-name">{c.name}</span>
                {c.link && (
                  <span className="cert-verify">
                    Verify <ExternalIcon />
                  </span>
                )}
              </div>
            </>
          );

          return c.link ? (
            <a
              className="cert-card"
              key={c.name}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--accent": c.accent }}
            >
              {inner}
            </a>
          ) : (
            <div className="cert-card" key={c.name} style={{ "--accent": c.accent }}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
