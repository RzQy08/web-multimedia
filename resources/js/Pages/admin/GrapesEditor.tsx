// resources/js/Pages/admin/GrapesEditor.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { Save, RotateCcw, Loader, Code } from "lucide-react";
import { api } from "../../lib/api";
import { sectionTemplates } from "../../lib/sectionTemplates";

interface GrapesEditorProps {
  sectionId: number;
  sectionKey: string;
  initialHtml: string;
  initialCss: string;
  initialJson: object | null;
  onSaved: (sectionId: number, html: string, css: string) => void;
}

export function GrapesEditor({
  sectionId,
  sectionKey,
  initialHtml,
  initialCss,
  initialJson,
  onSaved,
}: GrapesEditorProps) {
  const editorRef    = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saving,   setSaving]   = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [codeHtml, setCodeHtml] = useState("");
  const [codeCss,  setCodeCss]  = useState("");
  const [toast,    setToast]    = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const getStartingContent = useCallback(() => {
    if (initialJson && Object.keys(initialJson).length > 0) {
      return { type: "json" as const, data: initialJson };
    }
    if (initialHtml && initialHtml.trim().length > 0) {
      return { type: "html" as const, html: initialHtml, css: initialCss };
    }
    const template = sectionTemplates[sectionKey];
    if (template) {
      return { type: "html" as const, html: template.html, css: template.css };
    }
    return null;
  }, [sectionId, sectionKey, initialHtml, initialCss, initialJson]);

  // ─── Destroy helper ──────────────────────────────────────────────────────────
  const destroyEditor = () => {
    if (initTimer.current) {
      clearTimeout(initTimer.current);
      initTimer.current = null;
    }
    if (editorRef.current) {
      try { editorRef.current.destroy(); } catch (_) {}
      editorRef.current = null;
    }
  };

  // ─── Init helper ─────────────────────────────────────────────────────────────
  const initEditor = useCallback(() => {
    // Guard: container must exist and be in the DOM
    if (!containerRef.current || !document.body.contains(containerRef.current)) return;

    // Clear container HTML so GrapesJS starts fresh
    containerRef.current.innerHTML = "";

    const editor = grapesjs.init({
      container: containerRef.current,
      fromElement: false,
      storageManager: false,
      height: "100%",
      panels: { defaults: [] },
    });

    // Load content only after GrapesJS signals it's ready
    editor.on("load", () => {
      const content = getStartingContent();
      if (!content) return;
      if (content.type === "json") {
        editor.loadProjectData(content.data as any);
      } else {
        editor.setComponents(content.html);
        editor.setStyle(content.css);
      }
    });

    editorRef.current = editor;
  }, [getStartingContent]);

  // ─── Lifecycle: re-init when sectionId changes ───────────────────────────────
  useEffect(() => {
    destroyEditor();

    // Small delay lets React finish DOM reconciliation before GrapesJS touches it
    initTimer.current = setTimeout(initEditor, 50);

    return destroyEditor;
  }, [sectionId]);

  // ─── Sync code view ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (showCode && editorRef.current) {
      setCodeHtml(editorRef.current.getHtml());
      setCodeCss(editorRef.current.getCss());
    }
  }, [showCode]);

  // ─── Apply manual code back to GrapesJS ──────────────────────────────────────
  const applyCode = () => {
    if (!editorRef.current) return;
    editorRef.current.setComponents(codeHtml);
    editorRef.current.setStyle(codeCss);
    setShowCode(false);
    showToast("✅ Kode berhasil diterapkan ke editor.");
  };

  // ─── Save ─────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!editorRef.current) return;
    setSaving(true);
    try {
      const grapesJson = editorRef.current.getProjectData();
      const html       = editorRef.current.getHtml();
      const css        = editorRef.current.getCss();

      const res = await api.saveSection(sectionId, grapesJson, html, css);
      showToast(`✅ ${res.message}`);
      onSaved(sectionId, html, css);
    } catch (err: any) {
      showToast(`❌ ${err.message}`, false);
    } finally {
      setSaving(false);
    }
  };

  // ─── Reset ────────────────────────────────────────────────────────────────────
  const handleReset = () => {
    if (!editorRef.current) return;
    const content = getStartingContent();
    if (!content) return;
    if (content.type === "json") {
      editorRef.current.loadProjectData(content.data as any);
    } else {
      editorRef.current.setComponents(content.html);
      editorRef.current.setStyle(content.css);
    }
    showToast("↩️ Editor direset ke konten terakhir tersimpan.");
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Toast */}
      {toast && (
        <div className={`absolute top-3 right-3 z-50 px-4 py-2.5 rounded-xl text-sm text-white shadow-lg ${
          toast.ok ? "bg-gray-900" : "bg-red-600"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-gray-500">GrapesJS Visual Editor</span>
          {!initialHtml && !initialJson && sectionTemplates[sectionKey] && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold border border-amber-200">
              Template default
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
              showCode
                ? "bg-gray-900 border-gray-900 text-white"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Code size={12} /> {showCode ? "Visual" : "Kode HTML/CSS"}
          </button>
          {showCode && (
            <button
              onClick={applyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-xs text-amber-700 hover:bg-amber-100 transition-colors"
            >
              Terapkan Kode
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={12} /> Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors disabled:opacity-60"
          >
            {saving
              ? <><Loader size={12} className="animate-spin" /> Menyimpan…</>
              : <><Save size={12} /> Simpan</>}
          </button>
        </div>
      </div>

      {/* Code editor */}
      {showCode && (
        <div className="flex flex-1 min-h-0 divide-x divide-gray-200 bg-gray-950">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-800">
              HTML
            </div>
            <textarea
              className="flex-1 w-full bg-gray-950 text-green-300 font-mono text-xs p-4 resize-none outline-none border-none"
              value={codeHtml}
              onChange={e => setCodeHtml(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-800">
              CSS
            </div>
            <textarea
              className="flex-1 w-full bg-gray-950 text-blue-300 font-mono text-xs p-4 resize-none outline-none border-none"
              value={codeCss}
              onChange={e => setCodeCss(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>
      )}

      {/* GrapesJS canvas */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0"
        style={{ display: showCode ? "none" : "block" }}
      />
    </div>
  );
}