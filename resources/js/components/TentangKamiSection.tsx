import { motion } from "motion/react";
import { Users, Award, Globe, TrendingUp, ArrowRight, CheckCircle2, Lightbulb, Heart, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getContent, ContentMap } from "../lib/parseContent";

interface TentangKamiSectionProps {
  isDark: boolean;
  /** Data dari database (section_contents). Kosongkan untuk pakai nilai default. */
  content?: ContentMap;
}

const DEFAULT_STATS = [
  { value: "10+", label: "Tahun Pengalaman" },
  { value: "500+", label: "Proyek Selesai" },
  { value: "150+", label: "Klien Puas" },
  { value: "50+", label: "Tim Profesional" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Inovasi",
    description: "Kami selalu menghadirkan solusi kreatif dan terdepan untuk setiap tantangan bisnis Anda.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "Dedikasi",
    description: "Setiap proyek dikerjakan dengan sepenuh hati dan komitmen penuh terhadap kualitas terbaik.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Shield,
    title: "Kepercayaan",
    description: "Kami membangun hubungan jangka panjang berdasarkan transparansi dan integritas.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: TrendingUp,
    title: "Pertumbuhan",
    description: "Bersama kami, bisnis Anda berkembang dengan strategi digital yang terukur dan efektif.",
    color: "from-amber-500 to-orange-600",
  },
];

const DEFAULT_HIGHLIGHTS = [
  "Penghargaan Perusahaan Digital Terbaik 2023",
  "Bersertifikat ISO 9001 untuk Manajemen Mutu",
  "Partner resmi Google & Meta",
  "Top 10 Agensi Digital Indonesia",
];

export function TentangKamiSection({ isDark, content = {} }: TentangKamiSectionProps) {
  const sectionTitle = getContent(content, "section_title", "Tentang Kami");
  const description  = getContent(
    content,
    "description",
    "Sejak berdiri pada tahun 2014, LUMINA telah menjadi mitra terpercaya ratusan bisnis di seluruh Indonesia. Kami menggabungkan keahlian teknis, kreativitas desain, dan strategi pemasaran digital untuk menghasilkan solusi yang berdampak nyata."
  );
  const image       = getContent(
    content,
    "image",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  );
  const highlights  = getContent<string[]>(content, "highlights", DEFAULT_HIGHLIGHTS);
  const stats       = DEFAULT_STATS; // belum ada di fields_schema, tetap statis untuk sekarang

  return (
    <section
      id="tentang"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`inline-block text-sm tracking-widest uppercase mb-3 ${isDark ? "text-cyan-400" : "text-violet-600"}`} style={{ fontWeight: 600 }}>
            Siapa Kami
          </span>
          <h2 className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`} style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            {sectionTitle}
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-500"}`} style={{ fontSize: "1.05rem" }}>
            Kami adalah tim profesional yang berdedikasi dalam menghadirkan solusi digital inovatif untuk membantu bisnis Anda berkembang di era modern.
          </p>
        </motion.div>

        {/* Main content — image + text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <ImageWithFallback
                src={image}
                alt="Tim kami bekerja bersama"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`} />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`absolute -bottom-6 -right-4 sm:-right-8 p-4 rounded-2xl border shadow-2xl ${
                isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                  <Award size={18} className="text-white" />
                </div>
                <div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Penghargaan</div>
                  <div className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>20+ Award</div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`absolute -top-4 -left-4 sm:-left-6 px-4 py-2 rounded-xl border shadow-lg flex items-center gap-2 ${
                isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Aktif Melayani</span>
            </motion.div>
          </motion.div>

          {/* Right — text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className={`mb-3 ${isDark ? "text-white" : "text-gray-900"}`} style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Membangun Masa Depan Digital Bersama Anda
              </h3>
              <p className={`leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {description}
              </p>
            </div>

            {/* Achievements list */}
            <div className="space-y-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={16} className={isDark ? "text-cyan-400 flex-shrink-0" : "text-violet-500 flex-shrink-0"} />
                  <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#layanan"
                onClick={(e) => { e.preventDefault(); document.querySelector("#layanan")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5"
                style={{ fontWeight: 600, fontSize: "0.875rem" }}
              >
                Lihat Layanan Kami
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                    : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                }`}
                style={{ fontWeight: 600 }}
              >
                <Globe size={15} />
                Lihat Portfolio
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl border mb-20 ${
            isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-lg"
          }`}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-1"
                style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className={`inline-block text-sm tracking-widest uppercase mb-3 ${isDark ? "text-cyan-400" : "text-violet-600"}`} style={{ fontWeight: 600 }}>
            Nilai Kami
          </span>
          <h3 className={`${isDark ? "text-white" : "text-gray-900"}`} style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Yang Mendorong Kami Maju
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((val, index) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-default ${
                  isDark
                    ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl"
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${val.color}`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h4 className={`mb-2 ${isDark ? "text-white" : "text-gray-900"}`} style={{ fontWeight: 700, fontSize: "1rem" }}>
                  {val.title}
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}