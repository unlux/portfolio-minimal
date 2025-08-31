import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
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
  const cookieStore = cookies();
  const password = cookieStore.get("contacts_password");

  const isVerified =
    !!password && password.value === process.env.CONTACTS_PASSWORD;

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
