import { AdminShell } from "@/components/private/admin/admin-shell"
import { ProjectEditor } from "@/components/private/admin/project-editor"
import { requireAdminSession } from "@/lib/auth/guard"
import { getPortfolioCmsSnapshot } from "@/lib/cms"

export default async function AdminProjectsPage() {
  const [session, snapshot] = await Promise.all([
    requireAdminSession(),
    getPortfolioCmsSnapshot(),
  ])

  return (
    <AdminShell
      activePath="/admin/projects"
      session={session}
      title="Projects"
      description="Buat, edit, urutkan, dan publikasi case study. Pilih cover langsung dari Media library."
    >
      {!snapshot.configured ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-destructive/30 p-4 text-sm text-destructive"
        >
          Data belum dapat dibaca. Periksa koneksi Supabase dan migration
          sebelum mengedit.
        </p>
      ) : null}
      <ProjectEditor
        projects={snapshot.projects}
        media={snapshot.media}
        configured={snapshot.configured}
      />
    </AdminShell>
  )
}
