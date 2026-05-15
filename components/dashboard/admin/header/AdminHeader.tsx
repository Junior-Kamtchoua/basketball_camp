"use client";

import { Search } from "lucide-react";

import MobileSidebarButton from "../sidebar/MobileSidebarButton";

import ThemeToggle from "./ThemeToggle";

import NotificationCenter from "../notifications/NotificationCenter";

import { Notification } from "@/types/notification";

import styles from "./AdminHeader.module.css";

interface Props {
  openSidebar: () => void;

  notifications: Notification[];
}

export default function AdminHeader({
  openSidebar,

  notifications,
}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <MobileSidebarButton onClick={openSidebar} />

        <div>
          <h1>Dashboard</h1>

          <p>Overview of Basketball Academy</p>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.searchWrapper}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
            className={styles.search}
          />
        </div>

        <NotificationCenter notifications={notifications} />

        <ThemeToggle />
      </div>
    </header>
  );
}
