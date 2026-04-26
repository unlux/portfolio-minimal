"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  readingTime: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export default function BlogPostsClient({ posts }: { posts: Post[] }) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {posts.map((post) => (
        <motion.article key={post.slug} variants={itemVariants}>
          <Link
            className="group mb-8 block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href={`/blog/${post.slug}`}
          >
            <motion.div whileHover={{ x: 2 }}>
              <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-4">
                <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.08em] text-neutral-500">
                  {new Date(post.publishedAt).toLocaleString("en-us", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <div>
                  <h2 className="text-xl leading-tight tracking-tight text-neutral-100 transition-colors group-hover:text-white">
                    {post.title}
                  </h2>
                  <p className="mt-2 font-[family-name:var(--font-inter)] text-sm leading-6 text-neutral-400">
                    {post.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.08em] text-neutral-500">
                    <span>{post.readingTime}</span>
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
