import { NextRequest } from "next/server";

import cloudinary from "@/lib/cloudinary";

import pool from "@/lib/db";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { createActivityLog } from "@/services/audit/createActivityLog";

export async function POST(request: NextRequest) {
  try {
    /*
      AUTH
    */

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

    /*
      FORM DATA
    */

    const formData = await request.formData();

    const file = formData.get("file") as File;

    const amount = formData.get("amount");

    const playerProgramId = formData.get("playerProgramId");

    if (!file || !amount || !playerProgramId) {
      return Response.json(
        {
          error: "Missing fields",
        },
        {
          status: 400,
        },
      );
    }

    /*
      PLAYER
    */

    const playerQuery = await pool.query(
      `
          SELECT id

          FROM players

          WHERE user_id = $1

          LIMIT 1
        `,
      [user.id],
    );

    const player = playerQuery.rows[0];

    if (!player) {
      return Response.json(
        {
          error: "Player not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
      FILE BUFFER
    */

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");

    const dataURI = `data:${file.type};base64,${base64}`;

    /*
      UPLOAD CLOUDINARY
    */

    const uploaded = await cloudinary.uploader.upload(dataURI, {
      folder: "basketball-payments",
    });

    /*
      CREATE PAYMENT
    */

    await pool.query(
      `
        INSERT INTO payments (
          player_id,
          player_program_id,
          amount,
          status,
          payment_method,
          payment_proof_url
        )

        VALUES (
          $1,
          $2,
          $3,
          'PENDING',
          'ZELLE',
          $4
        )
      `,
      [player.id, playerProgramId, amount, uploaded.secure_url],
    );

    /*
      ACTIVITY LOG
    */

    await createActivityLog({
      action: "New payment proof uploaded",

      type: "PAYMENT",
    });

    /*
      SUCCESS
    */

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      },
    );
  }
}
