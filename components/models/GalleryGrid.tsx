"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

interface GalleryGridProps {
  images: string[];
  altPrefix?: string;
}

const CAPTIONS = ["Performance", "Detail", "Lifestyle", "Studio"];

export default function GalleryGrid({
  images,
  altPrefix = "Energica",
}: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gg-cell", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: gridRef }
  );

  if (!images.length) return null;

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {images.map((src, i) => {
        const isWide = i === 0;
        const caption = `${altPrefix} — ${CAPTIONS[i % CAPTIONS.length]}`;

        return (
          <div
            key={src}
            className={`gg-cell group relative overflow-hidden bg-[#0f0f0f] ${
              isWide ? "md:col-span-2" : ""
            }`}
            style={{ aspectRatio: isWide ? "21/9" : "4/3" }}
          >
            <Image
              src={src}
              alt={`${altPrefix} — gallery ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              sizes={isWide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            />

            {/* Caption overlay — slides up on hover */}
            <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                {caption}
              </p>
            </div>

            {/* Red sweep line at bottom on hover */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[rgb(0,255,0)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        );
      })}
    </div>
  );
}
