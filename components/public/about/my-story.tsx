"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { ABOUT_STORY, STORY_CHAPTERS } from "@/constants/about"
import { LEGACY } from "@/constants/skills"
import { useStoryLang } from "@/hooks/use-story-lang"

import { LocationClock } from "./location-clock"
import { AboutCard, AboutSectionHead } from "./about-card"
import { Education } from "./education"

// Timeline bar segments (visual only, widths approximate the chapters)
const SEGMENTS = [
  "w-[7%] bg-blue-600",
  "w-[9%] bg-blue-600/25",
  "w-[5%] bg-blue-800",
  "w-[4%] bg-zinc-200",
  "w-[16%] bg-blue-500/70",
  "w-[12%] bg-zinc-200",
  "w-[13%] bg-blue-400/70",
  "w-[17%] bg-blue-500/50",
  "w-[6%] bg-blue-300/70",
  "w-[11%] bg-blue-600/50",
]

export function MyStory() {
  const { lang, pick } = useStoryLang()
  return (
    <section id="story" aria-label="My story" className="py-6">
      <div className="flex flex-col gap-4">
        <AboutSectionHead index={ABOUT_STORY.index} title={ABOUT_STORY.title} />

        {/* Journey + location */}
        <div className="grid gap-4 lg:grid-cols-3">
          <AboutCard className="lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <h3 className="heading-6">{ABOUT_STORY.journeyTitle}</h3>
              <div className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted/60 p-0.5 text-sm">
                {(["en", "bn"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => pick(l)}
                    aria-pressed={lang === l}
                    className={
                      lang === l
                        ? "rounded-full bg-card px-2.5 py-0.5 font-semibold shadow-sm"
                        : "px-2.5 py-0.5 text-muted-foreground hover:text-foreground"
                    }
                  >
                    {l === "en" ? "EN" : "বাংলা"}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {lang === "bn"
                ? ABOUT_STORY.journeyBodyBn
                : ABOUT_STORY.journeyBodyEn}
            </p>
            <Link
              href="/my-tech-journey"
              className="mt-2 inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
            >
              Read more
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
            <div className="mt-4 border-t border-dashed border-border pt-3">
              <p className="font-medium text-muted-foreground">
                {ABOUT_STORY.legacyNote}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {LEGACY.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex-center gap-1.5 rounded-full border border-border/70 bg-muted/60 px-2.5 py-1 font-medium text-muted-foreground"
                  >
                    {skill.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={skill.logo}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="size-3.5 object-contain grayscale dark:invert"
                      />
                    )}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </AboutCard>

          <AboutCard className="relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(color-mix(in oklab, var(--muted-foreground) 20%, transparent) 1.5px, transparent 1.5px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative flex h-full min-h-40 flex-col justify-between gap-8">
              <p className="text-lg text-muted-foreground">
                {ABOUT_STORY.locationLabel}
              </p>
              <div>
                <p className="heading-1 mb-2">{ABOUT_STORY.locationValue}</p>
                <LocationClock />
              </div>
            </div>
          </AboutCard>
        </div>

        {/* Chapters */}
        <AboutCard>
          <div className="flex items-center justify-between gap-4">
            <h3 className="heading-6">{ABOUT_STORY.chaptersTitle}</h3>
            <p className="text-blue-600">{ABOUT_STORY.chaptersNote}</p>
          </div>

          <div className="mt-4 flex h-9 gap-1 overflow-hidden rounded-lg">
            {SEGMENTS.map((seg, i) => (
              <span
                key={i}
                aria-hidden
                className={cn("h-full rounded-sm", seg, i === 5 && "striped")}
              />
            ))}
          </div>
          <style>{`.striped{background-image:repeating-linear-gradient(-45deg,rgb(0 0 0/0.12) 0 4px,transparent 4px 8px)}`}</style>

          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            {["2022", "2023", "2024", "2025", "2026"].map((y) => (
              <span key={y}>{y}</span>
            ))}
            <span className="font-semibold text-blue-600">Now</span>
          </div>

          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {STORY_CHAPTERS.map((c) => (
              <li key={c.label} className="flex gap-2">
                <span
                  aria-hidden
                  className={cn("mt-1 size-2 shrink-0 rounded-full", c.dot)}
                />
                <div className="leading-snug">
                  <p>
                    <span className="font-bold">{c.label}</span>{" "}
                    <span className="text-muted-foreground">{c.range}</span>
                  </p>
                  <p className="text-muted-foreground">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href="https://quiet-stack.vercel.app/blog/productivity-paralysis-a-short-film-of-myself-v66xqa"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 font-semibold text-red-600 hover:underline dark:text-red-500"
          >
            How productivity ruined my life
            <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </AboutCard>

        {/* Education */}
        <Education />
      </div>
    </section>
  )
}
