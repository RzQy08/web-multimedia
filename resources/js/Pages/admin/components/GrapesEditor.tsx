import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";

// Plugin preset (opsional, bisa diganti plugin lain)


interface GrapesEditorProps {
  html: string;
  css: string;
  onSave: (html: string, css: string) => void;
}

export default function GrapesEditor({ html, css, onSave }: GrapesEditorProps) {
  const editorRef = useRef<grapesjs.Editor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inisialisasi GrapesJS
    const editor = grapesjs.init({
      container: containerRef.current,
      fromElement: false,
      plugins: ["gjs-preset-webpage"],
      pluginsOpts: {
        "gjs-preset-webpage": {
          // Opsi preset (bisa disesuaikan)
          useDefaultBlocks: true,
          useDefaultCommands: true,
        },
      },
      storageManager: false, // kita handle simpan manual
      canvas: {
        styles: [], // tambahkan CSS global jika perlu
      },
    });

    editorRef.current = editor;

    // Load konten awal
    editor.setComponents(html);
    editor.setStyle(css);

    // Cleanup saat komponen unmount
    return () => {
      editor.destroy();
    };
  }, []); // hanya sekali saat mount

  // Update konten ketika prop html/css berubah (saat ganti halaman)
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setComponents(html);
      editorRef.current.setStyle(css);
    }
  }, [html, css]);

  // Fungsi simpan yang bisa dipanggil dari luar (misal tombol di dashboard)
  const handleSave = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();
    onSave(html, css);
  };

  // Ekspos fungsi save ke parent melalui ref (opsional)
  useEffect(() => {
    if (editorRef.current) {
      // kita bisa menambahkan tombol simpan di toolbar editor sendiri
      // atau kita tambahkan tombol eksternal.
      // Di sini kita menambahkan command custom "save"
      editorRef.current.Commands.add("save-content", {
        run: (editor) => {
          const html = editor.getHtml();
          const css = editor.getCss();
          onSave(html, css);
        },
      });
    }
  }, [onSave]);

  return (
    <div className="flex flex-col h-full">
      {/* Tombol simpan di atas editor */}
      <div className="mb-3 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
        >
          💾 Simpan Perubahan
        </button>
      </div>

      {/* Container GrapesJS */}
      <div ref={containerRef} className="flex-1 border rounded bg-white shadow" />
    </div>
  );
}   