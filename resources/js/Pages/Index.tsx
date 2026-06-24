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

  const handleThemeToggle = () => setIsDark((v) => !v);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-950" : "bg-white"}`}>
      <Navbar
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        <HeroSection isDark={isDark} />
        <TentangKamiSection isDark={isDark} />
        <LayananSection isDark={isDark} searchQuery={searchQuery} />
        <PortfolioSection isDark={isDark} />
        <BlogSection isDark={isDark} searchQuery={searchQuery} />
        <KontakSection isDark={isDark} />
      </main>

      <Footer isDark={isDark} />
      <ScrollToTop />
    </div>
  );
}