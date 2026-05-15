import SkeletonCard from "@/components/ui/skeleton/SkeletonCard";

import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.grid}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
