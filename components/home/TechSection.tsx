"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { FeatureBlock } from "@/components/ui/FeatureBlock";

/* ── Animated circuit SVG ────────────────────────────────── */
function CircuitGraphic() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      /* Draw every <path> element in sequence */
      const paths = svg.querySelectorAll<SVGPathElement>("path.circuit-path");
      paths.forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          delay: i * 0.18,
          scrollTrigger: {
            trigger: svg,
            start: "top 75%",
          },
        });
      });

      /* Pulse the center dot */
      gsap.to(".circuit-pulse", {
        scale: 1.6,
        opacity: 0,
        duration: 1.2,
        repeat: -1,
        ease: "power1.out",
        transformOrigin: "250px 250px",
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 500"
      className="w-full max-w-lg mx-auto"
      aria-hidden
    >
      {/* ── Static concentric rings ── */}
      {[200, 160, 120, 80].map((r, i) => (
        <circle
          key={r}
          cx="250"
          cy="250"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          style={{ opacity: 1 - i * 0.15 }}
        />
      ))}

      {/* ── Rotating accent arcs ── */}
      <g className="tech-orbit-1">
        <circle
          cx="250"
          cy="250"
          r="160"
          fill="none"
          stroke="rgb(0,255,0)"
          strokeWidth="1.5"
          strokeDasharray="60 943"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
      <g className="tech-orbit-2">
        <circle
          cx="250"
          cy="250"
          r="120"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
          strokeDasharray="30 710"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>

      {/* ── Circuit paths (drawn on scroll) ── */}
      {/* Top branch */}
      <path
        className="circuit-path"
        d="M250 90 L250 140 L310 140 L310 180"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom branch */}
      <path
        className="circuit-path"
        d="M250 410 L250 360 L190 360 L190 320"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right branch */}
      <path
        className="circuit-path"
        d="M410 250 L360 250 L360 310 L320 310"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left branch */}
      <path
        className="circuit-path"
        d="M90 250 L140 250 L140 190 L180 190"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Red accent path */}
      <path
        className="circuit-path"
        d="M310 180 L310 210 L280 210 L280 250"
        fill="none"
        stroke="rgb(0,255,0)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* ── Node dots ── */}
      {[
        [310, 180],
        [310, 310],
        [190, 320],
        [140, 190],
        [360, 310],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3"
          fill="rgba(255,255,255,0.25)"
        />
      ))}
      <circle cx="310" cy="180" r="3" fill="rgb(0,255,0)" />

      {/* ── Center: pulsing dot ── */}
      <circle className="circuit-pulse" cx="250" cy="250" r="14" fill="rgb(0,255,0)" opacity="0.15" />
      <circle cx="250" cy="250" r="6" fill="rgb(0,255,0)" />
      <circle cx="250" cy="250" r="3" fill="white" />
    </svg>
  );
}

/* ── Feature row data ────────────────────────────────────── */
const features = [
  {
    num: "01",
    title: "PMASynRM Motor",
    tag: "96% peak efficiency · Zero transmission losses",
    body: "Our proprietary motor eliminates brushes, gearboxes, and heat throttling. Maximum torque from 0 rpm. Maximum efficiency across the full rev range.",
  },
  {
    num: "02",
    title: "DC Fast Charging",
    tag: "400 km of range added per hour via CCS Combo",
    body: "The only electric motorcycle compatible with every public DC fast network. Charge to 80% in under 40 minutes — anywhere on the planet.",
  },
  {
    num: "03",
    title: "Always Connected",
    tag: "My Energica app · Real-time diagnostics · Remote control",
    body: "Live riding data, remote pre-conditioning, theft alerts, and over-the-air firmware updates. Your bike, always in your pocket.",
  },
];

/* ── Section ─────────────────────────────────────────────── */
export default function TechSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Background colour morph: black → very dark green */
      gsap.to(sectionRef.current, {
        backgroundColor: "#000d00",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1.5,
        },
      });

      /* Headline block */
      gsap.from(".ts-head", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ts-head-wrap",
          start: "top 80%",
        },
      });

      /* Feature rows stagger in */
      gsap.from(".ts-row", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ts-rows",
          start: "top 75%",
        },
      });

      /* SVG right panel reveal */
      gsap.from(".ts-svg-wrap", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ts-svg-wrap",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-[120px] overflow-hidden"
      style={{ willChange: "background-color" }}
    >
      {/* ── Decorative vertical divider ─────────────────── */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.04] hidden lg:block pointer-events-none" />

      <Container>
        {/* 12-col grid: left text = 6 cols, right SVG = 6 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: text (cols 1-6) ────────────────────── */}
          <div className="lg:col-span-6">
            {/* Section header */}
            <div className="ts-head-wrap mb-12">
              <p className="ts-head inline-flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-[rgb(0,255,0)]" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  Our Technology
                </span>
              </p>
              <h2
                className="ts-head font-display text-white leading-[1.1]"
                style={{ fontSize: "var(--text-h1)" }}
              >
                A Decade of
                <br />
                <span className="text-[rgb(0,255,0)]">Electric</span> Innovation
              </h2>
            </div>

            {/* Feature rows using FeatureBlock */}
            <div className="ts-rows">
              {features.map((f) => (
                <FeatureBlock
                  key={f.num}
                  number={f.num}
                  title={f.title}
                  tag={f.tag}
                  body={f.body}
                  className="ts-row"
                />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
              >
                Explore our technology
                <span className="text-[rgb(0,255,0)] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: animated circuit SVG (cols 7-12) ─── */}
          <div className="ts-svg-wrap lg:col-span-6 flex items-center justify-center">
            <CircuitGraphic />
          </div>
        </div>
      </Container>
    </section>
  );
}
