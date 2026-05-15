import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import UserTable from "@/components/dashboard/user/tables/UserTable";

import ZellePaymentCard from "@/components/dashboard/user/payments/ZellePaymentCard";

import { getUserPayments } from "@/services/user-dashboard/getUserPayments";
import RegistrationFormUpload from "@/components/dashboard/user/payments/RegistrationFormUpload";
import styles from "./page.module.css";

export default async function PaymentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const payments = await getUserPayments(user.id);

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

      <RegistrationFormUpload />

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
                    payment.status === "PAID" ? styles.paid : styles.pending
                  }`}
                >
                  {payment.status}
                </span>
              </td>

              <td>{payment.payment_method || "N/A"}</td>

              <td>{new Date(payment.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </UserTable>
      )}
    </div>
  );
}
