"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  unit?: string;
  label: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export function StatCounter({
  value,
  unit = "",
  label,
  decimals = 0,
  className,
  delay = 0,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        // Ease out expo
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setCount(parseFloat((eased * value).toFixed(decimals)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, value, decimals, delay]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-end gap-1">
        <span className="font-display text-5xl md:text-6xl text-white tabular-nums">
          {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
        </span>
        {unit && (
          <span className="font-display text-2xl text-[#78BE20] mb-1">
            {unit}
          </span>
        )}
      </div>
      <p className="text-xs uppercase tracking-widest text-white/60">{label}</p>
    </div>
  );
}
