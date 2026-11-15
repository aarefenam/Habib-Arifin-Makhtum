"use client"

import * as React from "react"

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"

export function HeroTerminal({
  command,
  lines,
  result,
}: {
  command: string
  lines: string[]
  result: string
}) {
  const [cycle, setCycle] = React.useState(0)
  const loopMs = Math.max(
    6000,
    command.length * 50 + (lines.length + 1) * 300 + 2500
  )

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setCycle((c) => c + 1), loopMs)
    return () => clearInterval(id)
  }, [loopMs])

  return (
    <Terminal
      key={`${cycle}-${command}-${lines.join("\n")}-${result}`}
      className="mx-auto min-h-60 max-w-[350px] rounded-2xl border-0 bg-zinc-950 shadow-2xl sm:max-w-none dark:border dark:border-border dark:bg-card"
    >
      {command ? (
        <TypingAnimation className="font-mono text-zinc-200" duration={50}>
          {command}
        </TypingAnimation>
      ) : null}
      {lines.map((line, index) => (
        <AnimatedSpan
          key={index}
          className="font-mono whitespace-pre-wrap text-green-400"
        >
          {line}
        </AnimatedSpan>
      ))}
      <AnimatedSpan className="font-mono font-bold text-blue-400">
        {result}
      </AnimatedSpan>
    </Terminal>
  )
}
