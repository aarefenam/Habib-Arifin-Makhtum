import Link from "next/link"

import { AdminShell } from "@/components/private/admin/admin-shell"
import { CONTENT_PAGES, SECTION_TITLES } from "@/constants/content-editor"
import { requireAdminSession } from "@/lib/auth/guard"

export default async function AdminContentPage() {
  const session = await requireAdminSession()

  return (
    <AdminShell
      activePath="/admin/content"
      session={session}
      title="Halaman & section"
      description="Pilih halaman, lalu edit section mengikuti urutan website. Setiap section memiliki penyimpanan tersendiri."
    >
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {CONTENT_PAGES.map((page) => (
          <section
            key={page.id}
            className="rounded-2xl border border-border bg-card p-5 sm:p-6"
          >
            <p className="text-xs font-medium text-muted-foreground">
              {page.path}
            </p>
            <h2 className="heading-5 mt-2">{page.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {page.description}
            </p>
            <ol className="mt-5 divide-y divide-border">
              {page.sections.map((section, index) => (
                <li key={section}>
                  <Link
                    href={`/admin/content/${page.id}/${section}`}
                    className="flex-center min-h-11 gap-3 py-3 text-sm transition-colors hover:text-blue-600"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{SECTION_TITLES[section]}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </AdminShell>
  )
}
