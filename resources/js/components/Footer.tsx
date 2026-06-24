import { motion } from "motion/react";
import { Zap, Instagram, Youtube, Facebook, Linkedin, Twitter, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  isDark: boolean;
}

const footerLinks = {
  Layanan: [
    { label: "Desain Web", href: "#desain-web" },
    { label: "Pengembangan Aplikasi", href: "#aplikasi" },
    { label: "Strategi Digital", href: "#strategi" },
    { label: "SEO & Marketing", href: "#seo" },
    { label: "Konsultasi IT", href: "#konsultasi" },
    { label: "Maintenance & Support", href: "#maintenance" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog & Artikel", href: "#blog" },
    { label: "Karir", href: "#" },
    { label: "Press & Media", href: "#" },
  ],
  Dukungan: [
    { label: "Hubungi Kami", href: "#kontak" },
    { label: "FAQ", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
};

const socials = [
  { Icon: Instagram, label: "Instagram", href: "#", hoverColor: "hover:text-pink-400 hover:bg-pink-400/10" },
  { Icon: Twitter, label: "Twitter / X", href: "#", hoverColor: "hover:text-sky-400 hover:bg-sky-400/10" },
  { Icon: Linkedin, label: "LinkedIn", href: "#", hoverColor: "hover:text-blue-400 hover:bg-blue-400/10" },
  { Icon: Youtube, label: "YouTube", href: "#", hoverColor: "hover:text-red-400 hover:bg-red-400/10" },
  { Icon: Facebook, label: "Facebook", href: "#", hoverColor: "hover:text-blue-500 hover:bg-blue-500/10" },
];

const achievements = [
  { value: "10+", label: "Tahun Pengalaman" },
  { value: "500+", label: "Proyek Selesai" },
  { value: "150+", label: "Klien Puas" },
];

export function Footer({ isDark }: FooterProps) {
  const handleNavClick = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      {/* Top CTA strip */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-cyan-400 text-xs tracking-widest uppercase mb-1" style={{ fontWeight: 600 }}>
                Mulai perjalanan digital Anda
              </p>
              <h3 className="text-white text-xl" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                Siap membangun sesuatu yang luar biasa?
              </h3>
            </div>
            <a
              href="#kontak"
              onClick={(e) => { e.preventDefault(); handleNavClick("#kontak"); }}
              className="flex-shrink-0 group flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 whitespace-nowrap"
              style={{ fontWeight: 600, fontSize: "0.875rem" }}
            >
              Konsultasi Gratis
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center gap-2.5 mb-4 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform duration-200">
                <Zap size={17} className="text-white" />
              </div>
              <span className="text-white text-xl" style={{ fontWeight: 800, letterSpacing: "-0.03em" }}>LUMINA</span>
            </a>

            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Kami adalah mitra digital terpercaya untuk bisnis Anda. Dari desain web hingga strategi pemasaran digital — kami hadir untuk mendorong pertumbuhan bisnis Anda ke level berikutnya.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              {[
                { Icon: Mail, text: "halo@lumina.co.id" },
                { Icon: Phone, text: "+62 812-3456-7890" },
                { Icon: MapPin, text: "Jl. Sudirman No. 88, Jakarta Selatan" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={13} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-400 text-xs">{text}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, label, href, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className={`p-2 rounded-lg bg-gray-800 text-gray-400 border border-gray-700 transition-all duration-200 hover:scale-110 hover:border-gray-500 ${hoverColor}`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="lg:col-span-2">
              <h4 className="text-white text-sm mb-4" style={{ fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.7rem" }}>
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="group flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-200 transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-2.5 overflow-hidden transition-all duration-200 flex-shrink-0">
                        <ArrowRight size={10} className="text-cyan-500" />
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Achievement column */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm mb-4" style={{ fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.7rem" }}>
              Pencapaian
            </h4>
            <div className="space-y-3">
              {achievements.map((a) => (
                <div
                  key={a.label}
                  className="p-3 rounded-xl bg-gray-900 border border-gray-800"
                >
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
                    style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {a.value}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">{a.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 LUMINA Digital Agency. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            {["Kebijakan Privasi", "Syarat & Ketentuan", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-gray-700 text-xs">
            <span>Dibuat dengan</span>
            <span className="text-rose-500">♥</span>
            <span>di Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}