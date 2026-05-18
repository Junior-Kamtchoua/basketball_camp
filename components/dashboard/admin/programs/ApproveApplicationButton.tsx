"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./ApproveApplicationButton.module.css";

interface Props {
  applicationId: string;
}

export default function ApproveApplicationButton({ applicationId }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleApprove() {
    try {
      setLoading(true);

      const response = await fetch("/api/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `
              mutation ApproveProgramApplication(
                $applicationId: ID!
              ) {
                approveProgramApplication(
                  applicationId: $applicationId
                ) {
                  success
                }
              }
            `,

          variables: {
            applicationId,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("Application approved");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Failed to approve application");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className={styles.button}
    >
      {loading ? "Approving..." : "Approve"}
    </button>
  );
}
