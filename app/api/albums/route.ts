import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  handleApiError,
  unauthorizedError,
  validateRequiredFields,
  validationError,
} from "@/lib/api-utils";
import { isAuthorized } from "@/lib/private-auth";

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return unauthorizedError();
    }

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
