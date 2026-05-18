import { UserProfile } from "@/types/profile";

import styles from "./ProfileHero.module.css";

interface Props {
  profile: UserProfile;
}

export default function ProfileHero({ profile }: Props) {
  return (
    <div className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" />
          ) : (
            <span>
              {profile.first_name.charAt(0)}
              {profile.last_name.charAt(0)}
            </span>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.status}>
            <span className={styles.online}></span>
            Active Player
          </div>

          <h1>
            {profile.first_name} {profile.last_name}
          </h1>

          <p>{profile.email}</p>

          <div className={styles.tags}>
            <span>{profile.team_name || "No Team"}</span>

            <span>Jersey #{profile.jersey_number || "-"}</span>

            <span>Basketball Academy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
