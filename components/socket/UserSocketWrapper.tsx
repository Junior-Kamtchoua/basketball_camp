"use client";

import { ReactNode } from "react";

import { SocketProvider } from "@/context/SocketContext";

interface Props {
  children: ReactNode;

  userId: string;
}

export default function UserSocketWrapper({ children, userId }: Props) {
  return <SocketProvider userId={userId}>{children}</SocketProvider>;
}
