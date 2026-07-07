import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Cursor from "./components/Cursor.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

// On every route change, scroll to top OR to the section identified
// by the URL hash (e.g. "/#projects").
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        // wait for the page to render the new route's DOM
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        );
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Cursor />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <div className="site-copyright">© 2026 Eshan Kumar Jain. All rights reserved.</div>
    </>
  );
}
