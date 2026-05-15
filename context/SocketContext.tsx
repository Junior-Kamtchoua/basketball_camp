"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { Socket } from "socket.io-client";

import { getSocket } from "@/lib/socket/client";

interface SocketContextType {
  socket: Socket;

  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface Props {
  children: ReactNode;

  userId: string;
}

export function SocketProvider({ children, userId }: Props) {
  /*
   CREATE SOCKET ONLY ONCE
  */

  const socket = useMemo(() => {
    return getSocket();
  }, []);

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    /*
     JOIN USER
    */

    socket.emit("join", userId);

    /*
     ONLINE USERS
    */

    function handleOnlineUsers(users: string[]) {
      setOnlineUsers(users);
    }

    socket.on("online-users", handleOnlineUsers);

    return () => {
      socket.off("online-users", handleOnlineUsers);
    };
  }, [socket, userId]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }

  return context;
}
