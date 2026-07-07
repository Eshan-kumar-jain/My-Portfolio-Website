import { useEffect, useRef, useState } from "react";

export default function SpaceAudio({ active }) {
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.connect(ctx.destination);
    masterRef.current = master;

    // Space echo: feedback delay loop with low-pass roll-off
    const delay = ctx.createDelay(4);
    delay.delayTime.value = 0.9;
    const fbGain = ctx.createGain();
    fbGain.gain.value = 0.35;
    const fbFilter = ctx.createBiquadFilter();
    fbFilter.type = "lowpass";
    fbFilter.frequency.value = 700;
    delay.connect(fbFilter);
    fbFilter.connect(fbGain);
    fbGain.connect(delay);
    delay.connect(master);

    const route = (node) => { node.connect(delay); node.connect(master); };

    // A1 55 Hz — deep sub drone
    const d1 = ctx.createOscillator();
    d1.type = "sine"; d1.frequency.value = 55;
    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    d1.connect(g1); route(g1); d1.start();

    // E2 82.5 Hz — perfect fifth, cinematic width
    const d2 = ctx.createOscillator();
    d2.type = "sine"; d2.frequency.value = 82.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.3;
    d2.connect(g2); route(g2); d2.start();

    // A2 110 Hz triangle pad with slow frequency LFO
    const d3 = ctx.createOscillator();
    d3.type = "triangle"; d3.frequency.value = 110;
    const lfo3 = ctx.createOscillator(); lfo3.frequency.value = 0.07;
    const lg3 = ctx.createGain(); lg3.gain.value = 6;
    lfo3.connect(lg3); lg3.connect(d3.frequency); lfo3.start();
    const g3 = ctx.createGain(); g3.gain.value = 0.18;
    d3.connect(g3); route(g3); d3.start();

    // 440 Hz shimmer with very slow amplitude LFO — faint stars effect
    const d4 = ctx.createOscillator();
    d4.type = "sine"; d4.frequency.value = 440;
    const g4 = ctx.createGain(); g4.gain.value = 0;
    const lfo4 = ctx.createOscillator(); lfo4.frequency.value = 0.04;
    const lg4 = ctx.createGain(); lg4.gain.value = 0.025;
    lfo4.connect(lg4); lg4.connect(g4.gain); lfo4.start();
    d4.connect(g4); route(g4); d4.start();

    // 880 Hz second shimmer slightly out of phase
    const d5 = ctx.createOscillator();
    d5.type = "sine"; d5.frequency.value = 880;
    const g5 = ctx.createGain(); g5.gain.value = 0;
    const lfo5 = ctx.createOscillator(); lfo5.frequency.value = 0.031;
    const lg5 = ctx.createGain(); lg5.gain.value = 0.018;
    lfo5.connect(lg5); lg5.connect(g5.gain); lfo5.start();
    d5.connect(g5); route(g5); d5.start();

    // Bandpass space noise — distant nebula texture
    const bufLen = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) ch[i] = Math.random() * 2 - 1;
    const ns = ctx.createBufferSource();
    ns.buffer = buf; ns.loop = true;
    const nf = ctx.createBiquadFilter();
    nf.type = "bandpass"; nf.frequency.value = 180; nf.Q.value = 0.4;
    const ng = ctx.createGain(); ng.gain.value = 0.018;
    ns.connect(nf); nf.connect(ng); route(ng); ns.start();

    const startAudio = () => {
      ctx.resume().then(() => {
        master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 4);
      });
      document.removeEventListener("click", startAudio);
    };

    if (ctx.state === "running") {
      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 4);
    } else {
      document.addEventListener("click", startAudio);
    }

    return () => {
      document.removeEventListener("click", startAudio);
      if (masterRef.current) {
        masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, ctx.currentTime);
        masterRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      }
      setTimeout(() => ctx.close(), 1200);
    };
  }, [active]);

  const toggle = () => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    if (muted) {
      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.8);
    } else {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    }
    setMuted((m) => !m);
  };

  if (!active) return null;

  return (
    <button
      className="audio-toggle"
      onClick={toggle}
      title={muted ? "Unmute ambient" : "Mute ambient"}
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
