import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  handleApiError,
  parseIntId,
  unauthorizedError,
  validationError,
} from "@/lib/api-utils";
import { isAuthorized } from "@/lib/private-auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthorized(req)) {
      return unauthorizedError();
    }

    const { id: rawId } = await params;
    const id = parseIntId(rawId);

    if (id === null) {
      return validationError("Invalid ID format", "ID must be a valid integer");
    }

    await prisma.contact.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error, "CONTACT_DELETE");
  }
}
