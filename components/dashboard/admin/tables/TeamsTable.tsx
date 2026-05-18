"use client";

import Table from "@/components/ui/table/Table";

import { Team } from "@/types/team";

import { PlayerOption } from "@/types/player-option";

import EditTeamButton from "./EditTeamButton";

import DeleteTeamButton from "./DeleteTeamButton";

import AssignPlayerButton from "./AssignPlayerButton";

import styles from "./TeamsTable.module.css";

interface Props {
  teams: Team[];

  availablePlayers: PlayerOption[];
}

export default function TeamsTable({ teams, availablePlayers }: Props) {
  return (
    <div className={styles.container}>
      {teams.length === 0 ? (
        <div className={styles.empty}>
          <h3>No teams found</h3>

          <p>Create your first basketball team.</p>
        </div>
      ) : (
        <Table
          headers={[
            "Team",
            "Age Group",
            "Players",
            "Win Rate",
            "Created",
            "Actions",
          ]}
        >
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>

              <td>{team.age_group || "N/A"}</td>

              <td>{team.players_count}</td>

              <td>{team.win_rate}%</td>

              <td suppressHydrationWarning>
                {new Date(team.created_at).toLocaleDateString("en-GB")}
              </td>

              <td className={styles.actions}>
                <AssignPlayerButton
                  teamId={team.id}
                  players={availablePlayers}
                />

                <EditTeamButton team={team} />

                <DeleteTeamButton teamId={team.id} />
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
