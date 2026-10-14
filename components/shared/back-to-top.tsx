"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"

import { scrollToBottom, scrollToTop } from "@/lib/scroll"
import { cn } from "@/lib/utils"

export function BackToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if ((key !== "p" && key !== "l") || e.ctrlKey || e.metaKey || e.altKey)
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
      if (key === "p") scrollToTop()
      else scrollToBottom()
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-6 bottom-[10.25rem] z-50 flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all duration-300 hover:border-blue-600 hover:text-blue-600",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp aria-hidden className="size-5" />
    </button>
  )
}
