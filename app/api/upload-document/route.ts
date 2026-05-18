import { NextRequest } from "next/server";

import cloudinary from "@/lib/cloudinary";

import pool from "@/lib/db";

import { getCurrentUser } from "@/lib/getCurrentUser";

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

    const file = formData.get("file") as File | null;

    const documentType = formData.get("documentType") as string | null;

    const paymentId = formData.get("paymentId") as string | null;

    if (!file) {
      return Response.json(
        {
          error: "File required",
        },
        {
          status: 400,
        },
      );
    }

    /*
      VALIDATION
    */

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        {
          error: "Invalid file type",
        },
        {
          status: 400,
        },
      );
    }

    /*
      BUFFER
    */

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");

    const dataURI = `data:${file.type};base64,${base64}`;

    /*
      CLOUDINARY
    */

    const uploadedFile = await cloudinary.uploader.upload(dataURI, {
      folder: "basketball-documents",

      resource_type: "raw",
    });

    /*
      SAVE DOCUMENT
    */

    await pool.query(
      `
        INSERT INTO user_documents (
          user_id,
          payment_id,
          file_url,
          document_type
        )

        VALUES (
          $1,
          $2,
          $3,
          $4
        )
      `,
      [
        user.id,
        paymentId || null,
        uploadedFile.secure_url,
        documentType || "GENERAL",
      ],
    );

    /*
      SUCCESS
    */

    return Response.json({
      success: true,

      url: uploadedFile.secure_url,
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
