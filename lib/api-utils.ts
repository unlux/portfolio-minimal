import { NextResponse } from "next/server";

/**
 * Standard API error response types
 */
export enum ApiErrorType {
  VALIDATION = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  INTERNAL = "INTERNAL_ERROR",
  DATABASE = "DATABASE_ERROR",
}

/**
 * API error response structure
 */
interface ApiError {
  error: string;
  type: ApiErrorType;
  details?: string;
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  message: string,
  type: ApiErrorType,
  status: number,
  details?: string
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      error: message,
      type,
      ...(details && { details }),
    },
    { status }
  );
}

/**
 * Handle API errors with logging and appropriate response
 */
export function handleApiError(error: unknown, context: string): NextResponse {
  console.error(`[${context}]`, error);

  if (error instanceof Error) {
    // Check for Prisma errors
    if (error.message.includes("Unique constraint")) {
      return createErrorResponse(
        "Resource already exists",
        ApiErrorType.DATABASE,
        409,
        error.message
      );
    }
    if (error.message.includes("Record to delete does not exist")) {
      return createErrorResponse(
        "Resource not found",
        ApiErrorType.NOT_FOUND,
        404
      );
    }
  }

  return createErrorResponse(
    "An unexpected error occurred",
    ApiErrorType.INTERNAL,
    500
  );
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  body: Record<string, any>,
  requiredFields: string[]
): { valid: boolean; missing?: string[] } {
  const missing = requiredFields.filter((field) => !body[field]);

  if (missing.length > 0) {
    return { valid: false, missing };
  }

  return { valid: true };
}

/**
 * Create a validation error response
 */
export function validationError(
  message: string,
  details?: string
): NextResponse {
  return createErrorResponse(
    message,
    ApiErrorType.VALIDATION,
    400,
    details
  );
}

/**
 * Create a not found error response
 */
export function notFoundError(resource: string): NextResponse {
  return createErrorResponse(
    `${resource} not found`,
    ApiErrorType.NOT_FOUND,
    404
  );
}

/**
 * Create an unauthorized error response
 */
export function unauthorizedError(message = "Unauthorized"): NextResponse {
  return createErrorResponse(message, ApiErrorType.UNAUTHORIZED, 401);
}

/**
 * Validate and parse integer ID from params
 */
export function parseIntId(id: string): number | null {
  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
}
