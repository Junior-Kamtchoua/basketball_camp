import PageBanner from "@/components/pages/page-banner/PageBanner";

import CoachesPageContent from "@/components/pages/coaches-page/CoachesPageContent";

export default function CoachesPage() {
  return (
    <>
      <PageBanner
        title="OUR COACHES"
        subtitle="Experienced trainers passionate about player development."
      />

      <CoachesPageContent />
    </>
  );
}
