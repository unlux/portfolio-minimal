"use client";
import { useMemo } from "react";
import { NotionRenderer as NotionRendererLib } from "react-notion-x";
import { useTheme } from "next-themes";
import CodeBlock from "./CodeBlock";

export const NotionRenderer = ({ recordMap }: { recordMap: any }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const components = useMemo(
    () => ({
      Code: CodeBlock,
    }),
    []
  );

  return (
    <NotionRendererLib
      bodyClassName="text-base sm:text-lg"
      className="!bg-transparent"
      components={components}
      darkMode={isDarkMode}
      disableHeader
      fullPage
      recordMap={recordMap}
    />
  );
};
