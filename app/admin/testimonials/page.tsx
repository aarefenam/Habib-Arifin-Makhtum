import { headers } from "next/headers"

import { AdminShell } from "@/components/private/admin/admin-shell"
import { TestimonialsEditor } from "@/components/private/admin/testimonials-editor"
import { requireAdminSession } from "@/lib/auth/guard"
import { getTestimonials } from "@/lib/testimonials"

export default async function AdminTestimonialsPage() {
  const [session, testimonials, requestHeaders] = await Promise.all([
    requireAdminSession(),
    getTestimonials({ visibleOnly: false }),
    headers(),
  ])

  // Build the share link from the current domain
  const host = requestHeaders.get("host") ?? "localhost:3000"
  const protocol = host.startsWith("localhost") ? "http" : "https"

  return (
    <AdminShell
      activePath="/admin/testimonials"
      session={session}
      title="Testimoni"
      description="Bagikan link rating ke client. Rating baru masuk tersembunyi, centang yang ingin ditampilkan di homepage."
    >
      <TestimonialsEditor
        testimonials={testimonials}
        shareUrl={`${protocol}://${host}/rate`}
      />
    </AdminShell>
  )
}
