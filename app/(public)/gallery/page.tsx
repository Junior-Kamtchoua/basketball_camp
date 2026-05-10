import PageBanner from "@/components/pages/page-banner/PageBanner";

import GalleryPageContent from "@/components/pages/gallery-page/GalleryPageContent";

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        title="GALLERY"
        subtitle="Training sessions, games and academy moments."
      />

      <GalleryPageContent />
    </>
  );
}
