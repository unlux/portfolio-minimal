import { Suspense } from "react";
import { BlogPosts } from "@/components/posts";
import Reveal from "@/components/animation/Reveal";
import { BlogPostsSkeleton } from "@/components/ui/loading-skeleton";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <Reveal animation="fadeUp">
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter italic">
          My Blogs
        </h1>
      </Reveal>
      <Reveal animation="fadeUp" delay={0.1}>
        <Suspense fallback={<BlogPostsSkeleton />}>
          <BlogPosts />
        </Suspense>
      </Reveal>
    </section>
  );
}
