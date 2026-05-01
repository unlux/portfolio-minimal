"use client";

import dynamic from "next/dynamic";
import type { ExtendedRecordMap } from "notion-types";

const NotionRendererClient = dynamic(
  () =>
    import("@/components/NotionRendererClient").then(
      (mod) => mod.NotionRendererClient
    ),
  {
    ssr: false,
    loading: () => (
      <div className="py-6 text-sm text-neutral-500">Loading Notion...</div>
    ),
  }
);

export const NotionRenderer = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return <NotionRendererClient recordMap={recordMap} />;
};
