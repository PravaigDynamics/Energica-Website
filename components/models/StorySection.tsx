"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { type BikeModel } from "@/data/models";
import { Container } from "@/components/ui/Container";

interface StorySectionProps {
  model: BikeModel;
}

export default function StorySection({ model }: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Each paragraph fades in as it enters viewport */
      gsap.utils.toArray<HTMLElement>(".story-para").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      /* Callout box slides in from left */
      gsap.from(".story-callout", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-callout",
          start: "top 85%",
        },
      });

      /* Image reveal */
      gsap.from(".story-img", {
        scale: 1.05,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-img",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  const paragraphs = model.storyParagraphs ?? [model.description];
  const storyImage =
    model.lifestyleImages[2] ?? model.lifestyleImages[0] ?? model.heroImage;

  return (
    <section ref={sectionRef} className="relative bg-[#080808] overflow-hidden">
      {/* Subtle horizontal rule at top */}
      <div className="absolute top-0 left-8 right-8 h-px bg-white/[0.04]" />

      <Container className="py-[120px]">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* ── LEFT: Sticky lifestyle image + callout ─────────── */}
          <div className="lg:sticky lg:top-28 self-start">
            {/* Lifestyle photo */}
            <div className="story-img relative overflow-hidden bg-[#111]" style={{ aspectRatio: "4/5" }}>
              <Image
                src={storyImage}
                alt={`${model.name} lifestyle`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#78BE20]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#78BE20]" />
            </div>

            {/* Callout stat box */}
            {model.callout && (
              <div className="story-callout mt-6 p-6 border-l-[3px] border-[#78BE20] bg-[#78BE20]/[0.05]">
                <p
                  className="font-display text-white leading-none mb-2"
                  style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
                >
                  {model.callout.stat}
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                  {model.callout.label}
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: text reveals ────────────────────────────── */}
          <div className="flex flex-col gap-8 pt-4 lg:pt-12">
            {/* Section header */}
            <div className="story-para">
              <p className="inline-flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#78BE20]" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                  The Story
                </span>
              </p>
              <h2
                className="font-display text-white leading-[1.1]"
                style={{ fontSize: "var(--text-h1)" }}
              >
                {model.headline}
              </h2>
            </div>

            {/* Divider */}
            <div className="w-12 h-px bg-[#78BE20]/40" />

            {/* Story paragraphs */}
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="story-para text-[length:var(--text-body)] text-white/50 leading-[1.6]"
              >
                {para}
              </p>
            ))}

            {/* Inline specs footnote */}
            <div className="story-para flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-white/[0.06]">
              {model.keySpecs.slice(0, 2).map((spec) => (
                <div key={spec.label}>
                  <span className="font-display text-xl text-white">
                    {spec.value}
                    <span className="text-[#78BE20] ml-0.5 text-sm">{spec.unit}</span>
                  </span>
                  <p className="text-[9px] uppercase tracking-widest text-white/60 mt-0.5">
                    {spec.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
