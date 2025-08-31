import Link from "next/link";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animation/FadeIn";

export default function PrivatePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <FadeIn>
        <h1 className="mb-8 text-5xl font-semibold tracking-tighter">
          Private Section
        </h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="flex space-x-4">
          <Button asChild size="lg">
            <Link href="/private/albums">Photo Albums</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/private/contacts">Contacts</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
