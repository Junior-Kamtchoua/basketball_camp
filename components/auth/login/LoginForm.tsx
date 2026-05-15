"use client";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  Calendar,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { getDashboardRoute } from "@/lib/getDashboardRoute";

import "./login.css";

interface LoginUser {
  id: string;

  role: "ADMIN" | "USER";

  must_change_password: boolean;
}

interface ApiLoginResponse {
  success?: boolean;

  user?: LoginUser;

  error?: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result: ApiLoginResponse = await response.json();

      if (!response.ok) {
        setError(result.error || "Invalid credentials");

        return;
      }

      if (!result.user) {
        setError("Login failed");

        return;
      }

      if (result.user.must_change_password) {
        window.location.assign("/change-password");

        return;
      }

      window.location.assign(getDashboardRoute(result.user.role));
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login">
      <div className="login__left">
        <div className="login__overlay"></div>
      </div>

      <div className="login__right">
        <div className="login__card">
          <div className="login__header">
            <h2>Login to Your Account</h2>

            <p>Enter your credentials to access your account.</p>
          </div>

          <form className="login__form" onSubmit={handleSubmit}>
            {error && <div className="login__error">{error}</div>}

            <div className="login__field">
              <label>Email Address</label>

              <div className="login__input">
                <Mail size={20} />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login__field">
              <label>Password</label>

              <div className="login__input">
                <Lock size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="login__eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="login__options">
              <label className="login__remember">
                <input type="checkbox" />

                <span>Remember me</span>
              </label>

              <Link href="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="login__button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}

              <ArrowRight size={20} />
            </button>

            <div className="login__bottom">
              <p>Don&apos;t have an account?</p>

              <Link href="/register">Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
