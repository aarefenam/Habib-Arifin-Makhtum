import Link from "next/link"

import { LayoutDashboard, LogOut, PanelLeft } from "lucide-react"

import { signOutAdmin } from "@/actions/admin-auth"
import { ADMIN_CONTENT_AREAS } from "@/constants/admin"
import { CONTENT_COLLECTIONS, CONTENT_PAGES } from "@/constants/content-editor"
import { SITE } from "@/constants/site"
import { Button } from "@/components/ui/button"
import type { AdminSession } from "@/types/auth"

export function AdminShell({
  activePath,
  children,
  description,
  session,
  title,
}: {
  activePath: string
  children: React.ReactNode
  description: string
  session: AdminSession
  title: string
}) {
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
          <Link href="/" className="flex-center gap-3">
            <span className="flex-center size-10 justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
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

        <nav
          aria-label="Navigasi admin"
          className="flex-1 overflow-y-auto px-4 py-6"
        >
          <p className="px-3 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Workspace
          </p>
          <Link
            href="/admin"
            aria-current={activePath === "/admin" ? "page" : undefined}
            className={
              activePath === "/admin"
                ? "mt-3 flex-center min-h-11 gap-3 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
                : "mt-3 flex-center min-h-11 gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            }
          >
            <LayoutDashboard aria-hidden className="size-4" />
            Overview
          </Link>

          <p className="mt-8 px-3 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Kelola konten
          </p>
          <div className="mt-3 space-y-1">
            {ADMIN_CONTENT_AREAS.map((area) => {
              const Icon = area.icon
              const isActive =
                activePath === area.href ||
                activePath.startsWith(`${area.href}/`)

              return (
                <div key={area.id}>
                  <Link
                    href={area.href}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "flex-center min-h-11 gap-3 rounded-lg bg-muted px-3 text-sm font-medium text-foreground"
                        : "flex-center min-h-11 gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    }
                  >
                    <Icon aria-hidden className="size-4" />
                    {area.title}
                  </Link>
                  {area.id === "site-settings" && isActive ? (
                    <div className="ml-7 border-l border-border pl-3">
                      {CONTENT_PAGES.map((page) => (
                        <Link
                          key={page.id}
                          href={`/admin/content/${page.id}`}
                          aria-current={
                            activePath.startsWith(`/admin/content/${page.id}/`)
                              ? "page"
                              : undefined
                          }
                          className="block py-2 text-xs text-muted-foreground hover:text-foreground aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
                        >
                          {page.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                  {area.id === "content" && isActive ? (
                    <div className="ml-7 border-l border-border pl-3">
                      {CONTENT_COLLECTIONS.map((collection) => (
                        <Link
                          key={collection.id}
                          href={`/admin/collections/${collection.id}`}
                          aria-current={
                            activePath === `/admin/collections/${collection.id}`
                              ? "page"
                              : undefined
                          }
                          className="block py-2 text-xs text-muted-foreground hover:text-foreground aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
                        >
                          {collection.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex-center gap-3 rounded-xl bg-muted/70 p-3">
            <span className="flex-center size-9 justify-center rounded-full bg-card text-sm font-semibold text-foreground ring-1 ring-border">
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

      <header className="sticky top-0 z-10 flex-center min-h-16 justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:hidden">
        <Link href="/admin" className="flex-center gap-2.5">
          <span className="flex-center size-9 justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            HA
          </span>
          <span>
            <span className="block text-sm font-semibold">Portfolio CMS</span>
            <span className="block text-xs text-muted-foreground">{title}</span>
          </span>
        </Link>
        <Link
          href="/admin"
          aria-label="Kembali ke overview"
          className="flex-center size-10 justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <PanelLeft aria-hidden className="size-4" />
        </Link>
      </header>

      <nav
        aria-label="Modul admin seluler"
        className="flex gap-2 overflow-x-auto border-b border-border bg-card p-3 lg:hidden"
      >
        {ADMIN_CONTENT_AREAS.map((area) => {
          const active =
            activePath === area.href || activePath.startsWith(`${area.href}/`)
          return (
            <Link
              key={area.id}
              href={area.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "shrink-0 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                  : "shrink-0 rounded-lg px-3 py-2 text-sm text-muted-foreground"
              }
            >
              {area.title}
            </Link>
          )
        })}
      </nav>

      <main id="admin-main" tabIndex={-1} className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 xl:px-12">
          <header className="border-b border-border pb-7">
            <p className="text-sm font-medium text-blue-600">Portfolio CMS</p>
            <h1 className="heading-3 mt-2">{title}</h1>
            <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
              {description}
            </p>
          </header>
          {children}
        </div>
      </main>
    </div>
  )
}
