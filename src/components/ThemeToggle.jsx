import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={`theme-toggle ${isLight ? "is-light" : "is-dark"}`}
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      <span className="theme-toggle-thumb" aria-hidden="true" />
      <span className="theme-toggle-icon theme-toggle-sun"  aria-hidden="true">☀️</span>
      <span className="theme-toggle-icon theme-toggle-moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
