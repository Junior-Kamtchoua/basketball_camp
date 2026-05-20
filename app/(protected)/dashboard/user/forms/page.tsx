"use client";

import { useState } from "react";

import RegistrationFormUpload from "@/components/dashboard/user/payments/RegistrationFormUpload";

import BasketballCampForm from "@/components/dashboard/user/forms/BasketballCampForm";

import BasketballClubForm from "@/components/dashboard/user/forms/BasketballClubForm";

import styles from "./page.module.css";

type FormType = "CAMP" | "CLUB" | null;

export default function UserFormsPage() {
  const [activeForm, setActiveForm] = useState<FormType>(null);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Registration Forms</h1>

        <p>
          Complete your official Friendship Basketball Academy registration
          forms directly inside your dashboard.
        </p>
      </div>

      <RegistrationFormUpload
        activeForm={activeForm}
        setActiveForm={setActiveForm}
      />

      {activeForm && (
        <div className={styles.formSection}>
          {activeForm === "CAMP" ? (
            <BasketballCampForm />
          ) : (
            <BasketballClubForm />
          )}
        </div>
      )}
    </div>
  );
}
