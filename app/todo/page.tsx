export const dynamic = "force-dynamic";

export const metadata = {
  title: "Todo",
  description: "A public slice of my working queue.",
};

import { NotionRenderer } from "@/components/NotionRenderer";
import { NotionPageShell } from "@/components/NotionPageShell";
import { NotionAPI } from "notion-client";
import { getNormalizedNotionPage, getNotionPageCover } from "@/lib/notion";
import type { ExtendedRecordMap } from "notion-types";

export default async function TodoPage() {
  const notion = new NotionAPI();
  let recordMap: ExtendedRecordMap | null = null;
  let error: unknown = null;
  const pageId = "22cca11c6d65808b8453ca55e4032397";
  try {
    recordMap = await getNormalizedNotionPage(notion, pageId);
  } catch (e) {
    error = e;
  }
  return (
    <NotionPageShell
      title="Todo"
      description="A public slice of my working queue: things I am learning, shipping, breaking, and coming back to."
      cover={recordMap ? getNotionPageCover(recordMap, pageId) : null}
    >
      {error || !recordMap ? (
        <div className="text-red-500">Failed to load Notion data.</div>
      ) : (
        <NotionRenderer recordMap={recordMap} />
      )}
    </NotionPageShell>
  );
}
