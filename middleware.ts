import { clerkMiddleware } from "@clerk/nextjs/server";

const hasClerk =
  Boolean(process.env.CLERK_SECRET_KEY) &&
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const noop = () => {
  /* no-op middleware when Clerk is not configured */
};

export default hasClerk ? clerkMiddleware() : (noop as any);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|ttf|woff|woff2)).*)",
  ],
};
