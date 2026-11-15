import { AdminShell } from "@/components/private/admin/admin-shell"
import { SiteContentEditor } from "@/components/private/admin/site-content-editor"
import { requireAdminSession } from "@/lib/auth/guard"
import { getPortfolioCmsSnapshot } from "@/lib/cms"

export default async function AdminContentPage() {
  const [session, snapshot] = await Promise.all([
    requireAdminSession(),
    getPortfolioCmsSnapshot(),
  ])

  return (
    <AdminShell
      activePath="/admin/content"
      session={session}
      title="Site settings"
      description="Kelola semua teks utama homepage, identitas, kontak, sosial media, dan metadata dari satu formulir."
    >
      <SiteContentEditor content={snapshot.content} site={snapshot.site} />
    </AdminShell>
  )
}
