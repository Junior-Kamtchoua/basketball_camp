import { getCurrentUser } from "@/lib/getCurrentUser";

import MessagesClient from "@/components/dashboard/admin/messages/MessagesClient";

import { SocketProvider } from "@/context/SocketContext";

export default async function MessagesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <SocketProvider userId={user.id}>
      <MessagesClient currentUserId={user.id} />
    </SocketProvider>
  );
}
