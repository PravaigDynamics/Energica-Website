import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FRAMES_PER_CHAR_STAGGER = 3;
const SCRAMBLE_FRAMES = 8;

/**
 * Character scramble hook — no GSAP plugins required.
 * Characters cycle through random uppercase/numeric chars before resolving
 * left-to-right with a per-char stagger.
 * Fires when `trigger` becomes true.
 *
 * Usage:
 *   const ref = useScramble("PROGRESS, RIDDEN.", trigger);
 *   <h1 ref={ref as any}>PROGRESS, RIDDEN.</h1>
 */
export function useScramble(targetText: string, trigger: boolean) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!trigger || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    const chars = targetText.split("");
    let frame = 0;
    let rafId: number;

    function tick() {
      frame++;
      const display = chars.map((char, i) => {
        if (char === " " || char === "\n" || char === "," || char === ".") return char;
        const resolveFrame = i * FRAMES_PER_CHAR_STAGGER + SCRAMBLE_FRAMES;
        if (frame > resolveFrame) return char;
        if (frame > i * FRAMES_PER_CHAR_STAGGER) {
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        return "·";
      });
      el.textContent = display.join("");

      if (display.join("") !== targetText) {
        rafId = requestAnimationFrame(tick);
      } else {
        el.textContent = targetText; // ensure exact final text
      }
    }

    el.textContent = targetText.split("").map(c => (c === " " || c === "\n" ? c : "·")).join("");
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [trigger, targetText]);

  return ref;
}
