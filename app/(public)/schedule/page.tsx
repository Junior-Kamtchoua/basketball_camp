import PageBanner from "@/components/pages/page-banner/PageBanner";

import SchedulePageContent from "@/components/pages/schedule-page/SchedulePageContent";

export default function SchedulePage() {
  return (
    <>
      <PageBanner
        title="TRAINING SCHEDULE"
        subtitle="Stay updated with practices and academy activities."
      />

      <SchedulePageContent />
    </>
  );
}
