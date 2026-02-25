import HeroSection from "@/components/home/HeroSection";
import FeaturedModel from "@/components/home/FeaturedModel";
import ModelLineup from "@/components/home/ModelLineup";
import PerformanceStats from "@/components/home/PerformanceStats";
import TechSection from "@/components/home/TechSection";
import RacingSection from "@/components/home/RacingSection";
import DealerCTA from "@/components/home/DealerCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedModel />
      <ModelLineup />
      <PerformanceStats />
      <TechSection />
      <RacingSection />
      <DealerCTA />
    </>
  );
}
