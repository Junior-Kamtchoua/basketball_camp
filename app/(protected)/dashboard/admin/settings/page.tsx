import {
  FaBell,
  FaLock,
  FaMoon,
  FaShieldAlt,
  FaUserCog,
  FaDatabase,
} from "react-icons/fa";

import styles from "./page.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Platform Settings</h1>

          <p>
            Manage security, notifications, appearance and system preferences
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FaUserCog />

            <h2>User Preferences</h2>
          </div>

          <div className={styles.setting}>
            <div>
              <h3>Email Notifications</h3>

              <p>Receive platform updates and alerts</p>
            </div>

            <input type="checkbox" />
          </div>

          <div className={styles.setting}>
            <div>
              <h3>Dark Mode</h3>

              <p>Toggle dark dashboard appearance</p>
            </div>

            <input type="checkbox" />
          </div>

          <div className={styles.setting}>
            <div>
              <h3>Activity Logs</h3>

              <p>Store admin activities and audits</p>
            </div>

            <input type="checkbox" />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FaShieldAlt />

            <h2>Security</h2>
          </div>

          <div className={styles.securityItem}>
            <div>
              <h3>Change Password</h3>

              <p>Update your administrator password</p>
            </div>

            <button>Update</button>
          </div>

          <div className={styles.securityItem}>
            <div>
              <h3>Two-Factor Authentication</h3>

              <p>Add an extra security layer</p>
            </div>

            <button>Enable</button>
          </div>

          <div className={styles.securityItem}>
            <div>
              <h3>Login Sessions</h3>

              <p>Manage active devices and sessions</p>
            </div>

            <button>Manage</button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FaBell />

            <h2>Notifications</h2>
          </div>

          <div className={styles.notificationCard}>
            <div>
              <strong>New User Registrations</strong>

              <span>Instant alerts when a new user joins</span>
            </div>

            <FaBell />
          </div>

          <div className={styles.notificationCard}>
            <div>
              <strong>Payment Alerts</strong>

              <span>Track failed or completed payments</span>
            </div>

            <FaLock />
          </div>

          <div className={styles.notificationCard}>
            <div>
              <strong>Security Alerts</strong>

              <span>Suspicious activity detection</span>
            </div>

            <FaShieldAlt />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FaDatabase />

            <h2>System Status</h2>
          </div>

          <div className={styles.stats}>
            <div className={styles.statBox}>
              <span>Database</span>

              <strong>Online</strong>
            </div>

            <div className={styles.statBox}>
              <span>API Server</span>

              <strong>Stable</strong>
            </div>

            <div className={styles.statBox}>
              <span>Storage</span>

              <strong>72% Used</strong>
            </div>

            <div className={styles.statBox}>
              <span>Theme</span>

              <strong>Dark</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
