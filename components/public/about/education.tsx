import { GraduationCap, Leaf, Presentation } from "lucide-react"

import { ABOUT_STORY, STORY_EDUCATION } from "@/constants/about"
import type { EducationIcon, EducationStatus } from "@/constants/about"

import { AboutCard } from "./about-card"
import { WhyDialog } from "./why-dialog"

const ICONS: Record<EducationIcon, typeof GraduationCap> = {
  cap: GraduationCap,
  leaf: Leaf,
  slides: Presentation,
}

const STATUS_STYLES: Record<EducationStatus, string> = {
  Completed: "bg-green-600/10 text-green-600",
  "In progress": "bg-blue-600/10 text-blue-600",
  "Self-study": "bg-blue-600/10 text-blue-600",
}

const STATUS_DOT: Record<EducationStatus, string> = {
  Completed: "bg-green-600",
  "In progress": "bg-blue-600",
  "Self-study": "bg-blue-600",
}

// Renders "2023 to 2026" with a small "to", plain year stays as-is
function Range({ value }: { value: string }) {
  const [from, to] = value.split(" to ")
  if (!to) return <>{value}</>
  return (
    <>
      {from}
      <span className="mx-1 align-middle text-sm font-medium text-muted-foreground">
        to
      </span>
      {to}
    </>
  )
}

export function Education() {
  return (
    <AboutCard className="relative overflow-hidden">
      {/* Soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-blue-600/10 blur-3xl"
      />

      <div className="relative">
        <p className="text-code font-medium tracking-[0.2em] text-blue-600 uppercase">
          <span
            aria-hidden
            className="mr-2 inline-block h-px w-6 translate-y-[-3px] bg-blue-600"
          />
          {ABOUT_STORY.educationKicker}
        </p>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h3 className="heading-3">
            {ABOUT_STORY.educationHeadingA}
            <br />
            <span className="text-muted-foreground">
              {ABOUT_STORY.educationHeadingB}
            </span>
          </h3>
          <p className="text-code text-muted-foreground">
            {ABOUT_STORY.educationRange}
          </p>
        </div>

        {/* Timeline connector */}
        <div
          aria-hidden
          className="relative mt-8 hidden h-px bg-gradient-to-r from-blue-600 via-blue-600/50 to-transparent sm:block"
        >
          <span className="absolute top-1/2 left-[16.666%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-card" />
          <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 ring-4 ring-blue-600/20" />
          <span className="absolute top-1/2 left-[83.333%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-card" />
        </div>

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {STORY_EDUCATION.map((edu) => {
            const Icon = ICONS[edu.icon]
            return (
              <li
                key={edu.range}
                className="flex flex-col rounded-2xl border border-border/70 bg-card p-5 dark:bg-blue-600/1"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex-center size-10 justify-center rounded-xl bg-blue-600/10 text-blue-600">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span
                    className={`flex-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[edu.status]}`}
                  >
                    <span
                      aria-hidden
                      className={`size-1.5 rounded-full ${STATUS_DOT[edu.status]}`}
                    />
                    {edu.status}
                  </span>
                </div>

                <p className="mt-4 font-mono text-xl font-semibold">
                  <Range value={edu.range} />
                </p>
                <p className="mt-1 font-semibold">{edu.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {edu.body}
                  {edu.highlight && (
                    <strong className="font-semibold text-foreground">
                      {edu.highlight}
                    </strong>
                  )}
                </p>

                {edu.topics && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {edu.topics.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border/70 bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-4">
                  {edu.stat && (
                    <p className="border-t border-dashed border-border pt-3">
                      <span className="font-mono text-2xl font-bold text-blue-600">
                        {edu.stat}
                      </span>{" "}
                      <span className="text-sm text-muted-foreground">
                        {edu.statLabel}
                      </span>
                    </p>
                  )}
                  {edu.why && <WhyDialog {...edu.why} />}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </AboutCard>
  )
}
