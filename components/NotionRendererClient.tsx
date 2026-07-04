"use client";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import Link from "next/link";
import { useTheme } from "next-themes";
import { NotionRenderer as NotionRendererLib } from "react-notion-x";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import type { ExtendedRecordMap } from "notion-types";

export const NotionRendererClient = ({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <NotionRendererLib
      bodyClassName="notion-portfolio text-base sm:text-lg text-neutral-700 dark:text-neutral-300"
      className="!bg-transparent"
      components={{ Code, Collection, nextLink: Link }}
      darkMode={resolvedTheme !== "light"}
      disableHeader
      fullPage={false}
      recordMap={recordMap}
    />
  );
};
