"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  threshold?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  threshold = 0.15,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 20px translateY as per motion spec; GPU-friendly properties only
    const transforms: Record<string, string> = {
      up:    "translateY(20px)",
      left:  "translateX(-20px)",
      right: "translateX(20px)",
      none:  "none",
    };

    el.style.opacity = "0";
    el.style.transform = transforms[direction];
    el.style.willChange = "transform, opacity";
    el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          // Release GPU hint after transition completes
          setTimeout(() => {
            if (el) el.style.willChange = "auto";
          }, delay + 800);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, threshold]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
