import { getCurrentUser } from "@/lib/getCurrentUser";

import { getUserConversations } from "@/services/messages/getUserConversations";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const conversations = await getUserConversations(user.id);

  return Response.json(conversations);
}
