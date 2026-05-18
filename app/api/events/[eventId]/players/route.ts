import { NextRequest } from "next/server";

import { getEventPlayers } from "@/services/events/getEventPlayers";

interface Params {
  params: Promise<{
    eventId: string;
  }>;
}

export async function GET(
  request: NextRequest,

  { params }: Params,
) {
  try {
    const { eventId } = await params;

    const players = await getEventPlayers(eventId);

    return Response.json({
      players,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to load players",
      },
      {
        status: 500,
      },
    );
  }
}
