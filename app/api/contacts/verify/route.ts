import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { handleApiError, unauthorizedError } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
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
      return unauthorizedError("Incorrect password");
    }
  } catch (error) {
    return handleApiError(error, "CONTACTS_VERIFY");
  }
}
