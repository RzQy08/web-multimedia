// src/app/admin/GrapesEditor.tsx
import React, { useState, useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { Save, RotateCcw } from "lucide-react";

interface GrapesEditorProps {
  html: string;
  css: string;
  onSave: (html: string, css: string) => void;
  onReset: () => void;
}

export function GrapesEditor({ html, css, onSave, onReset }: GrapesEditorProps) {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const editor = grapesjs.init({
      container: containerRef.current,
      fromElement: false,
      plugins: ["gjs-preset-webpage"],
      pluginsOpts: { "gjs-preset-webpage": { useDefaultBlocks: true, useDefaultCommands: true } },
      storageManager: false,
      height: "100%",
    });
    editorRef.current = editor;
    editor.setComponents(html);
    editor.setStyle(css);
    return () => { editor.destroy(); };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setComponents(html);
      editorRef.current.setStyle(css);
    }
  }, [html, css]);

  const handleSave = async () => {
    if (!editorRef.current) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    onSave(editorRef.current.getHtml(), editorRef.current.getCss());
    setSaving(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />GrapesJS Visual Editor aktif</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={12} /> Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors disabled:opacity-60"
          >
            {saving ? <><span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Menyimpan…</> : <><Save size={12} /> Simpan Perubahan</>}
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex-1 min-h-0" />
    </div>
  );
}