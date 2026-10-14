"use client"

import { useState } from "react"
import { Plus, Wrench, X } from "lucide-react"

import { ABOUT_TOOLS, SPECIAL_TOOLS } from "@/constants/about"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { AboutCard } from "./about-card"

export function SpecialTools() {
  const [open, setOpen] = useState(false)

  return (
    <AboutCard>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="group flex w-full items-start justify-between gap-4 text-left">
          <h3 className="heading-6 flex-center gap-2">
            <Wrench aria-hidden className="size-5 shrink-0 text-blue-600" />
            {ABOUT_TOOLS.title}
          </h3>
          <div className="flex-center shrink-0 gap-2">
            <span className="text-sm text-muted-foreground">
              {ABOUT_TOOLS.count}
            </span>
            <span
              aria-hidden
              className="flex-center size-8 justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:scale-105"
            >
              {open ? (
                <X aria-hidden className="size-4" />
              ) : (
                <Plus aria-hidden className="size-4" />
              )}
            </span>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <p className="mt-2 text-muted-foreground">{ABOUT_TOOLS.sub}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SPECIAL_TOOLS.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                {tool}
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </AboutCard>
  )
}
