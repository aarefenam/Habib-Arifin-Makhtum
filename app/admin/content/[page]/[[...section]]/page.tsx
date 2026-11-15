import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { AdminShell } from "@/components/private/admin/admin-shell"
import { SiteContentEditor } from "@/components/private/admin/site-content-editor"
import { CONTENT_PAGES, SECTION_TITLES } from "@/constants/content-editor"
import type { EditorSectionKey } from "@/constants/content-editor"
import { requireAdminSession } from "@/lib/auth/guard"
import { getPortfolioCmsSnapshot } from "@/lib/cms"
import { cn } from "@/lib/utils"

export default async function ContentSectionPage({
  params,
}: {
  params: Promise<{ page: string; section?: string[] }>
}) {
  const session = await requireAdminSession()
  const route = await params
  const page = CONTENT_PAGES.find((item) => item.id === route.page)
  if (!page || (route.section?.length ?? 0) > 1) notFound()
  if (!route.section?.length)
    redirect(`/admin/content/${page.id}/${page.sections[0]}`)
  const section = route.section[0] as EditorSectionKey
  if (!(page.sections as readonly string[]).includes(section)) notFound()
  const snapshot = await getPortfolioCmsSnapshot()
  const index = (page.sections as readonly string[]).indexOf(section)

  return (
    <AdminShell
      activePath={`/admin/content/${page.id}/${section}`}
      session={session}
      title={page.title}
      description={page.description}
    >
      <nav
        aria-label="Pilih halaman website"
        className="my-6 flex flex-wrap gap-2"
      >
        {CONTENT_PAGES.map((item) => (
          <Link
            key={item.id}
            href={`/admin/content/${item.id}`}
            aria-current={item.id === page.id ? "page" : undefined}
            className={cn(
              "min-h-11 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
              item.id === page.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-muted"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="grid gap-6 xl:grid-cols-[15rem_minmax(0,1fr)]">
        <nav
          aria-label="Section sesuai urutan website"
          className="self-start rounded-xl border border-border bg-card p-2 xl:sticky xl:top-6"
        >
          <ol className="space-y-1">
            {page.sections.map((key, order) => (
              <li key={key}>
                <Link
                  href={`/admin/content/${page.id}/${key}`}
                  aria-current={key === section ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 gap-3 rounded-lg px-3 py-3 text-sm",
                    key === section
                      ? "bg-muted font-semibold"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span className="font-mono text-xs">
                    {String(order + 1).padStart(2, "0")}
                  </span>
                  {SECTION_TITLES[key]}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <section className="min-w-0">
          <div className="mb-5 flex-center flex-wrap justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">
                {page.path} · Section {index + 1} / {page.sections.length}
              </p>
              <h2 className="heading-5 mt-1">{SECTION_TITLES[section]}</h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Tombol simpan hanya memperbarui section ini.
              </p>
            </div>
            <Link
              href={page.path}
              target="_blank"
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium"
            >
              Lihat halaman ↗
            </Link>
          </div>
          <SiteContentEditor
            key={section}
            section={section}
            snapshot={snapshot}
          />
          <nav
            aria-label="Urutan section"
            className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-5"
          >
            {index > 0 ? (
              <Link
                href={`/admin/content/${page.id}/${page.sections[index - 1]}`}
                className="min-h-11 rounded-lg border border-border bg-card px-4 py-3 text-sm"
              >
                ← {SECTION_TITLES[page.sections[index - 1]]}
              </Link>
            ) : (
              <span />
            )}
            {index < page.sections.length - 1 ? (
              <Link
                href={`/admin/content/${page.id}/${page.sections[index + 1]}`}
                className="min-h-11 rounded-lg border border-border bg-card px-4 py-3 text-sm"
              >
                {SECTION_TITLES[page.sections[index + 1]]} →
              </Link>
            ) : null}
          </nav>
        </section>
      </div>
    </AdminShell>
  )
}
