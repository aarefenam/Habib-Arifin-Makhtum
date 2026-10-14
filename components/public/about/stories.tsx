"use client"

import { useState } from "react"
import { ArrowUpRight, X } from "lucide-react"

import { ABOUT_STORIES, BLOG_STORY, WAKEUP_STORY } from "@/constants/about"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { AboutCard, AboutSectionHead } from "./about-card"

export function Stories() {
  const [wakeupOpen, setWakeupOpen] = useState(true)

  return (
    <section id="stories" aria-label="Stories" className="mt-20">
      <div className="flex flex-col gap-4">
        <AboutSectionHead index={ABOUT_STORIES.index} title={ABOUT_STORIES.title} />

        {/* Featured blog story */}
        <a
          href={BLOG_STORY.href}
          target="_blank"
          rel="noreferrer"
          className="group relative overflow-hidden rounded-2xl border bg-zinc-950 p-6 text-white sm:p-8"
        >
          {/* Grid background */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
              backgroundSize: "56px 50px",
            }}
          />
          {/* Blue glow */}
          <div
            aria-hidden
            className="absolute -top-24 right-8 size-64 rounded-full bg-blue-600/60 blur-3xl"
          />
          <div className="relative flex items-center justify-between gap-6">
            <div>
              <p className="text-sm text-white/60">{BLOG_STORY.kicker}</p>
              <p className="heading-3 mt-3 max-w-xl text-white">
                {BLOG_STORY.title}
              </p>
            </div>
            <span
              aria-hidden
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 transition-transform group-hover:scale-105"
            >
              <ArrowUpRight className="size-6" />
            </span>
          </div>
        </a>

        {/* Wake-up strategy story */}
        <AboutCard>
          <Collapsible open={wakeupOpen} onOpenChange={setWakeupOpen}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 text-left">
              <span className="heading-6">{WAKEUP_STORY.title}</span>
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:scale-105"
              >
                {wakeupOpen ? (
                  <X className="size-4" />
                ) : (
                  <ArrowUpRight className="size-4" />
                )}
              </span>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  In December 2024, I found the Alarmy app, which won&apos;t
                  turn off the alarm until you scan a QR code. I printed a QR
                  code and stuck it on the outside of our room door {"😜"}
                </p>
                <p>
                  Now when the alarm starts ringing, I first wake up, then I
                  walk a few meters, open the door, and scan the QR code. Only
                  then does the alarm stop {"😜"}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </AboutCard>
      </div>
    </section>
  )
}
