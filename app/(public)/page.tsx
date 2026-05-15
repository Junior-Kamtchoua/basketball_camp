import Hero from "@/components/landing/hero/Hero";
import Features from "@/components/landing/features/Features";
import Programs from "@/components/landing/programs/Programs";
import Stats from "@/components/landing/stats/Stats";
import CTA from "@/components/landing/cta/CTA";
import VideoSection from "@/components/landing/video-section/VideoSection";
import AppPreviewSection from "@/components/landing/appPreviewSection/AppPreviewSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <AppPreviewSection />
      <Programs />

      <Stats />
      <VideoSection />
      <CTA />
    </>
  );
}
