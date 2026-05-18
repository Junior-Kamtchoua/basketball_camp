"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./CreateProgramForm.module.css";

interface FormData {
  title: string;

  description: string;

  price: string;

  duration_weeks: string;

  max_players: string;
}

export default function CreateProgramForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    title: "",

    description: "",

    price: "",

    duration_weeks: "",

    max_players: "",
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
            mutation CreateProgram(
              $input: CreateProgramInput!
            ) {
              createProgram(
                input: $input
              ) {
                id
              }
            }
          `,

          variables: {
            input: {
              title: form.title,

              description: form.description,

              price: Number(form.price),

              duration_weeks: Number(form.duration_weeks),

              max_players: Number(form.max_players),
            },
          },
        }),
      });

      const result = await response.json();

      console.log(result);

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("Program created successfully");

      router.refresh();

      setForm({
        title: "",

        description: "",

        price: "",

        duration_weeks: "",

        max_players: "",
      });
    } catch {
      toast.error("Failed to create program");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Program title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,

            title: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({
            ...form,

            price: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Duration (weeks)"
        value={form.duration_weeks}
        onChange={(e) =>
          setForm({
            ...form,

            duration_weeks: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Max players"
        value={form.max_players}
        onChange={(e) =>
          setForm({
            ...form,

            max_players: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,

            description: e.target.value,
          })
        }
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Program"}
      </button>
    </form>
  );
}
