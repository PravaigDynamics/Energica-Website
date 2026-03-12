"use client";

import { useEffect, useRef } from "react";

/**
 * Speed lines canvas overlay — fixed, pointer-events: none.
 * Lines radiate from viewport center, opacity ∝ scroll velocity.
 * Also activated by 'transitionenter' event (page transition burst).
 * Pauses when velocity drops below threshold (no idle rAF cost).
 */
export default function SpeedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId: number | null = null;
    let velocity = 0;
    let targetVelocity = 0;
    let burstFrames = 0; // for transition burst

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    function drawFrame() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Lerp velocity
      velocity += (targetVelocity - velocity) * 0.12;

      const effectiveVel = burstFrames > 0
        ? Math.max(velocity, 6)  // burst: force lines
        : velocity;

      if (burstFrames > 0) burstFrames--;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (effectiveVel < 0.4) {
        // Nothing to draw — stop RAF
        rafId = null;
        return;
      }

      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;
      const alpha = Math.min(effectiveVel / 10, 0.22);
      const numLines = Math.floor(Math.min(effectiveVel * 5, 38));
      const lineLength = Math.min(effectiveVel * 70, 260);
      const startRadius = 90;

      ctx.strokeStyle = `rgba(120, 190, 32, ${alpha})`;
      ctx.lineWidth = 0.6;

      for (let i = 0; i < numLines; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const sr = startRadius + Math.random() * 60;
        const x1 = cx + Math.cos(angle) * sr;
        const y1 = cy + Math.sin(angle) * sr;
        const x2 = cx + Math.cos(angle) * (sr + lineLength * (0.5 + Math.random() * 0.5));
        const y2 = cy + Math.sin(angle) * (sr + lineLength * (0.5 + Math.random() * 0.5));
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(drawFrame);
    }

    function startIfNeeded() {
      if (rafId === null) {
        rafId = requestAnimationFrame(drawFrame);
      }
    }

    const onVelocity = (e: Event) => {
      targetVelocity = (e as CustomEvent<number>).detail;
      startIfNeeded();
    };

    const onTransitionEnter = () => {
      burstFrames = 22; // ~22 frames of burst at 60fps = ~370ms
      startIfNeeded();
    };

    document.addEventListener("scrollvelocity", onVelocity);
    document.addEventListener("transitionenter", onTransitionEnter);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("scrollvelocity", onVelocity);
      document.removeEventListener("transitionenter", onTransitionEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9990,
      }}
    />
  );
}
