import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, url, password } = body;

    if (!name || !url) {
      return new NextResponse("Missing name or url", { status: 400 });
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

    return NextResponse.json(album);
  } catch (error) {
    console.error("[ALBUMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
