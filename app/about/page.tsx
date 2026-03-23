import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About | Energica Motor Company",
  description: "Born to Race. Reborn to Fly. Energica Motor Company — engineered in Modena's Motor Valley since 2014, exclusive MotoE supplier for 4 seasons.",
};

const CULTURAL = [
  { label: "Film", title: "Nope", sub: "Jordan Peele · 2022" },
  { label: "Film", title: "GI Joe: Snake Eyes", sub: "Paramount · 2021" },
  { label: "TV Feature", title: "Jay Leno's Garage", sub: "NBC · Multiple features" },
  { label: "Brand Advocate", title: "Nico Rosberg", sub: "F1 World Champion · Owner" },
];

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
            <span className="w-6 h-px bg-[#78BE20]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#78BE20]/80">
              About Energica
            </span>
          </p>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: "clamp(56px, 9vw, 130px)" }}
          >
            Born to Race.<br />
            <span className="text-[#78BE20]">Reborn to Fly.</span>
          </h1>
        </Container>
      </section>

      {/* ── STORY ─────────────────────────────────────────────── */}
      <section className="w-full py-[120px]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="inline-flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-[#78BE20]" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                  Our Story
                </span>
              </p>
              <h2
                className="font-display text-white leading-none mb-8"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Pioneers Since 2014.
              </h2>
              <p className="text-white/65 text-base leading-[1.8] mb-4">
                Energica Motor Company was founded in Modena, Italy — the same city
                that gave the world Ferrari, Lamborghini, and Maserati. From the
                very beginning, our mission was singular: build the world&apos;s most
                advanced electric motorcycles.
              </p>
              <p className="text-white/65 text-base leading-[1.8] mb-4">
                In 2019, we were named the exclusive motorcycle supplier to the FIM
                Enel MotoE World Cup — a role we held for four seasons,
                proving our technology against the most demanding conditions in
                professional motorsport.
              </p>
              <p className="text-white/65 text-base leading-[1.8]">
                Every lesson learned on the grid feeds directly into our road bikes.
                The result is a lineup of four motorcycles that no other manufacturer
                on earth can match for performance, refinement, or pedigree.
              </p>
            </div>

            {/* Stats sidebar */}
            <div className="space-y-6 lg:pt-16">
              {[
                { stat: "2014", label: "Founded in Modena, Italy" },
                { stat: "4", label: "Seasons as exclusive MotoE supplier" },
                { stat: "4,000+", label: "Riders globally" },
                { stat: "135+", label: "Dealer & importer touchpoints" },
                { stat: "4", label: "Road-legal models in production" },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[#78BE20] pl-6 py-2">
                  <p
                    className="font-display text-white"
                    style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
                  >
                    {item.stat}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/65 mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CULTURAL VALIDATION ───────────────────────────────── */}
      <section className="w-full py-[120px] bg-[#0d0d0d] border-t border-white/[0.04]">
        <Container>
          <p className="inline-flex items-center gap-3 mb-10">
            <span className="w-6 h-px bg-[#78BE20]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/60">
              Beyond the Road
            </span>
          </p>
          <h2
            className="font-display text-white leading-none mb-12"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            Earned Visibility.<br />
            <span className="text-[#78BE20]">No Paid Noise.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CULTURAL.map((item) => (
              <div
                key={item.title}
                className="p-6 border border-white/[0.08] bg-[#0a0a0a] hover:border-[#78BE20]/25 transition-colors duration-300"
              >
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#78BE20]/70 font-mono block mb-3">
                  {item.label}
                </span>
                <p className="font-display text-white text-xl leading-tight mb-1">
                  {item.title}
                </p>
                <p className="text-[10px] text-white/45 tracking-wide">
                  {item.sub}
                </p>
              </div>
            ))}
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
          <p className="text-white/60 text-[length:var(--text-body)] mb-[32px] max-w-[750px] mx-auto">
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
