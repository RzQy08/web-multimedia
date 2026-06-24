// src/app/admin/AdminDashboard.tsx
import { useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import {
  Home,
  Users,
  Briefcase,
  Image,
  PenTool,
  Mail,
  LayoutDashboard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Eye,
  Zap,
  Clock,
  X,
  Menu,
} from "lucide-react";

import { PageKey, PageData } from "./types";
import { initialPages } from "./initialPages";
import { GrapesEditor } from "./GrapesEditor";
import { OverviewPanel } from "./OverviewPanel";



type View = "overview" | PageKey;

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<View>("overview");
  const [pages, setPages] = useState<Record<PageKey, PageData>>(initialPages);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const pageKeys: PageKey[] = ["home", "tentang", "layanan", "portfolio", "blog", "kontak"];
  const pageIcons: Record<PageKey, any> = {
    home: Home,
    tentang: Users,
    layanan: Briefcase,
    portfolio: Image,
    blog: PenTool,
    kontak: Mail,
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = (html: string, css: string) => {
    if (currentView === "overview") return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} WIB`;
    setPages(prev => ({
      ...prev,
      [currentView]: { ...prev[currentView as PageKey], html, css, lastSaved: `Baru saja (${timeStr})`, status: "published" },
    }));
    showNotification(`✅ Halaman "${pages[currentView as PageKey].title}" berhasil disimpan!`);
  };

  const handleReset = () => {
    if (currentView === "overview") return;
    setPages(prev => ({ ...prev, [currentView]: { ...initialPages[currentView as PageKey] } }));
    showNotification("↩️ Halaman direset ke konten awal.");
  };

  const navItem = (view: View, icon: any, label: string, badge?: string) => {
    const Icon = icon;
    const active = currentView === view;
    return (
      <button
        key={view}
        onClick={() => setCurrentView(view)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${active ? "bg-violet-100 text-violet-700 font-semibold" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"}`}
      >
        <Icon size={16} className="flex-shrink-0" />
        {sidebarOpen && (
          <>
            <span className="flex-1 text-left">{label}</span>
            {badge && <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${badge === "Draft" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>{badge}</span>}
          </>
        )}
      </button>
    );
  };

  const currentPage = currentView !== "overview" ? pages[currentView as PageKey] : null;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Notification toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-gray-900 text-white text-sm rounded-xl shadow-xl animate-in slide-in-from-right duration-300">
          {notification}
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside className={`flex-shrink-0 ${sidebarOpen ? "w-60" : "w-14"} transition-all duration-200 bg-white border-r border-gray-200 flex flex-col`}>
        {/* Logo */}
        <div className={`flex items-center h-14 border-b border-gray-200 px-3 ${sidebarOpen ? "gap-2.5" : "justify-center"}`}>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-white" />
          </div>
          {sidebarOpen && <span className="text-base font-800 text-gray-900" style={{ fontWeight: 800 }}>LUMINA</span>}
          <button onClick={() => setSidebarOpen(v => !v)} className="ml-auto p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {sidebarOpen && <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 pt-3 pb-1">Utama</p>}
          {navItem("overview", LayoutDashboard, "Dashboard")}
          {sidebarOpen && <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 pt-4 pb-1">Halaman</p>}
          {pageKeys.map(key => navItem(key, pageIcons[key], pages[key].title, pages[key].status === "draft" ? "Draft" : undefined))}
        </nav>

        {/* Bottom */}
        <div className={`p-2 border-t border-gray-200 space-y-0.5`}>
          {navItem("overview" as any, Bell, "Notifikasi")}
          {navItem("overview" as any, Settings, "Pengaturan")}
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors`}>
            <LogOut size={16} className="flex-shrink-0" />
            {sidebarOpen && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 flex-shrink-0 flex items-center justify-between px-6 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-400">Admin</span>
            <ChevronRight size={14} />
            {currentView === "overview" ? (
              <span className="font-semibold text-gray-800">Dashboard</span>
            ) : (
              <>
                <button onClick={() => setCurrentView("overview")} className="hover:text-violet-600 transition-colors">Dashboard</button>
                <ChevronRight size={14} />
                <span className="font-semibold text-gray-800">{currentPage?.title}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {currentView !== "overview" && (
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${currentPage?.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {currentPage?.status === "published" ? "● Live" : "● Draft"}
              </span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors"
            >
              <Eye size={12} /> Preview Website
            </a>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          {currentView === "overview" ? (
            <div className="h-full overflow-y-auto p-6">
              <div className="mb-5">
                <h1 className="text-xl font-800 text-gray-900" style={{ fontWeight: 800 }}>Selamat datang kembali 👋</h1>
                <p className="text-sm text-gray-500 mt-0.5">Kelola konten website LUMINA dari sini.</p>
              </div>
              <OverviewPanel pages={pages} onEditPage={(p) => setCurrentView(p)} />
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Page sub-header */}
              <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-800">{currentPage?.title}</h2>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10} /> Terakhir disimpan: {currentPage?.lastSaved}</p>
                </div>
                <div className="flex items-center gap-2">
                  {pageKeys.map(key => {
                    const Icon = pageIcons[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setCurrentView(key)}
                        title={pages[key].title}
                        className={`p-2 rounded-lg border transition-colors ${currentView === key ? "bg-violet-100 border-violet-300 text-violet-600" : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"}`}
                      >
                        <Icon size={13} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GrapesJS */}
              <div className="flex-1 min-h-0">
                <GrapesEditor
                  key={currentView}
                  html={pages[currentView as PageKey].html}
                  css={pages[currentView as PageKey].css}
                  onSave={handleSave}
                  onReset={handleReset}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}