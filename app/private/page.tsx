import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
          <Link href="/private/albums" className={buttonVariants({ size: "lg" })}>
            Photo Albums
          </Link>
          <Link
            href="/private/contacts"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Contacts
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
