import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

import { getNotifications } from "@/services/notifications/getNotifications";

import styles from "./page.module.css";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  function getIcon(isRead: boolean) {
    if (!isRead) {
      return <FaExclamationCircle />;
    }

    return <FaCheckCircle />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h1>Notification Center</h1>

          <p>Manage platform alerts and activity</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <FaBell />

            <div>
              <h3>{notifications.length}</h3>

              <p>Total Notifications</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <FaInfoCircle />

            <div>
              <h3>{unreadCount}</h3>

              <p>Unread Alerts</p>
            </div>
          </div>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className={styles.empty}>
          <FaBell />

          <h2>No notifications</h2>

          <p>Platform alerts and activity will appear here.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.card} ${
                !notification.is_read ? styles.unread : ""
              }`}
            >
              <div className={styles.icon}>{getIcon(notification.is_read)}</div>

              <div className={styles.content}>
                <div className={styles.header}>
                  <h2>{notification.title}</h2>

                  {!notification.is_read && (
                    <span className={styles.badge}>NEW</span>
                  )}
                </div>

                <p>{notification.message}</p>

                <small>
                  {new Date(notification.created_at).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
