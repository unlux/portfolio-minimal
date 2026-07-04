"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

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
    name: "reading",
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

export function Navbar({ hasClerk = false }: { hasClerk?: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="mb-10 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center px-0 pb-0 md:relative"
          id="nav"
        >
          {/* Animated nav items */}
          <motion.div
            className="scroll-fade-effect-x flex min-w-0 flex-row gap-1 overflow-x-auto pr-2"
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
                  className={`relative px-3 py-1 rounded-full font-normal text-base transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-background
                    ${
                      isActive
                        ? "text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-2 decoration-blue-400"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
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

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <CommandTrigger />
            <ThemeToggle />
            {hasClerk && <AuthControls />}
          </div>
        </nav>
      </div>
    </aside>
  );
}

function CommandTrigger() {
  return (
    <button
      type="button"
      aria-label="Open command palette"
      onClick={() =>
        window.dispatchEvent(new Event("open-command-palette"))
      }
      className="hidden sm:flex items-center gap-1 rounded-md border border-border bg-muted/40 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-muted outline-none focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-background"
    >
      <kbd className="font-sans">⌘</kbd>
      <kbd className="font-sans">K</kbd>
    </button>
  );
}

function AuthControls() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className="flex items-center gap-2">
      {isLoaded && isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton
          mode="modal"
          forceRedirectUrl="/gotcha"
          fallbackRedirectUrl="/gotcha"
          signUpForceRedirectUrl="/gotcha"
          signUpFallbackRedirectUrl="/gotcha"
        >
          <button
            className="px-3 py-1 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 outline-none focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            aria-label="Sign in"
          >
            Sign in
          </button>
        </SignInButton>
      )}
    </div>
  );
}
