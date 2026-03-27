import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Cookie Policy | Energica Motor Company",
  description: "Cookie Policy for Energica Motor Company — how we use cookies and similar tracking technologies.",
};

export default function CookiesPage() {
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
          Cookie Policy.
        </h1>
        <p className="text-white/60 text-[length:var(--text-body)] max-w-[750px] leading-relaxed mb-[32px]">
          Our full Cookie Policy is currently being updated. We use cookies to
          improve your browsing experience and analyse site traffic. For any
          questions regarding our use of cookies, please contact us directly.
        </p>
        <div className="flex flex-wrap gap-4">
          <PrimaryButton href="mailto:privacy@energicamotor.com">Contact Us</PrimaryButton>
          <SecondaryButton href="/">Back Home</SecondaryButton>
        </div>
      </Container>
    </main>
  );
}
