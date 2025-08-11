import { BlogPosts } from "@/components/posts";
import FadeIn from "@/components/animation/FadeIn";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <FadeIn>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter italic">
          My Blogs
        </h1>
      </FadeIn>
      <FadeIn delay={0.05}>
        <BlogPosts />
      </FadeIn>
    </section>
  );
}
