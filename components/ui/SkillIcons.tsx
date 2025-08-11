"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Skill = {
  name: string;
  src: string; // path under public/, e.g. "/next.svg"
};

export type SkillIconsProps = {
  skills: Skill[];
  iconSize?: number;
  className?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export function SkillIcons({
  skills,
  iconSize = 24,
  className,
}: SkillIconsProps) {
  return (
    <motion.ul
      className={cn(
        "grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 md:gap-3",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      role="list"
    >
      {skills.map((skill) => (
        <motion.li key={skill.name} variants={itemVariants} className="group">
          <div
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-950/40 backdrop-blur-sm transition-all h-16 w-16 md:h-16 md:w-16 group-hover:ring-1 group-hover:ring-blue-400/40 group-hover:border-blue-400/40 group-hover:shadow-[0_2px_12px_0_rgba(56,189,248,0.08)]"
            title={skill.name}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: iconSize + 6, height: iconSize + 6 }}
            >
              <img
                src={skill.src}
                alt={skill.name}
                width={iconSize}
                height={iconSize}
                className="opacity-80 group-hover:opacity-100 transition-opacity object-contain"
              />
            </div>
            <span className="h-6 px-1.5 text-[9px] text-neutral-600/80 dark:text-neutral-400/80 tracking-tight text-center leading-tight overflow-hidden group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
              {skill.name}
            </span>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default SkillIcons;
