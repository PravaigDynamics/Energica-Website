"use client";

import { useEffect, useRef, ElementType } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;      // ms
  threshold?: number;  // 0–1
  as?: ElementType;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set hidden state after mount (avoids SSR mismatch)
    el.classList.add("will-reveal");

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("is-revealed");
          }, delay);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
