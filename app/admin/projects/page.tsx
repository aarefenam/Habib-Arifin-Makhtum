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
      description="Buat, edit, urutkan, dan publikasi case study. Cover dapat dipilih menggunakan storage key dari Media library."
    >
      <ProjectEditor projects={snapshot.projects} />
    </AdminShell>
  )
}
