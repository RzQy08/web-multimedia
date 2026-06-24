import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, X, Globe, Smartphone, BarChart3 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PortfolioSectionProps {
  isDark: boolean;
}

const categories = ["Semua", "Website", "Aplikasi Mobile", "E-Commerce", "Dashboard"];

const projects = [
  {
    id: 1,
    title: "Nusantara Fresh",
    category: "E-Commerce",
    tags: ["Next.js", "Tailwind", "Stripe"],
    description: "Platform e-commerce sayur & buah organik lokal dengan fitur langganan mingguan, tracking pesanan real-time, dan integrasi pembayaran penuh.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    color: "from-emerald-500 to-teal-600",
    accentColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    stat1: { label: "Konversi naik", value: "+47%" },
    stat2: { label: "Transaksi/bulan", value: "12K+" },
    icon: Globe,
    featured: true,
    link: "#",
    year: "2026",
  },
  {
    id: 2,
    title: "HealthTrack Pro",
    category: "Aplikasi Mobile",
    tags: ["React Native", "Firebase", "AI"],
    description: "Aplikasi kesehatan pribadi dengan pemantauan aktivitas, analisis pola tidur berbasis AI, dan integrasi wearable device.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    color: "from-violet-500 to-purple-600",
    accentColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    stat1: { label: "Rating App Store", value: "4.9★" },
    stat2: { label: "Pengguna aktif", value: "50K+" },
    icon: Smartphone,
    featured: false,
    link: "#",
    year: "2025",
  },
  {
    id: 3,
    title: "SahamPintar",
    category: "Dashboard",
    tags: ["React", "D3.js", "WebSocket"],
    description: "Dashboard analitik investasi saham real-time dengan visualisasi portofolio interaktif, alert harga otomatis, dan laporan pajak otomatis.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    color: "from-cyan-500 to-blue-600",
    accentColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    stat1: { label: "Data real-time", value: "<50ms" },
    stat2: { label: "Investor aktif", value: "8K+" },
    icon: BarChart3,
    featured: false,
    link: "#",
    year: "2025",
  },
  {
    id: 4,
    title: "Rumah Kreatif",
    category: "Website",
    tags: ["Nuxt.js", "Sanity CMS", "Framer"],
    description: "Website agensi desain interior premium dengan galeri portofolio 3D immersive, kalkulator estimasi biaya, dan booking konsultasi online.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    color: "from-amber-500 to-orange-600",
    accentColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    stat1: { label: "Bounce rate", value: "−38%" },
    stat2: { label: "Lead/bulan", value: "120+" },
    icon: Globe,
    featured: false,
    link: "#",
    year: "2025",
  },
  {
    id: 5,
    title: "WargaKu App",
    category: "Aplikasi Mobile",
    tags: ["Flutter", "Node.js", "Maps API"],
    description: "Aplikasi layanan warga berbasis lokasi untuk pelaporan masalah infrastruktur kota, pengumuman RT/RW, dan pembayaran iuran online.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    color: "from-rose-500 to-pink-600",
    accentColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    stat1: { label: "Respons laporan", value: "24 jam" },
    stat2: { label: "Warga terdaftar", value: "30K+" },
    icon: Smartphone,
    featured: false,
    link: "#",
    year: "2024",
  },
  {
    id: 6,
    title: "LogiFlow",
    category: "Dashboard",
    tags: ["Vue.js", "Python", "PostgreSQL"],
    description: "Sistem manajemen logistik dan rantai pasok terintegrasi dengan prediksi stok AI, rute pengiriman optimal, dan laporan operasional real-time.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    color: "from-fuchsia-500 to-violet-600",
    accentColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    stat1: { label: "Efisiensi naik", value: "+62%" },
    stat2: { label: "Pengiriman/hari", value: "5K+" },
    icon: BarChart3,
    featured: false,
    link: "#",
    year: "2024",
  },
];

