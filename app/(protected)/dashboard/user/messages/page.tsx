import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getChatUsers } from "@/services/user-dashboard/getChatUsers";

import { getConversation } from "@/services/user-dashboard/getConversation";

import UserMessagesClient from "@/components/dashboard/user/chat/UserMessagesClient";

export default async function MessagesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const users = await getChatUsers();

  const filteredUsers = users.filter((item) => item.id !== user.id);

  const firstUser = filteredUsers[0];

  const messages = firstUser
    ? await getConversation(user.id, firstUser.id)
    : [];

  return (
    <UserMessagesClient
      currentUserId={user.id}
      users={filteredUsers}
      initialMessages={messages}
      initialReceiverId={firstUser?.id || ""}
    />
  );
}
