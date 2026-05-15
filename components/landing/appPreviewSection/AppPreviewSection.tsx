"use client";

import Image from "next/image";

import styles from "./AppPreviewSection.module.css";

const previews = [
  "/images/one.PNG",
  "/images/two.PNG",
  "/images/three.PNG",
  "/images/four.PNG",
  "/images/five.PNG",
  "/images/six.PNG",
  "/images/seven.PNG",
  "/images/eight.PNG",
  "/images/nine.png",
  "/images/ten.png",
  "/images/eleven.png",
  "/images/twelve.png",
];

export default function AppPreviewSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>APPLICATION PREVIEW</span>

          <h2>See How The Platform Works</h2>

          <p>
            Explore the basketball academy platform experience step by step.
            Discover messaging, schedules, payments, attendance tracking,
            registration management and more.
          </p>
        </div>

        <div className={styles.grid}>
          {previews.map((image, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  width={500}
                  height={900}
                  className={styles.image}
                />
              </div>

              <div className={styles.footer}>
                <span className={styles.step}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>Platform Preview</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
