import { AdminShell } from "@/components/private/admin/admin-shell"
import { MediaLibrary } from "@/components/private/admin/media-library"
import { requireAdminSession } from "@/lib/auth/guard"
import { getPortfolioCmsSnapshot } from "@/lib/cms"

export default async function AdminMediaPage() {
  const [session, snapshot] = await Promise.all([
    requireAdminSession(),
    getPortfolioCmsSnapshot(),
  ])

  return (
    <AdminShell
      activePath="/admin/media"
      session={session}
      title="Media library"
      description="Unggah dan kelola gambar di Cloudflare R2. Salin storage key untuk dipakai sebagai foto profil atau cover project."
    >
      <MediaLibrary assets={snapshot.media} />
    </AdminShell>
  )
}
