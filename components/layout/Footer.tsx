import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

const SOCIAL = [
  { abbr: "IG", label: "Instagram", href: "https://www.instagram.com/energicamotorco/" },
  { abbr: "YT", label: "YouTube", href: "https://www.youtube.com/@EnergicaMotorCo" },
  { abbr: "FB", label: "Facebook", href: "https://www.facebook.com/EnergicaMotorCompany/" },
  { abbr: "LI", label: "LinkedIn", href: "https://www.linkedin.com/company/energica-motor-company/" },
];

const COUNTRIES = [
  "International (EN)",
  "Italia (IT)",
  "Deutschland (DE)",
  "France (FR)",
  "United Kingdom (EN)",
  "España (ES)",
  "United States (EN)",
  "日本 (JP)",
  "Australia (EN)",
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#78BE20] bg-[#080808]">

      {/* ── Top section ─────────────────────────────────────── */}
      <Container className="pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-16">

          {/* ── Brand column ──────────────────────────────────── */}
          <div>
            {/* Logo */}
            <Link href="/" className="block mb-6 w-fit">
              <Image
                src="/images/Logo/energica-logo@2x.png"
                alt="Energica Motor Company"
                width={160}
                height={48}
                className="object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-200"
              />
            </Link>

            {/* Tagline */}
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#78BE20]/60 mb-3">
              Born Electric. Born Italian.
            </p>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              The world&rsquo;s most advanced electric motorcycles, engineered in Modena, Italy since 2009.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mt-6">
              {SOCIAL.map((s) => (
                <a
                  key={s.abbr}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-white/[0.08] flex items-center justify-center text-[9px] font-mono text-white/35 hover:border-[#78BE20]/50 hover:text-[#78BE20] transition-all duration-200"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* ── Models ────────────────────────────────────────── */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] text-white/25 mb-5">Models</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.models.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ───────────────────────────────────────── */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] text-white/25 mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ───────────────────────────────────────── */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] text-white/25 mb-5">Support</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter nudge */}
            <div className="mt-8 pt-6 border-t border-white/[0.05]">
              <p className="text-[10px] uppercase tracking-widest text-white/25 mb-3">
                Stay Updated
              </p>
              <Link
                href="/test-ride"
                className="inline-flex items-center gap-2 text-xs text-[#78BE20]/70 hover:text-[#78BE20] transition-colors duration-200"
              >
                Book a test ride →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Divider ─────────────────────────────────────────── */}
      <Container>
        <div className="h-px bg-white/[0.04]" />
      </Container>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <Container className="py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Copyright + legal */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-[10px] text-white/20">
              © {new Date().getFullYear()} ENERGICA PTE LTD — Modena, Italy
            </p>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
            <div className="flex flex-wrap gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] text-white/20 hover:text-white/45 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Country / language selector */}
          <div className="relative flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-white/20">Region</span>
            <div className="relative">
              <select
                defaultValue="International (EN)"
                className="appearance-none bg-transparent border border-white/[0.08] text-white/35 text-[10px] px-3 py-1.5 pr-6 focus:outline-none focus:border-[#78BE20]/40 hover:border-white/20 transition-colors duration-200 cursor-pointer"
                aria-label="Select region"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c} className="bg-[#111] text-white">
                    {c}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none text-[8px]">▾</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
