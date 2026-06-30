// resources/js/hooks/usePageData.ts
//
// Hook untuk fetch satu halaman beserta semua section + content-nya
// dari endpoint publik: GET /api/public/pages/{slug}
//
// Dipakai di Index.tsx (halaman utama), nanti dioper sebagai props
// ke setiap komponen section.

import { useState, useEffect } from "react";
import { parseContents, ContentMap, RawContent } from "../lib/parseContent";

// ─── Types sesuai response Laravel ──────────────────────────────────────────

interface SectionTypeData {
  id: number;
  name: string;   // contoh: "hero", "layanan", dll — dipakai untuk matching
  label: string;
}

interface SectionData {
  id: number;
  label: string;
  order: number;
  is_visible: boolean;
  html: string | null;
  css: string | null;
  section_type: SectionTypeData;
  contents: RawContent[];
}

interface PageData {
  id: number;
  slug: string;
  title: string;
  status: string;
  visible_sections: SectionData[];
}

interface ApiResponse {
  success: boolean;
  data: PageData;
}

// ─── Hasil akhir yang dipakai komponen ──────────────────────────────────────

export interface ParsedSection {
  id: number;
  key: string;          // section_type.name → "hero", "layanan", dst
  label: string;
  order: number;
  html: string | null;
  css: string | null;
  content: ContentMap;  // sudah di-parse, siap pakai
}

interface UsePageDataResult {
  loading: boolean;
  error: string | null;
  page: PageData | null;
  sections: ParsedSection[];
  /** Helper cepat: ambil satu section berdasarkan key (mis. "hero") */
  getSection: (key: string) => ParsedSection | undefined;
}

export function usePageData(slug: string = "home"): UsePageDataResult {
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [page, setPage]         = useState<PageData | null>(null);
  const [sections, setSections] = useState<ParsedSection[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/public/pages/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Halaman "${slug}" tidak ditemukan`);
        return res.json();
      })
      .then((json: ApiResponse) => {
        if (cancelled) return;
        if (!json.success) throw new Error("Response API tidak valid");

        const parsed: ParsedSection[] = (json.data.visible_sections ?? [])
          .sort((a, b) => a.order - b.order)
          .map((s) => ({
            id: s.id,
            key: s.section_type?.name ?? "",
            label: s.label,
            order: s.order,
            html: s.html,
            css: s.css,
            content: parseContents(s.contents),
          }));

        setPage(json.data);
        setSections(parsed);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Gagal memuat data halaman");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  const getSection = (key: string) => sections.find((s) => s.key === key);

  return { loading, error, page, sections, getSection };
}
