import { useEffect, useRef } from "react";

// ─── constants ────────────────────────────────────────────────────────────────
const STAR_COUNT      = 220;   // background warped stars
const PARTICLE_COUNT  = 200;   // infall gas particles
const TRAIL_ALPHA     = 0.18;  // motion-blur persistence (lower = longer trails)
const PULSE_SPEED     = 0.008; // accretion disk breathing rate
const JET_LENGTH_FAC  = 2.8;   // relativistic jet reach

export default function BlackHole() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId, W, H, cx, cy, R, t = 0;

    // ── background warped star field ──────────────────────────────────────────
    let stars = [];
    function mkStar() {
      const angle = Math.random() * Math.PI * 2;
      const rawR  = R * (1.8 + Math.random() * 5);
      // gravitational lensing deflects stars slightly away from the BH
      const lensBoost = 1 + (R * 1.6) / Math.max(rawR, R * 1.1);
      return {
        angle,
        r: rawR * lensBoost,
        size:  0.5 + Math.random() * 1.2,
        alpha: 0.25 + Math.random() * 0.65,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.03,
      };
    }

    // ── infall gas particles ───────────────────────────────────────────────────
    let particles = [];
    function mkParticle(fresh = false) {
      const angle = Math.random() * Math.PI * 2;
      const dist  = fresh
        ? R * (2.2 + Math.random() * 4.0)   // spawn far out
        : R * (1.6 + Math.random() * 4.6);  // random on init
      return {
        angle,
        dist,
        speed: 0.003 + Math.random() * 0.005,  // angular velocity
        drift: 0.12  + Math.random() * 0.25,   // infall rate
        size:  0.5   + Math.random() * 1.8,
        // colour: mix white/amber/pale-blue to suggest hot gas
        hue:  Math.random() < 0.4 ? 220 : Math.random() < 0.5 ? 38 : 0,
        sat:  Math.random() < 0.4 ? 60  : Math.random() < 0.5 ? 70  : 0,
        alpha: 0.5 + Math.random() * 0.5,
        flashing: false,
        flashAlpha: 0,
      };
    }

    function resize() {
      W  = canvas.width  = canvas.offsetWidth;
      H  = canvas.height = canvas.offsetHeight;
      cx = W / 2;
      cy = H / 2;
      R  = Math.min(W, H) * 0.11;
      stars     = Array.from({ length: STAR_COUNT   }, mkStar);
      particles = Array.from({ length: PARTICLE_COUNT }, () => mkParticle(false));
    }

    // ── helpers ───────────────────────────────────────────────────────────────
    const addGlow = (drawFn) => {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      drawFn();
      ctx.restore();
    };

    // ── draw: background stars (gravitationally warped) ───────────────────────
    function drawStars() {
      for (const s of stars) {
        s.twinkle += s.twinkleSpeed;
        const tw = 0.6 + 0.4 * Math.sin(s.twinkle);
        const x  = cx + Math.cos(s.angle) * s.r;
        const y  = cy + Math.sin(s.angle) * s.r * 0.55; // flatten slightly
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,230,255,${s.alpha * tw})`;
        ctx.fill();
      }
    }

    // ── draw: multiple gravitational lensing halos ────────────────────────────
    function drawLensingHalos() {
      const halos = [
        { rFactor: 4.5, alpha: 0.07 },
        { rFactor: 3.2, alpha: 0.10 },
        { rFactor: 2.2, alpha: 0.06 },
      ];
      for (const h of halos) {
        const grad = ctx.createRadialGradient(cx, cy, R * 1.05, cx, cy, R * h.rFactor);
        grad.addColorStop(0,   `rgba(80,40,10,${h.alpha})`);
        grad.addColorStop(0.5, `rgba(30,10,0,${h.alpha * 0.4})`);
        grad.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, R * h.rFactor, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // ── draw: accretion disk ─────────────────────────────────────────────────
    function drawDisk(pulse) {
      const diskW      = R * 2.8;
      const diskH      = R * 0.52;
      const layerCount = 28;

      for (let i = layerCount; i >= 0; i--) {
        const tLayer = i / layerCount;           // 0 = inner, 1 = outer
        const rX = R * 1.08 + (diskW - R * 1.08) * tLayer;
        const rY = diskH * (0.22 + tLayer * 0.78);

        // Doppler shift: left side (approaching) = bright blue-white
        //                right side (receding)    = dim red-orange
        const brightness = (0.65 - tLayer * 0.40) * (0.85 + 0.15 * pulse);

        const grd = ctx.createLinearGradient(cx - rX, cy, cx + rX, cy);
        // left (approaching) — bright, slightly blue-shifted
        grd.addColorStop(0,    `rgba(255,${220 + Math.round(35*(1-tLayer))},${180 + Math.round(60*(1-tLayer))},${brightness})`);
        grd.addColorStop(0.28, `rgba(255,${160 + Math.round(60*(1-tLayer))},${40  + Math.round(30*(1-tLayer))},${brightness * 0.8})`);
        // right (receding)  — dim red-orange
        grd.addColorStop(0.62, `rgba(200,80,15,${brightness * 0.35})`);
        grd.addColorStop(0.82, `rgba(140,40,5,${brightness * 0.15})`);
        grd.addColorStop(1,    "rgba(60,10,0,0)");

        ctx.beginPath();
        ctx.ellipse(cx, cy, rX, rY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = grd;
        ctx.lineWidth   = rY * 0.65 + 0.8;
        ctx.stroke();
      }
    }

    // ── draw: black event horizon ─────────────────────────────────────────────
    function drawHorizon() {
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    }

    // ── draw: photon ring (bright, thin) ──────────────────────────────────────
    function drawPhotonRing(pulse) {
      addGlow(() => {
        const brightness = 0.75 + 0.25 * pulse;
        const g = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.18);
        g.addColorStop(0,    "rgba(0,0,0,0)");
        g.addColorStop(0.45, `rgba(255,230,160,${brightness * 0.9})`);
        g.addColorStop(0.55, `rgba(255,255,220,${brightness})`);
        g.addColorStop(0.65, `rgba(255,200,100,${brightness * 0.7})`);
        g.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
    }

    // ── draw: hot corona (diffuse glow above/below) ───────────────────────────
    function drawCorona(pulse) {
      addGlow(() => {
        const coronaH = R * (0.9 + 0.1 * pulse);
        for (const sign of [-1, 1]) {
          const g = ctx.createRadialGradient(
            cx, cy + sign * R * 0.05, R * 0.1,
            cx, cy + sign * coronaH,  R * coronaH
          );
          g.addColorStop(0,   `rgba(255,220,140,${0.18 * pulse})`);
          g.addColorStop(0.4, `rgba(180,100,40,${0.08 * pulse})`);
          g.addColorStop(1,   "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.ellipse(cx, cy + sign * coronaH * 0.5, R * 0.7, coronaH * 0.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      });
    }

    // ── draw: relativistic jets ───────────────────────────────────────────────
    function drawJets(pulse) {
      addGlow(() => {
        const jetLen = R * JET_LENGTH_FAC * (0.9 + 0.1 * pulse);
        for (const sign of [-1, 1]) {
          // core beam
          const g = ctx.createLinearGradient(cx, cy, cx, cy + sign * jetLen);
          g.addColorStop(0,   `rgba(180,220,255,${0.55 * pulse})`);
          g.addColorStop(0.3, `rgba(100,160,255,${0.35 * pulse})`);
          g.addColorStop(0.7, `rgba(60,100,220,${0.12 * pulse})`);
          g.addColorStop(1,   "rgba(0,0,0,0)");

          ctx.beginPath();
          ctx.moveTo(cx - R * 0.08, cy);
          ctx.lineTo(cx + R * 0.08, cy);
          ctx.lineTo(cx + R * 0.02, cy + sign * jetLen);
          ctx.lineTo(cx - R * 0.02, cy + sign * jetLen);
          ctx.closePath();
          ctx.fillStyle = g;
          ctx.fill();

          // outer halo of the jet
          const gOuter = ctx.createLinearGradient(cx, cy, cx, cy + sign * jetLen * 0.8);
          gOuter.addColorStop(0,   `rgba(120,180,255,${0.20 * pulse})`);
          gOuter.addColorStop(0.5, `rgba(60,120,220,${0.07 * pulse})`);
          gOuter.addColorStop(1,   "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.moveTo(cx - R * 0.22, cy);
          ctx.lineTo(cx + R * 0.22, cy);
          ctx.lineTo(cx + R * 0.06, cy + sign * jetLen * 0.8);
          ctx.lineTo(cx - R * 0.06, cy + sign * jetLen * 0.8);
          ctx.closePath();
          ctx.fillStyle = gOuter;
          ctx.fill();
        }
      });
    }

    // ── draw: infall particles ────────────────────────────────────────────────
    function drawParticles() {
      for (const p of particles) {
        // spiral inward (accelerate as dist decreases — orbital speed ∝ 1/√r)
        const speedBoost = Math.max(1, (R * 2.5) / Math.max(p.dist, R * 0.9));
        p.angle += p.speed * speedBoost;
        p.dist  -= p.drift * (0.8 + 0.8 * speedBoost * 0.2);

        const x = cx + Math.cos(p.angle) * p.dist;
        const y = cy + Math.sin(p.angle) * p.dist * 0.40; // disk plane flatness

        // fade as they approach horizon
        const proximity = Math.max(0, (p.dist - R) / (R * 1.2));
        const a = p.alpha * Math.min(1, proximity);

        if (p.dist < R * 0.98) {
          // flash white as particle crosses horizon
          if (!p.flashing) { p.flashing = true; p.flashAlpha = 1.0; }
        }

        if (p.flashing) {
          ctx.beginPath();
          ctx.arc(x, y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.flashAlpha})`;
          ctx.fill();
          p.flashAlpha -= 0.08;
          if (p.flashAlpha <= 0) Object.assign(p, mkParticle(true));
          continue;
        }

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},${p.sat}%,95%,${a})`;
        ctx.fill();
      }
    }

    // ── main animation loop ───────────────────────────────────────────────────
    function frame() {
      t += 1;
      const pulse = 0.5 + 0.5 * Math.sin(t * PULSE_SPEED); // 0→1, slow breath

      // Motion-blur trail instead of full clearRect — particles leave trails
      ctx.fillStyle = `rgba(0,0,0,${TRAIL_ALPHA})`;
      ctx.fillRect(0, 0, W, H);

      drawStars();
      drawLensingHalos();

      // Jets go behind the disk
      drawJets(pulse);

      // Bottom half of disk (behind event horizon visually)
      drawDisk(pulse);

      // Event horizon stamps over bottom disk
      drawHorizon();

      // Corona sits around the horizon
      drawCorona(pulse);

      // Photon ring on top
      drawPhotonRing(pulse);

      // Particles on top of everything except the horizon stamp
      drawParticles();

      // Final horizon stamp to erase any particle bleed-through
      drawHorizon();

      animId = requestAnimationFrame(frame);
    }

    resize();
    // Black canvas background before first frame
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    frame();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        background: "#000",
      }}
    />
  );
}
