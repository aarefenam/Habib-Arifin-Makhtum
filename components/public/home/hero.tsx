import Link from "next/link"
import {
  Briefcase,
  CalendarCheck,
  Globe,
  GraduationCap,
  ShieldCheck,
  Smartphone,
  Store,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { HeroMessageButton } from "@/components/public/home/hero-message-button"
import { HeroTerminal } from "@/components/public/home/hero-terminal"
import { Marquee } from "@/components/ui/marquee"
import type { HomePageContent } from "@/types/cms"

const BUILD_ICONS = {
  globe: Globe,
  shield: ShieldCheck,
  briefcase: Briefcase,
  store: Store,
  smartphone: Smartphone,
  graduation: GraduationCap,
  calendar: CalendarCheck,
} as const

const CHIP_STYLES = [
  "top-[10%] left-[6%] -rotate-6",
  "top-[10%] right-[4%] rotate-6",
  "top-[36%] left-[10%] rotate-3",
  "top-[36%] right-[7%] -rotate-3",
]

export function Hero({
  content,
  messageLabel,
}: {
  content: HomePageContent["hero"]
  messageLabel: string
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Ruled hairlines - fades out above the marquee strip */}
      <div
        aria-hidden
        // className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_71px,var(--border)_71px,var(--border)_72px)] [mask-image:linear-gradient(to_bottom,black_calc(100%-192px),transparent_calc(100%-72px))] opacity-100 dark:opacity-40"
        className="absolute inset-x-0 top-6 bottom-0 bg-[linear-gradient(to_bottom,transparent_71px,var(--border)_71px)] [mask-image:linear-gradient(to_bottom,black_calc(100%-192px),transparent_calc(100%-72px))] bg-[length:100%_72px] bg-[position:bottom] bg-repeat-y opacity-100 dark:opacity-40"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col pb-20 text-center sm:px-6">
        {/* Availability badge */}
        <p className="mx-auto flex-center w-fit gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs shadow-sm sm:text-sm">
          <span className="font-bold">{content.badgeRole}</span>
          <span aria-hidden className="size-2 rounded-full bg-green-500" />
          <span className="hidden text-muted-foreground xsm:block">
            {content.availability}
          </span>
        </p>

        {/* Headline */}
        <h1 className="mt-6 text-[clamp(2rem,7vw,5.5rem)] leading-[1.02] font-bold tracking-tight">
          {content.title}
          <br />
          <span className="text-muted-foreground">{content.titleAccent}</span>
        </h1>

        {/* Sub copy */}
        <p className="mx-auto mt-6 max-w-[550px] text-lg">
          <span className="font-semibold">{content.lead} </span>
          <span className="text-muted-foreground">{content.detail}</span>
        </p>

        {/* CTAs */}
        <div className="mt-8 flex-center flex-col justify-center gap-3 xsm:flex-row">
          <HeroMessageButton label={messageLabel} />
          <Link
            href="/about"
            className="rounded-xl border border-border bg-background px-6 py-3 font-semibold transition-colors hover:bg-muted"
          >
            {content.secondaryCtaLabel}
          </Link>
        </div>

        {/* Floating chips */}
        {content.chips.map((chip, index) => (
          <span
            key={chip}
            aria-hidden
            className={cn(
              "absolute hidden rounded-xl border border-border bg-background px-3.5 py-1.5 text-sm font-bold shadow-md lg:block",
              CHIP_STYLES[index]
            )}
          >
            {chip}
          </span>
        ))}

        {/* Terminal card */}
        <div className="mx-auto mt-12 w-full max-w-xl text-left">
          <HeroTerminal />
        </div>
      </div>

      {/* What I build marquee */}
      <div className="relative border-y border-border bg-transparent">
        <div className="flex items-stretch">
          <p className="flex shrink-0 items-center gap-2 px-4 text-sm font-medium text-muted-foreground sm:px-6">
            <span aria-hidden className="size-2 rounded-full bg-blue-600" />
            Yang saya bangun
          </p>

          <div className="relative flex-1 overflow-hidden">
            <Marquee
              pauseOnHover
              className="py-4 [--duration:30s] [--gap:3rem]"
            >
              {content.buildItems.map((item) => {
                const Icon =
                  BUILD_ICONS[item.icon as keyof typeof BUILD_ICONS] ?? Globe

                return (
                  <span
                    key={item.label}
                    className="flex items-center gap-3 text-xl font-bold tracking-tight whitespace-nowrap"
                  >
                    <span
                      aria-hidden
                      className="flex size-9 items-center justify-center rounded-full bg-blue-600/10"
                    >
                      <Icon aria-hidden className="size-4 text-blue-600" />
                    </span>
                    {item.label}
                    <span
                      aria-hidden
                      className="ml-9 size-1.5 rounded-full bg-blue-600/30"
                    />
                  </span>
                )
              })}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
