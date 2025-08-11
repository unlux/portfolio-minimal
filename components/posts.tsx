import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { BitcountGridDouble } from "@/app/lib/fonts";
import BlogPostsClient from "./animation/BlogPostsClient";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  const posts = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map((post) => ({
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
