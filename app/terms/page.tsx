import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Terms of Use | Energica Motor Company",
  description: "Terms of Use for Energica Motor Company — the conditions governing use of this website.",
};

export default function TermsPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen pt-32">
      <Container>
        <p className="inline-flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-[#78BE20]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/65">Legal</span>
        </p>
        <h1
          className="font-display text-white leading-none mb-6"
          style={{ fontSize: "clamp(60px, 10vw, 140px)" }}
        >
          Terms of Use.
        </h1>
        <p className="text-white/60 text-[length:var(--text-body)] max-w-[750px] leading-relaxed mb-[32px]">
          Our full Terms of Use are currently being updated. By accessing this
          website you agree to our standard terms and conditions. For any
          questions, please contact us directly.
        </p>
        <div className="flex flex-wrap gap-4">
          <PrimaryButton href="mailto:legal@energicamotor.com">Contact Us</PrimaryButton>
          <SecondaryButton href="/">Back Home</SecondaryButton>
        </div>
      </Container>
    </main>
  );
}
