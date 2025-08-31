"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type PhotoAlbum } from "@prisma/client";

export function AlbumPasswordDialog({
  album,
  children,
}: {
  album: { id: number; name: string; url: string; isProtected: boolean };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch(`/api/albums/${album.id}`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const { url } = await res.json();
      window.location.href = url;
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  // If album is not protected, just render a simple link
  if (!album.isProtected) {
    return (
      <a href={album.url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  // If protected, render the dialog
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-semibold tracking-tighter">
            {album.name}
          </DialogTitle>
          <DialogDescription>
            This album is password protected. Please enter the password to
            continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`password-${album.id}`}>Password</Label>
            <Input
              id={`password-${album.id}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Unlock Album
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
