"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./DeleteTeamButton.module.css";

interface Props {
  teamId: string;
}

export default function DeleteTeamButton({ teamId }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this team?");

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `
              mutation DeleteTeam(
                $teamId: ID!
              ) {
                deleteTeam(
                  teamId: $teamId
                ) {
                  success
                }
              }
            `,

          variables: {
            teamId,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("Team deleted");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading} className={styles.button}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
