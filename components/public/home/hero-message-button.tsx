"use client"

import { useContactStore } from "@/stores/contact-store"

export function HeroMessageButton() {
  const open = useContactStore((s) => s.open)

  return (
    <button
      type="button"
      onClick={open}
      className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-opacity hover:opacity-90"
    >
      Message me
    </button>
  )
}
