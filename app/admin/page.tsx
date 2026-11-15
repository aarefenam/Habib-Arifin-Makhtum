import { AdminDashboard } from "@/components/private/admin/admin-dashboard"
import { requireAdminSession } from "@/lib/auth/guard"

export default async function AdminPage() {
  const session = await requireAdminSession()

  return <AdminDashboard session={session} />
}
