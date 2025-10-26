"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Reveal from "@/components/animation/Reveal";
import { type Contact } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animation-presets";

export default function ContactsClientPage({
  isVerified,
  contacts,
  AddContactDialog,
}: {
  isVerified: boolean;
  contacts: Contact[];
  AddContactDialog: React.ReactNode;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(isVerified);
  const [fetchedContacts, setFetchedContacts] = useState<Contact[]>(contacts);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const router = useRouter();

  useEffect(() => {
    setFetchedContacts(contacts);
  }, [contacts]);

  useEffect(() => {
    setVerified(isVerified);
  }, [isVerified]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/contacts/verify", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const { contacts: newContacts } = await res.json();
      setFetchedContacts(newContacts);
      setVerified(true);
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  if (!verified) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <Reveal animation="scale">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="font-semibold tracking-tighter">
                Contacts Locked
              </CardTitle>
              <CardDescription>
                This section is password protected.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoFocus
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Unlock
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Reveal>
      </section>
    );
  }

  return (
    <section>
      <Reveal animation="fadeUp">
        <h1 className="mb-8 text-4xl font-semibold tracking-tighter">
          Contacts
        </h1>
      </Reveal>
      <motion.div
        className="grid grid-cols-1 gap-4 my-4 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {fetchedContacts.map((contact) => (
          <motion.div key={contact.id} variants={fadeInUp}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-semibold tracking-tighter">
                  {contact.name}
                </CardTitle>
                <CardDescription>{contact.phone}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{contact.notes}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setContactToDelete(contact)}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        {AddContactDialog}
      </motion.div>
      <Dialog
        open={!!contactToDelete}
        onOpenChange={(isOpen) => !isOpen && setContactToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              contact "{contactToDelete?.name}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactToDelete(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (contactToDelete) {
                  handleDelete(contactToDelete.id);
                  setContactToDelete(null);
                }
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
