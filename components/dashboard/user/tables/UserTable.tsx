import { ReactNode } from "react";

import styles from "./UserTable.module.css";

interface Props {
  headers: string[];

  children: ReactNode;
}

export default function UserTable({ headers, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
