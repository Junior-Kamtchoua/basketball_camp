import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getUserSettingsData } from "@/services/user-dashboard/getUserSettingsData";

import styles from "./page.module.css";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const settings = await getUserSettingsData(user.id);

  if (!settings) {
    return <div>User not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <h1>Account Settings</h1>

          <p>
            Manage your account preferences, profile information and security
            settings.
          </p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.card}>
          <span>Status</span>

          <strong>{settings.account_status}</strong>
        </div>

        <div className={styles.card}>
          <span>Verified</span>

          <strong>{settings.is_verified ? "Yes" : "No"}</strong>
        </div>

        <div className={styles.card}>
          <span>Last Login</span>

          <strong>
            {settings.last_login
              ? new Date(settings.last_login).toLocaleDateString()
              : "-"}
          </strong>
        </div>

        <div className={styles.card}>
          <span>Member Since</span>

          <strong>{new Date(settings.created_at).toLocaleDateString()}</strong>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.box}>
          <h2>Profile Information</h2>

          <div className={styles.field}>
            <label>First Name</label>

            <input defaultValue={settings.first_name} />
          </div>

          <div className={styles.field}>
            <label>Last Name</label>

            <input defaultValue={settings.last_name} />
          </div>

          <div className={styles.field}>
            <label>Email</label>

            <input defaultValue={settings.email} />
          </div>

          <div className={styles.field}>
            <label>Phone</label>

            <input defaultValue={settings.phone || ""} />
          </div>

          <button className={styles.primary}>Save Changes</button>
        </div>

        <div className={styles.box}>
          <h2>Security</h2>

          <button className={styles.security}>Change Password</button>

          <button className={styles.security}>Two Factor Authentication</button>

          <button className={styles.security}>Login History</button>

          <button className={styles.danger}>Delete Account</button>
        </div>
      </div>

      <div className={styles.preferences}>
        <h2>Preferences</h2>

        <div className={styles.preference}>
          <span>Email Notifications</span>

          <input type="checkbox" />
        </div>

        <div className={styles.preference}>
          <span>Dark Mode</span>

          <input type="checkbox" />
        </div>

        <div className={styles.preference}>
          <span>Push Notifications</span>

          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}
