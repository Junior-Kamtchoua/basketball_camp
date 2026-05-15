import { NextRequest } from "next/server";

import { writeFile } from "fs/promises";

import path from "path";

const MAX_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "application/pdf",
  "audio/webm",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json(
        {
          error: "Invalid file type",
        },
        {
          status: 400,
        },
      );
    }

    if (file.size > MAX_SIZE) {
      return Response.json(
        {
          error: "File too large",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/\s/g, "-");

    const fileName = `${Date.now()}-${safeName}`;

    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);

    return Response.json({
      url: `/uploads/${fileName}`,
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
