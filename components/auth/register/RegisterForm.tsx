"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Home,
  LogIn,
  ShieldCheck,
} from "lucide-react";

import styles from "./Register.module.css";

type AccountType = "PLAYER" | "PARENT";

interface RegisterFormData {
  first_name: string;

  last_name: string;

  email: string;

  password: string;

  account_type: AccountType;
}

interface RegisterResponse {
  data?: {
    register: {
      id: string;
    };
  };

  errors?: {
    message: string;
  }[];
}

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<RegisterFormData>({
    first_name: "",

    last_name: "",

    email: "",

    password: "",

    account_type: "PLAYER",
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
                mutation Register(
                  $input: RegisterInput!
                ) {
                  register(
                    input: $input
                  ) {
                    id
                  }
                }
              `,

          variables: {
            input: {
              first_name: form.first_name,

              last_name: form.last_name,

              email: form.email,

              password: form.password,
            },
          },
        }),
      });

      const result: RegisterResponse = await response.json();

      if (result.errors) {
        toast.error(result.errors[0].message);

        return;
      }

      toast.success("Account created successfully");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.register}>
      <div className={styles.overlay} />

      <div className={styles.card}>
        <div className={styles.topActions}>
          <Link href="/" className={styles.topButton}>
            <Home size={18} />
            Home
          </Link>

          <Link href="/login" className={styles.topButton}>
            <LogIn size={18} />
            Login
          </Link>
        </div>

        <div className={styles.header}>
          <div className={styles.badge}>
            <ShieldCheck size={18} />
            Basketball Academy
          </div>

          <h1>Create Your Account</h1>

          <p>Join the next generation of basketball excellence.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.inputWrapper}>
              <User size={18} />

              <input
                type="text"
                placeholder="First Name"
                value={form.first_name}
                onChange={(e) =>
                  setForm({
                    ...form,

                    first_name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className={styles.inputWrapper}>
              <User size={18} />

              <input
                type="text"
                placeholder="Last Name"
                value={form.last_name}
                onChange={(e) =>
                  setForm({
                    ...form,

                    last_name: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <Mail size={18} />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,

                  email: e.target.value,
                })
              }
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <Lock size={18} />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,

                  password: e.target.value,
                })
              }
              required
            />
          </div>

          <select
            value={form.account_type}
            onChange={(e) =>
              setForm({
                ...form,

                account_type: e.target.value as AccountType,
              })
            }
            className={styles.select}
          >
            <option value="PLAYER">PLAYER</option>

            <option value="PARENT">PARENT</option>
          </select>

          <button type="submit" disabled={loading} className={styles.submit}>
            {loading ? "Creating Account..." : "Create Account"}

            <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.bottom}>
          Already have an account?
          <Link href="/login">Login</Link>
        </div>
      </div>
    </section>
  );
}
