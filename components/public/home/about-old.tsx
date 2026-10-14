import Link from "next/link"
import { User } from "lucide-react"

import { Pointer } from "@/components/ui/pointer"
import { SectionHeader } from "@/components/shared/section-header"
import { BlueCard } from "@/components/shared/blue-card"

import {
  ABOUT_EXPERIENCE,
  ABOUT_HEADER,
  ABOUT_WHO,
  ABOUT_WORK,
} from "@/constants/about"

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex-center w-fit gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-blue-600">
      <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
      {children}
    </p>
  )
}

export function About() {
  return (
    <section id="about" aria-label="About me" className="py-6">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <SectionHeader
          badge={ABOUT_HEADER.badge}
          titleBlack={ABOUT_HEADER.titleBlack}
          titleGray={ABOUT_HEADER.titleGray}
          sideNote={ABOUT_HEADER.sideNote}
          center={true}
        />

        {/* Cards grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Who I am - spans 2 */}
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:col-span-2">
            <Pill>{ABOUT_WHO.badge}</Pill>
            <h3 className="heading-5 mt-4">{ABOUT_WHO.heading}</h3>
            <p className="mt-4 text-muted-foreground">{ABOUT_WHO.para1}</p>
            <p className="mt-3 text-muted-foreground">{ABOUT_WHO.para2}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {ABOUT_WHO.links.map((link) => {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex-center gap-2 rounded-full bg-blue-600/10 px-3 py-1.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="flex-center size-5 justify-center rounded-full bg-blue-600 text-white"
                    >
                      <User aria-hidden className="size-3" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </article>

          {/* Profile card */}
          <article
            aria-label="Profile card"
            className="relative min-h-96 overflow-hidden rounded-2xl border border-border bg-card"
          >
            <Pointer />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.webp"
              alt="Fazle Rabbi"
              className="absolute inset-0 size-full object-cover grayscale"
            />
          </article>

          {/* Experience */}
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Pill>{ABOUT_EXPERIENCE.badge}</Pill>
            <p className="mt-4 text-5xl font-extrabold tracking-tight text-blue-600">
              {ABOUT_EXPERIENCE.value}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-semibold">{ABOUT_EXPERIENCE.text}</span>{" "}
              <span className="text-muted-foreground">
                {ABOUT_EXPERIENCE.muted}
              </span>
            </p>
          </article>

          {/* What I do - spans 2, blue */}
          <BlueCard className="md:col-span-2">
            <Pill>{ABOUT_WORK.badge}</Pill>
            <h3 className="heading-3 mt-4 max-w-sm">{ABOUT_WORK.heading}</h3>
            <p className="mt-2 text-sm text-white/80">{ABOUT_WORK.sub}</p>
          </BlueCard>
        </div>
      </div>
    </section>
  )
}
