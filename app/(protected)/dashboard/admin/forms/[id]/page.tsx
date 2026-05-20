import { notFound } from "next/navigation";

import styles from "./page.module.css";

import { getRegistrationFormById } from "@/services/forms/getRegistrationFormById";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function RegistrationFormDetailsPage({ params }: Props) {
  const { id } = await params;

  const form = await getRegistrationFormById(id);

  if (!form) {
    notFound();
  }

  const data = form.data || {};

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <span className={styles.badge}>{form.form_type} FORM</span>

          <h1>
            {form.first_name} {form.last_name}
          </h1>

          <p>{form.email}</p>
        </div>

        <div className={styles.status}>{form.status}</div>
      </div>

      <div className={styles.section}>
        <h2>Form Responses</h2>

        <div className={styles.grid}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className={styles.card}>
              <h3>{formatKey(key)}</h3>

              <p>
                {Array.isArray(value) ? value.join(", ") : String(value || "-")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
