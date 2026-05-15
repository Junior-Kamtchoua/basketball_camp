import CreateUserForm from "@/components/dashboard/admin/forms/CreateUserForm";

import UsersTable from "@/components/dashboard/admin/tables/UsersTable";

import { getUsersTable } from "@/services/users/getUsersTable";

import styles from "./page.module.css";

export default async function UsersPage() {
  const users = await getUsersTable({});

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h1>Users Management</h1>

          <p>Manage platform users and admins</p>
        </div>
      </div>

      <CreateUserForm />

      <UsersTable users={users} />
    </div>
  );
}
