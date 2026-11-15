alter table public.site_settings
  add column if not exists content jsonb not null default '{}'::jsonb;

update public.site_settings
set content = jsonb_build_object(
  'hero', jsonb_build_object(
    'badgeRole', 'Full-Stack Developer & IT Solver',
    'availability', 'Menerima proyek freelance',
    'title', 'Membangun solusi digital',
    'titleAccent', 'yang siap digunakan.',
    'lead', 'Web app, ERP, API integration, dan infrastruktur.',
    'detail', 'Dari purwarupa sampai production.',
    'secondaryCtaLabel', 'Kenali cara saya bekerja',
    'chips', jsonb_build_array('Web Apps', 'ERP', 'API Integration', 'IoT'),
    'buildItems', jsonb_build_array(
      jsonb_build_object('label', 'Web applications', 'icon', 'globe'),
      jsonb_build_object('label', 'ERP systems', 'icon', 'briefcase'),
      jsonb_build_object('label', 'API integrations', 'icon', 'shield')
    )
  ),
  'about', jsonb_build_object(
    'titleBlack', 'Merancang sistem',
    'titleGray', 'yang benar-benar membantu.',
    'sideNote', 'Memadukan rekayasa perangkat lunak dan pemecahan masalah untuk kebutuhan digital yang nyata.',
    'whoBadge', 'Tentang saya',
    'whoHeading', 'Developer yang berorientasi pada solusi.',
    'whoBody', 'Saya membangun aplikasi web, ERP, integrasi API, dan sistem digital yang dapat dipelihara.',
    'experienceBadge', 'Fokus',
    'experienceValue', 'End-to-end',
    'experienceText', 'Dari ide',
    'experienceMuted', 'sampai sistem berjalan.',
    'workBadge', 'Peran',
    'workHeading', 'Full-Stack Developer & IT Solver',
    'workBody', 'Menyatukan strategi produk, UI, backend, dan infrastruktur.',
    'nowBadge', 'Saat ini',
    'nowHeading', 'Berbasis di Kairo, Mesir',
    'nowBody', 'Terbuka untuk kolaborasi remote dan proyek freelance.'
  ),
  'skills', jsonb_build_object(
    'badge', 'Skills',
    'titleBlack', 'Teknologi di balik',
    'titleGray', 'setiap solusi yang dibangun.',
    'sideNote', 'Stack untuk membangun, menjalankan, dan mengembangkan produk digital.',
    'coreTitle', 'Core skills',
    'coreDescription', 'The stack I build products with.',
    'toolkitTitle', 'Toolkit',
    'toolkitDescription', 'The tools I work in every day.',
    'additionalTitle', 'Additional',
    'additionalDescription', 'Beyond the code.'
  ),
  'projects', jsonb_build_object(
    'headerBadge', 'Projects',
    'headerTitleBlack', 'Karya yang',
    'headerTitleGray', 'dibangun untuk berdampak.',
    'headerSideNote', 'Pilihan sistem dan produk digital yang sedang dikembangkan.',
    'emptyTitle', 'Portfolio sedang diperbarui.',
    'emptyDescription', 'Case study akan hadir setelah melalui proses kurasi dan dokumentasi.'
  ),
  'faq', jsonb_build_object(
    'badge', 'FAQ',
    'titleBlack', 'Pertanyaan',
    'titleGray', 'yang sering ditanyakan.',
    'sideNote', 'Ringkasan layanan dan cara saya bekerja.'
  ),
  'contact', jsonb_build_object(
    'headerBadge', 'Contact',
    'headerTitleBlack', 'Punya ide?',
    'headerTitleGray', 'Mari wujudkan.',
    'headerSideNote', 'Ceritakan kebutuhan Anda. Saya akan membalas secepatnya.',
    'eyebrow', 'Kirim pesan',
    'cardHeading', 'Lebih nyaman berdiskusi lewat pesan?',
    'cardHeadingAccent', 'pesan',
    'cardSub', 'Jelaskan kebutuhan Anda, lalu saya akan menyiapkan langkah awalnya.',
    'ctaLabel', 'Kirim pesan',
    'giantWord', 'ide'
  )
)
where id = true and content = '{}'::jsonb;

insert into public.skills (name, category, description, sort_order, visible)
select name, category, description, sort_order, true
from (
  values
    ('Next.js', 'core', 'Framework', 0),
    ('React', 'core', 'UI library', 1),
    ('Tailwind CSS', 'core', 'Styling', 2),
    ('JavaScript', 'core', 'Language', 3),
    ('PostgreSQL', 'core', 'Database', 4),
    ('Supabase', 'core', 'Backend platform', 5),
    ('MongoDB Atlas', 'core', 'Database', 6),
    ('Payload CMS', 'core', 'CMS', 7),
    ('API Integration', 'core', 'Systems', 8),
    ('Vercel', 'toolkit', 'Deployment', 0),
    ('Git', 'toolkit', 'Version control', 1),
    ('Docker', 'toolkit', 'Container', 2),
    ('Linux VPS', 'toolkit', 'Infrastructure', 3),
    ('Cloudflare R2', 'toolkit', 'Object storage', 4),
    ('SSH', 'toolkit', 'Server access', 5),
    ('ERP Systems', 'additional', null, 0),
    ('UI Design', 'additional', null, 1),
    ('Rapid prototyping', 'additional', null, 2),
    ('IoT integration', 'additional', null, 3)
) as seed(name, category, description, sort_order)
where not exists (select 1 from public.skills);

insert into public.faqs (question, answer, sort_order, visible)
select question, answer, sort_order, true
from (
  values
    ('Layanan apa yang Anda kerjakan?', 'Saya membangun aplikasi web dan SPA, sistem ERP dan CMS dashboard, integrasi API, purwarupa cepat, serta setup infrastruktur server.', 0),
    ('Apakah Anda menerima proyek freelance?', 'Ya. Saya aktif menerima proyek freelance dan menjalankan agensi IT. Hubungi saya untuk mendiskusikan kebutuhan Anda.', 1),
    ('Teknologi apa yang digunakan?', 'Stack utama saya mencakup Next.js, React, Tailwind CSS, PostgreSQL via Supabase, MongoDB Atlas, Payload CMS, Docker, Linux VPS, dan Cloudflare R2.', 2),
    ('Apakah Anda dapat mengintegrasikan sistem pihak ketiga?', 'Ya. Saya menangani integrasi API, webhook WhatsApp, layanan B2B, dan koneksi perangkat IoT sesuai kebutuhan sistem.', 3),
    ('Di mana Anda berbasis?', 'Saya berasal dari Bandung, Jawa Barat, Indonesia dan saat ini berdomisili di Kairo, Mesir. Kolaborasi jarak jauh tersedia.', 4)
) as seed(question, answer, sort_order)
where not exists (select 1 from public.faqs);
