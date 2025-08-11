import { SignIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function Page() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  if (!hasClerk) {
    return (
      <div className="flex justify-center py-10 text-neutral-500">
        Auth is not configured.
      </div>
    );
  }
  return (
    <div className="flex justify-center py-10">
      <SignIn afterSignInUrl="/gotcha" />
    </div>
  );
}
