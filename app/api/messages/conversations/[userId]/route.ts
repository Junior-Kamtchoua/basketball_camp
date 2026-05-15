import { getCurrentUser } from "@/lib/getCurrentUser";

import { getConversation } from "@/services/messages/getConversation";

interface Props {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(request: Request, { params }: Props) {
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

  const { userId } = await params;

  const conversation = await getConversation(user.id, userId);

  return Response.json(conversation);
}
