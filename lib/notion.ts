import type { ExtendedRecordMap } from "notion-types";
import type { NotionAPI } from "notion-client";
import { getBlockCollectionId, getPageContentBlockIds } from "notion-utils";

type WrappedRecord<T> = {
  role?: unknown;
  value?: T | { value?: T };
};

type RecordTable<T> = Record<string, WrappedRecord<T>>;
type CollectionQueryMap = NonNullable<ExtendedRecordMap["collection_query"]>;
type CollectionReducerResults = CollectionQueryMap[string][string];
type CollectionDataWithReducers = {
  result?: {
    reducerResults?: CollectionReducerResults;
  };
};

function unwrapRecordTable<T>(table: RecordTable<T> | undefined) {
  if (!table) {
    return table;
  }

  return Object.fromEntries(
    Object.entries(table).map(([id, record]) => {
      const nestedValue = record.value;
      const nestedRecord =
        nestedValue && typeof nestedValue === "object" ? nestedValue : null;
      const value =
        nestedRecord && "value" in nestedRecord
          ? nestedRecord.value
          : nestedValue;
      const role =
        record.role ??
        (nestedRecord && "role" in nestedRecord ? nestedRecord.role : undefined);

      return [id, { ...record, role, value }];
    })
  );
}

export function normalizeNotionRecordMap(
  recordMap: ExtendedRecordMap
): ExtendedRecordMap {
  return {
    ...recordMap,
    block: (unwrapRecordTable(recordMap.block) ??
      recordMap.block) as ExtendedRecordMap["block"],
    collection:
      (unwrapRecordTable(recordMap.collection) ??
        recordMap.collection) as ExtendedRecordMap["collection"],
    collection_view:
      (unwrapRecordTable(recordMap.collection_view) ??
        recordMap.collection_view) as ExtendedRecordMap["collection_view"],
    notion_user:
      (unwrapRecordTable(recordMap.notion_user) ??
        recordMap.notion_user) as ExtendedRecordMap["notion_user"],
  };
}

export async function getNormalizedNotionPage(
  notion: NotionAPI,
  pageId: string
): Promise<ExtendedRecordMap> {
  const page = await notion.getPageRaw(pageId);
  const recordMap = normalizeNotionRecordMap(
    page.recordMap as ExtendedRecordMap
  );

  recordMap.collection ??= {};
  recordMap.collection_view ??= {};
  recordMap.notion_user ??= {};
  recordMap.collection_query = {};
  recordMap.signed_urls = {};

  while (true) {
    const pendingBlockIds = getPageContentBlockIds(recordMap).filter(
      (id) => !recordMap.block[id]
    );

    if (pendingBlockIds.length === 0) {
      break;
    }

    const blocks = await notion.getBlocks(pendingBlockIds);
    const normalizedBlocks = normalizeNotionRecordMap(
      blocks.recordMap as ExtendedRecordMap
    );

    recordMap.block = {
      ...recordMap.block,
      ...normalizedBlocks.block,
    };
  }

  const contentBlockIds = getPageContentBlockIds(recordMap);
  const collectionInstances = contentBlockIds.flatMap((blockId) => {
    const block = recordMap.block[blockId]?.value;
    const collectionId =
      block &&
      (block.type === "collection_view" ||
        block.type === "collection_view_page") &&
      getBlockCollectionId(block, recordMap);

    if (!collectionId) {
      return [];
    }

    return (
      block.view_ids?.map((collectionViewId) => ({
        collectionId,
        collectionViewId,
      })) ?? []
    );
  });

  for (const { collectionId, collectionViewId } of collectionInstances) {
    const collectionView = recordMap.collection_view[collectionViewId]?.value;

    try {
      const collectionData = await notion.getCollectionData(
        collectionId,
        collectionViewId,
        collectionView
      );
      const normalizedCollection = normalizeNotionRecordMap(
        collectionData.recordMap as ExtendedRecordMap
      );

      recordMap.block = {
        ...recordMap.block,
        ...normalizedCollection.block,
      };
      recordMap.collection = {
        ...recordMap.collection,
        ...normalizedCollection.collection,
      };
      recordMap.collection_view = {
        ...recordMap.collection_view,
        ...normalizedCollection.collection_view,
      };
      recordMap.notion_user = {
        ...recordMap.notion_user,
        ...normalizedCollection.notion_user,
      };
      const reducerResults = (collectionData as CollectionDataWithReducers)
        .result?.reducerResults;

      if (reducerResults) {
        recordMap.collection_query[collectionId] = {
          ...recordMap.collection_query[collectionId],
          [collectionViewId]: reducerResults,
        };
      }
    } catch (error) {
      console.warn("Notion collection query failed", {
        pageId,
        collectionId,
        collectionViewId,
        error,
      });
    }
  }

  await notion.addSignedUrls({ recordMap, contentBlockIds });

  return recordMap;
}
