import styles from "./ProfileCard.module.css";

interface Props {
  first_name: string;

  last_name: string;

  email: string;

  role: string;

  avatar_url?: string | null;
}

export default function ProfileCard({
  first_name,
  last_name,
  email,
  role,
  avatar_url,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        {avatar_url ? (
          <img src={avatar_url} alt="Avatar" />
        ) : (
          <span>{first_name[0]}</span>
        )}
      </div>

      <div className={styles.info}>
        <h2>
          {first_name} {last_name}
        </h2>

        <p>{email}</p>

        <small>{role}</small>
      </div>
    </div>
  );
}
