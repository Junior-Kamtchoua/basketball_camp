import PaymentsTable from "@/components/dashboard/admin/tables/PaymentsTable";

import PaymentsStats from "@/components/dashboard/admin/payments/PaymentsStats";

import { getPayments } from "@/services/payments/getPayments";
import DocumentsTable from "@/components/dashboard/admin/payments/DocumentsTable";

import { getAllDocuments } from "@/services/documents/getAllDocuments";
import styles from "./page.module.css";

export default async function PaymentsPage() {
  const payments = await getPayments();
  const documents = await getAllDocuments();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h1>Payments Management</h1>

          <p>Track all platform transactions</p>
        </div>
      </div>

      <PaymentsStats payments={payments} />

      <PaymentsTable payments={payments} />
      <DocumentsTable documents={documents} />
    </div>
  );
}
