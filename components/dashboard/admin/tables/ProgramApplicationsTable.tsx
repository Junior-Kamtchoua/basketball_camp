"use client";

import { useMemo, useState } from "react";

import Table from "@/components/ui/table/Table";

import { ProgramApplication } from "@/types/program-application";

import ApproveApplicationButton from "@/components/dashboard/admin/programs/ApproveApplicationButton";

import RejectApplicationButton from "@/components/dashboard/admin/programs/RejectApplicationButton";

import styles from "./ProgramApplicationsTable.module.css";

interface Props {
  applications: ProgramApplication[];
}

export default function ProgramApplicationsTable({ applications }: Props) {
  const [search, setSearch] = useState("");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const fullName = `${application.first_name} ${application.last_name}`;

      return (
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        application.program_title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [applications, search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Program Applications</h2>

        <input
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>

      {filteredApplications.length === 0 ? (
        <div className={styles.empty}>
          <h3>No applications found</h3>

          <p>Program applications will appear here.</p>
        </div>
      ) : (
        <Table
          headers={[
            "Player",
            "Program",
            "Status",
            "Payment Proof",
            "Date",
            "Actions",
          ]}
        >
          {filteredApplications.map((application) => (
            <tr key={application.application_id}>
              <td>
                {application.first_name} {application.last_name}
              </td>

              <td>{application.program_title}</td>

              <td>
                <span
                  className={`${styles.badge} ${
                    application.status === "approved"
                      ? styles.approved
                      : application.status === "rejected"
                        ? styles.rejected
                        : styles.pending
                  }`}
                >
                  {application.status}
                </span>
              </td>

              <td>
                {application.payment_proof ? (
                  <a
                    href={application.payment_proof}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    View Proof
                  </a>
                ) : (
                  "No Proof"
                )}
              </td>

              <td suppressHydrationWarning>
                {new Date(application.created_at).toLocaleDateString("en-US")}
              </td>

              <td>
                {application.status === "pending" ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <ApproveApplicationButton
                      applicationId={application.application_id}
                    />

                    <RejectApplicationButton
                      applicationId={application.application_id}
                    />
                  </div>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
