"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";

const STATS = [
  {
    num: 420, decimals: 0, unit: "km",
    label: "City Range",
    detail: "Experia — largest battery capacity of any production electric motorcycle",
  },
  {
    num: 102, decimals: 0, unit: "HP",
    label: "Peak Power",
    detail: "PMASynRM motor — zero transmission losses, full torque from 0 rpm",
  },
  {
    num: 3.5, decimals: 1, unit: "s",
    label: "0–100 km/h",
    detail: "Ego+ sprint acceleration — maximum torque, instantaneous response",
  },
  {
    num: 40, decimals: 0, unit: "min",
    label: "DC Fast Charge",
    detail: "0–80 % via CCS Combo at any public rapid-charging network worldwide",
  },
];

/* Electric green design token */
const GREEN           = "rgb(0, 255, 0)";
const GREEN_DIM       = "rgba(0, 255, 0, 0.50)";
const GREEN_GLOW_TOP  = "rgba(0, 255, 0, 0.08)";

export default function PerformanceStats() {
  const sectionRef = useRef<HTMLElement>(null);
  /* Per-stat refs for GSAP count-up DOM mutation */
  const statEls = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      /* Section header fade in */
      gsap.from(".ps-head", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ps-head", start: "top 85%" },
      });

      /* Stat cards stagger entrance */
      gsap.from(".ps-stat", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ps-grid", start: "top 80%" },
      });

      /* Count-up for each stat — triggers with the grid entrance */
      STATS.forEach((stat, i) => {
        const el = statEls.current[i];
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.num,
          duration: 1.8,
          ease: "power3.out",
          delay: i * 0.1,
          onUpdate() {
            el.textContent =
              stat.decimals > 0
                ? counter.val.toFixed(stat.decimals)
                : String(Math.round(counter.val));
          },
          scrollTrigger: {
            trigger: ".ps-grid",
            start: "top 80%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] border-t border-white/[0.04]"
    >
      {/* Top ambient line */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${GREEN_GLOW_TOP} 30%, ${GREEN_GLOW_TOP} 70%, transparent 100%)`,
        }}
      />

      <Container className="py-[120px]">

        {/* ── Section header ──────────────────────────────── */}
        <div className="ps-head mb-[48px]">
          <p className="inline-flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[rgb(0,255,0)]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/35">
              By the Numbers
            </span>
          </p>
          <h2
            className="font-display text-white leading-[1.1]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Performance Data
          </h2>
        </div>

        {/* ── 4-column stat grid ──────────────────────────── */}
        <div className="ps-grid grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="ps-stat group relative flex flex-col py-10 px-6 lg:px-8
                         select-none cursor-default
                         transition-transform duration-300 ease-out
                         hover:scale-[1.02]"
              style={{ willChange: "transform" }}
            >
              {/* Divider: vertical between columns (desktop) */}
              {i > 0 && (
                <div
                  aria-hidden
                  className="absolute left-0 top-8 bottom-8 w-px bg-white/[0.07] hidden lg:block"
                />
              )}
              {/* Divider: right edge in 2-col mobile layout */}
              {i % 2 === 0 && (
                <div
                  aria-hidden
                  className="absolute right-0 top-6 bottom-6 w-px bg-white/[0.07] lg:hidden"
                />
              )}
              {/* Divider: bottom between rows in 2-col mobile layout */}
              {i < 2 && (
                <div
                  aria-hidden
                  className="absolute bottom-0 inset-x-0 h-px bg-white/[0.07] lg:hidden"
                />
              )}

              {/* Numeric value — count-up target + continuous glow pulse */}
              <div className="flex items-baseline gap-1 mb-[24px]">
                <span
                  ref={(el) => { statEls.current[i] = el; }}
                  className="font-display leading-none animate-glow-pulse"
                  style={{
                    fontSize: "clamp(48px, 5.5vw, 80px)",
                    color: GREEN,
                    willChange: "transform, opacity",
                  }}
                >
                  0
                </span>
                <span
                  className="font-display text-xl leading-none"
                  style={{ color: GREEN_DIM }}
                >
                  {stat.unit}
                </span>
              </div>

              {/* Internal divider line */}
              <div className="w-10 h-px bg-white/[0.10] mb-[24px]" />

              {/* Label */}
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-3">
                {stat.label}
              </p>

              {/* Detail copy */}
              <p
                className="text-[length:var(--text-sm)] text-white/20 leading-[1.6]"
                style={{ maxWidth: "220px" }}
              >
                {stat.detail}
              </p>

              {/* Hover: green sweep line at bottom */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0
                           group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: "rgba(0, 255, 0, 0.3)" }}
              />

              {/* Hover: very subtle green tint wash */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 20% 30%, rgba(0,255,0,0.08) 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom ambient line */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${GREEN_GLOW_TOP} 30%, ${GREEN_GLOW_TOP} 70%, transparent 100%)`,
        }}
      />
    </section>
  );
}
