// resources/js/lib/parseContent.ts
//
// Helper untuk mengubah array `contents` dari API
// menjadi object key-value yang gampang dipakai komponen React.
//
// Input dari API (contoh):
//   [
//     { content_key: "headline_1", content_type: "text", value: "Explore the" },
//     { content_key: "stats", content_type: "json", value: "[{\"value\":\"500K+\"}]" }
//   ]
//
// Output setelah di-parse:
//   {
//     headline_1: "Explore the",
//     stats: [{ value: "500K+" }]   ← otomatis di-JSON.parse
//   }

export interface RawContent {
  content_key: string;
  content_type: "text" | "html" | "image" | "json" | "url";
  value: string | null;
}

export type ContentMap = Record<string, any>;

export function parseContents(contents: RawContent[] | undefined | null): ContentMap {
  if (!contents || contents.length === 0) return {};

  const map: ContentMap = {};

  for (const item of contents) {
    if (item.content_type === "json" && item.value) {
      try {
        map[item.content_key] = JSON.parse(item.value);
      } catch {
        // Kalau JSON rusak/tidak valid, biarkan apa adanya sebagai string
        map[item.content_key] = item.value;
      }
    } else {
      map[item.content_key] = item.value;
    }
  }

  return map;
}

/**
 * Helper kecil: ambil nilai dari ContentMap dengan fallback default.
 * Berguna supaya komponen tidak crash kalau data belum ada di database.
 *
 * Contoh: const headline = getContent(content, "headline_1", "Explore the");
 */
export function getContent<T = string>(
  map: ContentMap,
  key: string,
  fallback: T
): T {
  const val = map[key];
  if (val === undefined || val === null || val === "") return fallback;
  return val as T;
}
