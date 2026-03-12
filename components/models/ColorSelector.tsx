"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { type ColorOption } from "@/data/models";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  colors: ColorOption[];
}

export default function ColorSelector({ colors }: ColorSelectorProps) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cs-wrap", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="cs-wrap">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#78BE20]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">
              Choose Your Colour
            </span>
          </p>
          <h2 className="font-display text-3xl text-white">{colors[active]?.name}</h2>
        </div>
        <div
          className="w-5 h-5 rounded-full border border-white/20"
          style={{ backgroundColor: colors[active]?.hex }}
        />
      </div>

      {/* Colour swatch buttons */}
      <div className="flex gap-4 mb-8">
        {colors.map((color, i) => (
          <button
            key={color.name}
            onClick={() => setActive(i)}
            title={color.name}
            className="relative group focus:outline-none"
          >
            {/* Outer ring — shows when active */}
            <span
              className={cn(
                "absolute inset-[-4px] rounded-full border transition-all duration-200",
                i === active
                  ? "border-[#78BE20]"
                  : "border-transparent group-hover:border-white/20"
              )}
            />
            {/* Swatch disc */}
            <span
              className={cn(
                "block w-9 h-9 rounded-full transition-transform duration-200",
                i === active ? "scale-105" : "group-hover:scale-105"
              )}
              style={{
                backgroundColor: color.hex,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Bike image — all images stacked; active gets opacity 1 for true crossfade */}
      <div
        className="relative bg-[#0f0f0f] border border-white/[0.06] overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        {colors.map((color, i) => (
          <div
            key={color.name}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={color.image}
              alt={color.name}
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ))}

        {/* Very subtle colour tint wash */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: `${colors[active]?.hex}08` }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#78BE20]/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#78BE20]/30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#78BE20]/30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#78BE20]/30 pointer-events-none" />
      </div>

      {/* Colour label row */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: colors[active]?.hex }}
        />
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
          {colors[active]?.name}
        </span>
        <span className="ml-auto text-[10px] text-white/20">
          {active + 1} / {colors.length}
        </span>
      </div>
    </div>
  );
}
