import { useEffect, useRef, useState } from "react";

const TARGET_VOL = 0.32;
const FADE_STEPS = 40;
const FADE_INTERVAL_MS = 100;

export default function SpaceAudio({ active }) {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const audio = new Audio(`${import.meta.env.BASE_URL}assets/music/interstellar.mp3`);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const fadeIn = () => {
      let step = 0;
      clearInterval(fadeRef.current);
      fadeRef.current = setInterval(() => {
        step++;
        audio.volume = Math.min((step / FADE_STEPS) * TARGET_VOL, TARGET_VOL);
        if (step >= FADE_STEPS) clearInterval(fadeRef.current);
      }, FADE_INTERVAL_MS);
    };

    const startAudio = () => {
      audio.play().then(fadeIn).catch(() => {});
      document.removeEventListener("click", startAudio);
    };

    document.addEventListener("click", startAudio);

    return () => {
      clearInterval(fadeRef.current);
      document.removeEventListener("click", startAudio);
      audio.pause();
      audio.src = "";
    };
  }, [active]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    clearInterval(fadeRef.current);
    if (muted) {
      let step = 0;
      fadeRef.current = setInterval(() => {
        step++;
        audio.volume = Math.min((step / FADE_STEPS) * TARGET_VOL, TARGET_VOL);
        if (step >= FADE_STEPS) clearInterval(fadeRef.current);
      }, FADE_INTERVAL_MS);
    } else {
      let vol = audio.volume;
      fadeRef.current = setInterval(() => {
        vol = Math.max(vol - TARGET_VOL / FADE_STEPS, 0);
        audio.volume = vol;
        if (vol <= 0) clearInterval(fadeRef.current);
      }, FADE_INTERVAL_MS);
    }
    setMuted((m) => !m);
  };

  if (!active) return null;

  return (
    <button
      className="audio-toggle"
      onClick={toggle}
      title={muted ? "Unmute music" : "Mute music"}
      aria-label={muted ? "Unmute" : "Mute"}
    >
      {muted ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             width="17" height="17" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             width="17" height="17" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
