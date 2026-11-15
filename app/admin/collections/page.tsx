import { AdminShell } from "@/components/private/admin/admin-shell"
import { CollectionsEditor } from "@/components/private/admin/collections-editor"
import { requireAdminSession } from "@/lib/auth/guard"
import { getPortfolioCmsSnapshot } from "@/lib/cms"

export default async function AdminCollectionsPage() {
  const [session, snapshot] = await Promise.all([
    requireAdminSession(),
    getPortfolioCmsSnapshot(),
  ])

  return (
    <AdminShell
      activePath="/admin/collections"
      session={session}
      title="Content collections"
      description="Kelola skill, layanan, FAQ, serta riwayat pendidikan dan pengalaman dengan status visibilitas dan urutan tampil."
    >
      <CollectionsEditor
        faqs={snapshot.faqs}
        services={snapshot.services}
        skills={snapshot.skills}
        timeline={snapshot.timeline}
      />
    </AdminShell>
  )
}
