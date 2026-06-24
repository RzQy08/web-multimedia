// src/app/admin/initialPages.ts
import { PageKey, PageData } from "./types";

export const initialPages: Record<PageKey, PageData> = {
  home: {
    html: `<section style="min-height:100vh;background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%);display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;">
  <div style="text-align:center;color:#fff;padding:2rem;">
    <div style="display:inline-block;padding:0.4rem 1rem;border-radius:999px;background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);color:#22d3ee;font-size:0.75rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1.5rem;">Multimedia Storytelling</div>
    <h1 style="font-size:clamp(2.5rem,6vw,4.5rem);font-weight:800;letter-spacing:-0.04em;line-height:1.08;margin:0 0 1.5rem;">Explore the <span style="background:linear-gradient(90deg,#22d3ee,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Universe</span><br>One Story at a Time</h1>
    <p style="font-size:1.1rem;color:rgba(255,255,255,0.55);max-width:480px;margin:0 auto 2.5rem;line-height:1.6;">Stunning visuals and interactive stories spanning science, nature, history, and culture.</p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
      <a href="#" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.8rem 1.8rem;border-radius:0.75rem;background:linear-gradient(135deg,#06b6d4,#6366f1);color:#fff;font-weight:600;text-decoration:none;font-size:0.9rem;">Start Exploring →</a>
      <a href="#" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.8rem 1.8rem;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);font-weight:600;text-decoration:none;font-size:0.9rem;">▶ Watch Now</a>
    </div>
  </div>
</section>`,
    css: `body { margin: 0; } * { box-sizing: border-box; }`,
    title: "Home / Hero",
    status: "published",
    lastSaved: "2 jam lalu",
  },
  tentang: {
    html: `<section style="padding:5rem 2rem;background:#f8fafc;font-family:system-ui,sans-serif;">
  <div style="max-width:900px;margin:0 auto;">
    <p style="color:#6366f1;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 0.75rem;">Siapa Kami</p>
    <h2 style="font-size:2.5rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin:0 0 1.5rem;">Tentang Kami</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;">
      <div>
        <p style="color:#475569;font-size:1.05rem;line-height:1.7;margin:0 0 1.5rem;">Sejak berdiri pada tahun 2014, LUMINA telah menjadi mitra terpercaya ratusan bisnis di seluruh Indonesia.</p>
        <p style="color:#475569;font-size:1.05rem;line-height:1.7;margin:0 0 2rem;">Tim kami terdiri dari para profesional berpengalaman yang berkomitmen memberikan hasil terbaik.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div style="padding:1rem;border-radius:0.75rem;background:#fff;border:1px solid #e2e8f0;text-align:center;"><div style="font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#06b6d4,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">10+</div><div style="font-size:0.8rem;color:#64748b;">Tahun Pengalaman</div></div>
          <div style="padding:1rem;border-radius:0.75rem;background:#fff;border:1px solid #e2e8f0;text-align:center;"><div style="font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#06b6d4,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">500+</div><div style="font-size:0.8rem;color:#64748b;">Proyek Selesai</div></div>
        </div>
      </div>
      <div style="border-radius:1rem;overflow:hidden;"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Tim kami" style="width:100%;height:300px;object-fit:cover;" /></div>
    </div>
  </div>
</section>`,
    css: `body { margin: 0; } * { box-sizing: border-box; }`,
    title: "Tentang Kami",
    status: "published",
    lastSaved: "5 jam lalu",
  },
  layanan: {
    html: `<section style="padding:5rem 2rem;background:#fff;font-family:system-ui,sans-serif;">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <p style="color:#6366f1;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 0.75rem;">Apa yang Kami Tawarkan</p>
      <h2 style="font-size:2.5rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin:0;">Layanan Kami</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      <div style="padding:1.5rem;border-radius:1rem;border:1px solid #e2e8f0;transition:box-shadow 0.2s;"><div style="display:inline-flex;padding:0.7rem;border-radius:0.6rem;background:linear-gradient(135deg,#06b6d4,#0284c7);margin-bottom:1rem;">💻</div><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem;">Desain Web</h3><p style="font-size:0.875rem;color:#475569;line-height:1.6;margin:0;">Website modern, responsif, dan profesional yang mencerminkan identitas brand Anda.</p></div>
      <div style="padding:1.5rem;border-radius:1rem;border:1px solid #e2e8f0;"><div style="display:inline-flex;padding:0.7rem;border-radius:0.6rem;background:linear-gradient(135deg,#8b5cf6,#6d28d9);margin-bottom:1rem;">📱</div><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem;">Pengembangan Aplikasi</h3><p style="font-size:0.875rem;color:#475569;line-height:1.6;margin:0;">Aplikasi web dan mobile yang powerful, skalabel, dan mudah digunakan.</p></div>
      <div style="padding:1.5rem;border-radius:1rem;border:1px solid #e2e8f0;"><div style="display:inline-flex;padding:0.7rem;border-radius:0.6rem;background:linear-gradient(135deg,#f59e0b,#d97706);margin-bottom:1rem;">📊</div><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem;">Strategi Digital</h3><p style="font-size:0.875rem;color:#475569;line-height:1.6;margin:0;">Strategi pemasaran digital yang terukur, berbasis data, dan berorientasi hasil.</p></div>
      <div style="padding:1.5rem;border-radius:1rem;border:1px solid #e2e8f0;"><div style="display:inline-flex;padding:0.7rem;border-radius:0.6rem;background:linear-gradient(135deg,#10b981,#059669);margin-bottom:1rem;">🔍</div><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem;">SEO & Marketing</h3><p style="font-size:0.875rem;color:#475569;line-height:1.6;margin:0;">Optimasi mesin pencari yang meningkatkan visibilitas dan traffic organik Anda.</p></div>
      <div style="padding:1.5rem;border-radius:1rem;border:1px solid #e2e8f0;"><div style="display:inline-flex;padding:0.7rem;border-radius:0.6rem;background:linear-gradient(135deg,#ef4444,#dc2626);margin-bottom:1rem;">💬</div><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem;">Konsultasi IT</h3><p style="font-size:0.875rem;color:#475569;line-height:1.6;margin:0;">Panduan teknologi dari para ahli untuk keputusan teknologi yang tepat dan efisien.</p></div>
      <div style="padding:1.5rem;border-radius:1rem;border:1px solid #e2e8f0;"><div style="display:inline-flex;padding:0.7rem;border-radius:0.6rem;background:linear-gradient(135deg,#ec4899,#db2777);margin-bottom:1rem;">⚙️</div><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem;">Maintenance & Support</h3><p style="font-size:0.875rem;color:#475569;line-height:1.6;margin:0;">Pemeliharaan dan dukungan teknis 24/7 untuk kelancaran operasional digital Anda.</p></div>
    </div>
  </div>
</section>`,
    css: `body { margin: 0; } * { box-sizing: border-box; }`,
    title: "Layanan",
    status: "published",
    lastSaved: "1 hari lalu",
  },
  portfolio: {
    html: `<section style="padding:5rem 2rem;background:#f8fafc;font-family:system-ui,sans-serif;">
  <div style="max-width:1100px;margin:0 auto;">
    <p style="color:#6366f1;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 0.75rem;">Hasil Kerja Nyata</p>
    <h2 style="font-size:2.5rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin:0 0 3rem;">Portfolio Kami</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.25rem;">
      <div style="grid-column:span 2;border-radius:1.25rem;overflow:hidden;position:relative;height:320px;"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Nusantara Fresh" style="width:100%;height:100%;object-fit:cover;" /><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85),transparent);"></div><div style="position:absolute;bottom:1.5rem;left:1.5rem;color:#fff;"><span style="display:inline-block;padding:0.3rem 0.75rem;border-radius:999px;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);color:#34d399;font-size:0.7rem;font-weight:600;margin-bottom:0.5rem;">E-Commerce</span><h3 style="font-size:1.3rem;font-weight:800;margin:0;">Nusantara Fresh</h3><p style="font-size:0.8rem;color:rgba(255,255,255,0.6);margin:0.25rem 0 0;">Next.js · Tailwind · Stripe</p></div></div>
      <div style="border-radius:1.25rem;overflow:hidden;position:relative;height:320px;"><img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80" alt="HealthTrack" style="width:100%;height:100%;object-fit:cover;" /><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85),transparent);"></div><div style="position:absolute;bottom:1.5rem;left:1.5rem;color:#fff;"><span style="display:inline-block;padding:0.3rem 0.75rem;border-radius:999px;background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.4);color:#a78bfa;font-size:0.7rem;font-weight:600;margin-bottom:0.5rem;">Mobile App</span><h3 style="font-size:1.1rem;font-weight:800;margin:0;">HealthTrack Pro</h3></div></div>
    </div>
  </div>
</section>`,
    css: `body { margin: 0; } * { box-sizing: border-box; }`,
    title: "Portfolio",
    status: "draft",
    lastSaved: "3 hari lalu",
  },
  blog: {
    html: `<section style="padding:5rem 2rem;background:#fff;font-family:system-ui,sans-serif;">
  <div style="max-width:1100px;margin:0 auto;">
    <p style="color:#6366f1;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 0.75rem;">Insight & Inspirasi</p>
    <h2 style="font-size:2.5rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin:0 0 3rem;">Blog & Artikel</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div style="border-radius:1rem;overflow:hidden;border:1px solid #e2e8f0;"><img src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80" alt="Blog post" style="width:100%;height:200px;object-fit:cover;" /><div style="padding:1.25rem;"><span style="display:inline-block;padding:0.25rem 0.6rem;border-radius:0.375rem;background:rgba(6,182,212,0.1);color:#0891b2;font-size:0.7rem;font-weight:600;margin-bottom:0.75rem;">Web Design</span><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem;line-height:1.4;">10 Tren Desain Web 2026 yang Wajib Anda Ketahui</h3><p style="font-size:0.8rem;color:#64748b;margin:0;line-height:1.5;">Dunia desain web terus berkembang — inilah yang akan mendominasi tahun ini.</p><div style="display:flex;gap:1rem;margin-top:0.75rem;font-size:0.75rem;color:#94a3b8;">🕐 7 menit · 👁 12.4K views</div></div></div>
      <div style="border-radius:1rem;overflow:hidden;border:1px solid #e2e8f0;"><img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80" alt="Blog post 2" style="width:100%;height:200px;object-fit:cover;" /><div style="padding:1.25rem;"><span style="display:inline-block;padding:0.25rem 0.6rem;border-radius:0.375rem;background:rgba(239,68,68,0.1);color:#dc2626;font-size:0.7rem;font-weight:600;margin-bottom:0.75rem;">Teknologi</span><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 0.5rem;line-height:1.4;">AI dalam Digital Marketing: Peluang dan Tantangan</h3><p style="font-size:0.8rem;color:#64748b;margin:0;line-height:1.5;">Bagaimana AI mengubah cara kita membuat konten di era baru ini.</p><div style="display:flex;gap:1rem;margin-top:0.75rem;font-size:0.75rem;color:#94a3b8;">🕐 9 menit · 👁 18.5K views</div></div></div>
    </div>
  </div>
</section>`,
    css: `body { margin: 0; } * { box-sizing: border-box; }`,
    title: "Blog & Artikel",
    status: "published",
    lastSaved: "6 jam lalu",
  },
  kontak: {
    html: `<section style="padding:5rem 2rem;background:#f8fafc;font-family:system-ui,sans-serif;">
  <div style="max-width:900px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3rem;">
      <p style="color:#6366f1;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 0.75rem;">Ayo Berkolaborasi</p>
      <h2 style="font-size:2.5rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin:0 0 1rem;">Hubungi Kami</h2>
      <p style="color:#475569;font-size:1.05rem;max-width:480px;margin:0 auto;">Tim kami siap membantu menemukan solusi digital terbaik — gratis dan tanpa kewajiban.</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:2rem;">
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="padding:1rem;border-radius:0.75rem;border:1px solid #e2e8f0;background:#fff;display:flex;gap:1rem;align-items:flex-start;"><div style="padding:0.6rem;border-radius:0.5rem;background:linear-gradient(135deg,#06b6d4,#0284c7);">✉️</div><div><p style="font-size:0.7rem;color:#64748b;font-weight:600;margin:0 0 0.25rem;">Email</p><p style="font-size:0.875rem;font-weight:700;color:#0f172a;margin:0;">halo@lumina.co.id</p></div></div>
        <div style="padding:1rem;border-radius:0.75rem;border:1px solid #e2e8f0;background:#fff;display:flex;gap:1rem;align-items:flex-start;"><div style="padding:0.6rem;border-radius:0.5rem;background:linear-gradient(135deg,#8b5cf6,#6d28d9);">📞</div><div><p style="font-size:0.7rem;color:#64748b;font-weight:600;margin:0 0 0.25rem;">Telepon</p><p style="font-size:0.875rem;font-weight:700;color:#0f172a;margin:0;">+62 812-3456-7890</p></div></div>
        <div style="padding:1rem;border-radius:0.75rem;border:1px solid #e2e8f0;background:#fff;display:flex;gap:1rem;align-items:flex-start;"><div style="padding:0.6rem;border-radius:0.5rem;background:linear-gradient(135deg,#10b981,#059669);">📍</div><div><p style="font-size:0.7rem;color:#64748b;font-weight:600;margin:0 0 0.25rem;">Kantor</p><p style="font-size:0.875rem;font-weight:700;color:#0f172a;margin:0;">Jl. Sudirman No. 88, Jakarta Selatan</p></div></div>
      </div>
      <div style="background:#fff;border-radius:1rem;border:1px solid #e2e8f0;padding:1.75rem;"><h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 1.5rem;">Kirim Pesan</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;"><input placeholder="Nama Lengkap" style="padding:0.7rem 1rem;border-radius:0.5rem;border:1px solid #e2e8f0;font-size:0.875rem;outline:none;" /><input placeholder="Email" style="padding:0.7rem 1rem;border-radius:0.5rem;border:1px solid #e2e8f0;font-size:0.875rem;outline:none;" /></div><textarea placeholder="Ceritakan kebutuhan Anda..." rows="4" style="width:100%;padding:0.7rem 1rem;border-radius:0.5rem;border:1px solid #e2e8f0;font-size:0.875rem;resize:none;outline:none;box-sizing:border-box;margin-bottom:1rem;"></textarea><button style="width:100%;padding:0.8rem;border-radius:0.6rem;background:linear-gradient(135deg,#06b6d4,#6366f1);color:#fff;font-weight:600;font-size:0.9rem;border:none;cursor:pointer;">Kirim Pesan Sekarang →</button></div>
    </div>
  </div>
</section>`,
    css: `body { margin: 0; } * { box-sizing: border-box; }`,
    title: "Hubungi Kami",
    status: "published",
    lastSaved: "12 jam lalu",
  },
};