import PageBanner from "@/components/pages/page-banner/PageBanner";

import FormsPageContent from "@/components/pages/forms-page/FormsPageContent";

export default function FormsPage() {
  return (
    <>
      <PageBanner
        title="ACADEMY FORMS"
        subtitle="Download important registration and academy documents."
      />

      <FormsPageContent />
    </>
  );
}
