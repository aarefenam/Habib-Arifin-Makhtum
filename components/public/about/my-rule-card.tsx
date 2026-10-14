import { ArrowRight } from "lucide-react"

import { ABOUT_RULE } from "@/constants/about"
import { ShineBorder } from "@/components/ui/shine-border"

function FirstDots() {
  const rows = [12, 18, 10]
  return (
    <div className="flex flex-col gap-1.5" aria-hidden>
      <ShineBorder shineColor={"#2196f3"} duration={10} />

      {rows.map((count, r) => (
        <div key={r} className="flex gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={
                i === count - 1 && r === 1
                  ? "h-2.5 w-5 rounded-[3px] bg-blue-600/80"
                  : "size-2.5 rounded-[3px] bg-blue-600/80"
              }
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function MyRuleCard() {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0e14] p-6 text-white sm:p-8">
      {/* blue glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-blue-600/25 blur-[100px]"
      />

      <p className="flex-center gap-2 font-mono text-sm font-semibold tracking-[0.2em] text-blue-500">
        <span aria-hidden className="h-0.5 w-6 bg-blue-500" />
        {ABOUT_RULE.badge.toUpperCase()}
      </p>

      <p className="heading-3 mt-4 tracking-tight">
        Just make it <span className="text-blue-500">exist</span> first.
        <span className="block text-slate-500">
          You can always make it good later.
        </span>
      </p>

      <p className="mt-4 flex-center gap-2 text-sm text-slate-300">
        <span aria-hidden className="h-px w-8 bg-slate-500" />
        {ABOUT_RULE.note}
      </p>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {/* FIRST */}
        <div className="flex-1 rounded-2xl border border-dashed border-blue-500/60 bg-blue-500/[0.04] p-4">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-blue-500">
            FIRST
          </p>
          <div className="mt-3">
            <FirstDots />
          </div>
        </div>

        <ArrowRight
          aria-hidden
          className="mx-auto size-5 shrink-0 rotate-90 text-slate-500 sm:rotate-0"
        />

        {/* LATER */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-slate-400">
            LATER
          </p>
          <div className="mt-3 flex flex-col gap-2.5" aria-hidden>
            <span className="h-2.5 w-4/5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
            <span className="h-2.5 w-full rounded-full bg-white/10" />
            <span className="h-2.5 w-3/4 rounded-full bg-white/10" />
            <span className="mt-1 h-6 w-1/2 rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </article>
  )
}
