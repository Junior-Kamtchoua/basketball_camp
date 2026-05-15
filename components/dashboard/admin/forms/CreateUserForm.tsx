"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./CreateUserForm.module.css";

type UserRole = "USER" | "ADMIN";

interface CreateUserFormData {
  first_name: string;

  last_name: string;

  email: string;

  password: string;

  role: UserRole;
}

const initialForm: CreateUserFormData = {
  first_name: "",

  last_name: "",

  email: "",

  password: "",

  role: "USER",
};

export default function CreateUserForm() {
  const router = useRouter();

  const [form, setForm] = useState<CreateUserFormData>(initialForm);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.first_name || !form.last_name || !form.email || !form.password) {
      toast.error("Please fill all fields");

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
                  mutation CreateUser(
                    $input: CreateUserInput!
                  ) {
                    createUser(
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

      toast.success("User created successfully");

      router.refresh();

      setForm(initialForm);
    } catch {
      toast.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          value={form.first_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          value={form.last_name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.grid}>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="USER">USER</option>

          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
