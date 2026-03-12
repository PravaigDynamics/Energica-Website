import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Find a Dealer | Energica Motor Company",
  description:
    "Find an authorized Energica dealer near you. Test rides available at 200+ locations worldwide.",
};

const regions = [
  {
    region: "North America",
    dealers: [
      {
        name: "Energica USA — New York",
        city: "New York",
        country: "United States",
        phone: "+1 212 555 0100",
        email: "newyork@energica.com",
        mapsQuery: "Energica+New+York",
      },
      {
        name: "Energica USA — Los Angeles",
        city: "Los Angeles",
        country: "United States",
        phone: "+1 310 555 0200",
        email: "losangeles@energica.com",
        mapsQuery: "Energica+Los+Angeles",
      },
      {
        name: "Energica USA — Miami",
        city: "Miami",
        country: "United States",
        phone: "+1 305 555 0300",
        email: "miami@energica.com",
        mapsQuery: "Energica+Miami",
      },
      {
        name: "Energica Canada — Toronto",
        city: "Toronto",
        country: "Canada",
        phone: "+1 416 555 0100",
        email: "toronto@energica.com",
        mapsQuery: "Energica+Toronto",
      },
    ],
  },
  {
    region: "Europe",
    dealers: [
      {
        name: "Energica Italia — Milano",
        city: "Milano",
        country: "Italy",
        phone: "+39 02 555 0100",
        email: "milano@energica.com",
        mapsQuery: "Energica+Milano",
      },
      {
        name: "Energica Deutschland — München",
        city: "München",
        country: "Germany",
        phone: "+49 89 555 0200",
        email: "munchen@energica.com",
        mapsQuery: "Energica+München",
      },
      {
        name: "Energica France — Paris",
        city: "Paris",
        country: "France",
        phone: "+33 1 555 0300",
        email: "paris@energica.com",
        mapsQuery: "Energica+Paris",
      },
      {
        name: "Energica UK — London",
        city: "London",
        country: "United Kingdom",
        phone: "+44 20 555 0400",
        email: "london@energica.com",
        mapsQuery: "Energica+London",
      },
      {
        name: "Energica España — Madrid",
        city: "Madrid",
        country: "Spain",
        phone: "+34 91 555 0100",
        email: "madrid@energica.com",
        mapsQuery: "Energica+Madrid",
      },
      {
        name: "Energica Netherlands — Amsterdam",
        city: "Amsterdam",
        country: "Netherlands",
        phone: "+31 20 555 0100",
        email: "amsterdam@energica.com",
        mapsQuery: "Energica+Amsterdam",
      },
    ],
  },
  {
    region: "Asia Pacific",
    dealers: [
      {
        name: "Energica Japan — Tokyo",
        city: "Tokyo",
        country: "Japan",
        phone: "+81 3 555 0100",
        email: "tokyo@energica.com",
        mapsQuery: "Energica+Tokyo",
      },
      {
        name: "Energica Australia — Sydney",
        city: "Sydney",
        country: "Australia",
        phone: "+61 2 555 0200",
        email: "sydney@energica.com",
        mapsQuery: "Energica+Sydney",
      },
    ],
  },
];

