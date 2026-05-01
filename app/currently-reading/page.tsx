import { NotionRenderer } from "@/components/NotionRenderer";
import { NotionPageShell } from "@/components/NotionPageShell";

import { NotionAPI } from "notion-client";
import { normalizeNotionRecordMap } from "@/lib/notion";
import type { ExtendedRecordMap } from "notion-types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reading",
  description: "Books, articles, and technical rabbit holes I am tracking.",
};

export default async function CurrentlyReadingPage() {
  const notion = new NotionAPI();
  let recordMap: ExtendedRecordMap | null = null;
  let error: unknown = null;

  try {
    recordMap = normalizeNotionRecordMap(
      await notion.getPage("1e4ca11c6d658078b2a6ccf2fcaa6471")
    );
  } catch (e) {
    error = e;
  }

  return (
    <NotionPageShell
      title="Reading"
      description="The books, articles, and technical rabbit holes I am tracking outside the blog."
      notionUrl="https://www.notion.so/Reading-Tracker-System-1e4ca11c6d658078b2a6ccf2fcaa6471?source=copy_link"
    >
      {error || !recordMap ? (
        <div className="text-red-500">Failed to load Notion data.</div>
      ) : (
        <NotionRenderer recordMap={recordMap} />
      )}
    </NotionPageShell>
  );
}
