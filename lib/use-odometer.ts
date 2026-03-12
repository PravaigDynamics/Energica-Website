import { useEffect, useRef } from "react";

/**
 * Odometer (counting number) hook — rAF-based, ease-out-quart.
 * Fires when `trigger` becomes true.
 *
 * Usage:
 *   const ref = useOdometer(420, inView, 1800);
 *   <span ref={ref as any}>420</span>
 */
export function useOdometer(
  target: number,
  trigger: boolean,
  duration = 1800,
  decimals = 0
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!trigger || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (ref.current) ref.current.textContent = decimals > 0 ? target.toFixed(decimals) : String(target);
      return;
    }

    const el = ref.current;
    const start = performance.now();

    function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const value = easeOutQuart(t) * target;
      el.textContent = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = decimals > 0 ? target.toFixed(decimals) : String(target);
    }

    requestAnimationFrame(tick);
  }, [trigger, target, duration, decimals]);

  return ref;
}
