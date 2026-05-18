"use client";

import { useState } from "react";

import AttendanceModal from "./AttendanceModal";

import styles from "./EventsTable.module.css";

interface EventItem {
  id: string;

  title: string;

  location: string | null;

  start_time: string;

  status: string;

  team_name: string | null;
}

interface Props {
  events: EventItem[];
}

export default function EventsTable({ events }: Props) {
  const [selectedEventId, setSelectedEventId] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  function openAttendance(eventId: string) {
    setSelectedEventId(eventId);

    setIsOpen(true);
  }

  if (events.length === 0) {
    return <div className={styles.empty}>No events found.</div>;
  }

  return (
    <>
      <div className={styles.container}>
        {events.map((event) => (
          <div key={event.id} className={styles.card}>
            <div className={styles.left}>
              <h2 className={styles.title}>{event.title}</h2>

              <div className={styles.team}>{event.team_name || "No Team"}</div>

              <div className={styles.date} suppressHydrationWarning>
                {new Date(event.start_time).toLocaleString("en-GB")}
              </div>

              <div className={styles.meta}>
                {event.location && (
                  <span className={styles.badge}>📍 {event.location}</span>
                )}

                <span className={styles.badge}>🏀 {event.status}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.button}
                onClick={() => openAttendance(event.id)}
              >
                Attendance
              </button>
            </div>
          </div>
        ))}
      </div>

      <AttendanceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eventId={selectedEventId}
      />
    </>
  );
}
