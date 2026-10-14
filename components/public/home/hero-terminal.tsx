"use client"

import * as React from "react"

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"

// Typing (~0.6s) + 6 fade-ins (~1.8s) + reading pause
const LOOP_MS = 6000

const CHECKS = [
  "✓ Requirements   understood",
  "✓ Features       planned",
  "✓ UI design      ready",
  "✓ App            built",
  "✓ Deployment     live",
]

export function HeroTerminal() {
  const [cycle, setCycle] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setCycle((c) => c + 1), LOOP_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <Terminal
      key={cycle}
      className="mx-auto min-h-60 max-w-[350px] rounded-2xl border-0 bg-zinc-950 shadow-2xl sm:max-w-none dark:border dark:border-border dark:bg-card"
    >
      <TypingAnimation className="font-mono text-zinc-200" duration={50}>
        $ ship idea.md
      </TypingAnimation>
      {CHECKS.map((line) => (
        <AnimatedSpan
          key={line}
          className="font-mono whitespace-pre-wrap text-green-400"
        >
          {line}
        </AnimatedSpan>
      ))}
      <AnimatedSpan className="font-mono font-bold text-blue-400">
        → Delivered to you 🎉
      </AnimatedSpan>
    </Terminal>
  )
}
