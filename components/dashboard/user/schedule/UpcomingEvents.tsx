import { FaCalendarDays, FaLocationDot, FaClock } from "react-icons/fa6";

import { UpcomingEvent } from "@/types/user-dashboard";

import styles from "./UpcomingEvents.module.css";

interface Props {
  events: UpcomingEvent[];
}

export default function UpcomingEvents({ events }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <span className={styles.badge}>Schedule</span>

          <h2>Upcoming Events</h2>

          <p>Stay updated with your next academy activities.</p>
        </div>

        <div className={styles.icon}>
          <FaCalendarDays size={22} />
        </div>
      </div>

      <div className={styles.list}>
        {events.length === 0 ? (
          <div className={styles.empty}>
            <h3>No upcoming events</h3>

            <p>New events will appear here soon.</p>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className={styles.card}>
              <div className={styles.date}>
                <span>
                  {new Date(event.start_date).toLocaleDateString("en-US", {
                    day: "2-digit",
                  })}
                </span>

                <small>
                  {new Date(event.start_date).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </small>
              </div>

              <div className={styles.content}>
                <h3>{event.title}</h3>

                <div className={styles.meta}>
                  <div>
                    <FaLocationDot />

                    <span>{event.location || "Academy Arena"}</span>
                  </div>

                  <div>
                    <FaClock />

                    <span>
                      {new Date(event.start_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
