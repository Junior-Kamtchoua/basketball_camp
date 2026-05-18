"use client";

import Image from "next/image";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  FaPaperPlane,
  FaUserCircle,
  FaPaperclip,
  FaMicrophone,
  FaStop,
} from "react-icons/fa";

import { useSocket } from "@/context/SocketContext";

import styles from "./MessagesClient.module.css";

interface Conversation {
  id: string;

  sender_id: string;

  sender_name: string;

  receiver_id: string;

  receiver_name: string;

  content: string;

  created_at: string;

  is_read: boolean;
}

interface Message {
  id: string;

  sender_id: string;

  receiver_id: string;

  content: string;

  created_at: string;

  attachment_url?: string | null;

  audio_url?: string | null;
}

interface Props {
  currentUserId: string;
}

export default function MessagesClient({ currentUserId }: Props) {
  const { socket } = useSocket();

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [activeUser, setActiveUser] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const [previewFile, setPreviewFile] = useState("");

  const [isRecording, setIsRecording] = useState(false);

  const [unreadUsers, setUnreadUsers] = useState<string[]>([]);

  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const audioChunksRef = useRef<Blob[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /*
   AUTO SCROLL
  */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /*
   INITIAL LOAD
  */

  useEffect(() => {
    async function initialize() {
      try {
        const conversationsResponse = await fetch(
          "/api/messages/conversations",
          {
            cache: "no-store",
          },
        );

        if (!conversationsResponse.ok) {
          return;
        }

        const conversationsData = await conversationsResponse.json();

        setConversations(conversationsData);

        if (conversationsData.length > 0) {
          const first = conversationsData[0];

          const otherUser =
            first.sender_id === currentUserId
              ? first.receiver_id
              : first.sender_id;

          setActiveUser(otherUser);

          const messagesResponse = await fetch(
            `/api/messages/conversations/${otherUser}`,
            {
              cache: "no-store",
            },
          );

          if (!messagesResponse.ok) {
            return;
          }

          const messagesData = await messagesResponse.json();

          setMessages(messagesData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    initialize();
  }, [currentUserId]);

  /*
   SELECT USER
  */

  async function handleSelectUser(userId: string) {
    try {
      /*
      SET ACTIVE USER
    */

      setActiveUser(userId);

      /*
      MARK MESSAGES AS READ
    */

      await fetch("/api/messages/mark-read", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          senderId: userId,
        }),
      });

      /*
      CLEAR LOCAL BADGE
    */

      setUnreadUsers((prev) => prev.filter((item) => item !== userId));
      setUnreadCounts((prev) => ({
        ...prev,

        [userId]: 0,
      }));

      /*
      CLEAR SIDEBAR NOTIFICATIONS
    */

      socket.emit("clear-chat-notifications");

      /*
      LOAD CONVERSATION
    */

      const response = await fetch(`/api/messages/conversations/${userId}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  }

  /*
   SOCKET
  */

  useEffect(() => {
    if (!socket) {
      return;
    }

    function handleReceiveMessage(message: Message) {
      const belongsToConversation =
        (message.sender_id === currentUserId &&
          message.receiver_id === activeUser) ||
        (message.sender_id === activeUser &&
          message.receiver_id === currentUserId);

      if (belongsToConversation) {
        setMessages((prev) => {
          const exists = prev.some((msg) => msg.id === message.id);

          if (exists) {
            return prev;
          }

          return [...prev, message];
        });
      }

      /*
  NEW MESSAGE BADGE
*/

      if (message.sender_id !== currentUserId) {
        setUnreadUsers((prev) => {
          if (prev.includes(message.sender_id)) {
            return prev;
          }

          return [...prev, message.sender_id];
        });

        setUnreadCounts((prev) => ({
          ...prev,

          [message.sender_id]: (prev[message.sender_id] || 0) + 1,
        }));
      }
      /*
        UPDATE CONVERSATIONS
      */

      setConversations((prev) => {
        const updated = [...prev];

        const index = updated.findIndex((conversation) => {
          const otherUserId =
            conversation.sender_id === currentUserId
              ? conversation.receiver_id
              : conversation.sender_id;

          return (
            otherUserId === message.sender_id ||
            otherUserId === message.receiver_id
          );
        });

        if (index !== -1) {
          updated[index] = {
            ...updated[index],

            content: message.content || "Attachment",

            created_at: message.created_at,
          };

          /*
            MOVE CONVERSATION TO TOP
          */

          const [conversation] = updated.splice(index, 1);

          updated.unshift(conversation);
        }

        return updated;
      });
    }

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, currentUserId, activeUser]);

  /*
   SEND TEXT
  */

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim() || !activeUser || loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/messages/send", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          receiver_id: activeUser,

          content,
        }),
      });

      if (!response.ok) {
        return;
      }

      const savedMessage = await response.json();

      socket?.emit("send-message", savedMessage);

      setMessages((prev) => [...prev, savedMessage]);

      setContent("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  /*
   FILE UPLOAD
  */

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);

      const uploadResponse = await fetch("/api/messages/upload", {
        method: "POST",

        body: formData,
      });

      const uploadData = await uploadResponse.json();

      const messageResponse = await fetch("/api/messages/send", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          receiver_id: activeUser,

          content: "",

          attachment_url: uploadData.url,
        }),
      });

      const savedMessage = await messageResponse.json();

      socket?.emit("send-message", savedMessage);

      setMessages((prev) => [...prev, savedMessage]);
    } catch (error) {
      console.error(error);
    }
  }

  /*
   RECORD AUDIO
  */

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const audioFile = new File([audioBlob], `voice-${Date.now()}.webm`, {
          type: "audio/webm",
        });

        const formData = new FormData();

        formData.append("file", audioFile);

        const uploadResponse = await fetch("/api/messages/upload", {
          method: "POST",

          body: formData,
        });

        const uploadData = await uploadResponse.json();

        const messageResponse = await fetch("/api/messages/send", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            receiver_id: activeUser,

            content: "",

            audio_url: uploadData.url,
          }),
        });

        const savedMessage = await messageResponse.json();

        socket?.emit("send-message", savedMessage);

        setMessages((prev) => [...prev, savedMessage]);
      };

      mediaRecorder.start();

      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();

    setIsRecording(false);
  }

  /*
   SORTED
  */

  const sortedConversations = useMemo(() => {
    return [...conversations].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [conversations]);

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Messages</h2>
          </div>

          {sortedConversations.length === 0 ? (
            <div className={styles.empty}>
              <p>No conversations yet</p>
            </div>
          ) : (
            sortedConversations.map((conversation) => {
              const isSender = conversation.sender_id === currentUserId;

              const otherUserId = isSender
                ? conversation.receiver_id
                : conversation.sender_id;

              const otherUserName = isSender
                ? conversation.receiver_name
                : conversation.sender_name;

              return (
                <button
                  key={conversation.id}
                  onClick={() => handleSelectUser(otherUserId)}
                  className={`${styles.userButton} ${
                    activeUser === otherUserId ? styles.active : ""
                  } ${unreadUsers.includes(otherUserId) ? styles.unread : ""}`}
                >
                  <FaUserCircle className={styles.avatar} />

                  <div className={styles.userContent}>
                    {unreadCounts[otherUserId] > 0 && (
                      <div className={styles.countBadge}>
                        {unreadCounts[otherUserId]}
                      </div>
                    )}

                    <h3>{otherUserName}</h3>

                    <p>{conversation.content}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className={styles.chatArea}>
          <div className={styles.messages}>
            {messages.length === 0 ? (
              <div className={styles.noMessages}>
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.sender_id === currentUserId
                      ? styles.sent
                      : styles.received
                  }
                >
                  <div className={styles.messageBubble}>
                    {message.content && <p>{message.content}</p>}

                    {message.attachment_url && (
                      <Image
                        src={message.attachment_url}
                        alt="Attachment"
                        width={220}
                        height={220}
                        className={styles.attachment}
                        onClick={() =>
                          setPreviewFile(message.attachment_url || "")
                        }
                      />
                    )}

                    {message.audio_url && (
                      <audio controls className={styles.audio}>
                        <source src={message.audio_url} type="audio/webm" />
                      </audio>
                    )}

                    <span>
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",

                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className={styles.form}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => fileInputRef.current?.click()}
            >
              <FaPaperclip />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileUpload}
            />

            {!isRecording ? (
              <button
                type="button"
                className={styles.iconButton}
                onClick={startRecording}
              >
                <FaMicrophone />
              </button>
            ) : (
              <button
                type="button"
                className={styles.recording}
                onClick={stopRecording}
              >
                <FaStop />
              </button>
            )}

            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a message..."
            />

            <button
              type="submit"
              disabled={loading}
              className={styles.sendButton}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      {previewFile && (
        <div
          className={styles.previewOverlay}
          onClick={() => setPreviewFile("")}
        >
          <Image
            src={previewFile}
            alt="Preview"
            width={800}
            height={800}
            className={styles.previewImage}
          />
        </div>
      )}
    </>
  );
}
