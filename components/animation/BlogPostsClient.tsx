"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type Post = {
  slug: string;
  title: string;
  publishedAt: string;
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
        <Link
          key={post.slug}
          className="group flex flex-col space-y-1 mb-5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          href={`/blog/${post.slug}`}
        >
          {/* Animated row */}
          <motion.div variants={itemVariants} whileHover={{ x: 2 }}>
            <div className="w-full flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
              <p className="w-full shrink-0 font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.08em] text-neutral-500 md:w-32">
                {new Date(post.publishedAt).toLocaleString("en-us", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-xl leading-tight tracking-tight text-neutral-100 transition-colors group-hover:text-white">
                {post.title}
              </p>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
