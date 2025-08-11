"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/todo": {
    name: "todo",
  },
  "/currently-reading": {
    name: "currently-reading",
  },
};

// Smooth staggered reveal for nav items
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export function Navbar() {
  const pathname = usePathname();
  return (
    <aside className="mb-10 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center px-0 pb-0 md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          {/* Animated nav items */}
          <motion.div
            className="flex flex-row gap-1 pr-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive =
                path === "/" ? pathname === "/" : pathname.startsWith(path);
              return (
                <Link
                  key={path}
                  href={path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-1 rounded-full font-normal transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-background
                    ${
                      isActive
                        ? "text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-2 decoration-blue-400"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                  style={{ fontSize: "1rem" }}
                >
                  {/* Animated label */}
                  <motion.span
                    variants={itemVariants}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    {name}
                  </motion.span>
                </Link>
              );
            })}
          </motion.div>
        </nav>
      </div>
    </aside>
  );
}
