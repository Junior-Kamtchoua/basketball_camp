"use client";

import { useEffect, useState } from "react";

import ChatSidebar from "./ChatSidebar";

import ChatWindow from "./ChatWindow";

import { SocketProvider } from "@/context/SocketContext";

import { ChatMessage, ChatUser } from "@/types/chat";

import styles from "./UserMessagesClient.module.css";

interface Props {
  currentUserId: string;

  users: ChatUser[];

  initialMessages: ChatMessage[];

  initialReceiverId: string;
}

export default function UserMessagesClient({
  currentUserId,
  users,
  initialMessages,
  initialReceiverId,
}: Props) {
  const [selectedUserId, setSelectedUserId] = useState(initialReceiverId);

  const [messages, setMessages] = useState(initialMessages);

  const [loading, setLoading] = useState(false);

  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  /*
   LOAD CONVERSATION
  */

  useEffect(() => {
    async function loadConversation() {
      if (!selectedUserId) {
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `/api/messages/conversations/${selectedUserId}`,
        );

        const data = await response.json();

        setMessages(data);

        setMobileChatOpen(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadConversation();
  }, [selectedUserId]);

  /*
   SELECTED USER
  */

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <SocketProvider userId={currentUserId}>
      <div className={styles.layout}>
        <div
          className={`${styles.sidebarWrapper} ${
            mobileChatOpen ? styles.mobileHidden : ""
          }`}
        >
          <ChatSidebar
            users={users}
            selectedUserId={selectedUserId}
            onSelectUser={setSelectedUserId}
          />
        </div>

        <div
          className={`${styles.chatWrapper} ${
            mobileChatOpen ? styles.mobileActive : ""
          }`}
        >
          {selectedUser && (
            <div className={styles.chatHeader}>
              <button
                className={styles.backButton}
                onClick={() => setMobileChatOpen(false)}
              >
                ←
              </button>

              <div className={styles.avatar}>{selectedUser.first_name[0]}</div>

              <div>
                <h2>
                  {selectedUser.first_name} {selectedUser.last_name}
                </h2>

                <span>{selectedUser.online ? "Online" : "Offline"}</span>
              </div>
            </div>
          )}

          {loading ? (
            <div className={styles.loading}>Loading conversation...</div>
          ) : (
            <ChatWindow
              currentUserId={currentUserId}
              receiverId={selectedUserId}
              messages={messages}
            />
          )}
        </div>
      </div>
    </SocketProvider>
  );
}
