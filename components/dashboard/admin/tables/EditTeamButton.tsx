"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./EditTeamButton.module.css";

interface Props {
  team: {
    id: string;

    name: string;

    age_group?: string;

    win_rate: number;
  };
}

export default function EditTeamButton({ team }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleEdit() {
    const name = window.prompt("Team name", team.name);

    if (!name) {
      return;
    }

    const ageGroup = window.prompt("Age group", team.age_group || "");

    const winRate = window.prompt("Win rate", String(team.win_rate));

    try {
      setLoading(true);

      const response = await fetch("/api/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `
              mutation UpdateTeam(
                $input: UpdateTeamInput!
              ) {
                updateTeam(
                  input: $input
                ) {
                  id
                }
              }
            `,

          variables: {
            input: {
              id: team.id,

              name,

              age_group: ageGroup,

              win_rate: Number(winRate),
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("Team updated");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleEdit} disabled={loading} className={styles.button}>
      {loading ? "Updating..." : "Edit"}
    </button>
  );
}
