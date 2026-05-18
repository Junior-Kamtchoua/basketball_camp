import styles from "./MedicalNotes.module.css";

interface Props {
  notes: string | null;
}

export default function MedicalNotes({ notes }: Props) {
  return (
    <div className={styles.card}>
      <h2>Medical Notes</h2>

      <p>{notes || "No medical notes available."}</p>
    </div>
  );
}
