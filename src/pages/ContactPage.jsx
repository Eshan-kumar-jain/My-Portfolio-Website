import { useState } from "react";
import emailjs from "@emailjs/browser";
import IntroOverlay from "../components/IntroOverlay.jsx";
import FooterDock from "../components/FooterDock.jsx";

// EmailJS configuration — set in .env.local (Vite env vars are inlined at
// build time and exposed to the client; they're meant to be public keys).
const EMAILJS_SERVICE_ID    = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_NOTIFY    = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY;
const EMAILJS_TEMPLATE_AUTOREPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY;
const EMAILJS_PUBLIC_KEY    = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.4 20.6 22 12 3.4 3.4 3.4 10l13 2-13 2z" />
  </svg>
);

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: bots happily fill every field. Humans never see this one.
  const [website, setWebsite] = useState("");
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    // Silently swallow bot submissions.
    if (website) {
      setStatus("success");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and a message before sending.");
      return;
    }

    // Lightweight RFC-5322-ish check — good enough to catch typos and
    // empty-but-not-blank "  " emails; we still rely on EmailJS to deliver.
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!emailLooksValid) {
      setStatus("error");
      setErrorMsg("That doesn't look like a valid email. Mind double-checking it?");
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_TEMPLATE_NOTIFY) {
      setStatus("error");
      setErrorMsg("Email service isn't configured yet. Please email eshanjain552@gmail.com directly.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const templateParams = {
      from_name: trimmedName,
      from_email: trimmedEmail,
      reply_to: trimmedEmail,
      message: trimmedMessage,
      to_name: trimmedName,
      to_email: trimmedEmail,
    };

    try {
      // 1) Notification to me — the must-succeed call.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_NOTIFY,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      // 2) Auto-reply to the visitor — best-effort; don't fail the whole
      //    submission if this one bounces.
      if (EMAILJS_TEMPLATE_AUTOREPLY) {
        emailjs
          .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_AUTOREPLY, templateParams, {
            publicKey: EMAILJS_PUBLIC_KEY,
          })
          .catch((err) => console.warn("Auto-reply failed:", err));
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(
        err?.text || "Something went wrong sending your message. Please try again."
      );
    }
  };

  const isSending = status === "sending";

  return (
    <>
      <IntroOverlay message="Get in Touch" />
      <main className="contact-page">
        <div className="contact-page-grid" aria-hidden="true" />
        <div className="contact-page-glow contact-page-glow-purple" aria-hidden="true" />
        <div className="contact-page-glow contact-page-glow-teal" aria-hidden="true" />

        <div className="contact-page-inner">
          <h1 className="contact-page-title">Get in Touch</h1>
          <p className="contact-page-sub">
            Have a question, a project idea, or just want to connect? Drop me a
            message below and I'll get back to you as soon as possible.
          </p>

          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <label className="contact-field">
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSending}
                autoComplete="name"
              />
            </label>

            <label className="contact-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSending}
                autoComplete="email"
              />
            </label>

            <label className="contact-field">
              <span>Message</span>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={isSending}
              />
            </label>

            {/* Honeypot — hidden from real users, irresistible to bots. */}
            <div className="contact-honeypot" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            <button
              type="submit"
              className="contact-form-submit"
              disabled={isSending}
            >
              <span>{isSending ? "Sending…" : "Send Message"}</span>
              {!isSending && <PlaneIcon />}
            </button>

            {status === "success" && (
              <p className="contact-form-status contact-form-status-success" role="status">
                Your message has been sent! I'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="contact-form-status contact-form-status-error" role="alert">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </main>
      <FooterDock />
    </>
  );
}
