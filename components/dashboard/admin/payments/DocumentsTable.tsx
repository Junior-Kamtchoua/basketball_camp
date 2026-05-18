"use client";

import { Document } from "@/types/document";

import Table from "@/components/ui/table/Table";

import styles from "./DocumentsTable.module.css";

interface Props {
  documents: Document[];
}

export default function DocumentsTable({ documents }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>User Documents</h2>

          <p>Download all uploaded files and payment proofs.</p>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className={styles.empty}>
          <h3>No documents found</h3>

          <p>Uploaded documents will appear here.</p>
        </div>
      ) : (
        <Table headers={["User", "Email", "Type", "Date", "Download"]}>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.user_name}</td>

              <td>{document.user_email}</td>

              <td>{document.document_type}</td>

              <td suppressHydrationWarning>
                {new Date(document.created_at).toLocaleDateString("en-GB")}
              </td>

              <td>
                <a
                  href={document.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadButton}
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
