import { Payment } from "@/types/payment";

import styles from "./PaymentsStats.module.css";

interface Props {
  payments: Payment[];
}

export default function PaymentsStats({ payments }: Props) {
  const totalRevenue = payments.reduce(
    (acc, payment) => acc + Number(payment.amount),
    0,
  );

  const paidPayments = payments.filter(
    (payment) => payment.status === "PAID",
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING",
  ).length;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <h3>Total Revenue</h3>

        <h2>${totalRevenue}</h2>
      </div>

      <div className={styles.card}>
        <h3>Paid Payments</h3>

        <h2>{paidPayments}</h2>
      </div>

      <div className={styles.card}>
        <h3>Pending</h3>

        <h2>{pendingPayments}</h2>
      </div>
    </div>
  );
}
