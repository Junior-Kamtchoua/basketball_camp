import PageBanner from "@/components/pages/page-banner/PageBanner";

import AboutPageContent from "@/components/pages/about-page/AboutPage";

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="ABOUT FBA"
        subtitle="Building athletes, leaders and character through basketball."
      />

      <AboutPageContent />
    </>
  );
}
