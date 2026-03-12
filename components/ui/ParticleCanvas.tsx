"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
}

/**
 * Ambient green particle drift — 18 particles float upward with organic physics.
 * Used on the Racing page hero section.
 * Canvas is sized to its container (position: absolute, inset: 0).
 */
export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const NUM_PARTICLES = 18;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width  = width;
    canvas.height = height;

    const particles: Particle[] = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.5,
      size: 1 + Math.random() * 2.5,
      speedY: -(0.35 + Math.random() * 0.9),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: 0.1 + Math.random() * 0.55,
    }));

    let rafId: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.012) * 0.25;

        // Fade based on position
        const normalY = p.y / height; // 1 at bottom, 0 at top
        const alpha = Math.min(p.opacity, normalY * 1.6, (1 - normalY + 0.05) * 2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 190, 32, ${Math.max(0, alpha)})`;
        ctx.fill();

        // Reset when above canvas
        if (p.y < -10) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
      });

      rafId = requestAnimationFrame(draw);
    }

    const resizeObs = new ResizeObserver(() => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width  = width;
      canvas.height = height;
    });
    resizeObs.observe(canvas);

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}
