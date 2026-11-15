import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { AdminShell } from "@/components/private/admin/admin-shell"
import { CollectionsEditor } from "@/components/private/admin/collections-editor"
import { CONTENT_COLLECTIONS } from "@/constants/content-editor"
import { requireAdminSession } from "@/lib/auth/guard"
import { getPortfolioCmsSnapshot } from "@/lib/cms"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Editor koleksi",
  robots: { index: false, follow: false },
}

export default async function AdminCollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>
}) {
  const session = await requireAdminSession()
  const { collection: key } = await params
  const collection = CONTENT_COLLECTIONS.find((item) => item.id === key)
  if (!collection) notFound()
  const snapshot = await getPortfolioCmsSnapshot()

  return (
    <AdminShell
      activePath={`/admin/collections/${collection.id}`}
      session={session}
      title={collection.title}
      description={collection.description}
    >
      <nav aria-label="Pilih koleksi" className="mt-6 flex flex-wrap gap-2">
        {CONTENT_COLLECTIONS.map((item) => (
          <Link
            key={item.id}
            href={`/admin/collections/${item.id}`}
            aria-current={item.id === collection.id ? "page" : undefined}
            className={cn(
              "min-h-11 rounded-lg border border-border px-4 py-3 text-sm",
              item.id === collection.id
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-muted"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Link
        href={collection.editorHref}
        className="mt-5 inline-block text-sm underline underline-offset-4"
      >
        Edit judul & teks section →
      </Link>
      {!snapshot.configured ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-destructive/30 p-4 text-sm text-destructive"
        >
          Data belum dapat dibaca. Periksa koneksi Supabase dan migration
          sebelum mengedit.
        </p>
      ) : null}
      <fieldset
        disabled={!snapshot.configured}
        className="min-w-0 disabled:opacity-60"
      >
        <legend className="sr-only">{collection.title}</legend>
        <CollectionsEditor
          collection={collection.id}
          media={snapshot.media}
          faqs={snapshot.faqs}
          services={snapshot.services}
          skills={snapshot.skills}
          timeline={snapshot.timeline}
        />
      </fieldset>
    </AdminShell>
  )
}
