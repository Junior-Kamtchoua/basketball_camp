"use client";

import Image from "next/image";

import styles from "./AppPreviewSection.module.css";

const previews = [
  {
    image: "/images/one.PNG",
    title: "Landing Page",
  },

  {
    image: "/images/two.PNG",
    title: "Forms Page - Download PDF",
  },

  {
    image: "/images/three.PNG",
    title: "Fill The Registration Form",
  },

  {
    image: "/images/four.PNG",
    title: "Resources",
  },

  {
    image: "/images/five.PNG",
    title: "Register",
  },

  {
    image: "/images/six.PNG",
    title: "Login",
  },

  {
    image: "/images/seven.PNG",
    title: "Messages",
  },

  {
    image: "/images/eight.PNG",
    title: "Messages",
  },

  {
    image: "/images/nine.png",
    title: "Payments",
  },

  {
    image: "/images/ten.png",
    title: "Payments",
  },

  {
    image: "/images/eleven.png",
    title: "Messages",
  },

  {
    image: "/images/twelve.png",
    title: "The End",
  },
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
          {previews.map((preview, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={preview.image}
                  alt={preview.title}
                  width={500}
                  height={900}
                  className={styles.image}
                />
              </div>

              <div className={styles.footer}>
                <span className={styles.step}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{preview.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
