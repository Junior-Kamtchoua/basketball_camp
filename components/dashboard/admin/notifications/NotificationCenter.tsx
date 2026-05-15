"use client";

import { useEffect, useRef, useState } from "react";

import { Bell } from "lucide-react";

import { Notification } from "@/types/notification";

import styles from "./NotificationCenter.module.css";

interface Props {
  notifications: Notification[];
}

export default function NotificationCenter({ notifications }: Props) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button className={styles.button} onClick={() => setOpen(!open)}>
        <Bell size={20} />

        {notifications.length > 0 && (
          <span className={styles.badge}>{notifications.length}</span>
        )}
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3>Notifications</h3>
          </div>

          <div className={styles.notifications}>
            {notifications.length === 0 ? (
              <div className={styles.empty}>No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className={styles.notification}>
                  <h4>{notification.title}</h4>

                  <p>{notification.message}</p>

                  <small>
                    {new Date(notification.created_at).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
