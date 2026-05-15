"use client";

import Table from "@/components/ui/table/Table";

import { Team } from "@/types/team";

import styles from "./TeamsTable.module.css";

interface Props {
  teams: Team[];
}

export default function TeamsTable({ teams }: Props) {
  return (
    <div className={styles.container}>
      {teams.length === 0 ? (
        <div className={styles.empty}>
          <h3>No teams found</h3>

          <p>Create your first basketball team.</p>
        </div>
      ) : (
        <Table headers={["Team", "Age Group", "Win Rate", "Created"]}>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>

              <td>{team.age_group}</td>

              <td>{team.win_rate}%</td>

              <td>{new Date(team.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
