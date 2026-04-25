import { NotionRenderer } from "@/components/NotionRenderer";

import { NotionAPI } from "notion-client";
import Reveal from "@/components/animation/Reveal";
import { normalizeNotionRecordMap } from "@/lib/notion";
import type { ExtendedRecordMap } from "notion-types";

export const dynamic = "force-dynamic";

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
    <main className="max-w-3xl mx-auto py-8 px-4">
      <Reveal animation="fadeUp">
        <h1 className="text-3xl font-bold mb-6">WIP</h1>
      </Reveal>
      <Reveal animation="fadeUp" delay={0.1}>
        <div className="mb-4 text-blue-600 underline break-all">
          <a
            href="https://www.notion.so/Reading-Tracker-System-1e4ca11c6d658078b2a6ccf2fcaa6471?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View this page on Notion
          </a>
        </div>
      </Reveal>
      <Reveal animation="fadeUp" delay={0.15}>
        {error || !recordMap ? (
          <div className="text-red-500">Failed to load Notion data.</div>
        ) : (
          <NotionRenderer recordMap={recordMap} />
        )}
      </Reveal>
    </main>
  );
}
