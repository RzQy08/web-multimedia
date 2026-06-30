import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Eye, ArrowRight, BookOpen, Tag, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getContent, ContentMap } from "../lib/parseContent";

interface BlogSectionProps {
  isDark: boolean;
  searchQuery: string;
  /** Data dari database (section_contents). Kosongkan untuk pakai nilai default. */
  content?: ContentMap;
}

const categories = ["Semua", "Web Design", "Digital Marketing", "SEO", "Mobile App", "Teknologi"];

const posts = [
  {
    id: 1,
    category: "Web Design",
    categoryColor: "text-cyan-400 bg-cyan-400/10",
    title: "10 Tren Desain Web 2026 yang Wajib Anda Ketahui",
    excerpt: "Dunia desain web terus berkembang. Dari penggunaan AI-generated layouts hingga micro-interactions yang lebih kaya — inilah yang akan mendominasi tahun ini.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    readTime: "7 menit baca",
    views: "12.4K",
    author: "Andi Pratama",
    date: "10 Jun 2026",
    featured: true,
  },
  {
    id: 2,
    category: "SEO",
    categoryColor: "text-emerald-400 bg-emerald-400/10",
    title: "Panduan SEO Lengkap untuk Bisnis Lokal Indonesia",
    excerpt: "Strategi SEO lokal yang terbukti meningkatkan visibilitas bisnis Anda di Google Maps dan pencarian organik. Cocok untuk UMKM hingga perusahaan menengah.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    readTime: "10 menit baca",
    views: "8.9K",
    author: "Siti Rahayu",
    date: "5 Jun 2026",
    featured: false,
  },
  {
    id: 3,
    category: "Digital Marketing",
    categoryColor: "text-violet-400 bg-violet-400/10",
    title: "Cara Membuat Konten yang Viral di Media Sosial",
    excerpt: "Formula konten viral bukan sekadar keberuntungan. Pelajari psikologi di balik konten yang disebarkan jutaan pengguna dan terapkan pada brand Anda.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    readTime: "8 menit baca",
    views: "21.3K",
    author: "Budi Santoso",
    date: "1 Jun 2026",
    featured: false,
  },
  {
    id: 4,
    category: "Mobile App",
    categoryColor: "text-amber-400 bg-amber-400/10",
    title: "React Native vs Flutter: Mana yang Tepat untuk Bisnis Anda?",
    excerpt: "Perbandingan mendalam antara dua framework mobile terpopuler — dari performa, ekosistem, hingga biaya pengembangan. Temukan pilihan terbaik untuk kebutuhan Anda.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    readTime: "12 menit baca",
    views: "6.7K",
    author: "Dewi Kusuma",
    date: "28 Mei 2026",
    featured: false,
  },
  {
    id: 5,
    category: "Teknologi",
    categoryColor: "text-rose-400 bg-rose-400/10",
    title: "AI dalam Digital Marketing: Peluang dan Tantangan",
    excerpt: "Bagaimana kecerdasan buatan mengubah cara kita membuat konten, mengelola iklan, dan memahami perilaku konsumen di era baru ini.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    readTime: "9 menit baca",
    views: "18.5K",
    author: "Rina Wati",
    date: "20 Mei 2026",
    featured: false,
  },
  {
    id: 6,
    category: "Web Design",
    categoryColor: "text-cyan-400 bg-cyan-400/10",
    title: "UX Writing: Kekuatan Kata dalam Desain Digital",
    excerpt: "Copy yang baik bukan hanya soal estetika — ia memandu pengguna, membangun kepercayaan, dan mendorong konversi. Pelajari dasar-dasar UX Writing di sini.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    readTime: "6 menit baca",
    views: "9.8K",
    author: "Andi Pratama",
    date: "15 Mei 2026",
    featured: false,
  },
];

export function BlogSection({ isDark, searchQuery, content = {} }: BlogSectionProps) {
  const sectionTitle    = getContent(content, "section_title", "Blog & Artikel");
  const sectionSubtitle = getContent(content, "section_subtitle", "Insight & Inspirasi");
  // Catatan: data "posts" dari database belum di-merge karena tiap post punya banyak field
  // (image, category, excerpt, dll). Untuk sekarang title & subtitle sudah dinamis.

  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = posts.filter((p) => {
    const matchesCategory = activeCategory === "Semua" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filtered.find((p) => p.featured);
  const regularPosts = filtered.filter((p) => !p.featured);

  return (
    <section
      id="blog"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-gray-950" : "bg-gray-50"
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
            {sectionSubtitle}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className={`${isDark ? "text-white" : "text-gray-900"}`}
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              {sectionTitle}
            </h2>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`flex items-center gap-2 text-sm transition-colors ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-violet-600 hover:text-violet-700"}`}
              style={{ fontWeight: 600 }}
            >
              Lihat Semua Artikel
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 hover:scale-105 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-md"
                    : isDark
                    ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                    : "bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
                }`}
                style={{ fontWeight: 600 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <div className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Tidak ada artikel yang cocok dengan pencarian Anda.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Featured Post */}
            <AnimatePresence mode="popLayout">
              {featuredPost && (
                <motion.article
                  key={`featured-${featuredPost.id}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? "bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-black/40"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-gray-200/80"
                  }`}
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative overflow-hidden h-56 lg:h-auto">
                      <ImageWithFallback
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-md text-xs text-white bg-gradient-to-r from-cyan-500 to-violet-600"
                          style={{ fontWeight: 700 }}
                        >
                          FEATURED
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-xs ${featuredPost.categoryColor}`}
                          style={{ fontWeight: 600 }}
                        >
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <h3
                        className={`mb-3 group-hover:text-cyan-500 transition-colors duration-200 ${isDark ? "text-white" : "text-gray-900"}`}
                        style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.35 }}
                      >
                        {featuredPost.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {featuredPost.excerpt}
                      </p>

                      <div className={`flex items-center justify-between text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5">
                            <User size={12} />
                            {featuredPost.author}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {featuredPost.readTime}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye size={12} />
                            {featuredPost.views}
                          </span>
                        </div>
                      </div>

                      <div className={`mt-4 pt-4 border-t flex items-center justify-between ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                        <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                          {featuredPost.date}
                        </span>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className={`flex items-center gap-1.5 text-sm group-hover:gap-2.5 transition-all duration-200 ${isDark ? "text-cyan-400" : "text-violet-600"}`}
                          style={{ fontWeight: 600 }}
                        >
                          Baca Artikel
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>

            {/* Regular Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={`group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      isDark
                        ? "bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-black/40"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-gray-200/80"
                    }`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-44">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span
                        className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs ${post.categoryColor}`}
                        style={{ fontWeight: 600 }}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <h3
                        className={`mb-2 line-clamp-2 group-hover:text-cyan-500 transition-colors duration-200 ${isDark ? "text-white" : "text-gray-900"}`}
                        style={{ fontWeight: 700, fontSize: "0.975rem", lineHeight: 1.45 }}
                      >
                        {post.title}
                      </h3>
                      <p className={`text-sm line-clamp-2 mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className={`flex items-center gap-3 text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mb-3`}>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={11} />
                          {post.views}
                        </span>
                      </div>

                      <div className={`pt-3 border-t flex items-center justify-between ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                            <User size={10} className="text-white" />
                          </div>
                          <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            {post.author}
                          </span>
                        </div>
                        <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm transition-all duration-200 hover:-translate-y-0.5 ${
              isDark
                ? "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900"
            }`}
            style={{ fontWeight: 600 }}
          >
            <BookOpen size={15} />
            Muat Lebih Banyak Artikel
          </a>
        </motion.div>
      </div>
    </section>
  );
}