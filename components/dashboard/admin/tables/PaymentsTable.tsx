"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Table from "@/components/ui/table/Table";

import { Payment } from "@/types/payment";

import { useAutoRefresh } from "@/hooks/useAutoRefresh";

import styles from "./PaymentsTable.module.css";

interface Props {
  payments: Payment[];
}

export default function PaymentsTable({ payments }: Props) {
  useAutoRefresh({
    interval: 8000,
  });

  const router = useRouter();

  const [search, setSearch] = useState("");

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const method = payment.payment_method || "";

      const status = payment.status || "";

      const player = payment.player_name || "";

      const program = payment.program_title || "";

      return (
        method.toLowerCase().includes(search.toLowerCase()) ||
        status.toLowerCase().includes(search.toLowerCase()) ||
        player.toLowerCase().includes(search.toLowerCase()) ||
        program.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [payments, search]);

  async function approvePayment(paymentId: string) {
    try {
      setLoadingId(paymentId);

      const response = await fetch(`/api/payments/${paymentId}/approve`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Approval failed");
      }

      toast.success("Payment approved");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Approval failed");
    } finally {
      setLoadingId(null);
    }
  }

  async function rejectPayment(paymentId: string) {
    try {
      setLoadingId(paymentId);

      const response = await fetch(`/api/payments/${paymentId}/reject`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Rejection failed");
      }

      toast.success("Payment rejected");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Rejection failed");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Payments</h2>

          <p className={styles.subtitle}>
            Monitor Zelle payments, pending approvals and proof uploads in real
            time.
          </p>
        </div>

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
        <Table
          headers={[
            "Player",
            "Program",
            "Amount",
            "Proof",
            "Status",
            "Method",
            "Date",
            "Actions",
          ]}
        >
          {filteredPayments.map((payment) => (
            <tr key={payment.id}>
              <td>
                <div className={styles.player}>
                  <strong>{payment.player_name || "Unknown"}</strong>

                  <small>{payment.player_email || "No email"}</small>
                </div>
              </td>

              <td>{payment.program_title || "N/A"}</td>

              <td>${Number(payment.amount).toLocaleString("en-US")}</td>

              <td>
                {payment.payment_proof_url ? (
                  <div className={styles.documents}>
                    <a
                      href={payment.payment_proof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.viewButton}
                    >
                      View
                    </a>

                    <a
                      href={`${payment.payment_proof_url}?fl_attachment=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadButton}
                    >
                      Download
                    </a>
                  </div>
                ) : (
                  <span className={styles.noProof}>No proof</span>
                )}
              </td>

              <td>
                <span
                  className={`${styles.badge} ${
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

              <td suppressHydrationWarning>
                {new Date(payment.created_at).toLocaleDateString("en-GB")}
              </td>

              <td>
                {payment.status === "PENDING" ? (
                  <div className={styles.actions}>
                    <button
                      onClick={() => approvePayment(payment.id)}
                      disabled={loadingId === payment.id}
                      className={styles.approveButton}
                    >
                      {loadingId === payment.id ? "Loading..." : "Approve"}
                    </button>

                    <button
                      onClick={() => rejectPayment(payment.id)}
                      disabled={loadingId === payment.id}
                      className={styles.rejectButton}
                    >
                      {loadingId === payment.id ? "Loading..." : "Reject"}
                    </button>
                  </div>
                ) : (
                  <span className={styles.completed}>Completed</span>
                )}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
