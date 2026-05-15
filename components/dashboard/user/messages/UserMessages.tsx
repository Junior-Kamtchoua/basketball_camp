"use client";

import { useState, useMemo } from "react";

import { Search } from "lucide-react";

import { Message } from "@/types/message";

import styles from "./UserMessages.module.css";

interface Props {
  currentUserId: string;

  messages: Message[];
}

const ITEMS_PER_PAGE = 8;

export default function UserMessages({ currentUserId, messages }: Props) {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const targetName =
        message.sender_id === currentUserId
          ? message.receiver_name
          : message.sender_name;

      return (
        targetName.toLowerCase().includes(search.toLowerCase()) ||
        message.content.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [messages, search, currentUserId]);

  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);

  const paginatedMessages = filteredMessages.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Messages</h1>

        <div className={styles.searchWrapper}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.list}>
        {paginatedMessages.length === 0 ? (
          <div className={styles.empty}>
            <h2>No messages found</h2>

            <p>Your conversations will appear here.</p>
          </div>
        ) : (
          paginatedMessages.map((message) => {
            const isMine = message.sender_id === currentUserId;

            const targetName = isMine
              ? message.receiver_name
              : message.sender_name;

            return (
              <div
                key={message.id}
                className={`${styles.card} ${isMine ? styles.mine : ""}`}
              >
                <div className={styles.header}>
                  <h3>{targetName}</h3>

                  <small>{new Date(message.created_at).toLocaleString()}</small>
                </div>

                <p>{message.content}</p>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
