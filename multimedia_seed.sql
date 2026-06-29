-- ============================================================
-- SEED DATA untuk project Web Multimedia
-- Jalankan SETELAH import multimedia.sql (database sudah ada)
-- ============================================================


-- ============================================================
-- STEP 1: TAMBAH KOLOM GrapesJS ke page_sections
--   grapes_json  = JSON internal GrapesJS (untuk load ulang editor)
--   html         = HTML hasil render (untuk ditampilkan di frontend)
--   css          = CSS hasil render (untuk ditampilkan di frontend)
-- ============================================================
ALTER TABLE `page_sections`
  ADD COLUMN `grapes_json` longtext NULL COMMENT 'JSON internal GrapesJS untuk load editor',
  ADD COLUMN `html`        longtext NULL COMMENT 'HTML hasil render GrapesJS untuk frontend',
  ADD COLUMN `css`         longtext NULL COMMENT 'CSS hasil render GrapesJS untuk frontend';


-- ============================================================
-- STEP 2: ISI SECTION_TYPES
--   Mendaftarkan "cetak biru" tiap section.
--   fields_schema = panduan field apa saja yang ada di section ini,
--   bisa dibaca oleh admin panel untuk menampilkan form yang sesuai.
-- ============================================================
INSERT INTO `section_types` (`name`, `label`, `fields_schema`) VALUES

('hero', 'Hero Section', JSON_OBJECT(
  'badge_text',         JSON_OBJECT('type','text',  'label','Badge atas (teks kecil)'),
  'headline_1',         JSON_OBJECT('type','text',  'label','Judul baris 1'),
  'headline_highlight', JSON_OBJECT('type','text',  'label','Judul highlight (warna gradient)'),
  'headline_2',         JSON_OBJECT('type','text',  'label','Judul baris 3'),
  'subtitle',           JSON_OBJECT('type','text',  'label','Deskripsi bawah judul'),
  'background_image',   JSON_OBJECT('type','image', 'label','Gambar background'),
  'cta_primary_text',   JSON_OBJECT('type','text',  'label','Teks tombol utama'),
  'cta_secondary_text', JSON_OBJECT('type','text',  'label','Teks tombol kedua'),
  'stats',              JSON_OBJECT('type','json',  'label','Statistik (value + label, array)'),
  'preview_videos',     JSON_OBJECT('type','json',  'label','Video preview (title, duration, category, thumbnail, array)')
)),

('navbar', 'Navbar', JSON_OBJECT(
  'logo_text',  JSON_OBJECT('type','text',  'label','Teks logo'),
  'logo_image', JSON_OBJECT('type','image', 'label','Gambar logo'),
  'menu_items', JSON_OBJECT('type','json',  'label','Item menu (label + href, array)')
)),

('layanan', 'Layanan Section', JSON_OBJECT(
  'section_title',    JSON_OBJECT('type','text', 'label','Judul section'),
  'section_subtitle', JSON_OBJECT('type','text', 'label','Subjudul section'),
  'services',         JSON_OBJECT('type','json', 'label','Daftar layanan (icon, title, description, array)')
)),

('tentang_kami', 'Tentang Kami Section', JSON_OBJECT(
  'section_title', JSON_OBJECT('type','text',  'label','Judul section'),
  'description',   JSON_OBJECT('type','text',  'label','Paragraf deskripsi'),
  'image',         JSON_OBJECT('type','image', 'label','Foto atau ilustrasi'),
  'highlights',    JSON_OBJECT('type','json',  'label','Poin unggulan (icon, text, array)')
)),

('portfolio', 'Portfolio Section', JSON_OBJECT(
  'section_title',    JSON_OBJECT('type','text', 'label','Judul section'),
  'section_subtitle', JSON_OBJECT('type','text', 'label','Subjudul section'),
  'filter_tabs',      JSON_OBJECT('type','json', 'label','Tab filter kategori (array string)'),
  'items',            JSON_OBJECT('type','json', 'label','Item portfolio (image, title, category, array)')
)),

('blog', 'Blog Section', JSON_OBJECT(
  'section_title',    JSON_OBJECT('type','text', 'label','Judul section'),
  'section_subtitle', JSON_OBJECT('type','text', 'label','Subjudul section'),
  'posts',            JSON_OBJECT('type','json', 'label','Artikel blog (image, title, date, excerpt, array)')
)),

