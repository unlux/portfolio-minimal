"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/animation/FadeIn";

export default function AlbumPage({ params }: { params: { id: string } }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch(`/api/albums/${params.id}`, {
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

  return (
    <section>
      <FadeIn>
        <Card className="max-w-md mx-auto ">
          <CardHeader>
            <CardTitle>Album Locked</CardTitle>
            <CardDescription>
              This album is password protected. Please enter the password to
              continue.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="py-2">
              <div>
                <Label htmlFor="password" className="py-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="py-4"
                />
              </div>
              {error && <p className="text-sm text-red-500 py-2">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit">Unlock Album</Button>
            </CardFooter>
          </form>
        </Card>
      </FadeIn>
    </section>
  );
}
