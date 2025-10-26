import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  handleApiError,
  parseIntId,
  validationError,
} from "@/lib/api-utils";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseIntId(params.id);

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
