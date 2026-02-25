import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About | Energica Motor Company",
  description: "The story of Energica Motor Company — born in Modena, Italy, pioneers of the electric superbike since 2014.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Pagina%20EGO/ego_mosaico_ANN4320.jpg"
            alt="Energica Motor Company"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />

        <Container className="relative z-10 w-full pb-16">
          <p className="inline-flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[rgb(0,255,0)]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[rgb(0,255,0)]/80">
              About Energica
            </span>
          </p>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: "clamp(60px, 10vw, 140px)" }}
          >
            Born in<br />
            <span className="text-[rgb(0,255,0)]">Modena.</span>
          </h1>
        </Container>
      </section>

      {/* ── STORY ─────────────────────────────────────────────── */}
      <section className="w-full py-[120px]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="inline-flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-[rgb(0,255,0)]" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  Our Story
                </span>
              </p>
              <h2
                className="font-display text-white leading-none mb-8"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Pioneers Since 2014.
              </h2>
              <p className="text-white/50 text-base leading-[1.8] mb-4">
                Energica Motor Company was founded in Modena, Italy — the same city
                that gave the world Ferrari, Lamborghini, and Maserati. From the
                very beginning, our mission was singular: build the world&apos;s most
                advanced electric motorcycles.
              </p>
              <p className="text-white/50 text-base leading-[1.8] mb-4">
                In 2019, we were named the exclusive motorcycle supplier to the FIM
                Enel MotoE World Cup — a role we held for seven consecutive seasons,
                proving our technology against the most demanding conditions in
                professional motorsport.
              </p>
              <p className="text-white/50 text-base leading-[1.8]">
                Every lesson learned on the grid feeds directly into our road bikes.
                The result is a lineup of four motorcycles that no other manufacturer
                on earth can match for performance, refinement, or pedigree.
              </p>
            </div>

            <div className="space-y-6 lg:pt-16">
              {[
                { stat: "2014", label: "Founded in Modena, Italy" },
                { stat: "7", label: "Seasons as exclusive MotoE supplier" },
                { stat: "4", label: "Road-legal models in production" },
              ].map((item) => (
                <div key={item.stat} className="border-l-2 border-[rgb(0,255,0)] pl-6 py-2">
                  <p
                    className="font-display text-white"
                    style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
                  >
                    {item.stat}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="w-full bg-[#0f0f0f] py-[120px] border-t border-white/[0.04]">
        <Container className="text-center">
          <h2
            className="font-display text-white leading-none mb-[24px]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Experience Energica.
          </h2>
          <p className="text-white/40 text-[length:var(--text-body)] mb-[32px] max-w-[750px] mx-auto">
            Book a free test ride at your nearest authorised dealer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <PrimaryButton href="/models">View All Models</PrimaryButton>
            <SecondaryButton href="/racing">Racing Heritage</SecondaryButton>
          </div>
        </Container>
      </section>

    </main>
  );
}
