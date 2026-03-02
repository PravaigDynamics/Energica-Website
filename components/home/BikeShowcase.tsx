"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const bikes = [
  {
    id: "experia",
    index: "01",
    name: "Experia",
    tagline: "Born to be wind.",
    category: "Grand Tourer",
    stat: { value: "420", unit: "km", label: "City Range" },
    accent: "#4A9EFF",
    href: "/models/experia",
    image: "/images/Pagina Experia/Energica_Experia.png",
  },
  {
    id: "esseesse9",
    index: "02",
    name: "EsseEsse9+",
    tagline: "The Naked Champion.",
    category: "Naked Sport",
    stat: { value: "200", unit: "Nm", label: "Wheel Torque" },
    accent: "#FF6B2B",
    href: "/models/esseesse9",
    image: "/images/Pagina SS9/ss9-1.png",
  },
  {
    id: "eva-ribelle",
    index: "03",
    name: "Eva Ribelle",
    tagline: "Redefine every road.",
    category: "Street Fighter",
    stat: { value: "107", unit: "HP", label: "Peak Power" },
    accent: "#E30613",
    href: "/models/eva-ribelle",
    image: "/images/Pagina Eva/Eva-Ribelle-1.png",
  },
  {
    id: "ego",
    index: "04",
    name: "Ego+",
    tagline: "Track tested. Street legal.",
    category: "Supersport",
    stat: { value: "2.6", unit: "s", label: "0–100 km/h" },
    accent: "#C0C0C0",
    href: "/models/ego",
    image: "/images/Pagina EGO/Ego-1.png",
  },
];

export default function BikeShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Track which bike slide is active within the scroll container */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.5, root: container }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  /* Show nav dots only while this section is on screen */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowDots(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A]">

      {/* STICKY LEFT NAV DOTS — visible only while section is on screen */}
      <div
        className={`fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-30
                    flex-col items-center gap-3 hidden md:flex
                    transition-opacity duration-500 ${showDots ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {bikes.map((bike, i) => (
          <button
            key={bike.id}
            onClick={() =>
              sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label={`Go to ${bike.name}`}
            className="group flex items-center gap-3 cursor-none"
          >
            <div
              className={`rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-1.5 h-8 bg-white"
                  : "w-1 h-3 bg-white/20 hover:bg-white/40"
              }`}
            />
            <span
              className={`text-[9px] tracking-[0.3em] uppercase transition-all duration-300 ${
                i === activeIndex
                  ? "text-white opacity-100"
                  : "text-white/0 group-hover:text-white/40"
              }`}
            >
              {bike.name}
            </span>
          </button>
        ))}
      </div>

      {/* SECTION LABEL */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-10">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase">
            The Lineup
          </p>
          <Link
            href="/models"
            className="text-[10px] tracking-[0.3em] text-white/30 uppercase hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>
      </div>

      {/* SCROLL SNAP CONTAINER */}
      <div
        ref={containerRef}
        className="snap-y snap-mandatory overflow-y-auto"
        style={{ height: "100vh", scrollbarWidth: "none" }}
      >
        {bikes.map((bike, i) => (
          <div
            key={bike.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="snap-start w-full h-screen relative flex items-center overflow-hidden bg-[#0A0A0A]"
          >
            {/* BIKE IMAGE — right side dominant */}
            <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[60%]">
              {/* Colour glow behind bike */}
              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="w-[50%] h-[50%] rounded-full blur-[140px] opacity-20 transition-colors duration-700"
                  style={{ backgroundColor: bike.accent }}
                />
              </div>
              <Image
                src={bike.image}
                alt={bike.name}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 65vw"
                priority={i === 0}
              />
            </div>

            {/* GRADIENT — left fade for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />

            {/* TEXT CONTENT */}
            <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full">
              <div className="max-w-[480px]">

                {/* Index + Category */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-mono">
                    {bike.index}
                  </span>
                  <div className="w-8 h-px bg-white/20" />
                  <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                    {bike.category}
                  </span>
                </div>

                {/* Name */}
                <h2 className="font-display text-[clamp(56px,9vw,112px)] text-white leading-none uppercase tracking-tight mb-4">
                  {bike.name}
                </h2>

                {/* Tagline */}
                <p className="text-base md:text-lg text-white/50 mb-10 font-light italic">
                  &ldquo;{bike.tagline}&rdquo;
                </p>

                {/* KEY STAT */}
                <div className="mb-10">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="font-display text-[clamp(48px,7vw,80px)] font-bold leading-none transition-colors duration-500"
                      style={{ color: bike.accent }}
                    >
                      {bike.stat.value}
                    </span>
                    <span className="text-2xl text-white/60 font-light">
                      {bike.stat.unit}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                    {bike.stat.label}
                  </p>
                </div>

                {/* CTA */}
                <Link href={bike.href} className="inline-flex items-center gap-3 group">
                  <span
                    className="h-px transition-all duration-300 w-10 group-hover:w-16"
                    style={{ backgroundColor: bike.accent }}
                  />
                  <span className="text-xs tracking-[0.3em] text-white uppercase group-hover:text-white/70 transition-colors">
                    Discover {bike.name}
                  </span>
                </Link>

              </div>
            </div>

            {/* WATERMARK NUMBER */}
            <div className="absolute bottom-6 right-8 md:right-12 lg:right-20 z-20 select-none pointer-events-none">
              <span className="font-display text-[120px] md:text-[160px] text-white/[0.03] font-bold leading-none">
                {bike.index}
              </span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
