import { NotionPageShell } from "@/components/NotionPageShell";
import { ReadingCollection } from "@/components/ReadingCollection";

import { NotionAPI } from "notion-client";
import { getNormalizedNotionPage, getNotionPageCover } from "@/lib/notion";
import type { ExtendedRecordMap } from "notion-types";

export const revalidate = 21600;

export const metadata = {
  title: "Reading",
  description: "Books, articles, and technical rabbit holes I am tracking.",
};

export default async function CurrentlyReadingPage() {
  const notion = new NotionAPI();
  let recordMap: ExtendedRecordMap | null = null;
  let error: unknown = null;
  const pageId = "1e4ca11c6d658078b2a6ccf2fcaa6471";

  try {
    recordMap = await getNormalizedNotionPage(notion, pageId);
  } catch (e) {
    error = e;
  }

  return (
    <NotionPageShell
      title="Reading"
      description="The books, articles, and technical rabbit holes I am tracking outside the blog."
      notionUrl="https://www.notion.so/Reading-Tracker-System-1e4ca11c6d658078b2a6ccf2fcaa6471?source=copy_link"
      cover={recordMap ? getNotionPageCover(recordMap, pageId) : null}
    >
      {error || !recordMap ? (
        <div className="text-red-500">Failed to load Notion data.</div>
      ) : (
        <ReadingCollection recordMap={recordMap} />
      )}
    </NotionPageShell>
  );
}
