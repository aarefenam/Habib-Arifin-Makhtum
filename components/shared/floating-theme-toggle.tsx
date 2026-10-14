"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export function FloatingThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatedThemeToggler
      aria-label="Toggle theme"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={(theme) => setTheme(theme)}
      duration={1000}
      variant="diamond"
      className="fixed right-6 bottom-[1.25rem] z-50 flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:border-blue-600 hover:text-blue-600 [&_svg]:size-5"
    />
  )
}
