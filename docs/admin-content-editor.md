# Audit dan perbaikan editor ERP

## Temuan

Editor section yang ada belum terhubung sepenuhnya ke website. Header, footer, formulir kontak, terminal hero, beberapa label, serta halaman About dan Projects masih menggunakan teks tetap atau konten dari section homepage. Akibatnya, sebagian isian admin tidak mengubah tampilan yang dimaksud.

Masalah lain yang diperbaiki:

- Tautan ke editor koleksi per jenis belum memiliki route tujuan.
- Halaman About hanya menampilkan judul pendidikan pertama. Pengalaman, organisasi, periode, dan deskripsi belum ditampilkan.
- Ikon skill yang tersimpan hanya digambarkan sebagai titik, bukan gambar aset.
- Mengosongkan kontak atau sosial media opsional memunculkan kembali nilai bawaan saat data dibaca.
- Form perlu mempertahankan isian ketika validasi atau penyimpanan gagal.
- Penyimpanan layanan dan riwayat perlu memperbarui halaman publik, termasuk setelah penghapusan.
- Database yang diperiksa belum mempunyai RPC `update_site_content_section`. Penyimpanan sekarang juga mendukung database tersebut tanpa mewajibkan migration baru.

## Struktur halaman admin

Mulai dari `/admin/content`. Setiap section mempunyai URL dan tombol simpan sendiri. Navigasi halaman, penomoran section, serta tombol sebelumnya/berikutnya mengikuti struktur ini.

| Kelompok | Urutan section | Contoh URL |
| --- | --- | --- |
| Global website | Header, Footer, Formulir kontak, Identitas & foto profil, Kontak & sosial media, SEO global | `/admin/content/global/header` |
| Homepage | Hero, About, Skills, Projects, FAQ, Contact | `/admin/content/home/hero` |
| About | Pembuka, Layanan, Pendidikan/pengalaman/lokasi, Ajakan kontak, SEO | `/admin/content/about/aboutIntro` |
| Projects | Pembuka & daftar portfolio, Label halaman detail | `/admin/content/projects/projectsPage` |

Membuka `/admin/content/home` langsung menuju section pertama. Nama halaman atau section yang tidak terdaftar ditangani dengan `notFound()`. Navigasi desktop dan seluler mengenali halaman yang sedang aktif.

Koleksi item dipisahkan dari teks section:

| Koleksi | URL | Isi |
| --- | --- | --- |
| Skills | `/admin/collections/skills` | Nama, kategori, deskripsi, gambar ikon, urutan, visibilitas |
| FAQ | `/admin/collections/faqs` | Pertanyaan, jawaban, urutan, visibilitas |
| Layanan | `/admin/collections/services` | Judul, deskripsi, urutan, visibilitas |
| Pendidikan & pengalaman | `/admin/collections/timeline` | Jenis, judul, organisasi, periode, deskripsi, status berlangsung, urutan, visibilitas |

Project tetap dikelola di `/admin/projects`. Cover project, ikon skill, foto profil, dan logo header dapat dipilih langsung dari Media library. Setiap editor koleksi menyediakan tautan kembali ke pengaturan teks section terkait.

## Konten yang sudah tersambung

- **Header:** nama brand, inisial, logo, menu desktop/seluler, urutan menu, tujuan tautan, CTA, serta label aksesibilitas menu.
- **Footer:** judul, aksen, label kontak, menu terpisah dari header, tautan legal, copyright dengan `{year}` dan `{name}`, serta teks besar.
- **Formulir kontak:** judul, penjelasan, kartu WhatsApp, label form, tombol, status mengirim, dan judul notifikasi.
- **Hero:** copy, CTA utama, CTA kedua dan tujuannya, chips, perintah/baris/hasil terminal, label marquee, serta daftar item dan ikonnya.
- **Section homepage:** copy About, judul/deskripsi kelompok skill, satuan jumlah skill, header project, header/CTA/teks kosong FAQ, serta label dan kartu kontak.
- **About:** copy halaman tersendiri, layanan yang terlihat, seluruh riwayat pendidikan/pengalaman yang terlihat, periode, organisasi, deskripsi, lokasi, CTA, dan metadata.
- **Projects:** copy halaman daftar yang terpisah dari homepage, keadaan kosong, metadata, dan label halaman detail. Judul serta ringkasan setiap project menjadi metadata detailnya.

