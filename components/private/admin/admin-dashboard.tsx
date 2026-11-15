import Link from "next/link"

import {
  CheckCircle2,
  CircleDot,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
} from "lucide-react"

import { signOutAdmin } from "@/actions/admin-auth"
import { ADMIN_CONTENT_AREAS } from "@/constants/admin"
import { SITE } from "@/constants/site"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { AdminSession } from "@/types/auth"

export function AdminDashboard({ session }: { session: AdminSession }) {
  return (
    <div className="min-h-dvh bg-background-body">
      <a
        href="#admin-main"
        className="sr-only fixed top-4 left-4 z-50 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only"
      >
        Lewati navigasi
      </a>

      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col border-r border-border bg-card lg:flex">
        <div className="border-b border-border px-6 py-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
              HA
            </span>
            <span>
              <span className="block text-sm font-semibold">{SITE.name}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Portfolio CMS
              </span>
            </span>
          </Link>
        </div>

        <nav aria-label="Navigasi dashboard" className="flex-1 px-4 py-6">
          <p className="px-3 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Workspace
          </p>
          <a
            href="#overview"
            aria-current="page"
            className="mt-3 flex min-h-11 items-center gap-3 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
          >
            <LayoutDashboard aria-hidden className="size-4" />
            Overview
          </a>

          <p className="mt-8 px-3 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Koleksi konten
          </p>
          <div className="mt-3 space-y-1">
            {ADMIN_CONTENT_AREAS.map((area) => {
              const Icon = area.icon

              return (
                <Link
                  key={area.id}
                  href={area.href}
                  className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
                >
                  <Icon aria-hidden className="size-4" />
                  {area.title}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/70 p-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-card text-sm font-semibold text-foreground ring-1 ring-border">
              {session.username.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{session.username}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Administrator
              </p>
            </div>
          </div>
          <form action={signOutAdmin} className="mt-2">
            <Button
              variant="ghost"
              type="submit"
              className="h-11 w-full justify-start px-3 text-muted-foreground hover:text-foreground"
            >
              <LogOut aria-hidden className="size-4" />
              Keluar dari workspace
            </Button>
          </form>
        </div>
      </aside>

      <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            HA
          </span>
          <span>
            <span className="block text-sm font-semibold">Portfolio CMS</span>
            <span className="block text-xs text-muted-foreground">
              Admin workspace
            </span>
          </span>
        </Link>
        <form action={signOutAdmin}>
          <Button
            variant="outline"
            type="submit"
            aria-label="Keluar dari workspace"
            className="h-10 px-3"
          >
            <LogOut aria-hidden className="size-4" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </form>
      </header>

      <main id="admin-main" tabIndex={-1} className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 xl:px-12">
          <header id="overview" className="scroll-mt-24">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-blue-600">
                  Workspace overview
                </p>
                <h1 className="heading-2 mt-2">
                  Selamat datang, {session.username}.
                </h1>
                <p className="mt-3 leading-7 text-muted-foreground">
                  Ini adalah pusat kendali untuk menjaga portfolio {SITE.name}
                  tetap akurat, rapi, dan siap dipublikasikan.
                </p>
              </div>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Lihat website
                <ExternalLink aria-hidden className="size-4" />
              </Link>
            </div>
          </header>

          <section
            aria-labelledby="workspace-status"
            className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                  <ShieldCheck aria-hidden className="size-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 id="workspace-status" className="heading-6">
                      Sesi admin aktif
                    </h2>
                    <Badge variant="secondary" className="gap-1.5">
                      <CircleDot aria-hidden className="size-3 text-blue-600" />
                      Aman
                    </Badge>
                  </div>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                    Editor CMS sudah siap untuk mengelola teks, koleksi konten,
                    aset R2, dan pesan masuk dari satu workspace.
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5 text-sm sm:grid-cols-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                <div>
                  <dt className="text-xs text-muted-foreground">Akses</dt>
                  <dd className="mt-1 font-medium">Administrator</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Koleksi</dt>
                  <dd className="mt-1 font-medium">
                    {ADMIN_CONTENT_AREAS.length} modul
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Mode</dt>
                  <dd className="mt-1 font-medium">Editor aktif</dd>
                </div>
              </dl>
            </div>
          </section>

          <section aria-labelledby="admin-modules" className="mt-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Content operations
                </p>
                <h2 id="admin-modules" className="heading-4 mt-2">
                  Modul pengelolaan
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-right">
                Setiap modul akan memiliki editor khusus agar perubahan konten
                tetap terarah dan mudah ditinjau.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {ADMIN_CONTENT_AREAS.map((area, index) => {
                const Icon = area.icon

                return (
                  <Link key={area.id} href={area.href} className="block h-full">
                    <Card className="h-full border border-border py-0 shadow-none transition-shadow hover:shadow-sm">
                      <CardHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <span className="flex size-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                            <Icon aria-hidden className="size-5" />
                          </span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <CardTitle className="mt-5 text-lg">
                          {area.title}
                        </CardTitle>
                        <CardDescription className="mt-1.5 leading-6">
                          {area.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto px-5 pb-5 sm:px-6 sm:pb-6">
                        <div className="flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                          <CheckCircle2
                            aria-hidden
                            className="size-3.5 shrink-0 text-blue-600"
                          />
                          <span>{area.priority}</span>
                          <span className="ml-auto">Buka editor</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
