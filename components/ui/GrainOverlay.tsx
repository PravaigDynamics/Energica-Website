"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic film-grain overlay using SVG feTurbulence.
 * Fixed position, pointer-events: none.
 * baseFrequency oscillates slowly (0.63–0.67) for a living, breathing texture.
 * Opacity: 4.5% — subtle but gives filmic racing-broadcast quality.
 * Skipped on prefers-reduced-motion (saves battery).
 */
export default function GrainOverlay() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let freq = 0.65;
    let dir = 1;
    let rafId: number;

    function animate() {
      freq += 0.00008 * dir;
      if (freq > 0.67 || freq < 0.63) dir *= -1;
      turbRef.current?.setAttribute("baseFrequency", `${freq.toFixed(5)}`);
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* Hidden SVG filter definition */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="grain-filter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="linearRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves={3}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Grain overlay div */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          filter: "url(#grain-filter)",
          opacity: 0.045,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 9989,
          willChange: "filter",
        }}
      />
    </>
  );
}
