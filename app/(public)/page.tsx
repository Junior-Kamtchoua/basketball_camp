import Hero from "@/components/landing/hero/Hero";
import Features from "@/components/landing/features/Features";

import Stats from "@/components/landing/stats/Stats";
import CTA from "@/components/landing/cta/CTA";
import VideoSection from "@/components/landing/video-section/VideoSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />

      <Stats />
      <VideoSection />
      <CTA />
    </>
  );
}
