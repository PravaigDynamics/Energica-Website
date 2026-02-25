"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export default function DealerCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [count, setCount]   = useState(0);

  useGSAP(
    () => {
      /* CountUp: 0 → 47 */
      const proxy = { n: 0 };
      gsap.to(proxy, {
        n: 47,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => setCount(Math.round(proxy.n)),
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      /* Left column cascade */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      tl
        .from(".dc-eyebrow",  { x: -24, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".dc-rule",     { scaleX: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".dc-number",   { scale: 0.75, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.2")
        .from(".dc-sublabel", { y: 12, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
        /* Right column */
        .from(".dc-h1",       { y: "110%", duration: 0.9, ease: "power4.out" }, "-=0.7")
        .from(".dc-h2",       { y: "110%", duration: 0.9, ease: "power4.out" }, "-=0.65")
        .from(".dc-body",     { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .from(".dc-buttons",  { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#000] py-[120px] overflow-hidden"
    >
      {/* Ambient green glow — left */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0,255,0,0.055) 0%, transparent 55%)",
        }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Stat counter ──────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <p className="dc-eyebrow inline-flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-[rgb(0,255,0)]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">
                Authorised dealers worldwide
              </span>
            </p>

            {/* Thin green rule */}
            <div
              className="dc-rule h-px w-12 mb-8 origin-left"
              style={{ background: "rgba(0,255,0,0.45)" }}
            />

            {/* Giant count-up */}
            <p
              className="dc-number font-display text-white leading-none"
              style={{
                fontSize: "clamp(96px, 14vw, 200px)",
                willChange: "transform, opacity",
              }}
            >
              {count}
              <span style={{ color: "rgb(0,255,0)" }}>+</span>
            </p>

            {/* Sub-label */}
            <p className="dc-sublabel mt-4 text-sm text-white/20 tracking-wide">
              Countries with an Energica presence
            </p>
          </div>

          {/* ── RIGHT: Headline + body + CTA ────────────────── */}
          <div>
            {/* Clip-reveal headline */}
            <h2
              className="font-display leading-[0.88] mb-8"
              style={{ fontSize: "clamp(44px, 5vw, 80px)" }}
            >
              <div className="overflow-hidden">
                <span className="dc-h1 block text-white will-change-transform">
                  Find your nearest
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  className="dc-h2 block will-change-transform"
                  style={{ color: "rgb(0,255,0)" }}
                >
                  Energica dealer.
                </span>
              </div>
            </h2>

            {/* Body */}
            <p
              className="dc-body text-white/40 leading-[1.8] mb-10"
              style={{
                fontSize: "clamp(14px, 1.05vw, 17px)",
                maxWidth: "480px",
              }}
            >
              See it. Touch it. Ride it. Our authorised network spans 30 countries.
              Test rides are free — no commitment required.
            </p>

            {/* Buttons — primary first */}
            <div className="dc-buttons flex flex-wrap gap-4">
              <PrimaryButton href="/test-ride">Book a Test Ride</PrimaryButton>
              <SecondaryButton href="/dealers">Find a Dealer</SecondaryButton>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
