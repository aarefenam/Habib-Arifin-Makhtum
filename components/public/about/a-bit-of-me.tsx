"use client"

import Image from "next/image"
import { useState } from "react"
import {
  AlarmClock,
  ArrowUpRight,
  Compass,
  Globe,
  LayoutGrid,
  Lightbulb,
  ListTodo,
  NotebookPen,
  Plus,
  Smartphone,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ABOUT_BIT,
  APPS_CARD,
  DAILY_APPS,
  APK_STORY,
  FUN_FACT,
} from "@/constants/about"
import type { DailyApp } from "@/constants/about"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { AboutCard, AboutSectionHead } from "./about-card"

const APP_ICONS: Record<NonNullable<DailyApp["icon"]>, LucideIcon> = {
  todo: ListTodo,
  notes: NotebookPen,
  globe: Globe,
  compass: Compass,
  alarm: AlarmClock,
}

function ResourceLink({ link }: { link: { label: string; href: string } }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex items-center gap-1 font-medium text-blue-600 hover:underline hover:underline-offset-4"
    >
      {link.label}
      <ArrowUpRight
        aria-hidden
        className="size-4 shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
    </a>
  )
}

function ToggleCircle({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="flex-center size-8 shrink-0 justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:scale-105"
    >
      {open ? <X className="size-4" /> : <Plus className="size-4" />}
    </span>
  )
}

function AppTile({ app }: { app: DailyApp }) {
  const Icon = app.icon ? APP_ICONS[app.icon] : undefined
  const body = (
    <>
      <span className="flex-center size-12 shrink-0 justify-center overflow-hidden rounded-xl border border-border bg-card">
        {app.iconSrc ? (
          <Image
            src={app.iconSrc}
            alt=""
            aria-hidden
            width={32}
            height={32}
            loading="lazy"
            className="size-8 object-contain"
          />
        ) : (
          Icon && <Icon aria-hidden className="size-6 text-blue-600" />
        )}
      </span>
      <span>
        <span className="block font-bold text-blue-600">{app.name}</span>
        <span className="block text-sm text-muted-foreground">{app.role}</span>
      </span>
    </>
  )
  const tileClass =
    "flex h-full items-start gap-3 rounded-xl border border-border bg-muted/50 p-3"

  if (!app.href) return <div className={tileClass}>{body}</div>

  return (
    <a
      href={app.href}
      target="_blank"
      rel="noreferrer"
      className={cn(tileClass, "transition-colors hover:border-blue-600")}
    >
      {body}
      <ArrowUpRight
        aria-hidden
        className="ml-auto size-4 shrink-0 text-blue-600"
      />
    </a>
  )
}

export function ABitOfMe() {
  const [appsOpen, setAppsOpen] = useState(true)
  const [factOpen, setFactOpen] = useState(false)
  const [apkOpen, setApkOpen] = useState(false)

  return (
    <section id="a-bit-of-me" aria-label="A bit of me" className="mt-20">
      <div className="flex flex-col gap-4">
        <AboutSectionHead index={ABOUT_BIT.index} title={ABOUT_BIT.title} />

        <AboutCard>
          <Collapsible open={appsOpen} onOpenChange={setAppsOpen}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 text-left">
              <span className="heading-6 flex-center gap-2">
                <LayoutGrid
                  aria-hidden
                  className="size-5 shrink-0 text-blue-600"
                />
                {APPS_CARD.title}
              </span>
              <span className="flex-center shrink-0 gap-2">
                <span className="text-sm text-muted-foreground">
                  {APPS_CARD.count}
                </span>
                <ToggleCircle open={appsOpen} />
              </span>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-10">
                {DAILY_APPS.map((app, i) => (
                  <li
                    key={app.name}
                    className={cn(
                      "lg:col-span-2",
                      i >= DAILY_APPS.length - 2 && "lg:col-span-5"
                    )}
                  >
                    <AppTile app={app} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-muted-foreground">
                {APPS_CARD.note} Read my{" "}
                <a
                  target="_blank"
                  href="https://www.reddit.com/r/ObsidianMD/comments/1l3z4vw/finally_im_satisfied_with_my_obsidian/"
                  className="text-rose-400 underline underline-offset-2"
                >
                  Reddit post
                </a>{" "}
                about my obsidian setup.
              </p>

              <blockquote className="my-2 font-medium text-foreground/70">
                🔒 By the way, I use the{" "}
                <a
                  target="_blank"
                  href="https://f-droid.org/en/packages/com.wesaphzt.privatelock/"
                  className="text-teal-700 underline underline-offset-2"
                >
                  Private Lock
                </a>{" "}
                app, which locks my Android phone when I shake it. So if I’m
                using my phone in a public place and a theft happens, shaking
                the phone will lock it and keep my data safe.
              </blockquote>

              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                {APPS_CARD.links.map((link) => (
                  <ResourceLink key={link.label} link={link} />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </AboutCard>

        <AboutCard>
          <Collapsible open={factOpen} onOpenChange={setFactOpen}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 text-left">
              <span className="heading-6 flex-center gap-2">
                <Lightbulb
                  aria-hidden
                  className="size-5 shrink-0 text-blue-600"
                />
                {FUN_FACT.title}
              </span>
              <ToggleCircle open={factOpen} />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-2 space-y-4 text-muted-foreground">
                <p>
                  I coded on Android from{" "}
                  <code className="text-code rounded bg-blue-600/10 px-1.5 py-0.5 font-semibold text-blue-600">
                    March 2022 to February 2025
                  </code>{" "}
                  using{" "}
                  <a
                    href="https://github.com/Acode-Foundation/Acode"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 underline underline-offset-2"
                  >
                    Acode
                  </a>
                  , a feature-rich code editor that provides a VS Code-like
                  experience.
                </p>
                <p>
                  For my terminal needs, I relied on{" "}
                  <a
                    href="https://termux.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 underline underline-offset-2"
                  >
                    Termux
                  </a>
                  , and for console functionality, I used{" "}
                  <a
                    href="https://eruda.liriliri.io"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 underline underline-offset-2"
                  >
                    eruda
                  </a>
                  . Notably, many of my old projects was crafted entirely on
                  Android using Acode and Termux.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </AboutCard>

        <AboutCard>
          <Collapsible open={apkOpen} onOpenChange={setApkOpen}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 text-left">
              <span className="heading-6 flex-center gap-2">
                <Smartphone
                  aria-hidden
                  className="size-5 shrink-0 text-blue-600"
                />
                {APK_STORY.title}
              </span>
              <ToggleCircle open={apkOpen} />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Around 2018-2020, I was introduced to &quot;ApkBuilder&quot;
                  and found a way to create apps with HTML, CSS, and JS. In
                  2022, I created a template and stored it on GitHub.
                </p>
                <p>
                  In 2026, after adapting to agentic development, I got an idea
                  to improve that template and generate APKs with GitHub
                  Actions, without an Android Studio setup. And boom, it works.
                  After steering the agent multiple times, it finally improved
                  the template and created the correct GitHub Action to generate
                  the APK file.
                </p>
                <p>
                  Now I&apos;m enjoying this template because I can create
                  offline apps with it instead of making a PWA, since a PWA
                  warms up the browser, while this template creates an internal
                  WebView.
                </p>
                <a
                  href={APK_STORY.templateHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block font-medium text-blue-600"
                >
                  {APK_STORY.templateLabel} {"->"}
                </a>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </AboutCard>
      </div>
    </section>
  )
}
