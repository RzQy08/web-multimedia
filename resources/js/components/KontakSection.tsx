import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Clock,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { getContent, ContentMap } from "../lib/parseContent";

interface KontakSectionProps {
  isDark: boolean;
  /** Data dari database (section_contents). Kosongkan untuk pakai nilai default. */
  content?: ContentMap;
}

const socials = [
  { Icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-400" },
  { Icon: Twitter, label: "Twitter / X", href: "#", color: "hover:text-cyan-400" },
  { Icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-400" },
  { Icon: Youtube, label: "YouTube", href: "#", color: "hover:text-red-400" },
];

const services = [
  "Desain Web",
  "Pengembangan Aplikasi",
  "Strategi Digital",
  "SEO & Marketing",
  "Konsultasi IT",
  "Maintenance & Support",
];

export function KontakSection({ isDark, content = {} }: KontakSectionProps) {
  const sectionTitle    = getContent(content, "section_title", "Hubungi Kami");
  const sectionSubtitle = getContent(
    content,
    "section_subtitle",
    "Ceritakan kebutuhan bisnis Anda. Tim kami siap membantu menemukan solusi digital terbaik — gratis dan tanpa kewajiban."
  );
  const email   = getContent(content, "email", "halo@lumina.co.id");
  const phone   = getContent(content, "phone", "+62 812-3456-7890");
  const address = getContent(content, "address", "Jl. Sudirman No. 88, Jakarta Selatan");

  // contactInfo dibangun dari data database (email, phone, address) + icon statis
  const contactInfoData = [
    { icon: Mail, label: "Email", value: email, description: "Balas dalam 1x24 jam", color: "from-cyan-500 to-blue-600" },
    { icon: Phone, label: "Telepon & WhatsApp", value: phone, description: "Senin–Jumat, 09.00–18.00 WIB", color: "from-violet-500 to-purple-600" },
    { icon: MapPin, label: "Kantor", value: address, description: "Buka untuk konsultasi tatap muka", color: "from-emerald-500 to-green-600" },
    { icon: Clock, label: "Jam Operasional", value: "Senin – Jumat", description: "09.00 – 18.00 WIB", color: "from-amber-500 to-orange-600" },
  ];

  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    layanan: "",
    pesan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Masukkan email yang valid";
    if (!form.pesan.trim()) newErrors.pesan = "Pesan wajib diisi";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 text-sm ${
      isDark
        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-violet-500"
    } ${errors[field] ? "border-red-500 focus:border-red-500" : ""}`;

  return (
    <section
      id="kontak"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-violet-500/8 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className={`inline-block text-sm tracking-widest uppercase mb-3 ${isDark ? "text-cyan-400" : "text-violet-600"}`}
            style={{ fontWeight: 600 }}
          >
            Ayo Berkolaborasi
          </span>
          <h2
            className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            {sectionTitle}
          </h2>
          <p
            className={`max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-500"}`}
            style={{ fontSize: "1.05rem" }}
          >
            {sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info cards */}
            <div className="space-y-4">
              {contactInfoData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark
                        ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} flex-shrink-0`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs mb-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`} style={{ fontWeight: 600 }}>
                        {item.label}
                      </p>
                      <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`} style={{ fontWeight: 700 }}>
                        {item.value}
                      </p>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social media */}
            <div className={`p-5 rounded-2xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} style={{ fontWeight: 600 }}>
                Ikuti Kami di Media Sosial
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => e.preventDefault()}
                    aria-label={label}
                    className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 ${color} ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-400"
                        : "bg-white border-gray-200 text-gray-500"
                    }`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick response badge */}
            <div className={`flex items-center gap-3 p-4 rounded-2xl border ${isDark ? "bg-cyan-500/10 border-cyan-500/30" : "bg-violet-50 border-violet-200"}`}>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <p className={`text-sm ${isDark ? "text-cyan-300" : "text-violet-700"}`} style={{ fontWeight: 600 }}>
                Tim kami online dan siap membantu Anda sekarang!
              </p>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div
              className={`rounded-2xl border p-6 sm:p-8 ${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-xl"
              }`}
            >
              {!submitted ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600">
                      <MessageSquare size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className={`${isDark ? "text-white" : "text-gray-900"}`} style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                        Kirim Pesan
                      </h3>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Isi form di bawah — kami akan segera menghubungi Anda
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Nama + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`} style={{ fontWeight: 600 }}>
                          Nama Lengkap <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.nama}
                          onChange={(e) => { setForm({ ...form, nama: e.target.value }); setErrors({ ...errors, nama: "" }); }}
                          placeholder="Nama Anda"
                          className={inputClass("nama")}
                        />
                        {errors.nama && <p className="text-xs text-red-400 mt-1">{errors.nama}</p>}
                      </div>
                      <div>
                        <label className={`block text-xs mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`} style={{ fontWeight: 600 }}>
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                          placeholder="email@perusahaan.com"
                          className={inputClass("email")}
                        />
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Row 2: Telepon + Layanan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`} style={{ fontWeight: 600 }}>
                          Nomor Telepon
                        </label>
                        <input
                          type="tel"
                          value={form.telepon}
                          onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                          placeholder="+62 812-xxxx-xxxx"
                          className={inputClass("telepon")}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`} style={{ fontWeight: 600 }}>
                          Layanan yang Diminati
                        </label>
                        <select
                          value={form.layanan}
                          onChange={(e) => setForm({ ...form, layanan: e.target.value })}
                          className={`${inputClass("layanan")} cursor-pointer`}
                        >
                          <option value="">Pilih layanan...</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Pesan */}
                    <div>
                      <label className={`block text-xs mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`} style={{ fontWeight: 600 }}>
                        Ceritakan Kebutuhan Anda <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={form.pesan}
                        onChange={(e) => { setForm({ ...form, pesan: e.target.value }); setErrors({ ...errors, pesan: "" }); }}
                        placeholder="Jelaskan proyek atau kebutuhan bisnis Anda secara singkat..."
                        rows={4}
                        className={`${inputClass("pesan")} resize-none`}
                      />
                      {errors.pesan && <p className="text-xs text-red-400 mt-1">{errors.pesan}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98]"
                      style={{ fontWeight: 600 }}
                    >
                      Kirim Pesan Sekarang
                      <Send size={16} />
                    </button>

                    <p className={`text-xs text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      Data Anda aman bersama kami. Kami tidak akan menyebarkan informasi pribadi Anda.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-violet-500/30">
                    <CheckCircle2 size={36} className="text-white" />
                  </div>
                  <h3
                    className={`mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                    style={{ fontSize: "1.4rem", fontWeight: 800 }}
                  >
                    Pesan Terkirim! 🎉
                  </h3>
                  <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Terima kasih, <strong>{form.nama}</strong>! Tim kami akan menghubungi Anda di{" "}
                    <strong>{form.email}</strong> dalam 1x24 jam.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ nama: "", email: "", telepon: "", layanan: "", pesan: "" }); }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm transition-all duration-200 hover:scale-105 ${
                      isDark
                        ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white"
                        : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Kirim Pesan Lain
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}