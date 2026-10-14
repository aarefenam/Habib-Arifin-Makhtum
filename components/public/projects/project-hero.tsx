import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { SocialIcon } from "@/components/shared/social-icons"

import type { ProjectDetails } from "@/constants/project-details"

// Top hero: back link, live badge, title, headline, links, timeline + stack.
export function ProjectHero({ details }: { details: ProjectDetails }) {
  return (
    <section aria-label={`${details.title} overview`} className="py-6">
      {/* Top bar */}
      <div className="flex-center justify-between gap-4">
        <Link
          href="/projects"
          aria-label="Back to projects"
          className="flex-center h-7 gap-1 rounded-full border border-border bg-background px-2.5 text-[0.8rem] font-medium transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Projects
        </Link>
        <p className="flex-center gap-1.5 text-sm font-medium text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          {details.liveLabel}
        </p>
      </div>

      {/* Title block */}
      <div className="mt-10 flex flex-col gap-5">
        <p className="flex-center gap-2 text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
          <span aria-hidden className="h-px w-5 bg-blue-600" />
          Project
        </p>
        <h1 className="heading-1">
          {details.title}
          <span className="text-blue-600">.</span>
        </h1>
        <p className="heading-5 max-w-2xl">{details.headline}</p>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          {details.summary}
        </p>

        {/* Links - like design: glowing blue pill, dark GitHub pill, plain text link */}
        <div className="flex-center flex-wrap gap-x-5 gap-y-3">
          {details.liveUrl && (
            <a
              href={details.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-center h-12 gap-2 rounded-full bg-blue-600 px-7 text-[15px] font-semibold text-white shadow-[0_10px_36px_-6px_var(--color-blue-600)] transition-transform hover:scale-[1.02]"
            >
              Live demo
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
          {details.githubUrl && (
            <a
              href={details.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-center h-12 gap-2 rounded-full border border-foreground/10 bg-foreground px-7 text-[15px] font-semibold text-background transition-transform hover:scale-[1.02]"
            >
              <SocialIcon brand="github" className="size-5" />
              GitHub
            </a>
          )}
          {details.secondaryLinkLabel && details.secondaryLinkUrl && (
            <a
              href={details.secondaryLinkUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-center gap-1 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-blue-600"
            >
              {details.secondaryLinkLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </div>
      </div>

      {/* Meta */}
      <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-dashed border-border pt-6 sm:grid-cols-[110px_1fr] sm:gap-y-3">
        <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Timeline
        </dt>
        <dd className="text-sm font-medium sm:-mt-0.5">{details.timeline}</dd>

        <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Built with
        </dt>
        <dd className="flex flex-wrap gap-2">
          {details.stack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium shadow-sm"
            >
              {tech}
            </Badge>
          ))}
        </dd>
      </dl>
    </section>
  )
}
