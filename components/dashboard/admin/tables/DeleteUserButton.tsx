"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./DeleteUserButton.module.css";

interface Props {
  userId: string;
}

export default function DeleteUserButton({ userId }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch("/api/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `
                  mutation DeleteUser(
                    $id: ID!
                  ) {
                    deleteUser(
                      id: $id
                    )
                  }
                `,

          variables: {
            id: userId,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("User deleted successfully");

      router.refresh();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleDelete} className={styles.button} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
