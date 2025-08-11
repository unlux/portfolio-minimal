import { NotionRenderer } from "@/components/NotionRenderer";

import { NotionAPI } from "notion-client";
import FadeIn from "@/components/animation/FadeIn";

export default async function CurrentlyReadingPage() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("1e4ca11c6d658078b2a6ccf2fcaa6471");

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-6">WIP</h1>
      </FadeIn>
      <FadeIn delay={0.05}>
        <div className="mb-4 text-blue-600 underline break-all">
          <a
            href="https://www.notion.so/Reading-Tracker-System-1e4ca11c6d658078b2a6ccf2fcaa6471?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View this page on Notion
          </a>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <NotionRenderer recordMap={recordMap} />
      </FadeIn>
    </main>
  );
}
