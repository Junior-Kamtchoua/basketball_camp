// app/api/messages/send/route.ts

import { NextRequest } from "next/server";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { sendMessage } from "@/services/messages/sendMessage";

export async function POST(request: NextRequest) {
  try {
    /* AUTH USER */
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

    /* REQUEST BODY */
    const body = await request.json();

    /* VALIDATION */
    if (!body.receiver_id) {
      return Response.json(
        {
          error: "Receiver is required",
        },
        {
          status: 400,
        },
      );
    }

    /* SAVE MESSAGE */
    const message = await sendMessage({
      sender_id: user.id,
      receiver_id: body.receiver_id,
      content: body.content || "",
      attachment_url: body.attachment_url,
      audio_url: body.audio_url,
    });

    /* SUCCESS */
    return Response.json(message);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to send message",
      },
      {
        status: 500,
      },
    );
  }
}
