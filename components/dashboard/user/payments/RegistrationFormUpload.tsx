"use client";

import { useState } from "react";

import { ClipboardList, Users, ChevronRight } from "lucide-react";

import BasketballCampForm from "@/components/dashboard/user/forms/BasketballCampForm";

import BasketballClubForm from "@/components/dashboard/user/forms/BasketballClubForm";

import styles from "./RegistrationFormUpload.module.css";

type FormType = "CAMP" | "CLUB" | null;

export default function RegistrationFormUpload() {
  const [activeForm, setActiveForm] = useState<FormType>(null);

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

      {activeForm && (
        <div className={styles.formSection}>
          {activeForm === "CAMP" ? (
            <BasketballCampForm />
          ) : (
            <BasketballClubForm />
          )}
        </div>
      )}
    </section>
  );
}
