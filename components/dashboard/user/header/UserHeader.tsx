"use client";

import { Bell, Menu, Moon } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

import styles from "./UserHeader.module.css";

interface Props {
  openSidebar: () => void;
}

export default function UserHeader({ openSidebar }: Props) {
  const { toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menu} onClick={openSidebar}>
          <Menu size={22} />
        </button>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.search}
          />
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.icon}>
          <Bell size={20} />
        </button>

        <button className={styles.icon} onClick={toggleTheme}>
          <Moon size={20} />
        </button>
      </div>
    </header>
  );
}
