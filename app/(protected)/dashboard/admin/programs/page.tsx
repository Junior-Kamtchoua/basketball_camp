import CreateProgramForm from "@/components/dashboard/admin/forms/CreateProgramForm";

import ProgramsTable from "@/components/dashboard/admin/tables/ProgramsTable";

import ProgramApplicationsTable from "@/components/dashboard/admin/tables/ProgramApplicationsTable";

import { getPrograms } from "@/services/programs/getPrograms";

import { getProgramApplications } from "@/services/programs/getProgramApplications";

import styles from "./page.module.css";

export default async function ProgramsPage() {
  const programs = await getPrograms();

  const applications = await getProgramApplications();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h1>Programs Management</h1>

          <p>Create and manage training programs</p>
        </div>
      </div>

      <CreateProgramForm />

      <ProgramsTable programs={programs} />

      <ProgramApplicationsTable applications={applications} />
    </div>
  );
}
