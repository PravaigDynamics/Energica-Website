import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function RacingMoment() {
  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-[#0A0A0A]">

      <Image
        src="/images/Immagini/energica-usa-incentives.jpg"
        alt="Energica Racing"
        fill
        className="object-cover opacity-60"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute bottom-12 md:bottom-20 left-0 right-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <span className="mono-tag mb-5 inline-block">Racing Heritage</span>
            <h2 className="font-display text-[clamp(36px,9vw,112px)] text-white leading-none uppercase mb-4">
              7 Seasons.<br />One Supplier.
            </h2>
            <p className="text-sm text-white/40 mb-6 font-light" style={{ fontFamily: "var(--font-ibm-sans)" }}>
              Zero compromises.
            </p>
            <Link href="/racing" className="inline-flex items-center gap-3 group">
              <div className="w-8 h-px bg-white/40 group-hover:w-12 transition-all duration-300" />
              <span className="text-xs tracking-[0.3em] text-white/60 uppercase group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                The Racing Story
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
