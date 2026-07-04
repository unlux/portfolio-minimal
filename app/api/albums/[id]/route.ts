import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  handleApiError,
  notFoundError,
  parseIntId,
  unauthorizedError,
  validationError,
} from "@/lib/api-utils";
import { clientKey, rateLimit } from "@/lib/private-auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!rateLimit(`album-verify:${clientKey(req)}`, 10)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const { id: rawId } = await params;
    const id = parseIntId(rawId);

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
