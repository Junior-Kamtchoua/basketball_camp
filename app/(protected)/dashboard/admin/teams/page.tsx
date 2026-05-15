import CreateTeamForm from "@/components/dashboard/admin/forms/CreateTeamForm";

import TeamsTable from "@/components/dashboard/admin/tables/TeamsTable";

import { getTeams } from "@/services/teams/getTeams";

import styles from "./page.module.css";

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h1>Teams Management</h1>

          <p>Create and manage basketball teams</p>
        </div>
      </div>

      <CreateTeamForm />

      <TeamsTable teams={teams} />
    </div>
  );
}
