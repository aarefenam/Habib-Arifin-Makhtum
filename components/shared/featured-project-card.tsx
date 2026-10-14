import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { ProjectCover } from "@/components/shared/project-cover"
import type { FeaturedProject } from "@/constants/projects"

export function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <Link
      href={project.href}
      aria-label={`Open ${project.name}`}
      className="group block w-full max-w-full min-w-0"
    >
      {/* Cover - shared style also used on details page */}
      <ProjectCover cover={project.cover} name={project.name} zoomOnHover />

      {/* Name + arrow bar */}
      <div className="mt-2 flex-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
        <div className="min-w-0">
          <h3 className="heading-6 truncate">{project.name}</h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {project.shortDesc}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden
          strokeWidth={2.25}
          className="size-7 shrink-0 text-muted-foreground/30 transition-colors duration-300 group-hover:text-foreground"
        />
      </div>
    </Link>
  )
}
