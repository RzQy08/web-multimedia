import { motion } from "motion/react";
import { Monitor, Smartphone, BarChart3, Search, MessageSquare, Settings, ArrowRight, CheckCircle2, Zap } from "lucide-react";

interface LayananSectionProps {
  isDark: boolean;
  searchQuery: string;
}

const layanan = [
  {
    id: "desain-web",
    icon: Monitor,
    title: "Desain Web",
    tagline: "Tampilan yang Memukau",
    description: "Kami merancang website modern, responsif, dan profesional yang mencerminkan identitas brand Anda dan memberikan pengalaman terbaik bagi pengguna.",
    features: ["UI/UX Design", "Responsive Layout", "Branding & Identity", "Prototype & Wireframe"],
    color: "from-cyan-500 to-blue-600",
    bgGlow: "from-cyan-500/10 to-blue-600/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-400",
    badge: "Populer",
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "aplikasi",
    icon: Smartphone,
    title: "Pengembangan Aplikasi",
    tagline: "Solusi Mobile & Web App",
    description: "Membangun aplikasi web dan mobile yang powerful, skalabel, dan mudah digunakan — dari konsep hingga peluncuran penuh.",
    features: ["Web Application", "Mobile App (iOS & Android)", "API Integration", "Cloud Deployment"],
    color: "from-violet-500 to-purple-700",
    bgGlow: "from-violet-500/10 to-purple-700/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-400",
    badge: "Unggulan",
    badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  },
  {
    id: "strategi",
    icon: BarChart3,
    title: "Strategi Digital",
    tagline: "Rencana yang Tepat Sasaran",
    description: "Kami membantu bisnis Anda merancang strategi pemasaran digital yang terukur, berbasis data, dan berorientasi hasil nyata.",
    features: ["Digital Marketing Plan", "Content Strategy", "Analitik & Pelaporan", "Growth Hacking"],
    color: "from-amber-500 to-orange-600",
    bgGlow: "from-amber-500/10 to-orange-600/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    badge: null,
    badgeColor: "",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & Marketing",
    tagline: "Tampil di Halaman Pertama",
    description: "Optimasi mesin pencari dan kampanye pemasaran digital yang meningkatkan visibilitas, traffic organik, dan konversi bisnis Anda.",
    features: ["On-Page & Off-Page SEO", "Google Ads & Meta Ads", "Email Marketing", "Konten Berkualitas"],
    color: "from-emerald-500 to-green-600",
    bgGlow: "from-emerald-500/10 to-green-600/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    badge: null,
    badgeColor: "",
  },
  {
    id: "konsultasi",
    icon: MessageSquare,
    title: "Konsultasi IT",
    tagline: "Panduan Ahli untuk Bisnis Anda",
    description: "Dapatkan panduan teknologi dari para ahli kami untuk membantu Anda membuat keputusan teknologi yang tepat dan efisien.",
    features: ["Tech Stack Consultation", "System Architecture", "Security Audit", "Digital Transformation"],
    color: "from-rose-500 to-pink-600",
    bgGlow: "from-rose-500/10 to-pink-600/10",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-400",
    badge: null,
    badgeColor: "",
  },
  {
    id: "maintenance",
    icon: Settings,
    title: "Maintenance & Support",
    tagline: "Layanan Purna Jual Terpercaya",
    description: "Kami menjamin operasional digital Anda berjalan lancar dengan layanan pemeliharaan, pembaruan, dan dukungan teknis 24/7.",
    features: ["24/7 Technical Support", "Regular Updates", "Performance Monitoring", "Backup & Recovery"],
    color: "from-fuchsia-500 to-violet-600",
    bgGlow: "from-fuchsia-500/10 to-violet-600/10",
    borderColor: "border-fuchsia-500/30",
    textColor: "text-fuchsia-400",
    badge: null,
    badgeColor: "",
  },
];

export function LayananSection({ isDark, searchQuery }: LayananSectionProps) {
  const filtered = layanan.filter(
    (l) =>
      !searchQuery ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="layanan"
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
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <span className={`inline-block text-sm tracking-widest uppercase mb-3 ${isDark ? "text-cyan-400" : "text-violet-600"}`} style={{ fontWeight: 600 }}>
              Apa yang Kami Tawarkan
            </span>
            <h2 className={`mb-3 ${isDark ? "text-white" : "text-gray-900"}`} style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Layanan Kami
            </h2>
            <p className={`max-w-xl ${isDark ? "text-gray-400" : "text-gray-500"}`} style={{ fontSize: "1.05rem" }}>
              Solusi digital lengkap yang dirancang untuk mendorong pertumbuhan dan kesuksesan bisnis Anda.
            </p>
          </div>
          <a
            href="#newsletter"
            onClick={(e) => { e.preventDefault(); document.querySelector("#newsletter")?.scrollIntoView({ behavior: "smooth" }); }}
            className={`flex-shrink-0 flex items-center gap-2 text-sm transition-colors ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-violet-600 hover:text-violet-700"}`}
            style={{ fontWeight: 600 }}
          >
            Konsultasi Gratis
            <ArrowRight size={16} />
          </a>
        </motion.div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Tidak ada layanan yang cocok dengan pencarian Anda.
          </div>
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer ${
                  isDark
                    ? `bg-gray-800 ${item.borderColor} hover:border-opacity-70 hover:shadow-xl hover:shadow-black/30`
                    : `bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/80`
                }`}
              >
                {/* Top glow bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-6">
                  {/* Badge + Icon row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    {item.badge && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs border ${item.badgeColor}`} style={{ fontWeight: 600 }}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & tagline */}
                  <div className="mb-3">
                    <h3 className={`mb-1 ${isDark ? "text-white" : "text-gray-900"}`} style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                      {item.title}
                    </h3>
                    <p className={`text-xs tracking-wide ${item.textColor}`} style={{ fontWeight: 600 }}>
                      {item.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {item.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className={item.textColor} />
                        <span className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <div className={`flex items-center gap-1.5 text-sm ${item.textColor} group-hover:gap-2.5 transition-all duration-200`} style={{ fontWeight: 600 }}>
                    <Zap size={13} />
                    Pelajari Lebih Lanjut
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-14 p-8 sm:p-10 rounded-2xl border relative overflow-hidden ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className={`mb-1 ${isDark ? "text-white" : "text-gray-900"}`} style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
                Tidak yakin layanan mana yang tepat?
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`} style={{ fontSize: "0.95rem" }}>
                Konsultasikan kebutuhan bisnis Anda dengan tim kami — gratis dan tanpa kewajiban.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="#newsletter"
                onClick={(e) => { e.preventDefault(); document.querySelector("#newsletter")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 whitespace-nowrap"
                style={{ fontWeight: 600, fontSize: "0.875rem" }}
              >
                Hubungi Kami
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap ${
                  isDark
                    ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white"
                    : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                }`}
                style={{ fontWeight: 600 }}
              >
                Lihat Portfolio
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}