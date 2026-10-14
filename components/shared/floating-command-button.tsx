"use client"

import * as React from "react"
import { Command } from "lucide-react"

import { useCommandPaletteStore } from "@/stores/command-palette-store"

export function FloatingCommandButton() {
  const open = useCommandPaletteStore((s) => s.open)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette"
      title="Open command palette (Ctrl+K)"
      className="fixed right-6 bottom-[7.25rem] z-50 flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:border-blue-600 hover:text-blue-600 [&_svg]:size-5"
    >
      <Command />
    </button>
  )
}
