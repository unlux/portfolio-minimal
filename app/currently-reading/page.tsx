import { NotionRenderer } from "../components/NotionRenderer";
import { NotionAPI } from "notion-client";

export default async function CurrentlyReadingPage() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("1e4ca11c6d658078b2a6ccf2fcaa6471");
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Currently Reading</h1>
      <div className="mb-4 text-blue-600 underline break-all">
        <a
          href="https://www.notion.so/Reading-Tracker-System-1e4ca11c6d658078b2a6ccf2fcaa6471?source=copy_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Notion
        </a>
      </div>
      <NotionRenderer recordMap={recordMap} />
    </main>
  );
}
