"use client";

import { ReactNode, useEffect, useState } from "react";

import { Notification } from "@/types/notification";

import AdminSidebar from "../sidebar/AdminSidebar";

import AdminHeader from "../header/AdminHeader";

import styles from "./AdminDashboardLayout.module.css";

interface Props {
  children: ReactNode;

  notifications: Notification[];
}

export default function AdminDashboardLayout({
  children,

  notifications,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  /*
   CLOSE SIDEBAR ON DESKTOP
  */

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <AdminSidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      <main className={styles.main}>
        <AdminHeader
          openSidebar={() => setIsOpen(true)}
          notifications={notifications}
        />

        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
