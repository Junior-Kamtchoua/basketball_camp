"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./RejectApplicationButton.module.css";

interface Props {
  applicationId: string;
}

export default function RejectApplicationButton({ applicationId }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleReject() {
    try {
      setLoading(true);

      const response = await fetch("/api/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `
              mutation RejectProgramApplication(
                $applicationId: ID!
              ) {
                rejectProgramApplication(
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

      toast.success("Application rejected");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Failed to reject application");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleReject} disabled={loading} className={styles.button}>
      {loading ? "Rejecting..." : "Reject"}
    </button>
  );
}
