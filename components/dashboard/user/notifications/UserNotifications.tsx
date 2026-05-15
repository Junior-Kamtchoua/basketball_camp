"use client";

import { useMemo, useState } from "react";

import {
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  Info,
  Clock3,
} from "lucide-react";

import { Notification } from "@/types/notification";

import styles from "./UserNotifications.module.css";

interface Props {
  notifications: Notification[];
}

export default function UserNotifications({ notifications }: Props) {
  const [search, setSearch] = useState("");

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      return (
        notification.title.toLowerCase().includes(search.toLowerCase()) ||
        notification.message.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [notifications, search]);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  function getNotificationIcon(type?: string) {
    switch (type) {
      case "SUCCESS":
        return <CheckCircle2 size={20} />;

      case "WARNING":
        return <AlertCircle size={20} />;

      case "INFO":
        return <Info size={20} />;

      default:
        return <Bell size={20} />;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <p className={styles.badge}>LIVE NOTIFICATIONS</p>

          <h1>Notifications Center</h1>

          <p className={styles.description}>
            Stay updated with academy activities, messages, attendance updates
            and important announcements.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Total Notifications</span>

            <strong>{notifications.length}</strong>
          </div>

          <div className={styles.statCard}>
            <span>Unread</span>

            <strong>{unreadCount}</strong>
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className={styles.empty}>
          <Bell size={48} />

          <h2>No notifications found</h2>

          <p>Your notifications will appear here.</p>
        </div>
      ) : (
        <div className={styles.notificationsGrid}>
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.card} ${
                !notification.is_read ? styles.unread : ""
              }`}
            >
              <div className={styles.cardTop}>
                <div className={styles.icon}>
                  {getNotificationIcon(notification.type)}
                </div>

                {!notification.is_read && (
                  <span className={styles.unreadBadge}>NEW</span>
                )}
              </div>

              <div className={styles.content}>
                <h3>{notification.title}</h3>

                <p>{notification.message}</p>
              </div>

              <div className={styles.footer}>
                <Clock3 size={15} />

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
