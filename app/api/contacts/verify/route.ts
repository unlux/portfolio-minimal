import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === process.env.CONTACTS_PASSWORD) {
    const contacts = await prisma.contact.findMany();
    const response = NextResponse.json({ success: true, contacts });
    response.cookies.set("contacts_password", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/private/contacts",
    });
    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
