import { UserProfile } from "@/types/profile";

import styles from "./PlayerInformation.module.css";

interface Props {
  profile: UserProfile;
}

export default function PlayerInformation({ profile }: Props) {
  return (
    <div className={styles.card}>
      <h2>Player Information</h2>

      <div className={styles.list}>
        <div className={styles.item}>
          <span>Gender</span>

          <strong>{profile.gender || "N/A"}</strong>
        </div>

        <div className={styles.item}>
          <span>Height</span>

          <strong>
            {profile.height_cm ? `${profile.height_cm} cm` : "N/A"}
          </strong>
        </div>

        <div className={styles.item}>
          <span>Weight</span>

          <strong>
            {profile.weight_kg ? `${profile.weight_kg} kg` : "N/A"}
          </strong>
        </div>

        <div className={styles.item}>
          <span>Date of Birth</span>

          <strong>{profile.date_of_birth || "N/A"}</strong>
        </div>
      </div>
    </div>
  );
}
