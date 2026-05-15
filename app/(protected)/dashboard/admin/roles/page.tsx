import styles from "./page.module.css";

const roles = [
  {
    name: "SUPER_ADMIN",
    permissions: ["ALL_PERMISSIONS"],
  },

  {
    name: "ADMIN",
    permissions: ["MANAGE_USERS", "MANAGE_PROGRAMS"],
  },

  {
    name: "COACH",
    permissions: ["VIEW_PLAYERS"],
  },
];

export default function RolesPage() {
  return (
    <div className={styles.container}>
      <h1>Role Management</h1>

      <div className={styles.grid}>
        {roles.map((role) => (
          <div key={role.name} className={styles.card}>
            <h2>{role.name}</h2>

            <div className={styles.permissions}>
              {role.permissions.map((permission) => (
                <span key={permission}>{permission}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
