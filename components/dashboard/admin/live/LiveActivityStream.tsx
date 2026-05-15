"use client";

import { useEffect, useState } from "react";

import { getSocket } from "@/hooks/useSocket";

import styles from "./LiveActivityStream.module.css";

interface Activity {
  id: string;

  message: string;

  created_at: string;
}

export default function LiveActivityStream() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const socket = getSocket();

    const handleNewActivity = (activity: Activity) => {
      setActivities((prev) => [activity, ...prev]);
    };

    socket.on("new-activity", handleNewActivity);

    return () => {
      socket.off("new-activity", handleNewActivity);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h2>Live Activity Stream</h2>

      <div className={styles.list}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.item}>
            <p>{activity.message}</p>

            <small>{new Date(activity.created_at).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
