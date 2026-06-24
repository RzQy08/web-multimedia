import { useState, useRef, useEffect } from "react";
import { Search, Sun, Moon, Menu, X, Zap, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const layananItems = [
  { label: "Desain Web", href: "#desain-web" },
  { label: "Pengembangan Aplikasi", href: "#aplikasi" },
  { label: "Strategi Digital", href: "#strategi" },
  { label: "SEO & Marketing", href: "#seo" },
  { label: "Konsultasi IT", href: "#konsultasi" },
];

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Layanan", href: "#layanan", hasDropdown: true },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Hubungi Kami", href: "#kontak" },
];

export function Navbar({ isDark, onThemeToggle, searchQuery, onSearchChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else if (href === "#top") window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`backdrop-blur-md border-b transition-all duration-300 ${
          isDark
            ? "bg-black/80 border-white/10"
            : "bg-white/85 border-black/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#top"
              className="flex items-center gap-2 group"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Zap size={16} className="text-white" />
              </div>
              <span
                className={`text-xl tracking-tight transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                LUMINA
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-all duration-200 hover:scale-105 ${
                        isDark
                          ? "text-gray-300 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                      } ${dropdownOpen ? (isDark ? "text-white bg-white/10" : "text-gray-900 bg-black/5") : ""}`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className={`absolute top-full left-0 mt-2 w-52 rounded-xl border shadow-xl overflow-hidden ${
                            isDark
                              ? "bg-gray-900 border-gray-700"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <div className="py-1.5">
                            {layananItems.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(item.href);
                                }}
                                className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${
                                  isDark
                                    ? "text-gray-300 hover:text-white hover:bg-white/8"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 hover:scale-105 ${
                      isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search bar */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Cari artikel..."
                      className={`w-full px-3 py-1.5 text-sm rounded-lg border outline-none transition-colors ${
                        isDark
                          ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                          : "bg-black/5 border-black/15 text-gray-900 placeholder-gray-400 focus:border-violet-500"
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => { setSearchOpen((v) => !v); if (searchOpen) onSearchChange(""); }}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                }`}
                aria-label="Toggle search"
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onThemeToggle}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isDark
                    ? "text-yellow-300 hover:bg-white/10"
                    : "text-violet-600 hover:bg-black/5"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* CTA Button */}
              <a
                href="#newsletter"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#newsletter")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:flex items-center px-4 py-1.5 rounded-lg text-sm text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105"
                style={{ fontWeight: 600 }}
              >
                Hubungi Kami
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                }`}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-b shadow-lg ${
              isDark ? "bg-black/95 border-white/10" : "bg-white/95 border-black/10"
            }`}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileLayananOpen((v) => !v)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        isDark
                          ? "text-gray-300 hover:text-white hover:bg-white/10"
                          : "text-gray-700 hover:text-gray-900 hover:bg-black/5"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${mobileLayananOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileLayananOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`ml-4 mt-1 mb-1 pl-3 border-l ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                            {layananItems.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(item.href);
                                }}
                                className={`block py-2 text-sm transition-colors ${
                                  isDark
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                      isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                        : "text-gray-700 hover:text-gray-900 hover:bg-black/5"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}

              <div className="pt-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari artikel..."
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                      : "bg-black/5 border-black/15 text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}