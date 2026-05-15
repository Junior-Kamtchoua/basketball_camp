"use client";

import {
  Copy,
  ShieldCheck,
  Smartphone,
  Mail,
  AlertTriangle,
  Upload,
} from "lucide-react";

import toast from "react-hot-toast";

import styles from "./ZellePaymentCard.module.css";

export default function ZellePaymentCard() {
  async function copyToClipboard(value: string, label: string) {
    await navigator.clipboard.writeText(value);

    toast.success(`${label} copied`);
  }

  return (
    <section className={styles.card}>
      <div className={styles.top}>
        <div>
          <div className={styles.badge}>
            <ShieldCheck size={16} />
            Secure Zelle Payment
          </div>

          <h2>Pay with Zelle</h2>

          <p>
            You can securely pay your basketball training subscription using
            Zelle.
          </p>
        </div>
      </div>

      <div className={styles.paymentGrid}>
        <div className={styles.paymentBox}>
          <div className={styles.paymentHeader}>
            <Smartphone size={18} />

            <span>Phone Number</span>
          </div>

          <div className={styles.paymentValue}>
            <strong>4232009555</strong>

            <button
              onClick={() => copyToClipboard("4232009555", "Phone number")}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className={styles.paymentBox}>
          <div className={styles.paymentHeader}>
            <Mail size={18} />

            <span>Zelle Email</span>
          </div>

          <div className={styles.paymentValue}>
            <strong>cyrille.sandjon@yahoo.com</strong>

            <button
              onClick={() =>
                copyToClipboard("cyrille.sandjon@yahoo.com", "Email")
              }
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.steps}>
        <h3>After sending the payment</h3>

        <div className={styles.step}>
          <span>1</span>

          <p>Take a screenshot of the confirmation.</p>
        </div>

        <div className={styles.step}>
          <span>2</span>

          <p>Upload the payment proof in the Messages section at left.</p>
        </div>

        <div className={styles.step}>
          <span>3</span>

          <p>Your subscription will be reviewed and activated shortly.</p>
        </div>
      </div>

      <div className={styles.warning}>
        <div className={styles.warningTitle}>
          <AlertTriangle size={18} />
          Important
        </div>

        <ul>
          <li>
            Please include the athlete&apos;s full name in the payment note.
          </li>

          <li>Payments are usually verified within a few hours.</li>

          <li>
            Please carefully verify the Zelle email address and payment amount
            before sending your payment.
          </li>

          <li>Payments sent to the wrong recipient may not be recoverable.</li>
        </ul>
      </div>

      <p className={styles.footer}>
        Thank you for choosing Friendship Basketball Academy.
      </p>
    </section>
  );
}
