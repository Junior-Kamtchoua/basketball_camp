"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./JoinProgramButton.module.css";

interface Props {
  programId: string;

  disabled?: boolean;
}

export default function JoinProgramButton({ programId, disabled }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    try {
      setLoading(true);

      const response = await fetch("/api/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `
            mutation JoinProgram(
              $programId: ID!
            ) {
              joinProgram(
                programId: $programId
              ) {
                success
              }
            }
          `,

          variables: {
            programId,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("Program joined successfully");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Failed to join program");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleJoin}
      disabled={disabled || loading}
      className={styles.button}
    >
      {loading ? "Joining..." : disabled ? "Program Full" : "Join Program"}
    </button>
  );
}
