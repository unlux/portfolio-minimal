"use client";

import { FaGithub, FaLinkedin, FaFileAlt, FaDiscord, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FileTextIcon, TerminalIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import InteractiveLink from "./ui/InteractiveLink";
import { IconTooltip } from "./ui/IconTooltip";

export default function Footer() {
  return (
    <footer className="mb-16 font-[family-name:var(--font-inter)]">
      <ul className="font-sm mt-8 flex flex-row flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-300">
        <li>
          <IconTooltip label="GitHub">
            <a
              aria-label="GitHub"
              className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              rel="noopener noreferrer"
              target="_blank"
              href="https://dub.sh/luxhub"
            >
              <FaGithub size={20} />
            </a>
          </IconTooltip>
        </li>
        <li>
          <IconTooltip label="X / Twitter">
            <a
              aria-label="X"
              className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              rel="noopener noreferrer"
              target="_blank"
              href="https://x.com/whyunlux"
            >
              <FaXTwitter size={20} />
            </a>
          </IconTooltip>
        </li>
        <li>
          <IconTooltip label="LinkedIn">
            <a
              aria-label="LinkedIn"
              className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              rel="noopener noreferrer"
              target="_blank"
              href="https://dub.sh/lux-linkedin"
            >
              <FaLinkedin size={20} />
            </a>
          </IconTooltip>
        </li>
        <li>
          <IconTooltip label="Discord">
            <a
              aria-label="Discord"
              className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              rel="noopener noreferrer"
              target="_blank"
              href="https://discord.com/users/un.lux"
            >
              <FaDiscord size={20} />
            </a>
          </IconTooltip>
        </li>
        <li>
          <IconTooltip label="contact@unlux.dev">
            <a
              aria-label="Email"
              className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              href="mailto:contact@unlux.dev"
            >
              <FaEnvelope size={20} />
            </a>
          </IconTooltip>
        </li>
        <li className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="Open CV links"
                aria-haspopup="menu"
                className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                <FaFileAlt size={20} />
                <span>cv</span>
              </button>
            </PopoverTrigger>

            <PopoverContent
              side="top"
              align="start"
              sideOffset={8}
              className="w-40 rounded-xl border-border bg-popover/95 p-1 shadow-lg backdrop-blur"
            >
              <div className="flex flex-col" role="menu">
                <a
                  role="menuitem"
                  href="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-popover-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:bg-muted"
                >
                  <FileTextIcon className="size-4 text-muted-foreground" />
                  Web dev
                </a>
                <a
                  role="menuitem"
                  href="devops.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-popover-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:bg-muted"
                >
                  <TerminalIcon className="size-4 text-muted-foreground" />
                  DevOps
                </a>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        <li></li>
      </ul>
      <p className="text-sm mt-8 text-neutral-600 dark:text-neutral-300">
        built with nextjs and cloudflare mindfuk <br /> © 1969 MIT Licensed to
        fkn no one
        <br />
        <InteractiveLink
          href={"https://github.com/unlux/portfolio-minimal"}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>view source</span>
        </InteractiveLink>
      </p>
    </footer>
  );
}
