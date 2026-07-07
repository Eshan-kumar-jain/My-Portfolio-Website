import { useEffect } from "react";

// Apply the `.fade-in` + `.visible` classes to a set of elements as they
// scroll into view. Call inside a useEffect; pass a CSS selector that
// matches the elements you want to reveal.
export function useFadeInOnScroll(selector, deps = []) {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll(selector));
    els.forEach((el) => el.classList.add("fade-in"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
