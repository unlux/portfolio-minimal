import Link from "next/link";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/animation/Reveal";

export default function PrivatePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <Reveal animation="fadeUp">
        <h1 className="mb-8 text-5xl font-semibold tracking-tighter">
          Private Section
        </h1>
      </Reveal>
      <Reveal animation="fadeUp" delay={0.15}>
        <div className="flex space-x-4">
          <Button asChild size="lg">
            <Link href="/private/albums">Photo Albums</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/private/contacts">Contacts</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
