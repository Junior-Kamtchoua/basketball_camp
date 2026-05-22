"use client";

import { FaWhatsapp } from "react-icons/fa";
import styles from "./WhatsAppSupportCard.module.css";

export default function WhatsAppSupportCard() {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <FaWhatsapp className={styles.icon} />
      </div>

      <h3 className={styles.title}>Need Quick Help?</h3>

      <p className={styles.description}>
        Contact the admin instantly on WhatsApp for fast assistance.
      </p>

      <a
        href="https://wa.me/+14232009555?text=Hello%20Admin%2C%20I%20need%20help."
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        Chat on WhatsApp
      </a>
    </div>
  );
}
