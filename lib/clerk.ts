export function getValidClerkPublishableKey() {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!key?.startsWith("pk_test_") && !key?.startsWith("pk_live_")) {
    return null;
  }

  return key;
}

export function hasValidClerkConfig() {
  return Boolean(process.env.CLERK_SECRET_KEY && getValidClerkPublishableKey());
}
