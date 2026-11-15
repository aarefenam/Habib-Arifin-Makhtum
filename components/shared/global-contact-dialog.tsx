"use client"

import { useContactStore } from "@/stores/contact-store"
import { ContactDialog } from "@/components/shared/contact-dialog"
import type { PortfolioSiteSettings, WebsiteContent } from "@/types/cms"

export function GlobalContactDialog({
  site,
  content,
}: {
  site: PortfolioSiteSettings
  content: WebsiteContent["contactDialog"]
}) {
  const isOpen = useContactStore((s) => s.isOpen)
  const setOpen = useContactStore((s) => s.setOpen)

  return (
    <ContactDialog
      open={isOpen}
      onOpenChange={setOpen}
      site={site}
      content={content}
    />
  )
}
