"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import styles from "./EditUserForm.module.css";

type UserRole = "USER" | "ADMIN";

interface User {
  id: string;

  first_name: string;

  last_name: string;

  email: string;

  role: UserRole;
}

interface Props {
  user: User;

  onClose: () => void;
}

interface FormData {
  first_name: string;

  last_name: string;

  email: string;

  role: UserRole;
}

export default function EditUserForm({
  user,

  onClose,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    first_name: user.first_name,

    last_name: user.last_name,

    email: user.email,

    role: user.role,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.first_name || !form.last_name || !form.email) {
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
                  mutation UpdateUser(
                    $id: ID!,
                    $input: UpdateUserInput!
                  ) {
                    updateUser(
                      id: $id,
                      input: $input
                    ) {
                      id
                    }
                  }
                `,

          variables: {
            id: user.id,

            input: form,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("User updated successfully");

      router.refresh();

      onClose();
    } catch {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Edit User</h2>

      <div className={styles.grid}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="USER">USER</option>

        <option value="ADMIN">ADMIN</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update User"}
      </button>
    </form>
  );
}
