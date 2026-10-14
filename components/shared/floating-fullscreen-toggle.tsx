"use client"

import * as React from "react"
import { Maximize, Minimize } from "lucide-react"

import { toggleFullscreen } from "@/lib/fullscreen"
import { useFullscreenStore } from "@/stores/fullscreen-store"

export function FloatingFullscreenToggle() {
  const isFullscreen = useFullscreenStore((s) => s.isFullscreen)
  const setFullscreen = useFullscreenStore((s) => s.setFullscreen)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement))
    onChange()
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [setFullscreen])

  // F key shortcut (ignored while typing)
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "f" || e.ctrlKey || e.metaKey || e.altKey)
        return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      )
        return
      toggleFullscreen()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  if (!mounted) return null

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      title={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen (F)"}
      className="fixed right-6 bottom-[4.25rem] z-50 flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:border-blue-600 hover:text-blue-600 [&_svg]:size-5"
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
    </button>
  )
}
