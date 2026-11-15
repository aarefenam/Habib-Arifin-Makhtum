import type { Metadata } from "next"
import Link from "next/link"

import { AdminShell } from "@/components/private/admin/admin-shell"
import { CONTENT_COLLECTIONS } from "@/constants/content-editor"
import { requireAdminSession } from "@/lib/auth/guard"

export const metadata: Metadata = {
  title: "Koleksi konten",
  robots: { index: false, follow: false },
}

export default async function AdminCollectionsPage() {
  const session = await requireAdminSession()

  return (
    <AdminShell
      activePath="/admin/collections"
      session={session}
      title="Koleksi konten"
      description="Pilih satu koleksi untuk mengelola item, urutan, dan visibilitasnya. Pengaturan judul section tersedia di Halaman & section."
    >
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {CONTENT_COLLECTIONS.map((collection, index) => (
          <Link
            key={collection.id}
            href={`/admin/collections/${collection.id}`}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted"
          >
            <p className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="heading-5 mt-3">{collection.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {collection.description}
            </p>
          </Link>
        ))}
      </div>
    </AdminShell>
  )
}
