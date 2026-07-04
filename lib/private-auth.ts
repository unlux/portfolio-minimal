import { createHash, createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE = "private_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string | null {
  return process.env.CONTACTS_PASSWORD || null;
}

// Hash both sides so timingSafeEqual gets equal-length buffers regardless of input.
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function verifyPassword(password: unknown): boolean {
  const secret = getSecret();
  if (!secret || typeof password !== "string" || password.length === 0) {
    return false;
  }
  return safeEqual(password, secret);
}

/**
 * Deterministic session token derived from the secret, never the password
 * itself, and not reversible to it. Rotating CONTACTS_PASSWORD invalidates
 * all sessions.
 */
export function sessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  return createHmac("sha256", secret)
    .update("private-session-v1")
    .digest("hex");
}

export function isValidSession(cookieValue: string | undefined): boolean {
  const token = sessionToken();
  if (!token || !cookieValue) return false;
  return safeEqual(cookieValue, token);
}

export function isAuthorized(req: NextRequest): boolean {
  return isValidSession(req.cookies.get(SESSION_COOKIE)?.value);
}

// Naive in-memory limiter; fine for a single-instance deployment.
const attempts = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  max = 5,
  windowMs = 15 * 60_000
): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}

export function clientKey(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}
