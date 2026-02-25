"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { models } from "@/data/models";
import { PrimaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/* ── Tiny inline CountUp that GSAP drives ───────────────── */
interface CountProps {
  target: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  id: string; // used as data-counter target
}
function Counter({ target, decimals = 0, suffix = "", className, id }: CountProps) {
  const [val, setVal] = useState(0);

  useGSAP(() => {
    const proxy = { n: 0 };
    gsap.to(proxy, {
      n: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () =>
        setVal(parseFloat(proxy.n.toFixed(decimals))),
      scrollTrigger: {
        trigger: `[data-counter="${id}"]`,
        start: "top 85%",
        once: true,
      },
    });
  });

  return (
    <span data-counter={id} className={className}>
      {decimals > 0 ? val.toFixed(decimals) : Math.round(val)}
      {suffix}
    </span>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function FeaturedModel() {
  const sectionRef = useRef<HTMLElement>(null);
  const model = models[0]; // Experia

  useGSAP(
    () => {
      /* Pin the section while the timeline plays (scrub 1.5) */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: "+=130%",
          invalidateOnRefresh: true,
        },
      });

      /* Scrubbed timeline — opacity removed so section is never blank at scroll-start.
         Everything starts slightly offset and slides to final position. */
      tl.from(".fm-bike",  { x: "20vw", scale: 0.93, duration: 1,    ease: "power3.out" })
        .from(".fm-accent", { scaleY: 0, duration: 0.4, ease: "power2.out" }, 0.1)
        .from(".fm-pre",    { x: -24, opacity: 0, duration: 0.45, ease: "power3.out" }, 0.2)
        /* clip-reveal: headline slides up from overflow-hidden parent */
        .from(".fm-title",  { y: "105%", duration: 0.75, ease: "power4.out" }, 0.3)
        .from(".fm-body",   { y: 28, opacity: 0, stagger: 0.08, duration: 0.55, ease: "power3.out" }, 0.5)
        .from(".fm-stat",   { y: 22, opacity: 0, stagger: 0.07, duration: 0.45, ease: "power3.out" }, 0.65)
        .from(".fm-cta",    { y: 16, opacity: 0, duration: 0.45, ease: "power3.out" }, 0.85);

      /* Parallax: bike drifts upward as user scrolls past */
      gsap.to(".fm-bike", {
        y: "-12%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: sectionRef }
  );

  const stats = [
    { label: "Peak Power", value: 102, unit: " HP" },
    { label: "0–100 km/h", value: 3.5, decimals: 1, unit: "s" },
    { label: "City Range", value: 420, unit: " km" },
    { label: "Top Speed", value: 180, unit: " km/h" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] bg-[#0f0f0f] flex items-center overflow-hidden"
    >
      {/* ── Ambient background glow ──────────────────────── */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-3/4 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right center, #8BB8D41a 0%, transparent 65%)",
        }}
      />

      {/* ── Bike image (right half) ───────────────────────── */}
      <div className="fm-bike absolute right-0 top-1/2 -translate-y-1/2 w-[52vw] max-w-3xl h-[75vh] pointer-events-none">
        <Image
          src={model.heroImage}
          alt={model.name}
          fill
          priority
          className="object-contain object-right"
          sizes="52vw"
        />
      </div>

      {/* ── Text column — Container keeps this aligned with every other section ── */}
      <Container className="relative z-10 h-full flex items-center">
        <div className="flex items-center gap-4 lg:gap-6 max-w-xl">

          {/* Green vertical accent line */}
          <div
            className="fm-accent hidden lg:flex flex-shrink-0 w-[3px] h-52 bg-[rgb(0,255,0)] origin-top self-center"
            style={{ willChange: "transform" }}
          />

          <div className="flex-1">
            {/* Pre-label */}
            <p className="fm-pre inline-flex items-center gap-3 mb-5">
              <span className="w-5 h-px bg-[rgb(0,255,0)] lg:hidden" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/35">
                Featured Model
              </span>
            </p>

            {/* Headline — clip-reveal container */}
            <div className="overflow-hidden mb-4">
              <h2
                className="fm-title font-display text-white leading-[0.92] will-change-transform"
                style={{ fontSize: "clamp(64px, 8.5vw, 120px)" }}
              >
                {model.name}
              </h2>
            </div>

            {/* Tagline */}
            <p className="fm-body text-[length:var(--text-body)] text-white/40 italic mb-3">
              &ldquo;{model.tagline}&rdquo;
            </p>

            {/* Description */}
            <p className="fm-body text-[length:var(--text-body)] text-white/50 leading-[1.65] max-w-[420px]">
              {model.description.substring(0, 130)}…
            </p>

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-9 pt-8 border-t border-white/[0.06]">
              {stats.map((s) => (
                <div key={s.label} className="fm-stat">
                  <p className="font-display text-[40px] md:text-[44px] text-white leading-none">
                    <Counter
                      id={`fm-${s.label}`}
                      target={s.value}
                      decimals={s.decimals ?? 0}
                      suffix={s.unit}
                    />
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/30 mt-1.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="fm-cta mt-8">
              <PrimaryButton href={`/models/${model.id}`}>
                Discover {model.name} →
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Bottom gradient blending into next section ────── */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
