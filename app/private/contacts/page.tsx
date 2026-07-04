import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isValidSession, SESSION_COOKIE } from "@/lib/private-auth";
import ContactsClientPage from "./ContactsClientPage";
import { AddContactDialog } from "@/components/AddContactDialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function ContactsPage() {
  const cookieStore = await cookies();
  const isVerified = isValidSession(cookieStore.get(SESSION_COOKIE)?.value);

  const contacts = isVerified ? await prisma.contact.findMany() : [];

  return (
    <>
      <div className="container py-4 mx-auto">
        {isVerified && (
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/private">Private</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Contacts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <ContactsClientPage
          isVerified={isVerified}
          contacts={contacts}
          AddContactDialog={<AddContactDialog />}
        />
      </div>
    </>
  );
}
