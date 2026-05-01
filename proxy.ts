import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextMiddleware } from "next/server";
import { hasValidClerkConfig } from "@/lib/clerk";

const clerkProxy = clerkMiddleware();

export const proxy: NextMiddleware = hasValidClerkConfig()
  ? clerkProxy
  : () => NextResponse.next();

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|ttf|woff|woff2)).*)",
  ],
};
