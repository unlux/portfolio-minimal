import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, notes } = body;

    if (!name || !phone) {
      return new NextResponse("Missing name or phone", { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
        notes,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("[CONTACTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
