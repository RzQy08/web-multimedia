// resources/js/Pages/admin/AdminDashboard.tsx
// CMS Admin Panel — load dari database, support tambah/hapus halaman & section
import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, Plus, Trash2, Eye, EyeOff, ChevronRight,
  Zap, LogOut, Settings, Bell, Loader, GripVertical, X, FileText,
} from "lucide-react";
import { api, Page, Section, SectionType } from "../../lib/api";
import { sectionTemplates } from "../../lib/sectionTemplates";
import { GrapesEditor } from "./GrapesEditor";

type View = "overview" | "editor";

export default function AdminDashboard() {
  // ── State ────────────────────────────────────────────────────────────────
  const [pages,        setPages]        = useState<Page[]>([]);
  const [currentPage,  setCurrentPage]  = useState<Page | null>(null);
  const [sections,     setSections]     = useState<Section[]>([]);
  const [sectionTypes, setSectionTypes] = useState<SectionType[]>([]);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [view,         setView]         = useState<View>("overview");
  const [loading,      setLoading]      = useState(true);
  const [toast,        setToast]        = useState<string | null>(null);

  // Modal states
  const [showAddPage,    setShowAddPage]    = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newPageSlug,    setNewPageSlug]    = useState("");
  const [newPageTitle,   setNewPageTitle]   = useState("");
  const [newSectionType, setNewSectionType] = useState("");

  // ── Toast helper ─────────────────────────────────────────────────────────
  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ── Load initial data ─────────────────────────────────────────────────────
  useEffect(() => {
    api.getPages()
      .then(data => {
        setPages(data);
        if (data.length > 0) setCurrentPage(data[0]);
      })
      .catch(() => notify("❌ Gagal memuat daftar halaman."))
      .finally(() => setLoading(false));

    api.getSectionTypes()
      .then(setSectionTypes)
      .catch(() => {});
  }, []);

  // Load sections saat halaman berganti
  useEffect(() => {
    if (!currentPage) return;
    setLoading(true);
    api.getSections(currentPage.slug)
      .then(data => setSections(data.sections))
      .catch(() => notify("❌ Gagal memuat sections."))
      .finally(() => setLoading(false));
  }, [currentPage]);

  // ── CMS Actions ──────────────────────────────────────────────────────────

  // Buat halaman baru
  const handleCreatePage = async () => {
    if (!newPageSlug || !newPageTitle) return;
    try {
      const res = await api.createPage(newPageSlug.toLowerCase().replace(/\s+/g, "-"), newPageTitle);
      setPages(prev => [...prev, res.page]);
      setCurrentPage(res.page);
      setSections([]);
      setShowAddPage(false);
      setNewPageSlug(""); setNewPageTitle("");
      notify(`✅ Halaman "${res.page.title}" berhasil dibuat.`);
    } catch (err: any) {
      notify(`❌ ${err.message}`);
    }
  };

  // Hapus halaman
  const handleDeletePage = async (slug: string) => {
    if (!confirm("Hapus halaman ini beserta semua section-nya? Tidak bisa dibatalkan.")) return;
    try {
      await api.deletePage(slug);
      const remaining = pages.filter(p => p.slug !== slug);
      setPages(remaining);
      setCurrentPage(remaining[0] ?? null);
      notify("✅ Halaman berhasil dihapus.");
    } catch (err: any) {
      notify(`❌ ${err.message}`);
    }
  };

  // Toggle published/draft
  const handleToggleStatus = async (slug: string) => {
    try {
      const res = await api.togglePageStatus(slug);
      setPages(prev => prev.map(p => p.slug === slug ? { ...p, status: res.status as any } : p));
      if (currentPage?.slug === slug) setCurrentPage(prev => prev ? { ...prev, status: res.status as any } : null);
      notify(`✅ ${res.message}`);
    } catch (err: any) {
      notify(`❌ ${err.message}`);
    }
  };

  // Tambah section baru ke halaman
  const handleAddSection = async () => {
    if (!currentPage || !newSectionType) return;
    try {
      const template = sectionTemplates[newSectionType];
      const res = await api.addSection(currentPage.slug, newSectionType);

      // Jika section baru belum punya html, langsung save template ke DB
      if (template && res.section.id) {
        await api.saveSection(res.section.id, {}, template.html, template.css);
        res.section.html = template.html;
        res.section.css  = template.css;
      }

      setSections(prev => [...prev, res.section]);
      setShowAddSection(false);
      setNewSectionType("");
      notify(`✅ Section "${res.section.label}" ditambahkan.`);
    } catch (err: any) {
      notify(`❌ ${err.message}`);
    }
  };

  // Hapus section
  const handleDeleteSection = async (id: number) => {
    if (!confirm("Hapus section ini?")) return;
    try {
      await api.deleteSection(id);
      setSections(prev => prev.filter(s => s.id !== id));
      if (editingSection?.id === id) { setEditingSection(null); setView("overview"); }
      notify("✅ Section dihapus.");
    } catch (err: any) {
      notify(`❌ ${err.message}`);
    }
  };

  // Toggle visibility section
  const handleToggleVisibility = async (id: number) => {
    try {
      const res = await api.toggleVisibility(id);
      setSections(prev => prev.map(s => s.id === id ? { ...s, is_visible: res.is_visible } : s));
    } catch (err: any) {
      notify(`❌ ${err.message}`);
    }
  };

  // Buka editor GrapesJS untuk section tertentu
  const handleEditSection = (section: Section) => {
    setEditingSection(section);
    setView("editor");
  };

  // Callback saat GrapesEditor berhasil save
  const handleSaved = useCallback((id: number, html: string, css: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, html, css } : s));
    notify("✅ Perubahan tersimpan!");
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────

  if (loading && pages.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader className="animate-spin text-violet-600" size={32} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-gray-900 text-white text-sm rounded-xl shadow-xl">
          {toast}
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 h-14 px-4 border-b border-gray-200">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-base text-gray-900" style={{ fontWeight: 800 }}>LUMINA CMS</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 overflow-y-auto space-y-0.5">
          <button
            onClick={() => { setView("overview"); setEditingSection(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              view === "overview" && !currentPage
                ? "bg-violet-100 text-violet-700 font-semibold"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </button>

          <div className="pt-3 pb-1">
            <div className="flex items-center justify-between px-3 mb-1">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Halaman</p>
              <button
                onClick={() => setShowAddPage(true)}
                className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-violet-600 transition-colors"
                title="Buat halaman baru"
              >
                <Plus size={14} />
              </button>
            </div>

            {pages.map(page => (
              <div key={page.slug} className="group relative">
                <button
                  onClick={() => { setCurrentPage(page); setView("overview"); setEditingSection(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    currentPage?.slug === page.slug
                      ? "bg-violet-100 text-violet-700 font-semibold"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  <FileText size={15} className="flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{page.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    page.status === "published"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-600"
                  }`}>
                    {page.status === "published" ? "Live" : "Draft"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="p-2 border-t border-gray-200 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100">
            <Bell size={16} /><span>Notifikasi</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100">
            <Settings size={16} /><span>Pengaturan</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50">
            <LogOut size={16} /><span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="h-14 flex-shrink-0 flex items-center justify-between px-6 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-400">Admin</span>
            <ChevronRight size={14} />
            {view === "editor" && editingSection ? (
              <>
                <button onClick={() => { setView("overview"); setEditingSection(null); }} className="hover:text-violet-600 transition-colors">
                  {currentPage?.title}
                </button>
                <ChevronRight size={14} />
                <span className="font-semibold text-gray-800">{editingSection.label}</span>
              </>
            ) : (
              <span className="font-semibold text-gray-800">{currentPage?.title ?? "Dashboard"}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {currentPage && view === "overview" && (
              <>
                <button
                  onClick={() => handleToggleStatus(currentPage.slug)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                    currentPage.status === "published"
                      ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      : "border-amber-200 text-amber-700 hover:bg-amber-50"
                  }`}
                >
                  {currentPage.status === "published" ? "● Live" : "● Draft"} — klik untuk ubah
                </button>
                <button
                  onClick={() => handleDeletePage(currentPage.slug)}
                  className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                  title="Hapus halaman ini"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors"
            >
              <Eye size={12} /> Preview
            </a>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-hidden">

          {/* ── GrapesJS Editor ── */}
          {view === "editor" && editingSection && (
            <div className="h-full">
              <GrapesEditor
                key={editingSection.id}
                sectionId={editingSection.id}
                sectionKey={editingSection.section_key}
                initialHtml={editingSection.html}
                initialCss={editingSection.css}
                initialJson={editingSection.grapes_json}
                onSaved={handleSaved}
              />
            </div>
          )}

          {/* ── Overview: daftar sections ── */}
          {view === "overview" && (
            <div className="h-full overflow-y-auto p-6">
              {/* Header halaman */}
              {currentPage && (
                <div className="mb-6">
                  <h1 className="text-xl text-gray-900 mb-0.5" style={{ fontWeight: 800 }}>
                    {currentPage.title}
                  </h1>
                  <p className="text-sm text-gray-400">
                    /{currentPage.slug} · {sections.length} section
                  </p>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
                  <Loader size={16} className="animate-spin" /> Memuat sections…
                </div>
              )}

              {/* Section list */}
              {!loading && (
                <div className="space-y-3">
                  {sections.map(section => (
                    <div
                      key={section.id}
                      className="bg-white rounded-xl border border-gray-200 flex items-center gap-4 px-4 py-3 hover:border-violet-200 transition-colors group"
                    >
                      {/* Drag handle */}
                      <GripVertical size={16} className="text-gray-300 flex-shrink-0 cursor-grab" />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{section.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {section.section_key}
                          {section.html ? " · ada konten" : " · belum ada konten"}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleToggleVisibility(section.id)}
                          title={section.is_visible ? "Sembunyikan" : "Tampilkan"}
                          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {section.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                        <button
                          onClick={() => handleEditSection(section)}
                          className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSection(section.id)}
                          className="p-2 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Visibility badge */}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                        section.is_visible ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {section.is_visible ? "Tampil" : "Sembunyi"}
                      </span>
                    </div>
                  ))}

                  {/* Tambah section button */}
                  <button
                    onClick={() => setShowAddSection(true)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-violet-300 hover:text-violet-600 transition-colors"
                  >
                    <Plus size={16} /> Tambah Section Baru
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ── Modal: Tambah Halaman ── */}
      {showAddPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">Buat Halaman Baru</h3>
              <button onClick={() => setShowAddPage(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Judul Halaman</label>
                <input
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-400"
                  placeholder="Tentang Kami"
                  value={newPageTitle}
                  onChange={e => setNewPageTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Slug URL</label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-violet-400">
                  <span className="px-3 py-2 bg-gray-50 text-gray-400 text-sm border-r border-gray-200">/</span>
                  <input
                    className="flex-1 px-3 py-2 text-sm outline-none"
                    placeholder="tentang-kami"
                    value={newPageSlug}
                    onChange={e => setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, ""))}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Hanya huruf kecil, angka, dan tanda hubung (-)</p>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAddPage(false)} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Batal</button>
              <button onClick={handleCreatePage} disabled={!newPageSlug || !newPageTitle} className="flex-1 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 disabled:opacity-50">Buat Halaman</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Tambah Section ── */}
      {showAddSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">Tambah Section ke Halaman Ini</h3>
              <button onClick={() => setShowAddSection(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {sectionTypes.map(type => (
                <button
                  key={type.name}
                  onClick={() => setNewSectionType(type.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
                    newSectionType === type.name
                      ? "border-violet-400 bg-violet-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{type.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {sectionTemplates[type.name] ? "Template tersedia ✓" : "Mulai dari kosong"}
                    </p>
                  </div>
                  {newSectionType === type.name && (
                    <div className="w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAddSection(false)} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Batal</button>
              <button onClick={handleAddSection} disabled={!newSectionType} className="flex-1 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 disabled:opacity-50">Tambah Section</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}