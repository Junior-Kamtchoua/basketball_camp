"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./CreateTeamForm.module.css";

interface FormData {
  name: string;

  age_group: string;
}

export default function CreateTeamForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",

    age_group: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `
                  mutation CreateTeam(
                    $input: CreateTeamInput!
                  ) {
                    createTeam(
                      input: $input
                    ) {
                      id
                    }
                  }
                `,

          variables: {
            input: form,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("Team created successfully");

      router.refresh();

      setForm({
        name: "",

        age_group: "",
      });
    } catch {
      toast.error("Failed to create team");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Team name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,

            name: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Age group"
        value={form.age_group}
        onChange={(e) =>
          setForm({
            ...form,

            age_group: e.target.value,
          })
        }
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Team"}
      </button>
    </form>
  );
}
