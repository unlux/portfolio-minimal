import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  handleApiError,
  notFoundError,
  parseIntId,
  unauthorizedError,
  validationError,
} from "@/lib/api-utils";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseIntId(params.id);

    if (id === null) {
      return validationError("Invalid ID format", "ID must be a valid integer");
    }

    const { password } = await req.json();
    const album = await prisma.photoAlbum.findUnique({
      where: { id },
    });

    if (!album) {
      return notFoundError("Album");
    }

    if (album.isProtected) {
      if (password === album.password) {
        return NextResponse.json({ success: true, url: album.url });
      } else {
        return unauthorizedError("Incorrect password");
      }
    } else {
      return NextResponse.json({ success: true, url: album.url });
    }
  } catch (error) {
    return handleApiError(error, "ALBUM_VERIFY");
  }
}
