"use client";

import React from "react";
import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";

export type InteractiveLinkProps = {
  href: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
};

const InteractiveLink = ({
  href,
  children,
  onClick,
  className = "",
  target,
  rel,
}: InteractiveLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`inline-flex items-center gap-1 group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 ${className}`}
    >
      <span className="text-ui-fg-interactive text-neutral-800 dark:text-neutral-100 transition-colors group-hover:text-neutral-900 dark:group-hover:text-white">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="ml-0.5 translate-y-[1px] transition-transform duration-150 ease-in-out group-hover:rotate-45 text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white"
      >
        <ArrowIcon />
      </span>
    </Link>
  );
};

export default InteractiveLink;
