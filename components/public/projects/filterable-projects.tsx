"use client"

import { useState } from "react"

import { FeaturedProjectCard } from "@/components/shared/featured-project-card"

import { FEATURED_PROJECTS, PROJECT_FILTERS } from "@/constants/projects"
import type { ProjectType } from "@/constants/projects"

import { cn } from "@/lib/utils"

export function FilterableProjects() {
  const [active, setActive] = useState<ProjectType | "all">("all")

  const visible =
    active === "all"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((project) => project.type === active)

  return (
    <div className="flex flex-col gap-6">
      {/* Filter bar */}
      <div
        role="group"
        aria-label="Filter projects"
        className="flex items-center gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PROJECT_FILTERS.map((filter) => {
          const isActive = active === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-foreground text-background shadow-md"
                  : "text-foreground hover:bg-foreground/10"
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {/* Cards */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((project) => (
            <FeaturedProjectCard key={project.name} project={project} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
          No projects found in this category yet.
        </p>
      )}
    </div>
  )
}
