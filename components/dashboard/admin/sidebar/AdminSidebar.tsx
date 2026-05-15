"use client";

import Link from "next/link";

import Image from "next/image";

import { usePathname } from "next/navigation";

import { LogOut, X } from "lucide-react";

import { useUnreadMessages } from "@/hooks/useUnreadMessages";

import { sidebarLinks } from "./sidebarData";

import styles from "./AdminSidebar.module.css";

interface Props {
  isOpen: boolean;

  closeSidebar: () => void;
}

export default function AdminSidebar({ isOpen, closeSidebar }: Props) {
  const pathname = usePathname();

  const { count } = useUnreadMessages();

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

            <h2 className={styles.logo}>Basketball Camp Cobe</h2>
          </div>

          <button className={styles.closeButton} onClick={closeSidebar}>
            <X size={22} />
          </button>
        </div>

        <nav className={styles.nav}>
          {sidebarLinks.map((link) => {
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

                <div className={styles.linkContent}>
                  <span>{link.title}</span>

                  {link.title === "Messages" && count > 0 && (
                    <div className={styles.badge}>
                      {count > 99 ? "99+" : count}
                    </div>
                  )}
                </div>
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
