import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  handleApiError,
  validateRequiredFields,
  validationError,
} from "@/lib/api-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, notes } = body;

    const validation = validateRequiredFields(body, ["name", "phone"]);
    if (!validation.valid) {
      return validationError(
        "Missing required fields",
        `Required: ${validation.missing?.join(", ")}`
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
        notes,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return handleApiError(error, "CONTACTS_POST");
  }
}
