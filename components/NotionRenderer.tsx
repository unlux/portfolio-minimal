"use client";
import { NotionRenderer as NotionRendererLib } from "react-notion-x";
import { useTheme } from "next-themes";
import { Collection } from "react-notion-x/build/third-party/collection";

export const NotionRenderer = ({ recordMap }: { recordMap: any }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <NotionRendererLib
      bodyClassName="text-base sm:text-lg text-neutral-900 dark:text-neutral-300"
      className="!bg-transparent"
      components={{ Collection }}
      darkMode={isDarkMode}
      disableHeader
      fullPage
      recordMap={recordMap}
    />
  );
};
