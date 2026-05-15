"use client";

import Link from "next/link";

import Image from "next/image";

import { usePathname } from "next/navigation";

import { LogOut, X } from "lucide-react";

import { userSidebarLinks } from "./sidebarData";

import styles from "./UserSidebar.module.css";

interface Props {
  isOpen: boolean;

  closeSidebar: () => void;
}

export default function UserSidebar({
  isOpen,

  closeSidebar,
}: Props) {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeSidebar} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.top}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/logo1.png"
              alt="Logo"
              width={70}
              height={70}
              className={styles.logoImage}
            />

            <h2 className={styles.logo}>Player Zone</h2>
          </div>

          <button className={styles.closeButton} onClick={closeSidebar}>
            <X size={22} />
          </button>
        </div>

        <nav className={styles.nav}>
          {userSidebarLinks.map((link) => {
            const isActive = pathname === link.href;

            const Icon = link.icon;

            return (
              <Link
                key={link.title}
                href={link.href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                onClick={closeSidebar}
              >
                <Icon size={20} />

                <span>{link.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.bottom}>
          <button className={styles.logout} onClick={handleLogout}>
            <LogOut size={20} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
