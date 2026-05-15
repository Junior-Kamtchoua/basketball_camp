"use client";

import dynamic from "next/dynamic";

import { useTheme } from "@/context/ThemeContext";

import styles from "./ThemeToggle.module.css";

const FaMoon = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaMoon),
  {
    ssr: false,
  },
);

const FaSun = dynamic(() => import("react-icons/fa").then((mod) => mod.FaSun), {
  ssr: false,
});

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.button}
      onClick={toggleTheme}
      suppressHydrationWarning
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
