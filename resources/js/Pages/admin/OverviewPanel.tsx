// src/app/admin/OverviewPanel.tsx
import React from "react";
import {
  Globe,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Zap,
  ExternalLink,
  Clock,
} from "lucide-react";
import { PageKey, PageData } from "./types";
import { StatCard } from "./StatCard";
import { PageCard } from "./PageCard";
import { activities } from "./activities";

interface OverviewPanelProps {
  pages: Record<PageKey, PageData>;
  onEditPage: (p: PageKey) => void;
}

export function OverviewPanel({ pages, onEditPage }: OverviewPanelProps) {
  const published = Object.values(pages).filter(p => p.status === "published").length;
  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Halaman" value="6" sub="Semua seksi website" icon={Globe} color="bg-violet-500" />
        <StatCard label="Published" value={`${published}`} sub={`${6 - published} dalam draft`} icon={CheckCircle} color="bg-emerald-500" />
        <StatCard label="Traffic Bulan Ini" value="24.8K" sub="+18% dari bulan lalu" icon={TrendingUp} color="bg-blue-500" />
        <StatCard label="Pesan Masuk" value="37" sub="3 belum dibaca" icon={MessageSquare} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Halaman Website</h3>
              <span className="text-xs text-gray-400">Klik untuk edit</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.entries(pages) as [PageKey, PageData][]).map(([key, data]) => (
                <PageCard key={key} page={key} data={data} isActive={false} onClick={() => onEditPage(key)} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <a.icon size={14} className={`mt-0.5 flex-shrink-0 ${a.color}`} />
                  <div>
                    <p className="text-xs text-gray-700">{a.text}</p>
                    <p className="text-[11px] text-gray-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl p-5 text-white">
            <Zap size={20} className="mb-2 opacity-80" />
            <p className="text-sm font-bold mb-1">Website Live</p>
            <p className="text-xs opacity-70 mb-3">Semua perubahan langsung terlihat di lumina.co.id</p>
            <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
              <ExternalLink size={11} /> Buka Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}