"use client"

import { useContactStore } from "@/stores/contact-store"
import { ContactDialog } from "@/components/shared/contact-dialog"

export function GlobalContactDialog() {
  const isOpen = useContactStore((s) => s.isOpen)
  const setOpen = useContactStore((s) => s.setOpen)

  return <ContactDialog open={isOpen} onOpenChange={setOpen} />
}
