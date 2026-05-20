import FormsTable from "@/components/dashboard/admin/forms/FormsTable";

import { getRegistrationForms } from "@/services/forms/getRegistrationForms";

import styles from "./page.module.css";

export default async function AdminFormsPage() {
  const forms = await getRegistrationForms();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Registration Forms</h1>

          <p>Manage player registration submissions</p>
        </div>
      </div>

      <FormsTable forms={forms} />
    </div>
  );
}
