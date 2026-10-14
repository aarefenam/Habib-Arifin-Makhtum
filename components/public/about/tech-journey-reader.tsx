"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { ABOUT_STORY } from "@/constants/about"
import { useStoryLang } from "@/hooks/use-story-lang"

const HEADING = {
  en: "My Journey in Tech",
  bn: "Tech-এ আমার যাত্রা",
} as const

export function TechJourneyReader() {
  const { lang, pick } = useStoryLang()

  const paragraphs = ABOUT_STORY.details[lang]
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    // First bn paragraph duplicates the page heading, so drop it
    .filter((p, i) => !(lang === "bn" && i === 0 && p.includes("আমার যাত্রা")))

  return (
    <main className="mx-auto w-full max-w-2xl pb-24">
      <Link
        href="/about#story"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-blue-600"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Back to story
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="heading-1">{HEADING[lang]}</h1>
        <div
          role="group"
          aria-label="Language"
          className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted/60 p-0.5 text-sm"
        >
          {(["en", "bn"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => pick(l)}
              aria-pressed={lang === l}
              className={
                lang === l
                  ? "rounded-full bg-card px-3 py-1 font-semibold shadow-sm"
                  : "px-3 py-1 text-muted-foreground hover:text-foreground"
              }
            >
              {l === "en" ? "EN" : "বাংলা"}
            </button>
          ))}
        </div>
      </div>

      <article className="mt-6 space-y-6">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[1.05rem] leading-8 text-foreground/90"
          >
            {p}
          </p>
        ))}
      </article>
    </main>
  )
}
