// resources/js/lib/sectionTemplates.ts
//
// Template HTML default untuk setiap section_type.
// Dipakai GrapesJS sebagai konten awal saat admin membuat section baru.
// Konten ini diambil dari visual komponen React yang sudah ada di /components/*.tsx
// sehingga tampilan awal sudah sesuai dengan desain website.

export const sectionTemplates: Record<string, { html: string; css: string }> = {

  hero: {
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }
#hero { position: relative; min-height: 100vh; display: flex; align-items: center; background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%); overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1080&q=80') center/cover; opacity: 0.35; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%); }
.hero-content { position: relative; z-index: 1; max-width: 680px; padding: 2rem 3rem; }
.hero-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(34,211,238,0.3); background: rgba(34,211,238,0.1); color: #22d3ee; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 1.5rem; }
.hero-title { color: #fff; font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.08; margin-bottom: 1.25rem; }
.hero-title .highlight { background: linear-gradient(90deg, #22d3ee, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { color: rgba(255,255,255,0.55); font-size: 1.05rem; line-height: 1.65; margin-bottom: 2rem; max-width: 480px; }
.hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }
.btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 0.75rem 1.75rem; border-radius: 10px; background: linear-gradient(135deg, #06b6d4, #6366f1); color: #fff; font-weight: 600; font-size: 0.9rem; text-decoration: none; border: none; cursor: pointer; }
.btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 0.75rem 1.75rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); font-weight: 600; font-size: 0.9rem; text-decoration: none; background: transparent; cursor: pointer; }
.hero-stats { display: flex; gap: 2rem; }
.stat-value { color: #fff; font-size: 1.6rem; font-weight: 800; }
.stat-label { color: rgba(255,255,255,0.45); font-size: 0.75rem; margin-top: 2px; }`,
    html: `<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-badge">🌐 Multimedia Storytelling</div>
    <h1 class="hero-title">
      Explore the<br>
      <span class="highlight">Universe</span><br>
      One Story at a Time
    </h1>
    <p class="hero-subtitle">
      Stunning visuals and interactive stories spanning science, nature, history, and culture.
    </p>
    <div class="hero-ctas">
      <a href="#" class="btn-primary">Start Exploring →</a>
      <a href="#" class="btn-secondary">▶ Watch Now</a>
    </div>
    <div class="hero-stats">
      <div><div class="stat-value">500K+</div><div class="stat-label">Stories Published</div></div>
      <div><div class="stat-value">12M+</div><div class="stat-label">Monthly Readers</div></div>
      <div><div class="stat-value">150+</div><div class="stat-label">Countries Reached</div></div>
    </div>
  </div>
</section>`,
  },

  navbar: {
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }
.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 50; backdrop-filter: blur(12px); background: rgba(0,0,0,0.8); border-bottom: 1px solid rgba(255,255,255,0.1); }
.nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; height: 64px; }
.nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.nav-logo-icon { width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #22d3ee, #7c3aed); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 14px; }
.nav-logo-text { color: #fff; font-weight: 800; font-size: 1.2rem; letter-spacing: -0.02em; }
.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-link { color: rgba(255,255,255,0.7); text-decoration: none; padding: 6px 12px; border-radius: 6px; font-size: 0.875rem; transition: background 0.15s; }
.nav-link:hover { background: rgba(255,255,255,0.08); color: #fff; }
.nav-cta { padding: 8px 18px; border-radius: 8px; background: linear-gradient(135deg, #06b6d4, #6366f1); color: #fff; font-size: 0.875rem; font-weight: 600; text-decoration: none; }`,
    html: `<header class="navbar">
  <div class="nav-inner">
    <a href="#" class="nav-logo">
      <div class="nav-logo-icon">⚡</div>
      <span class="nav-logo-text">LUMINA</span>
    </a>
    <nav class="nav-links">
      <a href="#" class="nav-link">Home</a>
      <a href="#tentang" class="nav-link">Tentang Kami</a>
      <a href="#layanan" class="nav-link">Layanan</a>
      <a href="#portfolio" class="nav-link">Portfolio</a>
      <a href="#blog" class="nav-link">Blog</a>
    </nav>
    <a href="#kontak" class="nav-cta">Hubungi Kami</a>
  </div>
</header>`,
  },

  layanan: {
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }
#layanan { padding: 5rem 1.5rem; background: #fff; }
.section-header { text-align: center; margin-bottom: 3.5rem; }
.section-badge { color: #6366f1; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 0.75rem; }
.section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; color: #0f172a; letter-spacing: -0.03em; }
.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; max-width: 1100px; margin: 0 auto; }
.service-card { padding: 1.5rem; border-radius: 1rem; border: 1px solid #e2e8f0; transition: box-shadow 0.2s; }
.service-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.service-icon { display: inline-flex; padding: 0.7rem; border-radius: 0.6rem; margin-bottom: 1rem; font-size: 1.25rem; }
.service-title { font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem; }
.service-desc { font-size: 0.875rem; color: #475569; line-height: 1.6; }`,
    html: `<section id="layanan">
  <div class="section-header">
    <span class="section-badge">Apa yang Kami Tawarkan</span>
    <h2 class="section-title">Layanan Kami</h2>
  </div>
  <div class="services-grid">
    <div class="service-card">
      <div class="service-icon" style="background: linear-gradient(135deg,#06b6d4,#0284c7);">💻</div>
      <h3 class="service-title">Desain Web</h3>
      <p class="service-desc">Website modern, responsif, dan profesional yang mencerminkan identitas brand Anda.</p>
    </div>
    <div class="service-card">
      <div class="service-icon" style="background: linear-gradient(135deg,#8b5cf6,#6d28d9);">📱</div>
      <h3 class="service-title">Pengembangan Aplikasi</h3>
      <p class="service-desc">Aplikasi web dan mobile yang powerful, skalabel, dan mudah digunakan.</p>
    </div>
    <div class="service-card">
      <div class="service-icon" style="background: linear-gradient(135deg,#f59e0b,#d97706);">📊</div>
      <h3 class="service-title">Strategi Digital</h3>
      <p class="service-desc">Strategi pemasaran digital yang terukur, berbasis data, dan berorientasi hasil.</p>
    </div>
    <div class="service-card">
      <div class="service-icon" style="background: linear-gradient(135deg,#10b981,#059669);">🔍</div>
      <h3 class="service-title">SEO &amp; Marketing</h3>
      <p class="service-desc">Optimasi mesin pencari yang meningkatkan visibilitas dan traffic organik Anda.</p>
    </div>
    <div class="service-card">
      <div class="service-icon" style="background: linear-gradient(135deg,#ef4444,#dc2626);">💬</div>
      <h3 class="service-title">Konsultasi IT</h3>
      <p class="service-desc">Panduan teknologi dari para ahli untuk keputusan teknologi yang tepat dan efisien.</p>
    </div>
    <div class="service-card">
      <div class="service-icon" style="background: linear-gradient(135deg,#ec4899,#db2777);">⚙️</div>
      <h3 class="service-title">Maintenance &amp; Support</h3>
      <p class="service-desc">Pemeliharaan dan dukungan teknis 24/7 untuk kelancaran operasional digital Anda.</p>
    </div>
  </div>
</section>`,
  },

  tentang_kami: {
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }
#tentang { padding: 5rem 1.5rem; background: #f8fafc; }
.tentang-inner { max-width: 1100px; margin: 0 auto; }
.section-badge { color: #6366f1; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 0.75rem; }
.section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin-bottom: 1.5rem; }
.tentang-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; }
.tentang-desc { color: #475569; font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem; }
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
.stat-card { padding: 1rem; border-radius: 0.75rem; background: #fff; border: 1px solid #e2e8f0; text-align: center; }
.stat-value { font-size: 1.75rem; font-weight: 800; background: linear-gradient(135deg, #06b6d4, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.stat-label { font-size: 0.8rem; color: #64748b; margin-top: 2px; }
.tentang-image { border-radius: 1rem; overflow: hidden; }
.tentang-image img { width: 100%; height: 350px; object-fit: cover; display: block; }`,
    html: `<section id="tentang">
  <div class="tentang-inner">
    <div class="tentang-grid">
      <div>
        <span class="section-badge">Siapa Kami</span>
        <h2 class="section-title">Tentang Kami</h2>
        <p class="tentang-desc">Sejak berdiri pada tahun 2014, LUMINA telah menjadi mitra terpercaya ratusan bisnis di seluruh Indonesia dalam perjalanan transformasi digital mereka.</p>
        <p class="tentang-desc">Tim kami terdiri dari para profesional berpengalaman di bidang desain, teknologi, dan strategi digital yang berkomitmen memberikan hasil terbaik.</p>
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-value">10+</div><div class="stat-label">Tahun Pengalaman</div></div>
          <div class="stat-card"><div class="stat-value">500+</div><div class="stat-label">Proyek Selesai</div></div>
          <div class="stat-card"><div class="stat-value">150+</div><div class="stat-label">Klien Puas</div></div>
          <div class="stat-card"><div class="stat-value">50+</div><div class="stat-label">Tim Profesional</div></div>
        </div>
      </div>
      <div class="tentang-image">
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Tim kami" />
      </div>
    </div>
  </div>
</section>`,
  },

  portfolio: {
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }
#portfolio { padding: 5rem 1.5rem; background: #f8fafc; }
.portfolio-inner { max-width: 1100px; margin: 0 auto; }
.section-badge { color: #6366f1; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 0.75rem; }
.section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin-bottom: 2.5rem; }
.portfolio-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; }
.portfolio-item { border-radius: 1.25rem; overflow: hidden; position: relative; height: 280px; }
.portfolio-item.featured { grid-column: span 2; }
.portfolio-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
.portfolio-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); }
.portfolio-info { position: absolute; bottom: 1.25rem; left: 1.25rem; color: #fff; }
.portfolio-cat { display: inline-block; padding: 0.25rem 0.7rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; margin-bottom: 0.5rem; background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); color: #34d399; }
.portfolio-title { font-size: 1.1rem; font-weight: 800; }
.portfolio-tags { font-size: 0.75rem; color: rgba(255,255,255,0.55); margin-top: 0.25rem; }`,
    html: `<section id="portfolio">
  <div class="portfolio-inner">
    <span class="section-badge">Hasil Kerja Nyata</span>
    <h2 class="section-title">Portfolio Kami</h2>
    <div class="portfolio-grid">
      <div class="portfolio-item featured">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Nusantara Fresh" />
        <div class="portfolio-overlay"></div>
        <div class="portfolio-info">
          <span class="portfolio-cat">E-Commerce</span>
          <div class="portfolio-title">Nusantara Fresh</div>
          <div class="portfolio-tags">Next.js · Tailwind · Stripe</div>
        </div>
      </div>
      <div class="portfolio-item">
        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80" alt="HealthTrack" />
        <div class="portfolio-overlay"></div>
        <div class="portfolio-info">
          <span class="portfolio-cat" style="background:rgba(139,92,246,0.2);border-color:rgba(139,92,246,0.4);color:#a78bfa;">Mobile App</span>
          <div class="portfolio-title">HealthTrack Pro</div>
          <div class="portfolio-tags">React Native · Firebase · AI</div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  },

  blog: {
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }
#blog { padding: 5rem 1.5rem; background: #fff; }
.blog-inner { max-width: 1100px; margin: 0 auto; }
.section-badge { color: #6366f1; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 0.75rem; }
.section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin-bottom: 2.5rem; }
.blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.blog-card { border-radius: 1rem; overflow: hidden; border: 1px solid #e2e8f0; }
.blog-card img { width: 100%; height: 200px; object-fit: cover; display: block; }
.blog-body { padding: 1.25rem; }
.blog-cat { display: inline-block; padding: 0.25rem 0.6rem; border-radius: 0.375rem; font-size: 0.7rem; font-weight: 600; margin-bottom: 0.75rem; }
.blog-title { font-size: 1rem; font-weight: 700; color: #0f172a; line-height: 1.4; margin-bottom: 0.5rem; }
.blog-excerpt { font-size: 0.8rem; color: #64748b; line-height: 1.55; }
.blog-meta { display: flex; gap: 1rem; margin-top: 0.75rem; font-size: 0.75rem; color: #94a3b8; }`,
    html: `<section id="blog">
  <div class="blog-inner">
    <span class="section-badge">Insight &amp; Inspirasi</span>
    <h2 class="section-title">Blog &amp; Artikel</h2>
    <div class="blog-grid">
      <div class="blog-card">
        <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80" alt="Blog 1" />
        <div class="blog-body">
          <span class="blog-cat" style="background:rgba(6,182,212,0.1);color:#0891b2;">Web Design</span>
          <h3 class="blog-title">10 Tren Desain Web 2026 yang Wajib Anda Ketahui</h3>
          <p class="blog-excerpt">Dunia desain web terus berkembang — inilah yang akan mendominasi tahun ini.</p>
          <div class="blog-meta"><span>🕐 7 menit</span><span>👁 12.4K views</span></div>
        </div>
      </div>
      <div class="blog-card">
        <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80" alt="Blog 2" />
        <div class="blog-body">
          <span class="blog-cat" style="background:rgba(239,68,68,0.1);color:#dc2626;">Teknologi</span>
          <h3 class="blog-title">AI dalam Digital Marketing: Peluang dan Tantangan</h3>
          <p class="blog-excerpt">Bagaimana AI mengubah cara kita membuat dan mengelola konten.</p>
          <div class="blog-meta"><span>🕐 9 menit</span><span>👁 18.5K views</span></div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  },

  kontak: {
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }
#kontak { padding: 5rem 1.5rem; background: #f8fafc; }
.kontak-inner { max-width: 900px; margin: 0 auto; }
.kontak-header { text-align: center; margin-bottom: 3rem; }
.section-badge { color: #6366f1; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 0.75rem; }
.section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; color: #0f172a; letter-spacing: -0.03em; }
.kontak-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 2rem; }
.contact-info { display: flex; flex-direction: column; gap: 1rem; }
.contact-card { padding: 1rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; background: #fff; display: flex; gap: 1rem; align-items: flex-start; }
.contact-icon { padding: 0.6rem; border-radius: 0.5rem; font-size: 1rem; }
.contact-label { font-size: 0.7rem; color: #64748b; font-weight: 600; margin-bottom: 0.25rem; }
.contact-value { font-size: 0.875rem; font-weight: 700; color: #0f172a; }
.contact-form { background: #fff; border-radius: 1rem; border: 1px solid #e2e8f0; padding: 1.75rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.form-input { width: 100%; padding: 0.7rem 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0; font-size: 0.875rem; outline: none; font-family: inherit; }
.form-textarea { width: 100%; padding: 0.7rem 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0; font-size: 0.875rem; resize: none; outline: none; font-family: inherit; margin-bottom: 1rem; }
.form-btn { width: 100%; padding: 0.8rem; border-radius: 0.6rem; background: linear-gradient(135deg, #06b6d4, #6366f1); color: #fff; font-weight: 600; font-size: 0.9rem; border: none; cursor: pointer; }`,
    html: `<section id="kontak">
  <div class="kontak-inner">
    <div class="kontak-header">
      <span class="section-badge">Ayo Berkolaborasi</span>
      <h2 class="section-title">Hubungi Kami</h2>
    </div>
    <div class="kontak-grid">
      <div class="contact-info">
        <div class="contact-card">
          <div class="contact-icon" style="background:linear-gradient(135deg,#06b6d4,#0284c7);">✉️</div>
          <div><div class="contact-label">Email</div><div class="contact-value">halo@lumina.co.id</div></div>
        </div>
        <div class="contact-card">
          <div class="contact-icon" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);">📞</div>
          <div><div class="contact-label">Telepon</div><div class="contact-value">+62 812-3456-7890</div></div>
        </div>
        <div class="contact-card">
          <div class="contact-icon" style="background:linear-gradient(135deg,#10b981,#059669);">📍</div>
          <div><div class="contact-label">Kantor</div><div class="contact-value">Jl. Sudirman No. 88, Jakarta Selatan</div></div>
        </div>
      </div>
      <div class="contact-form">
        <div class="form-row">
          <input class="form-input" placeholder="Nama Lengkap" />
          <input class="form-input" placeholder="Email" />
        </div>
        <textarea class="form-textarea" rows="4" placeholder="Ceritakan kebutuhan Anda..."></textarea>
        <button class="form-btn">Kirim Pesan Sekarang →</button>
      </div>
    </div>
  </div>
</section>`,
  },

  footer: {
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; }
.site-footer { background: #030712; border-top: 1px solid #1f2937; color: #fff; padding: 4rem 1.5rem 2rem; }
.footer-inner { max-width: 1100px; margin: 0 auto; }
.footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
.footer-logo { display: flex; align-items: center; gap: 8px; margin-bottom: 1rem; }
.footer-logo-icon { width: 30px; height: 30px; border-radius: 7px; background: linear-gradient(135deg, #22d3ee, #7c3aed); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 13px; }
.footer-logo-text { color: #fff; font-weight: 800; font-size: 1.1rem; }
.footer-tagline { color: rgba(255,255,255,0.45); font-size: 0.875rem; line-height: 1.6; }
.footer-col-title { color: #fff; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.footer-links a { color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.875rem; transition: color 0.15s; }
.footer-links a:hover { color: rgba(255,255,255,0.8); }
.footer-bottom { border-top: 1px solid #1f2937; padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.footer-copy { color: rgba(255,255,255,0.3); font-size: 0.8rem; }`,
    html: `<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-logo">
          <div class="footer-logo-icon">⚡</div>
          <span class="footer-logo-text">LUMINA</span>
        </div>
        <p class="footer-tagline">Kami adalah tim profesional yang berdedikasi menghadirkan solusi digital inovatif untuk bisnis Anda.</p>
      </div>
      <div>
        <div class="footer-col-title">Layanan</div>
        <ul class="footer-links">
          <li><a href="#">Desain Web</a></li>
          <li><a href="#">Pengembangan Aplikasi</a></li>
          <li><a href="#">Strategi Digital</a></li>
          <li><a href="#">SEO &amp; Marketing</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Perusahaan</div>
        <ul class="footer-links">
          <li><a href="#">Tentang Kami</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Karir</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Dukungan</div>
        <ul class="footer-links">
          <li><a href="#">Hubungi Kami</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Kebijakan Privasi</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 LUMINA. Seluruh hak dilindungi.</span>
    </div>
  </div>
</footer>`,
  },
};

// Label yang ditampilkan di dropdown "Tambah Section"
export const sectionTypeLabels: Record<string, string> = {
  hero:         'Hero Section',
  navbar:       'Navbar',
  layanan:      'Layanan Section',
  tentang_kami: 'Tentang Kami Section',
  portfolio:    'Portfolio Section',
  blog:         'Blog Section',
  kontak:       'Kontak Section',
  footer:       'Footer',
};
