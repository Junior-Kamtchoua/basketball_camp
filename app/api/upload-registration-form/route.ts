import { NextRequest } from "next/server";

import { getCurrentUser } from "@/lib/getCurrentUser";

import cloudinary from "@/lib/cloudinary";

import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    /*
      AUTH USER
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
      GET FILE
    */

    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        {
          error: "File is required",
        },
        {
          status: 400,
        },
      );
    }

    /*
      FILE VALIDATION
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
      CONVERT FILE
    */

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");

    const dataURI = `data:${file.type};base64,${base64}`;

    /*
      KEEP ORIGINAL FILE NAME
    */

    const originalName = file.name.replace(/\.[^/.]+$/, "");

    /*
      UPLOAD TO CLOUDINARY
    */

    const uploadedFile = await cloudinary.uploader.upload(dataURI, {
      folder: "basketball-registration-forms",

      resource_type: "raw",

      public_id: originalName,

      use_filename: true,

      unique_filename: false,

      overwrite: true,
    });

    /*
      SAVE URL IN DATABASE
    */

    await pool.query(
      `
        UPDATE users
        SET basketball_registration_form_url = $1
        WHERE id = $2
      `,
      [uploadedFile.secure_url, user.id],
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
