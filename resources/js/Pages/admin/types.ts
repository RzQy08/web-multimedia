// src/app/admin/types.ts
export type PageKey = "home" | "tentang" | "layanan" | "portfolio" | "blog" | "kontak";

export interface PageData {
  html: string;
  css: string;
  title: string;
  lastSaved?: string;
  status: "published" | "draft";
}