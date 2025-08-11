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
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          {/* Animated row */}
          <motion.div variants={itemVariants} whileHover={{ x: 2 }}>
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {new Date(post.publishedAt).toLocaleString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-xl text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
