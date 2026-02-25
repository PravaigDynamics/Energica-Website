import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SmoothScroll from "@/components/ui/SmoothScroll";
import PageTransition from "@/components/ui/PageTransition";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://energica-motor.com"),
  title: {
    default: "ENERGICA — Italian Electric Superbikes",
    template: "%s | ENERGICA",
  },
  description:
    "Energica Motor Company — the world's most advanced electric motorcycles. Born in Modena, Italy. Engineered for riders who demand more.",
  keywords: [
    "electric motorcycle",
    "electric superbike",
    "Energica",
    "Italian motorcycle",
    "zero emissions",
    "MotoE",
  ],
  openGraph: {
    title: "ENERGICA — Italian Electric Superbikes",
    description:
      "Experience the pinnacle of electric performance. Made in Italy.",
    siteName: "Energica Motor Company",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {/* Loading overlay — renders until window.load fires */}
        <LoadingScreen />

        {/* Lenis smooth scroll + GSAP ScrollTrigger sync */}
        <SmoothScroll />

        <Cursor />
        <Navigation />

        {/* Page-level fade/y transitions on route changes */}
        <PageTransition>{children}</PageTransition>

        <Footer />
      </body>
    </html>
  );
}
