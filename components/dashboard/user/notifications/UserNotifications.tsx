"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  Info,
  Clock3,
} from "lucide-react";

import { Notification } from "@/types/notification";

import { useAutoRefresh } from "@/hooks/useAutoRefresh";

import styles from "./UserNotifications.module.css";

interface Props {
  notifications: Notification[];
}

export default function UserNotifications({ notifications }: Props) {
  useAutoRefresh({
    interval: 10000,
  });

  const router = useRouter();

  const [search, setSearch] = useState("");

  const [loadingId, setLoadingId] = useState<string | null>(null);

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
      case "PAYMENT_APPROVED":
        return <CheckCircle2 size={20} />;

      case "PAYMENT_REJECTED":
        return <AlertCircle size={20} />;

      case "INFO":
        return <Info size={20} />;

      default:
        return <Bell size={20} />;
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      setLoadingId(notificationId);

      const response = await fetch(
        `/api/notifications/${notificationId}/read`,
        {
          method: "POST",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed");
      }

      toast.success("Notification marked as read");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Failed to update notification");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <p className={styles.badge}>LIVE NOTIFICATIONS</p>

          <h1>Notifications Center</h1>

          <p className={styles.description}>
            Stay updated with academy activities, payments and schedules.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Total</span>

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
                <div className={styles.time}>
                  <Clock3 size={15} />

                  <small>
                    {new Date(notification.created_at).toLocaleString()}
                  </small>
                </div>

                {!notification.is_read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    disabled={loadingId === notification.id}
                    className={styles.readButton}
                  >
                    {loadingId === notification.id
                      ? "Loading..."
                      : "Mark as read"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
