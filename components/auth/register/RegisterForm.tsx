"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Users,
  Dumbbell,
  Mail,
  Phone,
  Lock,
  Eye,
  ArrowRight,
  Calendar,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import "./register.css";

export default function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState("parent");

  return (
    <section className="register">
      {/* LEFT SIDE */}
      <div className="register__left">
        <div className="register__overlay"></div>

        <div className="register__left-content">
          <Image
            src="/images/logo1.png"
            alt="FBA Logo"
            width={230}
            height={230}
            className="register__logo"
          />

          <h1 className="register__hero-title">
            JOIN FBA
            <span> FAMILY</span>
          </h1>

          <p className="register__hero-description">
            Create your account and take the first step toward developing
            skills, building character, and achieving greatness.
          </p>

          <div className="register__features">
            <div className="register__feature">
              <div className="register__feature-icon">
                <Users size={20} />
              </div>

              <div>
                <h3>Expert Coaching</h3>

                <p>Learn from experienced and passionate coaches.</p>
              </div>
            </div>

            <div className="register__feature">
              <div className="register__feature-icon">
                <BarChart3 size={20} />
              </div>

              <div>
                <h3>Track Progress</h3>

                <p>Monitor skills, attendance and improvement.</p>
              </div>
            </div>

            <div className="register__feature">
              <div className="register__feature-icon">
                <Calendar size={20} />
              </div>

              <div>
                <h3>Stay Connected</h3>

                <p>Get updates, reminders and announcements.</p>
              </div>
            </div>

            <div className="register__feature">
              <div className="register__feature-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h3>Safe & Secure</h3>

                <p>Your data is protected and always private.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="register__right">
        <div className="register__card">
          <div className="register__header">
            <div>
              <h2>Create Your Account</h2>

              <p>Let&apos;s get started. Choose your role to continue.</p>
            </div>

            <div className="register__signin">
              Already have an account?
              <Link href="/login"> Sign in</Link>
            </div>
          </div>

          {/* ROLES */}
          <div className="register__roles">
            <div
              className={`register__role ${
                selectedRole === "parent" ? "register__role--active" : ""
              }`}
              onClick={() => setSelectedRole("parent")}
            >
              <div className="register__radio"></div>

              <div className="register__role-icon">
                <Users size={34} />
              </div>

              <h3>Parent</h3>

              <p>Register to manage your child&apos;s journey</p>
            </div>

            <div
              className={`register__role ${
                selectedRole === "coach" ? "register__role--active" : ""
              }`}
              onClick={() => setSelectedRole("coach")}
            >
              <div className="register__radio"></div>

              <div className="register__role-icon">
                <Dumbbell size={34} />
              </div>

              <h3>Coach</h3>

              <p>Register as a coach or trainer</p>
            </div>
          </div>

          {/* FORM */}
          <form className="register__form">
            <div className="register__row">
              <div className="register__field">
                <label>First Name</label>

                <input type="text" placeholder="Enter your first name" />
              </div>

              <div className="register__field">
                <label>Last Name</label>

                <input type="text" placeholder="Enter your last name" />
              </div>
            </div>

            <div className="register__field">
              <label>Email Address</label>

              <div className="register__input">
                <Mail size={18} />

                <input type="email" placeholder="Enter your email address" />
              </div>
            </div>

            <div className="register__field">
              <label>Phone Number</label>

              <div className="register__input">
                <Phone size={18} />

                <input type="text" placeholder="(123) 456-7890" />
              </div>
            </div>

            {/* PARENT ONLY */}
            {selectedRole === "parent" && (
              <div className="register__field">
                <label>Child Name</label>

                <input type="text" placeholder="Enter your child's name" />
              </div>
            )}

            {/* COACH ONLY */}
            {selectedRole === "coach" && (
              <div className="register__field">
                <label>Coaching Experience</label>

                <input type="text" placeholder="Years of coaching experience" />
              </div>
            )}

            <div className="register__row">
              <div className="register__field">
                <label>Password</label>

                <div className="register__input">
                  <Lock size={18} />

                  <input
                    type="password"
                    placeholder="Create a strong password"
                  />

                  <Eye size={18} />
                </div>
              </div>

              <div className="register__field">
                <label>Confirm Password</label>

                <div className="register__input">
                  <Lock size={18} />

                  <input type="password" placeholder="Confirm your password" />

                  <Eye size={18} />
                </div>
              </div>
            </div>

            <div className="register__terms">
              <input type="checkbox" />

              <p>
                I agree to the
                <span> Terms of Service </span>
                and
                <span> Privacy Policy</span>
              </p>
            </div>

            <button type="submit" className="register__submit">
              Create Account
              <ArrowRight size={20} />
            </button>

            <div className="register__secure">
              <ShieldCheck size={18} />

              <p>Your information is secure and will never be shared.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
