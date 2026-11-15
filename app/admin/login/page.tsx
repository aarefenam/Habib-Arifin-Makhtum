import type { Metadata } from "next"
import Link from "next/link"

import { ArrowLeft, Check, FolderCog, ShieldCheck } from "lucide-react"

import { AdminLoginForm } from "@/components/private/admin/admin-login-form"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin login",
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh bg-background">
      <section className="grid min-h-dvh w-full overflow-hidden bg-card lg:grid-cols-[minmax(0,1.15fr)_minmax(28rem,0.85fr)]">
        <div className="relative hidden min-h-full flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:p-12 xl:px-20">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary-foreground/10" />
            <div className="absolute -bottom-32 -left-24 size-80 rounded-full border border-primary-foreground/20" />
            <div className="absolute top-1/2 left-10 h-px w-[calc(100%-5rem)] bg-primary-foreground/20" />
          </div>

          <div className="relative">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground focus-visible:text-primary-foreground"
            >
              <ArrowLeft aria-hidden className="size-4" />
              Kembali ke website
            </Link>

            <div className="mt-16 flex-center gap-3">
              <span className="flex-center size-11 justify-center rounded-xl bg-primary-foreground text-primary shadow-sm">
                HA
              </span>
              <div>
                <p className="text-sm font-semibold">Habib Arifin Makhtum</p>
                <p className="mt-0.5 text-xs text-primary-foreground/65">
                  Portfolio CMS
                </p>
              </div>
            </div>

            <div className="mt-14 max-w-md">
              <p className="text-sm font-medium text-primary-foreground/70">
                Private workspace
              </p>
              <h2 className="heading-1 mt-3 text-primary-foreground">
                Kontrol penuh untuk portfolio Anda.
              </h2>
              <p className="mt-5 max-w-sm leading-7 text-primary-foreground/70">
                Kelola identitas, proyek, media, dan pesan klien dari satu ruang
                kerja yang terstruktur.
              </p>
            </div>
          </div>

          <div className="relative border-t border-primary-foreground/15 pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3">
                <span className="flex-center size-9 shrink-0 justify-center rounded-lg bg-primary-foreground/10">
                  <ShieldCheck aria-hidden className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">Sesi terlindungi</p>
                  <p className="mt-1 text-xs leading-5 text-primary-foreground/65">
                    Token disimpan aman dalam cookie HTTP-only.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-center size-9 shrink-0 justify-center rounded-lg bg-primary-foreground/10">
                  <FolderCog aria-hidden className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">Siap dikembangkan</p>
                  <p className="mt-1 text-xs leading-5 text-primary-foreground/65">
                    Modul konten disusun untuk workflow CMS Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-full flex-col px-5 py-8 sm:px-10 sm:py-12 lg:border-l lg:border-border lg:px-14 xl:px-20">
          <div className="flex-center justify-between lg:hidden">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft aria-hidden className="size-4" />
              Website
            </Link>
            <span className="flex-center size-10 justify-center rounded-xl bg-blue-600/10 text-sm font-semibold text-blue-600">
              HA
            </span>
          </div>

          <div className="my-auto w-full max-w-md lg:mx-auto">
            <div className="flex-center gap-2 text-sm font-medium text-blue-600">
              <span className="flex-center size-7 justify-center rounded-full bg-blue-600/10">
                <Check aria-hidden className="size-3.5" />
              </span>
              Ruang kerja privat
            </div>
            <h1 id="admin-login-title" className="heading-2 mt-5">
              Masuk ke CMS
            </h1>
            <p className="mt-3 max-w-sm leading-7 text-muted-foreground">
              Gunakan kredensial admin Anda untuk mengelola konten publik
              portfolio.
            </p>
            <AdminLoginForm />
          </div>

          <p className="mt-8 text-xs leading-5 text-muted-foreground lg:mt-12">
            Akses ini khusus untuk administrator. Pastikan Anda menggunakan
            perangkat yang tepercaya.
          </p>
        </div>
      </section>
    </main>
  )
}
