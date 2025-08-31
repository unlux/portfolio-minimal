import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { password } = await req.json();
  const album = await prisma.photoAlbum.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!album) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  if (album.isProtected) {
    if (password === album.password) {
      return NextResponse.json({ success: true, url: album.url });
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } else {
    return NextResponse.json({ success: true, url: album.url });
  }
}
