import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Owners | Energica Motor Company",
  description: "Resources, manuals, and community for Energica electric motorcycle owners.",
};

export default function OwnersPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen pt-32">
      <Container>
        <p className="inline-flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-[#78BE20]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Owners</span>
        </p>
        <h1
          className="font-display text-white leading-none mb-6"
          style={{ fontSize: "clamp(60px, 10vw, 140px)" }}
        >
          Owner<br />Portal.
        </h1>
        <p className="text-white/60 text-[length:var(--text-body)] max-w-[750px] leading-relaxed mb-[32px]">
          Manuals, software updates, and owner resources are being prepared.
          In the meantime, your nearest authorised Energica dealer can assist
          with any technical queries.
        </p>
        <div className="flex flex-wrap gap-4">
          <PrimaryButton href="/dealers">Find Your Dealer</PrimaryButton>
          <SecondaryButton href="/warranty">Warranty Info</SecondaryButton>
        </div>
      </Container>
    </main>
  );
}
