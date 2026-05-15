"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { Send, Paperclip, Mic, Square } from "lucide-react";

import { ChatMessage } from "@/types/chat";

import { useSocket } from "@/context/SocketContext";

import TypingIndicator from "./TypingIndicator";

import FilePreviewModal from "./FilePreviewModal";

import styles from "./ChatWindow.module.css";

interface Props {
  currentUserId: string;

  receiverId: string;

  messages: ChatMessage[];
}

export default function ChatWindow({
  currentUserId,
  receiverId,
  messages: initialMessages,
}: Props) {
  const { socket } = useSocket();

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const [message, setMessage] = useState("");

  const [typing, setTyping] = useState(false);

  const [previewFile, setPreviewFile] = useState("");

  const [isRecording, setIsRecording] = useState(false);

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
   SOCKET EVENTS
  */

  useEffect(() => {
    if (!socket) {
      return;
    }

    function handleReceiveMessage(newMessage: ChatMessage) {
      const belongsToConversation =
        (newMessage.sender_id === currentUserId &&
          newMessage.receiver_id === receiverId) ||
        (newMessage.sender_id === receiverId &&
          newMessage.receiver_id === currentUserId);

      if (!belongsToConversation) {
        return;
      }

      setMessages((prev) => {
        const alreadyExists = prev.some((msg) => msg.id === newMessage.id);

        if (alreadyExists) {
          return prev;
        }

        return [...prev, newMessage];
      });
    }

    function handleTypingEvent(data: {
      senderId: string;

      receiverId: string;
    }) {
      if (data.senderId !== receiverId || data.receiverId !== currentUserId) {
        return;
      }

      setTyping(true);

      setTimeout(() => {
        setTyping(false);
      }, 2000);
    }

    socket.on("receive-message", handleReceiveMessage);

    socket.on("typing", handleTypingEvent);

    return () => {
      socket.off("receive-message", handleReceiveMessage);

      socket.off("typing", handleTypingEvent);
    };
  }, [socket, currentUserId, receiverId]);

  /*
   HANDLE TYPING
  */

  function handleTyping(value: string) {
    setMessage(value);

    socket?.emit("typing", {
      senderId: currentUserId,

      receiverId,
    });
  }

  /*
   SEND TEXT MESSAGE
  */

  async function handleSend() {
    if (!message.trim()) {
      return;
    }

    try {
      const response = await fetch("/api/messages/send", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          receiver_id: receiverId,

          content: message,
        }),
      });

      const savedMessage = await response.json();

      socket?.emit("send-message", savedMessage);

      setMessages((prev) => [...prev, savedMessage]);

      setMessage("");
    } catch (error) {
      console.error(error);
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
          receiver_id: receiverId,

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
   START RECORDING
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
            receiver_id: receiverId,

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

  /*
   STOP RECORDING
  */

  function stopRecording() {
    mediaRecorderRef.current?.stop();

    setIsRecording(false);
  }

  return (
    <>
      <div className={styles.chat}>
        <div className={styles.messages}>
          {messages.length === 0 ? (
            <div className={styles.empty}>
              <h2>No messages yet</h2>

              <p>Start the conversation now.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender_id === currentUserId;

              return (
                <div
                  key={msg.id}
                  className={`${styles.message} ${isMine ? styles.mine : ""}`}
                >
                  <div className={styles.bubble}>
                    {msg.content && <p>{msg.content}</p>}

                    {msg.attachment_url && (
                      <Image
                        src={msg.attachment_url}
                        alt="Attachment"
                        width={220}
                        height={220}
                        className={styles.attachment}
                        onClick={() => setPreviewFile(msg.attachment_url || "")}
                      />
                    )}

                    {msg.audio_url && (
                      <audio controls className={styles.audio}>
                        <source src={msg.audio_url} type="audio/webm" />
                      </audio>
                    )}

                    <small>
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",

                        minute: "2-digit",
                      })}
                    </small>
                  </div>
                </div>
              );
            })
          )}

          <TypingIndicator visible={typing} />

          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <button
            className={styles.attach}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileUpload}
          />

          {!isRecording ? (
            <button className={styles.attach} onClick={startRecording}>
              <Mic size={20} />
            </button>
          ) : (
            <button className={styles.recording} onClick={stopRecording}>
              <Square size={18} />
            </button>
          )}

          <input
            type="text"
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            placeholder="Type a message..."
            className={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button className={styles.send} onClick={handleSend}>
            <Send size={20} />
          </button>
        </div>
      </div>

      {previewFile && (
        <FilePreviewModal
          fileUrl={previewFile}
          onClose={() => setPreviewFile("")}
        />
      )}
    </>
  );
}