export function PortfolioSection({ isDark }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null);

  const filtered =
    activeCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

  return (
    <section
      id="portfolio"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span
            className={`inline-block text-sm tracking-widest uppercase mb-3 ${isDark ? "text-cyan-400" : "text-violet-600"}`}
            style={{ fontWeight: 600 }}
          >
            Hasil Kerja Nyata
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className={`${isDark ? "text-white" : "text-gray-900"}`}
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Portfolio Kami
            </h2>
            <a
              href="#kontak"
              onClick={(e) => { e.preventDefault(); document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`flex items-center gap-2 text-sm transition-colors ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-violet-600 hover:text-violet-700"}`}
              style={{ fontWeight: 600 }}
            >
              Diskusikan Proyek Anda
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-md shadow-violet-500/20"
                    : isDark
                    ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
                    : "bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 border border-gray-200"
                }`}
                style={{ fontWeight: 600 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid Layout */}
        <AnimatePresence mode="popLayout">
          {featured && (
            <motion.div
              key="grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-5"
            >
              {/* Featured — large card */}
              <motion.div
                layout
                key={`featured-${featured.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-7"
                onMouseEnter={() => setHoveredId(featured.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer h-full min-h-[440px] border transition-all duration-500 ${
                    isDark
                      ? "border-gray-700 hover:border-gray-500"
                      : "border-gray-200 hover:border-gray-300"
                  } hover:shadow-2xl ${isDark ? "hover:shadow-black/50" : "hover:shadow-gray-300/60"}`}
                  onClick={() => setModalProject(featured)}
                >
                  {/* Background image */}
                  <ImageWithFallback
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${featured.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${featured.accentColor} backdrop-blur-sm`}
                      style={{ fontWeight: 600 }}
                    >
                      {featured.category}
                    </span>
                    <div className="flex gap-1.5">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs text-white/70 bg-black/40 backdrop-blur-sm border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Stats */}
                    <div className="flex gap-4 mb-4">
                      {[featured.stat1, featured.stat2].map((stat) => (
                        <div
                          key={stat.label}
                          className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                        >
                          <div className="text-white text-lg" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                            {stat.value}
                          </div>
                          <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-white text-2xl mb-1.5" style={{ fontWeight: 800, letterSpacing: "-0.03em" }}>
                      {featured.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
                      {featured.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-xs">{featured.year}</span>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white bg-gradient-to-r ${featured.color} opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300`}
                        style={{ fontWeight: 600 }}
                      >
                        Lihat Detail
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right column — smaller cards */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {rest.slice(0, 2).map((project, index) => {
                  const Icon = project.icon;
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex-1 min-h-[200px] ${
                        isDark
                          ? "border-gray-700 hover:border-gray-500"
                          : "border-gray-200 hover:border-gray-300"
                      } hover:shadow-xl ${isDark ? "hover:shadow-black/40" : "hover:shadow-gray-200/80"}`}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setModalProject(project)}
                    >
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs border ${project.accentColor} backdrop-blur-sm`}
                          style={{ fontWeight: 600 }}
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* External link */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white">
                          <ExternalLink size={13} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <h3 className="text-white text-base mb-0.5" style={{ fontWeight: 700 }}>
                              {project.title}
                            </h3>
                            <p className="text-white/50 text-xs line-clamp-1">{project.description}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <div className="text-center px-2.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                              <div className="text-white text-sm" style={{ fontWeight: 800 }}>{project.stat1.value}</div>
                              <div className="text-white/40 text-[9px] whitespace-nowrap">{project.stat1.label}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom row — remaining projects */}
              {rest.slice(2).map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                    className="lg:col-span-4"
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer h-52 border transition-all duration-300 ${
                        isDark
                          ? "border-gray-700 hover:border-gray-500"
                          : "border-gray-200 hover:border-gray-300"
                      } hover:shadow-xl ${isDark ? "hover:shadow-black/40" : "hover:shadow-gray-200/80"}`}
                      onClick={() => setModalProject(project)}
                    >
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                      {/* Top */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs border ${project.accentColor} backdrop-blur-sm`}
                          style={{ fontWeight: 600 }}
                        >
                          {project.category}
                        </span>
                        <span className="text-white/30 text-xs">{project.year}</span>
                      </div>

                      {/* Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex gap-2 mb-3">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-md text-xs text-white/60 bg-white/10 border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-white text-base mb-0.5" style={{ fontWeight: 700 }}>
                          {project.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex gap-2">
                            <span className="text-white text-xs" style={{ fontWeight: 700 }}>{project.stat1.value}</span>
                            <span className="text-white/40 text-xs">{project.stat1.label}</span>
                          </div>
                          <ExternalLink size={12} className="text-white/30 group-hover:text-white/70 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-12 p-8 rounded-2xl border relative overflow-hidden ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className={`text-xs mb-1 ${isDark ? "text-cyan-400" : "text-violet-600"}`} style={{ fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Siap memulai?
              </p>
              <h3
                className={`${isDark ? "text-white" : "text-gray-900"}`}
                style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                Proyek Anda bisa menjadi portofolio kami berikutnya.
              </h3>
              <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                150+ proyek selesai · 10 tahun pengalaman · Kepuasan klien terjamin
              </p>
            </div>
            <a
              href="#kontak"
              onClick={(e) => { e.preventDefault(); document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 whitespace-nowrap"
              style={{ fontWeight: 600, fontSize: "0.875rem" }}
            >
              Mulai Proyek Sekarang
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-2xl rounded-3xl overflow-hidden border ${
                isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
              } shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero image */}
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback
                  src={modalProject.image}
                  alt={modalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${modalProject.color} opacity-20`} />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {modalProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs text-white bg-black/50 backdrop-blur-sm border border-white/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Close */}
                <button
                  onClick={() => setModalProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs border ${modalProject.accentColor} mb-2`}
                      style={{ fontWeight: 600 }}
                    >
                      {modalProject.category}
                    </span>
                    <h3 className="text-white text-2xl" style={{ fontWeight: 800, letterSpacing: "-0.03em" }}>
                      {modalProject.title}
                    </h3>
                  </div>
                  <span className="text-white/40 text-sm">{modalProject.year}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {modalProject.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[modalProject.stat1, modalProject.stat2].map((stat) => (
                    <div
                      key={stat.label}
                      className={`p-4 rounded-2xl border ${
                        isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div
                        className={`text-2xl mb-0.5 bg-gradient-to-r ${modalProject.color} bg-clip-text text-transparent`}
                        style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
                      >
                        {stat.value}
                      </div>
                      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`} style={{ fontWeight: 600 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={modalProject.link}
                    onClick={(e) => e.preventDefault()}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white bg-gradient-to-r ${modalProject.color} transition-all duration-200 hover:opacity-90 hover:shadow-lg`}
                    style={{ fontWeight: 600, fontSize: "0.875rem" }}
                  >
                    <ExternalLink size={15} />
                    Lihat Live Demo
                  </a>
                  <a
                    href="#kontak"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalProject(null);
                      setTimeout(() => document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" }), 200);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm transition-all duration-200 ${
                      isDark
                        ? "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Proyek Serupa
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}