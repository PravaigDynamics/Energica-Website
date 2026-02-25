"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function RacingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Background parallax */
      gsap.to(".rs-bg", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* Text cascade — varied animation types */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl /* Ghost watermark fades in */
        .from(".rs-ghost",     { opacity: 0, scale: 0.94, duration: 1.4, ease: "power2.out" })
        /* Label slides from left */
        .from(".rs-label",     { x: -28, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.2)
        /* Headline clip-reveals line by line */
        .from(".rs-h1",        { y: "110%", duration: 1.0, ease: "power4.out" }, 0.3)
        .from(".rs-h2",        { y: "110%", duration: 1.0, ease: "power4.out" }, "-=0.65")
        /* Body copy */
        .from(".rs-body",      { y: 24, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        /* CTA */
        .from(".rs-cta",       { y: 18, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
        /* Stats scale up from small */
        .from(".rs-stat-item", { scale: 0.85, opacity: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.25")
        /* Divider line expands */
        .from(".rs-divider",   { scaleX: 0, duration: 0.8, ease: "power3.out" }, 0.55);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background image with parallax */}
      <div className="rs-bg absolute inset-[-20%] will-change-transform">
        <Image
          src="/images/Pagina Eva/homepage_forza_img-1536x837.jpg"
          alt="Energica racing"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* Diagonal neutral slash — right edge decoration */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.05]"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.9))",
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>

      {/* Ghost watermark — giant "MotoE" behind content */}
      <div
        aria-hidden
        className="rs-ghost absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ willChange: "transform, opacity" }}
      >
        <span
          className="font-display text-white leading-none"
          style={{
            fontSize: "clamp(140px, 22vw, 320px)",
            opacity: 0.035,
            letterSpacing: "-0.02em",
          }}
        >
          MotoE
        </span>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <Container className="relative z-10 py-[120px]">

        {/* Label */}
        <p className="rs-label inline-flex items-center gap-3 mb-8">
          <span className="w-6 h-px bg-[rgb(0,255,0)]" />
          <span className="text-[10px] uppercase tracking-[0.45em] text-[rgb(0,255,0)]">
            Racing DNA
          </span>
          <span className="w-6 h-px bg-[rgb(0,255,0)]" />
        </p>

        {/* Headline — clip reveals */}
        <h2
          className="font-display text-white leading-[0.88] mb-8"
          style={{ fontSize: "clamp(52px, 9.5vw, 138px)" }}
        >
          <div className="overflow-hidden">
            <span className="rs-h1 block will-change-transform">7 Seasons</span>
          </div>
          <div className="overflow-hidden">
            <span className="rs-h2 block will-change-transform">of MotoE.</span>
          </div>
        </h2>

        {/* Body — max 620px, centred on large screens */}
        <p
          className="rs-body text-white/50 leading-[1.75] mb-8 max-w-[620px] mx-auto text-center"
          style={{ fontSize: "clamp(15px, 1.1vw, 18px)" }}
        >
          The track doesn&apos;t lie. Energica has powered the FIM Enel MotoE
          World Cup since day one. Every road bike carries that knowledge.
        </p>

        {/* CTA */}
        <div className="rs-cta flex justify-center mb-12">
          <Button variant="outline" size="lg" href="/racing">
            Explore Racing Heritage →
          </Button>
        </div>

        {/* Divider */}
        <div
          className="rs-divider h-px max-w-[580px] mx-auto mb-10 origin-center"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Stats — scale entrance */}
        <div className="grid grid-cols-3 gap-6 max-w-[540px] mx-auto text-center">
          {[
            { n: "7+",   label: "MotoE Seasons"       },
            { n: "100%", label: "Exclusive Supplier"   },
            { n: "1st",  label: "Electric Race Series" },
          ].map((item) => (
            <div key={item.label} className="rs-stat-item" style={{ willChange: "transform, opacity" }}>
              <p
                className="font-display text-white leading-none mb-2"
                style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}
              >
                {item.n}
              </p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/30">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
