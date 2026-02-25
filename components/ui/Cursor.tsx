"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start far off-screen so elements don't flash at top-left on load
    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;

    // Initialise off-screen immediately (no flash)
    dot.style.transform = `translate(-200px, -200px)`;
    ring.style.transform = `translate(-220px, -220px)`;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    // Ring follows with spring lag
    function animate() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring) {
        ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }

    // Scale on hoverable elements
    const onEnter = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.marginLeft = "-10px";
      ring.style.marginTop = "-10px";
      ring.style.borderColor = "rgb(0,255,0)";
      dot.style.backgroundColor = "rgb(0,255,0)";
    };
    const onLeave = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.marginLeft = "0";
      ring.style.marginTop = "0";
      ring.style.borderColor = "rgba(255,255,255,0.6)";
      dot.style.backgroundColor = "white";
    };

    const targets = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Hide on mobile
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        suppressHydrationWarning
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Ring — lags behind with spring */}
      <div
        ref={ringRef}
        suppressHydrationWarning
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/60 z-[9998] pointer-events-none"
        style={{
          willChange: "transform",
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease",
        }}
      />
    </>
  );
}
