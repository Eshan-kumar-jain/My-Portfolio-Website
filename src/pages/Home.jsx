import { useNavigationType } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import TechStack from "../components/TechStack.jsx";
import Projects from "../components/Projects.jsx";
import Experience from "../components/Experience.jsx";
import Certifications from "../components/Certifications.jsx";
import Contact from "../components/Contact.jsx";
import AboutTeaser from "../components/AboutTeaser.jsx";
import FooterDock from "../components/FooterDock.jsx";
import IntroOverlay from "../components/IntroOverlay.jsx";
import { useIntroDone } from "../hooks/useIntroDone.js";

export default function Home() {
  // Defer below-the-fold sections until the intro is gone so their
  // image decoding / icon fetching doesn't stutter the perimeter trace.
  const introDone = useIntroDone();

  // Greet a fresh visitor with "Hello There" on first landing, but show
  // "Home" when the user navigates here from another in-app page.
  // useNavigationType returns 'POP' for direct loads + refreshes + back/
  // forward, and 'PUSH' / 'REPLACE' for in-app Link clicks.
  const navType = useNavigationType();
  const introMessage = navType === "PUSH" || navType === "REPLACE"
    ? "Home"
    : "Hello There";

  return (
    <>
      <IntroOverlay message={introMessage} />
      <Hero />
      {introDone && (
        <>
          <TechStack />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
          <AboutTeaser />
        </>
      )}
      <FooterDock />
    </>
  );
}
