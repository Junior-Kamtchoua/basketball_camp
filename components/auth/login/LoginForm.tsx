"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Mail,
  Lock,
  Eye,
  ArrowRight,
  BarChart3,
  Calendar,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import "./login.css";

export default function LoginForm() {
  return (
    <section className="login">
      <div className="login__left">
        <div className="login__overlay"></div>

        <div className="login__left-content">
          <Image
            src="/images/logo1.png"
            alt="FBA Logo"
            width={220}
            height={220}
            className="login__logo"
          />

          <h1 className="login__title">
            WELCOME BACK
            <br />
            TO <span>GREATNESS</span>
          </h1>

          <p className="login__description">
            Login to your account to manage schedules, track progress, and stay
            connected with the FBA community.
          </p>

          <div className="login__features">
            <div className="login__feature">
              <div className="login__feature-icon">
                <BarChart3 size={22} />
              </div>

              <div>
                <h3>Track Progress</h3>

                <p>Monitor skills, attendance and performance.</p>
              </div>
            </div>

            <div className="login__feature">
              <div className="login__feature-icon">
                <Calendar size={22} />
              </div>

              <div>
                <h3>Stay Updated</h3>

                <p>View schedules, events and announcements.</p>
              </div>
            </div>

            <div className="login__feature">
              <div className="login__feature-icon">
                <MessageCircle size={22} />
              </div>

              <div>
                <h3>Connect Easily</h3>

                <p>Message coaches and stay in the loop.</p>
              </div>
            </div>

            <div className="login__feature">
              <div className="login__feature-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3>Secure & Private</h3>

                <p>Your data is safe with us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login__right">
        <div className="login__card">
          <div className="login__header">
            <h2>Login to Your Account</h2>

            <p>Enter your credentials to access your account.</p>
          </div>

          <form className="login__form">
            <div className="login__field">
              <label>Email Address</label>

              <div className="login__input">
                <Mail size={20} />

                <input type="email" placeholder="Enter your email address" />
              </div>
            </div>

            <div className="login__field">
              <label>Password</label>

              <div className="login__input">
                <Lock size={20} />

                <input type="password" placeholder="Enter your password" />

                <Eye size={20} />
              </div>
            </div>

            <div className="login__options">
              <label className="login__remember">
                <input type="checkbox" />

                <span>Remember me</span>
              </label>

              <Link href="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="login__button">
              Login
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
