import { AdminShell } from "@/components/private/admin/admin-shell"
import { InboxEditor } from "@/components/private/admin/inbox-editor"
import { requireAdminSession } from "@/lib/auth/guard"
import { getPortfolioCmsSnapshot } from "@/lib/cms"

export default async function AdminInboxPage() {
  const [session, snapshot] = await Promise.all([
    requireAdminSession(),
    getPortfolioCmsSnapshot(),
  ])

  return (
    <AdminShell
      activePath="/admin/inbox"
      session={session}
      title="Inbox"
      description="Pantau pesan dari formulir kontak, tandai statusnya, dan simpan catatan internal untuk tindak lanjut."
    >
      <InboxEditor messages={snapshot.messages} />
    </AdminShell>
  )
}