export default function DealersPage() {
  const allDealers = regions.flatMap((r) => r.dealers);
  const totalDealers = allDealers.length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">

      {/* ── Page header ─────────────────────────────────────── */}
      <Container className="py-[120px] border-b border-white/[0.04]">
        <p className="inline-flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-[#78BE20]" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">
            {totalDealers}+ Authorised Locations
          </span>
        </p>
        <h1 className="font-display text-white leading-none mb-6" style={{ fontSize: "clamp(56px, 10vw, 140px)" }}>
          Find a<br />
          <span className="text-[#78BE20]">Dealer</span>
        </h1>
        <p className="text-[length:var(--text-body)] text-white/45 max-w-[750px] leading-relaxed mb-[32px]">
          Visit an authorised Energica dealer to see, touch, and ride our motorcycles. Our specialists are ready to help you configure your perfect match.
        </p>
        <PrimaryButton href="/test-ride">Book Test Ride →</PrimaryButton>
      </Container>

      {/* ── Two-column layout ────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px] min-h-[80vh]">

          {/* LEFT: Dealer list */}
          <div className="px-8 md:px-16 py-12 border-r border-white/[0.04] overflow-y-auto">
            {regions.map((region) => (
              <div key={region.region} className="mb-14">
                {/* Region header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/[0.05]">
                  <span className="w-2 h-2 rounded-full bg-[#78BE20]" />
                  <h2 className="font-display text-2xl text-white">{region.region}</h2>
                  <span className="ml-auto text-[10px] uppercase tracking-widest text-white/25">
                    {region.dealers.length} dealers
                  </span>
                </div>

                {/* Dealer cards */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {region.dealers.map((dealer) => (
                    <div
                      key={dealer.name}
                      className="group p-5 border border-white/[0.06] bg-[#0d0d0d] hover:border-[#78BE20]/25 transition-all duration-200"
                    >
                      {/* Country badge */}
                      <p className="text-[9px] uppercase tracking-widest text-white/20 mb-2">{dealer.country}</p>

                      {/* Name */}
                      <h3 className="font-display text-white text-lg leading-tight mb-1 group-hover:text-[#78BE20] transition-colors duration-200">
                        {dealer.city}
                      </h3>
                      <p className="text-xs text-white/35 mb-4">{dealer.name}</p>

                      {/* Contact details */}
                      <div className="space-y-1.5 mb-4">
                        <a
                          href={`tel:${dealer.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                          <span className="text-[#78BE20]/50">↗</span>
                          {dealer.phone}
                        </a>
                        <a
                          href={`mailto:${dealer.email}`}
                          className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                          <span className="text-[#78BE20]/50">@</span>
                          {dealer.email}
                        </a>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <a
                          href={`https://maps.google.com/?q=${dealer.mapsQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] uppercase tracking-widest text-[#78BE20]/70 hover:text-[#78BE20] transition-colors"
                        >
                          View on Map →
                        </a>
                        <Link
                          href="/test-ride"
                          className="text-[9px] uppercase tracking-widest text-white/25 hover:text-white/50 transition-colors ml-auto"
                        >
                          Book Ride
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Map placeholder (sticky) */}
          <div className="hidden lg:block">
            <div className="sticky top-20 h-[calc(100vh-80px)] bg-[#080808] border-l border-white/[0.04] flex flex-col overflow-hidden">

              {/* Map grid background — suggests cartography */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              {/* Diagonal lines suggesting roads */}
              <div aria-hidden className="absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "96px 96px",
                }}>
              </div>

              {/* Center marker */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                {/* Pin icon */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-[#78BE20]/40 flex items-center justify-center bg-[#78BE20]/10">
                    <div className="w-3 h-3 rounded-full bg-[#78BE20]" />
                  </div>
                  {/* Pulse rings */}
                  <div className="absolute inset-[-8px] rounded-full border border-[#78BE20]/20 animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="absolute inset-[-16px] rounded-full border border-[#78BE20]/10 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                </div>

                <div className="text-center px-8">
                  <p className="font-display text-white text-xl mb-2">Interactive Map</p>
                  <p className="text-xs text-white/30 leading-relaxed max-w-[200px]">
                    Google Maps integration — embed your API key in{" "}
                    <code className="text-white/40 text-[10px]">app/dealers/page.tsx</code>
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mt-4">
                  {[["12", "Countries"], [totalDealers.toString(), "Dealers"], ["200+", "Cities"]].map(([val, lbl]) => (
                    <div key={lbl} className="text-center">
                      <p className="font-display text-2xl text-white">{val}</p>
                      <p className="text-[9px] uppercase tracking-widest text-white/25">{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-white/[0.05] bg-[#080808]/80 backdrop-blur-sm">
                <p className="text-[9px] uppercase tracking-widest text-white/20 text-center">
                  To enable the live map, add a Google Maps embed or Mapbox integration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
