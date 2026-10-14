"use client"

import { useState } from "react"
import { Plus, Quote, X } from "lucide-react"

import {
  ABOUT_INSPIRATION,
  INSPIRATION_QUOTES,
  YOUTUBE_CARD,
} from "@/constants/about"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { AboutCard, AboutSectionHead } from "./about-card"

export function Inspiration() {
  const [channelsOpen, setChannelsOpen] = useState(false)

  return (
    <section id="inspiration" aria-label="Inspiration" className="mt-20">
      <div className="flex flex-col gap-4">
        <AboutSectionHead index={ABOUT_INSPIRATION.index} title={ABOUT_INSPIRATION.title} />

        {/* YouTube channels - collapsed by default */}
        <AboutCard>
          <Collapsible open={channelsOpen} onOpenChange={setChannelsOpen}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 text-left">
              <span className="heading-6">{YOUTUBE_CARD.title}</span>
              <span className="flex-center shrink-0 gap-2">
                <span className="text-sm text-muted-foreground">
                  {YOUTUBE_CARD.count}
                </span>
                <span
                  aria-hidden
                  className="flex-center size-8 shrink-0 justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:scale-105"
                >
                  {channelsOpen ? (
                    <X className="size-4" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                </span>
              </span>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {YOUTUBE_CARD.learnedLabel}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {YOUTUBE_CARD.learned.map((channel) => (
                    <li
                      key={channel}
                      className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium"
                    >
                      {channel}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm font-medium text-muted-foreground">
                  {YOUTUBE_CARD.followLabel}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {YOUTUBE_CARD.following.map((channel) => (
                    <li
                      key={channel}
                      className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium"
                    >
                      {channel}
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </AboutCard>

        {/* Quotes */}
        <div className="grid gap-4 md:grid-cols-2">
          {INSPIRATION_QUOTES.map((quote) => (
            <AboutCard key={quote.source} className="flex flex-col">
              <Quote
                aria-hidden
                className="size-7 fill-blue-600 text-blue-600"
              />
              <blockquote className="mt-3 flex-1 text-lg leading-relaxed">
                {quote.text}
              </blockquote>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {quote.source}
              </p>
            </AboutCard>
          ))}
        </div>
      </div>
    </section>
  )
}
