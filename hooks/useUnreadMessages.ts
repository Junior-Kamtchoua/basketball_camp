"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
export function useUnreadMessages() {
  const { socket } = useSocket();
  const [count, setCount] = useState(0);
  /* LIVE NOTIFICATIONS */ useEffect(() => {
    function handleNotification() {
      setCount((prev) => prev + 1);
    }
    function handleClearNotifications() {
      setCount(0);
    }
    socket.on("chat-notification", handleNotification);
    socket.on("clear-chat-notifications", handleClearNotifications);
    return () => {
      socket.off("chat-notification", handleNotification);
      socket.off("clear-chat-notifications", handleClearNotifications);
    };
  }, [socket]);
  return { count, setCount };
}
