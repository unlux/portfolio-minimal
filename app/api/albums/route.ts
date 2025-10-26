import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  handleApiError,
  validateRequiredFields,
  validationError,
} from "@/lib/api-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, url, password } = body;

    const validation = validateRequiredFields(body, ["name", "url"]);
    if (!validation.valid) {
      return validationError(
        "Missing required fields",
        `Required: ${validation.missing?.join(", ")}`
      );
    }

    const isProtected = !!password;

    const album = await prisma.photoAlbum.create({
      data: {
        name,
        url,
        password,
        isProtected,
      },
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    return handleApiError(error, "ALBUMS_POST");
  }
}
