"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

/* ── Slide data ───────────────────────────────────────────── */
const SLIDES = [
  { src: "/images/new/home-slide-1.jpg", label: "Grand Tourer" },
  { src: "/images/new/home-slide-3.jpg", label: "Track Evolved" },
  { src: "/images/new/home-slide-4.jpg", label: "Urban Rebel"  },
  { src: "/images/new/home-slide-5.jpg", label: "Pure Power"   },
  { src: "/images/new/home-slide-6.jpg", label: "Racing DNA"   },
  { src: "/images/new/home-slide-7.jpg", label: "Precision Craft" },
  { src: "/images/new/home-slide-8.jpg", label: "Born Electric" },
  { src: "/images/new/home-slide-9.jpg", label: "Italian Design" },
];

const STATS = [
  { value: "102", unit: "HP",  label: "Peak Power"     },
  { value: "420", unit: "km",  label: "City Range"     },
  { value: "3.5", unit: "s",   label: "0–100 km/h"     },
  { value: "40",  unit: "min", label: "DC Fast Charge" },
];

const SLIDE_MS   = 6000;
const ZOOM_SCALE = 1.06;

/* Padding matching Container — keeps hero aligned with all page sections */
const CONTENT_PX = "px-[clamp(24px,4vw,64px)]";

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLElement>(null);

  /* ── Initial text entrance ───────────────────────────── */
  useGSAP(
    () => {
      gsap
        .timeline({ delay: 0.5 })
        /* Eyebrow line + label */
        .from(".h-label",  { y: 14, opacity: 0, duration: 0.55, ease: "power3.out" })
        /* Headline — clip-reveal: each line slides up from behind its overflow wrapper */
        .from(".h-line-1", { y: "110%", duration: 1.0, ease: "power4.out" }, "-=0.15")
        .from(".h-line-2", { y: "110%", duration: 1.0, ease: "power4.out" }, "-=0.72")
        .from(".h-line-3", { y: "110%", duration: 1.0, ease: "power4.out" }, "-=0.72")
        /* Supporting copy */
        .from(".h-tagline", { y: 22, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.55")
        .from(".h-cta",     { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.45")
        /* Stats + right rail together */
        .from(".h-stat",       { y: 16, opacity: 0, stagger: 0.07, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .from(".h-right-rail", { x: 24, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.7);
    },
    { scope: wrapRef }
  );

  /* ── Ken-Burns zoom per slide ────────────────────────── */
  useEffect(() => {
    gsap.killTweensOf(".hs-slide");
    gsap.fromTo(
      `.hs-slide-${active}`,
      { scale: 1 },
      { scale: ZOOM_SCALE, duration: 8, ease: "power1.out" }
    );
  }, [active]);

  /* ── Navigation ──────────────────────────────────────── */
  const goTo   = useCallback((i: number) => setActive(i), []);
  const goPrev = useCallback(() => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length), []);
  const goNext = useCallback(() => setActive((a) => (a + 1) % SLIDES.length), []);

  /* ── Auto-advance ────────────────────────────────────── */
  useEffect(() => {
    const id = setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#080808] flex flex-col"
    >
      {/* ── Background slides ─────────────────────────────── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <div className={`hs-slide hs-slide-${i} absolute inset-0 will-change-transform`}>
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(108deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.82) 38%, rgba(8,8,8,0.40) 65%, rgba(8,8,8,0.08) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.6) 18%, transparent 45%)",
        }}
      />

      {/* Top green accent line */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-[2px] z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgb(0,255,0) 0%, rgba(0,255,0,0.5) 22%, transparent 55%)",
        }}
      />

      {/* ── Main layout ────────────────────────────────────── */}
      {/* Takes all space above the stats footer */}
      <div className={`relative z-[3] flex flex-1 ${CONTENT_PX} pt-24`}>

        {/* ── Left: vertical accent + text ──────────────────── */}
        <div className="flex flex-1 gap-6 md:gap-10">

          {/* Thin green vertical rule */}
          <div
            aria-hidden
            className="hidden md:block flex-shrink-0 w-px mt-2 mb-8 self-stretch"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,255,0,0.7) 0%, rgba(0,255,0,0.2) 60%, transparent 100%)",
            }}
          />

          {/* Text column */}
          <div className="flex flex-col justify-center flex-1 pb-6">

            {/* Eyebrow */}
            <div className="h-label flex items-center gap-3 mb-8 md:mb-10">
              <span className="w-5 h-px bg-[rgb(0,255,0)] flex-shrink-0" />
              <span className="text-[10px] uppercase tracking-[0.45em] text-white/40">
                Made in Italy&nbsp;·&nbsp;100% Electric
              </span>
            </div>

            {/* Headline — each line clip-revealed from below */}
            <h1
              className="font-display leading-[0.88] mb-8 md:mb-10"
              style={{ fontSize: "clamp(60px, 8vw, 128px)" }}
            >
              <div className="overflow-hidden">
                <span className="h-line-1 block text-white will-change-transform">Born</span>
              </div>
              <div className="overflow-hidden">
                <span className="h-line-2 block will-change-transform" style={{ color: "rgb(0,255,0)" }}>
                  Electric.
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="h-line-3 block text-white will-change-transform">Born Italian.</span>
              </div>
            </h1>

            {/* Tagline */}
            <p
              className="h-tagline text-white/45 leading-[1.75] mb-8 md:mb-10"
              style={{ fontSize: "clamp(14px, 1.05vw, 17px)", maxWidth: "420px" }}
            >
              The world&rsquo;s most advanced electric motorcycles.
              Engineered in Modena, Italy. Proven on the world stage.
            </p>

            {/* CTAs */}
            <div className="h-cta flex flex-wrap items-center gap-3 md:gap-4">
              <Link
                href="/models"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[rgb(0,255,0)] text-black font-display text-sm tracking-[0.1em] hover:bg-[rgb(0,220,0)] transition-colors duration-200"
              >
                EXPLORE MODELS
              </Link>
              <Link
                href="/test-ride"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-display text-sm tracking-[0.1em] hover:border-white/50 transition-colors duration-200"
              >
                BOOK TEST RIDE
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right: slide rail ─────────────────────────────── */}
        <div className="h-right-rail hidden lg:flex flex-col items-center justify-between pb-8 pl-6 w-16 flex-shrink-0">
          {/* Counter */}
          <div className="flex flex-col items-center gap-2 mt-auto">
            <span className="font-display text-xs tabular-nums" style={{ color: "rgb(0,255,0)" }}>
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="w-px h-10 bg-white/[0.12]" />
            <span className="font-display text-xs tabular-nums text-white/25">
              {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>

          {/* Prev / next arrows */}
          <div className="flex flex-col gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-8 h-8 border border-white/[0.12] flex items-center justify-center text-white/35 hover:border-[rgb(0,255,0)]/50 hover:text-[rgb(0,255,0)] transition-all duration-200 cursor-none text-xs"
            >
              ↑
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="w-8 h-8 border border-white/[0.12] flex items-center justify-center text-white/35 hover:border-[rgb(0,255,0)]/50 hover:text-[rgb(0,255,0)] transition-all duration-200 cursor-none text-xs"
            >
              ↓
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats strip ────────────────────────────────────── */}
      <div
        className="relative z-[4] border-t border-white/[0.06]"
        style={{ background: "rgba(8,8,8,0.75)", backdropFilter: "blur(12px)" }}
      >
        <div className={`grid grid-cols-2 md:grid-cols-4 ${CONTENT_PX}`}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`h-stat py-4 pr-6 ${
                i > 0 ? "pl-4 md:pl-6 border-l border-white/[0.06]" : ""
              }`}
            >
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display leading-none"
                  style={{ fontSize: "clamp(20px, 1.6vw, 26px)", color: "#fff" }}
                >
                  {s.value}
                </span>
                <span
                  className="font-display text-[11px] ml-0.5"
                  style={{ color: "rgb(0,255,0)" }}
                >
                  {s.unit}
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/25 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress / controls row ─────────────────────────── */}
      <div
        className={`relative z-[4] flex items-center justify-between ${CONTENT_PX} py-3`}
        style={{ background: "rgba(8,8,8,0.5)" }}
      >
        {/* Scroll cue */}
        <div className="flex items-center gap-2.5">
          <div className="w-px h-4 bg-white/[0.12] relative overflow-hidden flex-shrink-0">
            <div className="scroll-indicator-line absolute inset-x-0 top-0 h-full bg-white/40" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/20 hidden sm:block">
            Scroll
          </span>
        </div>

        {/* Dot progress indicators */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative overflow-hidden bg-white/[0.12] transition-all duration-300 cursor-none"
              style={{ height: "2px", width: i === active ? "28px" : "10px" }}
            >
              {i === active && (
                <span
                  key={active}
                  className="absolute inset-0 origin-left"
                  style={{
                    background: "rgb(0,255,0)",
                    animation: `slide-progress ${SLIDE_MS}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active slide label */}
        <span className="text-[9px] uppercase tracking-[0.35em] text-white/25 tabular-nums hidden sm:block">
          {SLIDES[active].label}
        </span>
      </div>
    </section>
  );
}
