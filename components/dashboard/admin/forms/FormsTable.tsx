"use client";

import { useState } from "react";

import Link from "next/link";

import toast from "react-hot-toast";

import { Eye, CheckCircle, XCircle } from "lucide-react";

import styles from "./FormsTable.module.css";

interface Form {
  id: string;

  form_type: "CAMP" | "CLUB";

  status: "PENDING" | "APPROVED" | "REJECTED";

  submitted_at: string;

  first_name: string;

  last_name: string;

  email: string;
}

interface Props {
  forms: Form[];
}

export default function FormsTable({ forms }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function updateStatus(formId: string, status: "APPROVED" | "REJECTED") {
    try {
      setLoadingId(formId);

      const response = await fetch(`/api/admin/forms/${formId}/status`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed");
      }

      toast.success(`Form ${status.toLowerCase()} successfully`);

      window.location.reload();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update form");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Player</th>

            <th>Email</th>

            <th>Form Type</th>

            <th>Status</th>

            <th>Submitted</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>
                {form.first_name} {form.last_name}
              </td>

              <td>{form.email}</td>

              <td>
                <span className={styles.formType}>{form.form_type}</span>
              </td>

              <td>
                <span
                  className={`${styles.status} ${
                    form.status === "APPROVED"
                      ? styles.approved
                      : form.status === "REJECTED"
                        ? styles.rejected
                        : styles.pending
                  }`}
                >
                  {form.status}
                </span>
              </td>

              <td suppressHydrationWarning>
                {new Date(form.submitted_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>

              <td>
                <div className={styles.actions}>
                  <Link
                    href={`/dashboard/admin/forms/${form.id}`}
                    className={styles.viewButton}
                  >
                    <Eye size={16} />

                    <span>View</span>
                  </Link>

                  <button
                    type="button"
                    disabled={loadingId === form.id}
                    className={styles.approveButton}
                    onClick={() => updateStatus(form.id, "APPROVED")}
                  >
                    <CheckCircle size={16} />

                    <span>Approve</span>
                  </button>

                  <button
                    type="button"
                    disabled={loadingId === form.id}
                    className={styles.rejectButton}
                    onClick={() => updateStatus(form.id, "REJECTED")}
                  >
                    <XCircle size={16} />

                    <span>Reject</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
