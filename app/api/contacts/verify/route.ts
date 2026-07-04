import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError, unauthorizedError } from "@/lib/api-utils";
import {
  clientKey,
  rateLimit,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  sessionToken,
  verifyPassword,
} from "@/lib/private-auth";

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`contacts-verify:${clientKey(req)}`)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const { password } = await req.json();

    if (!verifyPassword(password)) {
      return unauthorizedError("Incorrect password");
    }

    const contacts = await prisma.contact.findMany();
    const response = NextResponse.json({ success: true, contacts });
    response.cookies.set(SESSION_COOKIE, sessionToken()!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return response;
  } catch (error) {
    return handleApiError(error, "CONTACTS_VERIFY");
  }
}