Tautan `#section` di header/footer menuju section homepage meskipun pengunjung berada di About atau Projects. Tautan halaman, URL web, email, dan telepon didukung. Skema seperti `javascript:` dan URL yang mengalihkan host melalui `//` ditolak.

## Penyimpanan dan kompatibilitas

Semua aksi penyimpanan memeriksa sesi admin terlebih dahulu dan memvalidasi input di server. Kelompok Identitas, Sosial, serta SEO hanya mengubah kolom miliknya.

Untuk konten section:

1. Jika RPC tersedia, database memperbarui satu key JSON secara atomik.
2. Pada database lama, server membaca konten beserta `updated_at`, lalu memperbarui hanya jika versi tersebut masih sama.
3. Jika sesi lain lebih dahulu menyimpan, server membaca ulang dan mencoba kembali, maksimal tiga percobaan. Konten section lain tetap dipertahankan.
4. Jika konflik berulang atau database gagal, UI menampilkan kegagalan tanpa mengklaim perubahan tersimpan. Isian tetap tersedia untuk dicoba kembali.

Migration `supabase/migrations/0003_section_editor.sql` tetap disediakan sebagai jalur RPC yang lebih singkat. Migration ini bersifat tambahan dan tidak menghapus isi konten. Database dengan migration 0001 dan 0002 sudah dapat memakai jalur kompatibilitas. Migration 0003 tidak dijalankan ke database asli selama pengerjaan ini.

Konten lama tetap digunakan sebagai nilai awal untuk field baru. Setelah copy About atau Projects disimpan secara terpisah, editor halaman tersebut tidak lagi berbagi copy dengan homepage. String dan daftar yang sengaja dikosongkan tetap kosong. Bila data Supabase gagal dibaca, editor menampilkan pemberitahuan dan menonaktifkan penyimpanan data bawaan.

Form edit mempertahankan isian saat gagal. Form tambah hanya dikosongkan setelah berhasil. Kontrol form dinonaktifkan selama proses penyimpanan untuk menghindari pengiriman berulang.

## Verifikasi

- **32 pengujian otomatis lulus:** validasi semua section, kompatibilitas konten lama, tujuan tautan, menu kosong/diurutkan, isolasi kelompok pengaturan, autentikasi aksi, kegagalan database, jalur simpan database lama, konflik penyimpanan, dan render komponen publik.
- **26 halaman admin diuji melalui HTTP dengan sesi admin lokal:** tiga halaman pengelolaan, 19 editor section, dan empat editor koleksi. Seluruhnya merespons 200 dan memuat area admin. Pembacaan database tidak menggunakan fallback.
- **Empat route tidak valid:** seluruhnya menghasilkan tampilan `notFound`. Next.js dapat mengirim status 200 ketika respons streaming sudah dimulai; pemeriksaan juga mengenali penanda 404 framework.
- **Halaman publik:** Home, About, dan Projects merespons 200. Pengunjung tanpa sesi yang membuka editor header diarahkan ke login.
- ESLint lulus untuk 46 file kode yang berubah. Pemeriksaan TypeScript pada 42 file TypeScript yang berubah menghasilkan nol diagnostic.

Jalankan pengujian terkait:

```bash
bun test actions/site-content.test.js lib/save-content-section.test.js lib/website-content.test.ts lib/cms.test.js validations/site-content.test.ts components/shared/cms-rendering.test.jsx
```

Pengujian aksi simpan memakai database tiruan, termasuk simulasi konflik. Pemeriksaan HTTP/database asli hanya membaca data. Penyimpanan nyata dan interaksi klik di browser belum diuji ke database asli; konten website asli tidak diubah untuk pengujian.