('kontak', 'Kontak Section', JSON_OBJECT(
  'section_title',    JSON_OBJECT('type','text', 'label','Judul section'),
  'section_subtitle', JSON_OBJECT('type','text', 'label','Subjudul section'),
  'email',            JSON_OBJECT('type','text', 'label','Email kontak'),
  'phone',            JSON_OBJECT('type','text', 'label','Nomor telepon'),
  'address',          JSON_OBJECT('type','text', 'label','Alamat lengkap'),
  'map_embed',        JSON_OBJECT('type','html', 'label','Embed Google Maps (iframe HTML)')
)),

('footer', 'Footer', JSON_OBJECT(
  'logo_text',      JSON_OBJECT('type','text', 'label','Teks logo footer'),
  'tagline',        JSON_OBJECT('type','text', 'label','Tagline footer'),
  'social_links',   JSON_OBJECT('type','json', 'label','Link sosial media (platform, url, array)'),
  'footer_links',   JSON_OBJECT('type','json', 'label','Link navigasi footer (label, href, array)'),
  'copyright_text', JSON_OBJECT('type','text', 'label','Teks copyright')
));


-- ============================================================
-- STEP 3: ISI PAGES
--   Daftarkan halaman utama home
-- ============================================================
INSERT INTO `pages` (`slug`, `title`, `status`, `order`) VALUES
('home', 'Halaman Utama', 'published', 1);


-- ============================================================
-- STEP 4: ISI PAGE_SECTIONS
--   Pasangkan tiap section ke halaman home sesuai urutan tampil.
--   grapes_json / html / css sengaja dikosongkan dulu,
--   akan diisi otomatis pertama kali admin save lewat GrapesJS.
-- ============================================================
INSERT INTO `page_sections` (`page_id`, `section_type_id`, `label`, `order`, `is_visible`)
SELECT
  p.id         AS page_id,
  st.id        AS section_type_id,
  st.label     AS label,
  urutan.ord   AS `order`,
  1            AS is_visible
FROM `pages` p
JOIN (
  SELECT 'navbar'       AS sname, 0 AS ord
  UNION ALL SELECT 'hero',        1
  UNION ALL SELECT 'layanan',     2
  UNION ALL SELECT 'tentang_kami',3
  UNION ALL SELECT 'portfolio',   4
  UNION ALL SELECT 'blog',        5
  UNION ALL SELECT 'kontak',      6
  UNION ALL SELECT 'footer',      7
) urutan
JOIN `section_types` st ON st.name = urutan.sname
WHERE p.slug = 'home'
ORDER BY urutan.ord;


-- ============================================================
-- STEP 5: ISI SECTION_CONTENTS (konten default Hero Section)
--   Ini adalah nilai awal sebelum admin mengedit lewat GrapesJS.
--   Setiap baris = satu field konten dari fields_schema di atas.
-- ============================================================
INSERT INTO `section_contents`
  (`page_section_id`, `content_key`, `content_type`, `value`, `meta`)
SELECT
  ps.id          AS page_section_id,
  konten.content_key,
  konten.content_type,
  konten.value,
  NULL           AS meta
FROM `page_sections` ps
JOIN `section_types` st
  ON st.id = ps.section_type_id AND st.name = 'hero'
JOIN (
  SELECT 'badge_text'         AS content_key,
         'text'               AS content_type,
         'Multimedia Storytelling' AS value

  UNION ALL
  SELECT 'headline_1', 'text', 'Explore the'

  UNION ALL
  SELECT 'headline_highlight', 'text', 'Universe'

  UNION ALL
  SELECT 'headline_2', 'text', 'One Story at a Time'

  UNION ALL
  SELECT 'subtitle', 'text',
    'Stunning visuals and interactive stories spanning science, nature, history, and culture.'

  UNION ALL
  SELECT 'background_image', 'image',
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1080'

  UNION ALL
  SELECT 'cta_primary_text', 'text', 'Start Exploring'

  UNION ALL
  SELECT 'cta_secondary_text', 'text', 'Watch Now'

  UNION ALL
  SELECT 'stats', 'json',
    '[{"value":"500K+","label":"Stories Published"},{"value":"12M+","label":"Monthly Readers"},{"value":"150+","label":"Countries Reached"}]'

  UNION ALL
  SELECT 'preview_videos', 'json',
    '[{"id":1,"title":"Into the Deep","duration":"24:38","category":"Ocean","thumbnail":"https://images.unsplash.com/photo-1545605114-7b82dad7b990?w=400"},{"id":2,"title":"Serengeti 4K","duration":"18:14","category":"Wildlife","thumbnail":"https://images.unsplash.com/photo-1549366021-9f761d450615?w=400"},{"id":3,"title":"Hubble Cosmos","duration":"31:05","category":"Space","thumbnail":"https://images.unsplash.com/photo-1447433553548-2fc162393482?w=400"}]'
) konten ON 1=1;
