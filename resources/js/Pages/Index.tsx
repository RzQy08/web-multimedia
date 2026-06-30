import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { TentangKamiSection } from "../components/TentangKamiSection";
import { LayananSection } from "../components/LayananSection";
import { PortfolioSection } from "../components/PortfolioSection";
import { BlogSection } from "../components/BlogSection";
import { KontakSection } from "../components/KontakSection";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { usePageData } from "../hooks/usePageData";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("lumina-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("lumina-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // ── Ambil semua section + konten dari database ─────────────────────────
  // GET /api/public/pages/home
  const { loading, getSection } = usePageData("home");

  // Tiap getSection(key) mengembalikan { content: {...} } atau undefined
  // kalau section belum ada di database / API belum siap.
  // Komponen tetap aman karena masing-masing sudah punya nilai default
  // sebagai fallback (lihat content = {} di setiap komponen).
  const navbarContent   = getSection("navbar")?.content;
  const heroContent     = getSection("hero")?.content;
  const tentangContent  = getSection("tentang_kami")?.content;
  const layananContent  = getSection("layanan")?.content;
  const portfolioContent= getSection("portfolio")?.content;
  const blogContent     = getSection("blog")?.content;
  const kontakContent   = getSection("kontak")?.content;
  const footerContent   = getSection("footer")?.content;

  return (
    <div className={isDark ? "dark" : ""}>
      <Navbar
        isDark={isDark}
        onThemeToggle={() => setIsDark((v) => !v)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        content={navbarContent}
      />

      <HeroSection isDark={isDark} content={heroContent} />
      <TentangKamiSection isDark={isDark} content={tentangContent} />
      <LayananSection isDark={isDark} searchQuery={searchQuery} content={layananContent} />
      <PortfolioSection isDark={isDark} content={portfolioContent} />
      <BlogSection isDark={isDark} searchQuery={searchQuery} content={blogContent} />
      <KontakSection isDark={isDark} content={kontakContent} />
      <Footer isDark={isDark} content={footerContent} />

      <ScrollToTop />
    </div>
  );
}