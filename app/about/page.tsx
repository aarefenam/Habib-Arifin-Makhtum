import type { Metadata } from "next"
import Link from "next/link"

import { FolderKanban, Mail, Sparkles } from "lucide-react"

import { ABOUT_CTA, ABOUT_TOP } from "@/constants/about"
import { AboutToc } from "@/components/public/about/about-toc"
import { MyStory } from "@/components/public/about/my-story"
import { HowIWork } from "@/components/public/about/how-i-work"
import { Beliefs } from "@/components/public/about/beliefs"
import { ABitOfMe } from "@/components/public/about/a-bit-of-me"
import { Stories } from "@/components/public/about/stories"
import { Inspiration } from "@/components/public/about/inspiration"
import { RecentBlogs } from "@/components/public/about/recent-blogs"

export const metadata: Metadata = {
  title: "About Fazle Rabbi | Software Developer",
  description:
    "Fazle Rabbi is a Bangladeshi software developer building for the web since 2022, specializing in the web development with the MERN stack and Next.js.",
}

export default function AboutPage() {
  return (
    <main className="pb-24">
      <AboutToc />
      <section
        aria-label="About me"
        className="relative mt-10 overflow-hidden sm:mt-0"
      >
        <div className="relative flex flex-col gap-6">
          <div className="flex-center flex-col justify-center">
            <h1 className="heading-1 text-foreground">{ABOUT_TOP.title}</h1>

            <p className="heading-3 font-semibold tracking-tight text-muted-foreground/70">
              {ABOUT_TOP.sub}
            </p>
          </div>
        </div>
      </section>

      <MyStory />
      <HowIWork />
      <Beliefs />
      <ABitOfMe />
      <Stories />
      <Inspiration />
      <RecentBlogs />

      <div className="mt-16 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
        <Link
          href={ABOUT_CTA.contactHref}
          className="flex-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-105"
        >
          <Mail aria-hidden className="size-5" />
          {ABOUT_CTA.contactLabel}
        </Link>
        <Link
          href={ABOUT_CTA.skillsHref}
          className="flex-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3.5 text-base font-semibold transition-colors hover:border-blue-600 hover:text-blue-600"
        >
          <Sparkles aria-hidden className="size-5" />
          {ABOUT_CTA.skillsLabel}
        </Link>
        <Link
          href={ABOUT_CTA.projectsHref}
          className="flex-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3.5 text-base font-semibold transition-colors hover:border-blue-600 hover:text-blue-600"
        >
          <FolderKanban aria-hidden className="size-5" />
          {ABOUT_CTA.projectsLabel}
        </Link>
      </div>
    </main>
  )
}
