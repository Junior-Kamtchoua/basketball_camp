import styles from "./RecentActivities.module.css";

const activities = [
  "New player registered",
  "Payment completed",
  "Coach created a new event",
  "New team added",
];

export default function RecentActivities() {
  return (
    <div className={styles.container}>
      <h2>Recent Activities</h2>

      <div className={styles.list}>
        {activities.map((activity) => (
          <div key={activity} className={styles.item}>
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
}
