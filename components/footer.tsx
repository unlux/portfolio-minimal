"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaFileAlt, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ArrowIcon } from "./ui/ArrowIcon";
import InteractiveLink from "./ui/InteractiveLink";

export default function Footer() {
  return (
    <footer className="mb-16 font-[family-name:var(--font-inter)]">
      <ul className="font-sm mt-8 flex flex-row flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            rel="noopener noreferrer"
            target="_blank"
            href="https://dub.sh/luxhub"
          >
            <FaGithub size={20} />
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/whyunlux"
          >
            <FaXTwitter size={20} />
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            rel="noopener noreferrer"
            target="_blank"
            href="https://dub.sh/lux-linkedin"
          >
            <FaLinkedin size={20} />
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            rel="noopener noreferrer"
            target="_blank"
            href="https://discord.com/users/un.lux"
          >
            <FaDiscord size={20} />
          </a>
        </li>
        <li className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
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
              className="w-[216px] p-2 rounded-lg border border-neutral-200 dark:border-neutral-700
                         bg-white/90 dark:bg-neutral-900/90 backdrop-blur shadow-lg
                         relative before:content-[''] before:absolute before:-bottom-2 before:left-0 before:w-full before:h-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <a
                  role="menuitem"
                  href="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-sm px-3 py-1.5 rounded-md border
                             border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900
                             hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 shadow-sm
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                >
                  Web dev
                </a>
                <a
                  role="menuitem"
                  href="devops.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-sm px-3 py-1.5 rounded-md border
                             border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900
                             hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 shadow-sm
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                >
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
