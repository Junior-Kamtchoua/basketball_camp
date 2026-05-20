import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import UserTable from "@/components/dashboard/user/tables/UserTable";
import PaymentsAutoRefresh from "@/components/dashboard/user/payments/PaymentsAutoRefresh";

import ZellePaymentCard from "@/components/dashboard/user/payments/ZellePaymentCard";

import UploadPaymentProof from "@/components/dashboard/user/payments/UploadPaymentProof";

import { getUserPayments } from "@/services/user-dashboard/getUserPayments";

import { getUserPrograms } from "@/services/user-dashboard/getUserPrograms";

import styles from "./page.module.css";

export default async function PaymentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [payments, programs] = await Promise.all([
    getUserPayments(user.id),

    getUserPrograms(user.id),
  ]);

  const totalPaid = payments.reduce(
    (acc, payment) => acc + Number(payment.amount),
    0,
  );

  const completedPayments = payments.filter(
    (payment) => payment.status === "PAID",
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING",
  ).length;

  return (
    <div className={styles.container}>
      <PaymentsAutoRefresh />
      <div className={styles.hero}>
        <div>
          <h1>Payments Dashboard</h1>

          <p>
            Track your academy payments, upload proof of transactions and manage
            your subscription history.
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h3>${totalPaid.toLocaleString()}</h3>

          <p>Total Paid</p>
        </div>

        <div className={styles.card}>
          <h3>{completedPayments}</h3>

          <p>Completed Payments</p>
        </div>

        <div className={styles.card}>
          <h3>{pendingPayments}</h3>

          <p>Pending Payments</p>
        </div>

        <div className={styles.card}>
          <h3>{payments.length}</h3>

          <p>Total Transactions</p>
        </div>
      </div>

      <ZellePaymentCard />

      <UploadPaymentProof programs={programs} />

      {payments.length === 0 ? (
        <div className={styles.empty}>
          <h2>No Payments Yet</h2>

          <p>
            Your payment history will appear here after your first transaction.
          </p>
        </div>
      ) : (
        <UserTable headers={["Amount", "Status", "Method", "Date"]}>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>${payment.amount}</td>

              <td>
                <span
                  className={`${styles.status} ${
                    payment.status === "PAID"
                      ? styles.paid
                      : payment.status === "REJECTED"
                        ? styles.rejected
                        : styles.pending
                  }`}
                >
                  {payment.status}
                </span>
              </td>

              <td>{payment.payment_method || "ZELLE"}</td>

              <td>{new Date(payment.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </UserTable>
      )}
    </div>
  );
}
