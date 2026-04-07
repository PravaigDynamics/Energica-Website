import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Energica Motor Company",
  description: "Get in touch with Energica. We'll connect you with the right person — whether you have a question about our bikes, want a demo, or are looking to purchase.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
      <div className="max-w-[860px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div className="mb-14">
          <span className="mono-tag mb-5 inline-block">Get in touch</span>
          <h1 className="font-display text-[clamp(40px,8vw,100px)] text-white leading-[0.88] uppercase mb-6">
            Let&apos;s<br />
            <span className="text-[#78BE20]">Talk.</span>
          </h1>
          <p className="text-white/60 text-base max-w-[520px] leading-relaxed" style={{ fontFamily: "var(--font-ibm-sans)" }}>
            Tell us what you&apos;re interested in. We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <ContactForm />

      </div>
    </main>
  );
}
