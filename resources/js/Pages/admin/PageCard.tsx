// src/app/admin/PageCard.tsx
import React from "react";
import { Home, Users, Briefcase, Image, PenTool, Mail, Clock } from "lucide-react";
import { PageKey, PageData } from "./types";

interface PageCardProps {
  page: PageKey;
  data: PageData;
  isActive: boolean;
  onClick: () => void;
}

const icons: Record<PageKey, any> = {
  home: Home,
  tentang: Users,
  layanan: Briefcase,
  portfolio: Image,
  blog: PenTool,
  kontak: Mail,
};

export function PageCard({ page, data, isActive, onClick }: PageCardProps) {
  const Icon = icons[page];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${isActive ? "bg-violet-50 border-violet-300" : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg flex-shrink-0 ${isActive ? "bg-violet-100" : "bg-gray-100"}`}>
          <Icon size={15} className={isActive ? "text-violet-600" : "text-gray-500"} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className={`text-sm font-semibold truncate ${isActive ? "text-violet-700" : "text-gray-700"}`}>{data.title}</p>
            <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${data.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              {data.status === "published" ? "Live" : "Draft"}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <Clock size={10} /> {data.lastSaved}
          </p>
        </div>
      </div>
    </button>
  );
}