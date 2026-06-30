// resources/js/lib/api.ts
// Satu tempat untuk semua pemanggilan API ke Laravel backend

const BASE = '/api';

function csrf(): string {
  return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
}

async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Request gagal');
  return data as T;
}

// ─── Types ────────────────────────────────────────────────────────────────

export interface Page {
  id: number;
  slug: string;
  title: string;
  status: 'draft' | 'published';
  order: number;
  sections_count?: number;
}

export interface Section {
  id: number;
  section_key: string;
  label: string;
  order: number;
  is_visible: boolean;
  html: string;
  css: string;
  grapes_json: object | null;
  contents: Record<string, unknown>;
  fields_schema?: Record<string, { type: string; label: string }>;
  last_updated?: string;
}

export interface SectionType {
  id: number;
  name: string;
  label: string;
  fields_schema: Record<string, { type: string; label: string }>;
}

// ─── Frontend ─────────────────────────────────────────────────────────────

export const api = {
  // Ambil semua section aktif untuk satu halaman (frontend render)
  getPage: (slug: string) =>
    request<{ page: Page; sections: Section[] }>('GET', `/pages/${slug}`),

  // ── Admin: Pages ──────────────────────────────────────────────────────

  // Daftar semua halaman
  getPages: () =>
    request<Page[]>('GET', '/admin/pages'),

  // Buat halaman baru
  createPage: (slug: string, title: string) =>
    request<{ message: string; page: Page }>('POST', '/admin/pages', { slug, title }),

  // Toggle draft/published
  togglePageStatus: (slug: string) =>
    request<{ message: string; status: string }>('PATCH', `/admin/pages/${slug}/status`),

  // Hapus halaman
  deletePage: (slug: string) =>
    request<{ message: string }>('DELETE', `/admin/pages/${slug}`),

  // ── Admin: Sections ───────────────────────────────────────────────────

  // Semua section di satu halaman (dengan grapes_json untuk editor)
  getSections: (slug: string) =>
    request<{ page: Page; sections: Section[] }>('GET', `/admin/pages/${slug}/sections`),

  // Detail satu section
  getSection: (id: number) =>
    request<Section>('GET', `/admin/sections/${id}`),

  // Simpan hasil GrapesJS
  saveSection: (id: number, grapesJson: object, html: string, css: string) =>
    request<{ message: string; last_updated: string }>('PUT', `/admin/sections/${id}`, {
      grapes_json: grapesJson,
      html,
      css,
    }),

  // Tambah section baru ke halaman
  addSection: (slug: string, sectionType: string, label?: string) =>
    request<{ message: string; section: Section }>('POST', `/admin/pages/${slug}/sections`, {
      section_type: sectionType,
      label,
    }),

  // Toggle tampil/sembunyi
  toggleVisibility: (id: number) =>
    request<{ message: string; is_visible: boolean }>('PATCH', `/admin/sections/${id}/visibility`),

  // Hapus section
  deleteSection: (id: number) =>
    request<{ message: string }>('DELETE', `/admin/sections/${id}`),

  // Ubah urutan section (drag & drop)
  reorderSections: (slug: string, orderedIds: number[]) =>
    request<{ message: string }>('PATCH', `/admin/pages/${slug}/reorder`, { order: orderedIds }),

  // Daftar semua tipe section (template yang tersedia)
  getSectionTypes: () =>
    request<SectionType[]>('GET', '/admin/section-types'),
};
