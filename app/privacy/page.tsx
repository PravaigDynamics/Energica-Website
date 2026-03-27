import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Privacy Policy | Energica Motor Company",
  description: "Privacy Policy for Energica Motor Company — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
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
          Privacy Policy.
        </h1>
        <p className="text-white/60 text-[length:var(--text-body)] max-w-[750px] leading-relaxed mb-[32px]">
          Our full Privacy Policy is currently being updated to reflect the latest
          data protection requirements. For any questions regarding how we process
          your personal data, please contact us directly.
        </p>
        <div className="flex flex-wrap gap-4">
          <PrimaryButton href="mailto:privacy@energicamotor.com">Contact Us</PrimaryButton>
          <SecondaryButton href="/">Back Home</SecondaryButton>
        </div>
      </Container>
    </main>
  );
}
