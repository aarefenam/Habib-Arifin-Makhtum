# Portfolio CMS setup

## 1. Buat database Supabase

1. Buat project Supabase baru.
2. Buka SQL Editor dan jalankan `supabase/migrations/0001_portfolio_foundation.sql` satu kali.
3. Dari **Project Settings > API**, salin URL project dan `service_role` key.

`SUPABASE_SERVICE_ROLE_KEY` hanya digunakan server-side melalui `lib/supabase.ts`. Jangan pernah menaruhnya di variabel `NEXT_PUBLIC_*` atau browser.

## 2. Buat bucket Cloudflare R2

1. Buat bucket, misalnya `habib-portfolio-media`.
2. Buat API token dengan izin Object Read & Write khusus untuk bucket itu.
3. Sambungkan custom domain publik untuk aset, misalnya `media.habibarifin.com`.
4. Simpan account ID, access key, secret, nama bucket, dan URL domain publik.

## 3. Isi environment variables

Salin struktur dari `.env.example` ke environment deployment dan isi nilainya. Semua pembacaan environment hanya melalui `lib/env.ts`.

Untuk `JWT_SECRET`, buat secret acak minimal 32 karakter. Gunakan nilai yang stabil di semua deployment agar cookie sesi tetap dapat diverifikasi saat instance berganti.

## 4. Jalankan lokal

```bash
bun dev
```

Buka `/admin/login` dan masuk menggunakan `ADMIN_USERNAME` serta `ADMIN_PASSWORD`. Setelah berhasil, access token disimpan 15 menit dan refresh token 7 hari dalam cookie `httpOnly`.

## Tahap berikutnya

Tambahkan editor CRUD untuk site settings, projects, skills, services, FAQ, inbox, dan presigned upload Cloudflare R2. Semua data dan file telah memiliki tempat penyimpanan dalam schema saat ini.
