"use client";
import Link from "next/link";
import { NotionRenderer as NotionRendererLib } from "react-notion-x";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import type { ExtendedRecordMap } from "notion-types";

export const NotionRenderer = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return (
    <NotionRendererLib
      bodyClassName="notion-portfolio text-base sm:text-lg text-neutral-300"
      className="!bg-transparent"
      components={{ Code, Collection, nextLink: Link }}
      darkMode
      disableHeader
      fullPage
      recordMap={recordMap}
    />
  );
};
