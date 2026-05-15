import { getAuditLogs } from "@/services/audit/getAuditLogs";

import styles from "./page.module.css";

export default async function AuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className={styles.container}>
      <h1>Audit Logs</h1>

      <div className={styles.logs}>
        {logs.map((log) => (
          <div key={log.id} className={styles.log}>
            <p>{log.action}</p>

            <small>{new Date(log.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
