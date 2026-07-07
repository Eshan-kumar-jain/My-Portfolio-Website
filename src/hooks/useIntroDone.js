import { useEffect, useState } from "react";

// Returns false while the typewriter intro is on screen, then flips to
// true once it's gone. Used by pages with heavy below-the-fold content
// (large images, Three.js scenes, marquees) to defer mounting that work
// until after the intro's perimeter trace finishes.
//
// IMPORTANT: we deliberately default to `false`, NOT to "check the body
// class right now". The IntroOverlay sets `intro-active` on the body
// inside its own useEffect, which fires AFTER its sibling pages render.
// So when Home/About first renders, the class isn't on body yet — and
// reading it would (incorrectly) report the intro as already done,
// causing the heavy components to mount immediately and stutter the
// intro paint. Wait for the intro to mount AND remove the class.
//
// We use a fixed timeout matching the intro's wall-clock duration
// (TOTAL_INTRO_MS in IntroOverlay = 4000ms, plus the 600ms fade) as the
// primary signal. A MutationObserver flips earlier if the user clicks
// to skip the intro (which removes `intro-active` immediately).
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId;

    const finish = () => {
      clearTimeout(timeoutId);
      setDone(true);
    };

    // Hard deadline: just past the intro's full duration + fade window.
    timeoutId = setTimeout(finish, 4100);

    // Early-skip path: once `intro-active` has appeared on the body and
    // then disappeared, we know the user dismissed the intro.
    let sawClass = document.body.classList.contains("intro-active");
    const obs = new MutationObserver(() => {
      const hasClass = document.body.classList.contains("intro-active");
      if (hasClass) sawClass = true;
      if (sawClass && !hasClass) finish();
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearTimeout(timeoutId);
      obs.disconnect();
    };
  }, []);

  return done;
}
