"use client";

import { useEffect, useRef, useState } from "react";
import { useOdometer } from "@/lib/use-odometer";

interface TechStatPillarProps {
  targetValue: number;
  suffix: string;
  label: string;
  detail: string;
  decimals?: number;
}

/**
 * Client component for an animated odometer stat pillar.
 * Uses IntersectionObserver to trigger on viewport enter.
 */
export default function TechStatPillar({
  targetValue,
  suffix,
  label,
  detail,
  decimals = 0,
}: TechStatPillarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const numRef = useOdometer(targetValue, inView, 1600, decimals);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] p-8 md:p-10">
      <div className="font-display text-[clamp(40px,5vw,64px)] text-white leading-none mb-3">
        <span ref={numRef as React.RefObject<HTMLSpanElement>}>{targetValue}</span>
        {suffix}
      </div>
      <div className="mono-tag mb-4 inline-block">{label}</div>
      <p
        className="text-sm text-white/35 leading-relaxed"
        style={{ fontFamily: "var(--font-ibm-sans)", fontWeight: 300 }}
      >
        {detail}
      </p>
    </div>
  );
}
