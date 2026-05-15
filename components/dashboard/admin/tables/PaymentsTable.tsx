"use client";

import { useMemo, useState } from "react";

import Table from "@/components/ui/table/Table";

import { Payment } from "@/types/payment";

import styles from "./PaymentsTable.module.css";

interface Props {
  payments: Payment[];
}

export default function PaymentsTable({ payments }: Props) {
  const [search, setSearch] = useState("");

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const method = payment.payment_method || "";

      const status = payment.status || "";

      return (
        method.toLowerCase().includes(search.toLowerCase()) ||
        status.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [payments, search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Payments</h2>

        <input
          type="text"
          placeholder="Search payments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>

      {filteredPayments.length === 0 ? (
        <div className={styles.empty}>
          <h3>No payments found</h3>

          <p>Payments will appear here.</p>
        </div>
      ) : (
        <Table headers={["Amount", "Status", "Method", "Date"]}>
          {filteredPayments.map((payment) => (
            <tr key={payment.id}>
              <td>${payment.amount}</td>

              <td>
                <span
                  className={`${styles.badge} ${
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
        </Table>
      )}
    </div>
  );
}
