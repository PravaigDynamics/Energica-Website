"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { models } from "@/data/models";

/* ── 3D tilt card ─────────────────────────────────────────── */
function ModelCard({
  model,
  index,
}: {
  model: (typeof models)[0];
  index: number;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el) return;
    // No transition during tracking — instant response
    el.style.transition = "box-shadow 0.25s ease-out";
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    const rotX = -y * 5;   // invert Y so top edge tilts back
    const rotY =  x * 5;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    el.style.boxShadow =
      "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,255,0,0.22), 0 8px 24px rgba(0,255,0,0.12)";
  }

  function handleMouseLeave() {
    const el = tiltRef.current;
    if (!el) return;
    // Smooth spring-back on leave
    el.style.transition =
      "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease-out";
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = "";
  }

  return (
    <div
      ref={tiltRef}
      className="flex-shrink-0"
      style={{
        width: "min(440px, 72vw)",
        height: "80vh",
        minHeight: "520px",
        willChange: "transform",
        transformStyle: "preserve-3d",
        /* Default border-color transition lives here so hover CSS still works */
        transition: "box-shadow 0.4s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/models/${model.id}`}
        className="group relative flex flex-col w-full h-full bg-[#161616] border border-white/[0.06] hover:border-[rgb(0,255,0)]/40 transition-colors duration-400 overflow-hidden"
      >
        {/* Card index */}
        <span className="absolute top-5 left-5 font-display text-xs text-white/20 z-10">
          0{index + 1}
        </span>

        {/* Bottom border sweep on hover */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[rgb(0,255,0)] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left z-10" />

        {/* Bike image */}
        <div className="relative flex-1 overflow-hidden">
          {/* Colour-matched glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at center bottom, ${
                model.colors[0]?.hex ?? "rgb(0,255,0)"
              }28 0%, transparent 65%)`,
            }}
          />
          <Image
            src={model.heroImage}
            alt={model.name}
            fill
            className="object-contain object-center p-6 group-hover:scale-[1.04] transition-transform duration-600"
            sizes="440px"
          />
        </div>

        {/* Card footer */}
        <div className="p-6 pt-4 border-t border-white/[0.05]">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-2xl text-white group-hover:text-[rgb(0,255,0)] transition-colors duration-300">
                {model.name}
              </h3>
              <p className="text-xs text-white/35 mt-0.5">{model.tagline}</p>
            </div>
            <span className="text-[rgb(0,255,0)] text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300 mt-1">
              →
            </span>
          </div>

          {/* Key spec */}
          <div className="mt-4 inline-flex items-baseline gap-1">
            <span className="font-display text-3xl text-white">
              {model.keySpecs[0]?.value}
            </span>
            <span className="font-display text-sm text-[rgb(0,255,0)]">
              {model.keySpecs[0]?.unit}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/30 ml-1">
              {model.keySpecs[0]?.label}
            </span>
          </div>

          <p className="mt-3 text-[11px] uppercase tracking-widest text-white/25 group-hover:text-white/50 transition-colors flex items-center gap-1">
            View Model <span className="text-[rgb(0,255,0)]">→</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────── */
export default function ModelLineup() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current!;
      const track   = trackRef.current!;
      const bar     = progressRef.current!;

      function buildAnim() {
        const scrollDist = track.scrollWidth - window.innerWidth;
        if (scrollDist <= 0) return;

        ScrollTrigger.getById("lineup-pin")?.kill();

        gsap.to(track, {
          x: -scrollDist,
          ease: "none",
          scrollTrigger: {
            id: "lineup-pin",
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: `+=${scrollDist}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      }

      buildAnim();
      window.addEventListener("resize", buildAnim);
      return () => window.removeEventListener("resize", buildAnim);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Section header — static inside pin */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-end justify-between px-[clamp(24px,4vw,64px)] pt-20 pb-6 pointer-events-none">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/30 mb-[24px]">
            The Lineup
          </p>
          <h2
            className="font-display text-white leading-[1.1]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Four Machines.
            <br />
            One Vision.
          </h2>
        </div>
        <Link
          href="/models"
          className="pointer-events-auto text-xs text-white/40 hover:text-white transition-colors hidden md:flex items-center gap-1"
        >
          All models →
        </Link>
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex items-end gap-4 px-[clamp(24px,4vw,64px)] pb-14 will-change-transform"
        style={{ paddingTop: "17rem", height: "100vh" }}
      >
        {models.map((model, i) => (
          <ModelCard key={model.id} model={model} index={i} />
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-8 md:w-16" />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/[0.04]">
        <div
          ref={progressRef}
          className="h-full bg-[rgb(0,255,0)] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
