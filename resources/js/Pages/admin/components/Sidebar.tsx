import { Home, Users, Briefcase, Image, PenTool, Mail } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  home: <Home size={20} />,
  tentang: <Users size={20} />,
  layanan: <Briefcase size={20} />,
  portfolio: <Image size={20} />,
  blog: <PenTool size={20} />,
  kontak: <Mail size={20} />,
};

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  pages: string[];
}

export default function Sidebar({ currentPage, onPageChange, pages }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold tracking-tight">Admin Panel</h2>
        <p className="text-xs text-gray-500">Kelola konten website</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-violet-100 text-violet-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {iconMap[page] || <div className="w-5" />}
            <span className="capitalize">{page === "kontak" ? "Hubungi Kami" : page}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t text-xs text-gray-400">
        <p>Versi 1.0 • GrapesJS</p>
      </div>
    </aside>
  );
}