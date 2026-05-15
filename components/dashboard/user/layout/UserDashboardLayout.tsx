"use client";

import { ReactNode, useState } from "react";

import UserSidebar from "../sidebar/UserSidebar";

import UserHeader from "../header/UserHeader";

import styles from "./UserDashboardLayout.module.css";

interface Props {
  children: ReactNode;
}

export default function UserDashboardLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <UserSidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

      <main className={styles.main}>
        <UserHeader openSidebar={() => setIsOpen(true)} />

        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
