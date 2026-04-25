import { getBlogPosts } from "@/app/blog/utils";
import { BitcountGridDouble } from "@/app/lib/fonts";
import BlogPostsClient from "./animation/BlogPostsClient";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  const posts = allBlogs.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
  }));

  return (
    <div className={BitcountGridDouble.className}>
      <BlogPostsClient posts={posts} />
    </div>
  );
}
