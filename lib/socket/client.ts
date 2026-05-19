"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
    throw new Error("NEXT_PUBLIC_SOCKET_URL is missing");
  }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],

      autoConnect: false,

      withCredentials: true,

      reconnection: true,

      reconnectionAttempts: 10,

      reconnectionDelay: 1000,
    });
  }

  return socket;
}
