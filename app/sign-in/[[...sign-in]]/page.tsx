import { SignIn } from "@clerk/nextjs";
import { getValidClerkPublishableKey } from "@/lib/clerk";

export const dynamic = "force-dynamic";

export default function Page() {
  const hasClerk = Boolean(getValidClerkPublishableKey());
  if (!hasClerk) {
    return (
      <div className="flex justify-center py-10 text-neutral-500">
        Auth is not configured.
      </div>
    );
  }
  return (
    <div className="flex justify-center py-10">
      <SignIn forceRedirectUrl="/gotcha" />
    </div>
  );
}
