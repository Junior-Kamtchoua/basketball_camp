import { ActivityLog } from "@/types/analytics";

import styles from "./ActivityLogs.module.css";

interface Props {
  logs: ActivityLog[];
}

export default function ActivityLogs({ logs }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Activity Logs</h2>

          <p>Recent admin and platform activity</p>
        </div>
      </div>

      <div className={styles.logs}>
        {logs.length === 0 ? (
          <div className={styles.empty}>No activity found</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={styles.log}>
              <div className={styles.content}>
                <div className={styles.action}>{log.action}</div>

                <div className={styles.date}>
                  {new Date(log.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
