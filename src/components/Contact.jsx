import { Link } from "react-router-dom";
import { SITE_CONTENT } from "../data/content.js";

export default function Contact() {
  const { contact } = SITE_CONTENT;

  return (
    <>
      <div className="divider">
        <p>✦ ━━━━━━━━━━━━━━ ✦ ━━━━━━━━━━━━━━ ✦</p>
      </div>
      <section className="contact" id="contact">
        <h2>{contact.heading}</h2>
        <p>{contact.body}</p>
        <div className="contact-actions">
          <Link className="btn-primary btn-large" to="/contact">
            <span>{contact.cta}</span>
            <span className="btn-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 L11 13" />
                <path d="M22 2 L15 22 L11 13 L2 9 Z" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
