"use client";

import { ClipboardList, Users, ChevronRight } from "lucide-react";

import styles from "./RegistrationFormUpload.module.css";

type Props = {
  activeForm: "CAMP" | "CLUB" | null;

  setActiveForm: (value: "CAMP" | "CLUB") => void;
};

export default function RegistrationFormUpload({
  activeForm,
  setActiveForm,
}: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Registration Center</h2>

        <p>Select the registration type you want to complete.</p>
      </div>

      <div className={styles.cards}>
        <button
          type="button"
          className={`${styles.optionCard} ${
            activeForm === "CAMP" ? styles.activeCard : ""
          }`}
          onClick={() => setActiveForm("CAMP")}
        >
          <div className={styles.iconBox}>
            <ClipboardList size={34} />
          </div>

          <div className={styles.cardContent}>
            <h3>Basketball Camp</h3>

            <p>
              Complete the official camp registration form for seasonal
              basketball camps.
            </p>
          </div>

          <ChevronRight size={24} className={styles.arrow} />
        </button>

        <button
          type="button"
          className={`${styles.optionCard} ${
            activeForm === "CLUB" ? styles.activeCard : ""
          }`}
          onClick={() => setActiveForm("CLUB")}
        >
          <div className={styles.iconBox}>
            <Users size={34} />
          </div>

          <div className={styles.cardContent}>
            <h3>Basketball Club</h3>

            <p>
              Complete the official club registration form for academy
              membership.
            </p>
          </div>

          <ChevronRight size={24} className={styles.arrow} />
        </button>
      </div>
    </section>
  );
}
