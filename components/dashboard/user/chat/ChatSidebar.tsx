"use client";

import { Search } from "lucide-react";

import { ChatUser } from "@/types/chat";

import WhatsAppSupportCard from "./WhatsAppSupportCard";

import styles from "./ChatSidebar.module.css";

interface Props {
  users: ChatUser[];

  selectedUserId: string;

  onSelectUser: (userId: string) => void;
}

export default function ChatSidebar({
  users,
  selectedUserId,
  onSelectUser,
}: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.search}>
        <Search size={18} />

        <input type="text" placeholder="Search..." />
      </div>

      <div className={styles.users}>
        {users.map((user) => (
          <button
            key={user.id}
            className={`${styles.user} ${
              selectedUserId === user.id ? styles.active : ""
            }`}
            onClick={() => onSelectUser(user.id)}
          >
            <div className={styles.avatar}>{user.first_name[0]}</div>

            <div className={styles.info}>
              <h3>
                {user.first_name} {user.last_name}
              </h3>

              <span>{user.online ? "Online" : "Offline"}</span>
            </div>
          </button>
        ))}
      </div>

      <WhatsAppSupportCard />
    </aside>
  );
}
