import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  ABOUT_EXPERIENCE,
  ABOUT_HEADER,
  ABOUT_NOW,
  ABOUT_PROFILE,
  ABOUT_WHO,
  ABOUT_WORK,
} from "@/constants/about"

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex-center gap-1.5 font-mono text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
      <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
      {children}
    </p>
  )
}

export function About() {
  return (
    <section id="about" aria-label="About me" className="py-6">
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex flex-col gap-4">
          {/* <Eyebrow>{ABOUT_HEADER.badge}</Eyebrow> */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="big-heading font-bold">
              {ABOUT_HEADER.titleBlack}
              <br />
              <span className="text-muted-foreground">
                {ABOUT_HEADER.titleGray}
              </span>
            </h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              {ABOUT_HEADER.sideNote}
            </p>
          </div>
        </header>

        <hr className="my-8 border-border" />

        {/* Who I am */}
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div
            aria-hidden
            className="flex-center min-h-56 justify-center overflow-hidden rounded-2xl bg-blue-600/10 select-none"
          >
            <span className="text-[8rem] leading-none font-extrabold tracking-tight text-blue-600/30">
              {ABOUT_PROFILE.initial}
            </span>
          </div>

          <div>
            <Eyebrow>{ABOUT_WHO.badge}</Eyebrow>
            <h3 className="heading-4 mt-4">{ABOUT_WHO.heading}</h3>
            <p className="mt-4 leading-6 tracking-wide text-muted-foreground">
              {ABOUT_WHO.para1}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {ABOUT_WHO.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex-center gap-2 text-sm font-semibold text-blue-600"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="flex-center size-6 justify-center rounded-full bg-blue-600 text-white"
                  >
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-8 border-border" />

        {/* Stats row */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
          <div className="md:pr-8">
            <Eyebrow>{ABOUT_EXPERIENCE.badge}</Eyebrow>
            <p className="mt-3 text-6xl font-extrabold tracking-tight text-blue-600">
              {ABOUT_EXPERIENCE.value}
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">{ABOUT_EXPERIENCE.text}</span>{" "}
              <span className="text-muted-foreground">
                {ABOUT_EXPERIENCE.muted}
              </span>
            </p>
          </div>

          <div className="md:px-8">
            <Eyebrow>{ABOUT_WORK.badge}</Eyebrow>
            <h3 className="heading-5 mt-3 text-balance">
              {ABOUT_WORK.heading}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {ABOUT_WORK.sub}
            </p>
          </div>

          <div className="md:pl-8">
            <Eyebrow>{ABOUT_NOW.badge}</Eyebrow>
            <h3 className="heading-5 mt-3 text-balance">{ABOUT_NOW.heading}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {ABOUT_NOW.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
