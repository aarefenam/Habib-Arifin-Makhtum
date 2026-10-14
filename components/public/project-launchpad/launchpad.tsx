"use client"

import { useDeferredValue, useState } from "react"

import { ArrowUpRight } from "lucide-react"

import { LAUNCHPAD_PROJECTS } from "@/constants/launchpad"

const INITIAL_GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-purple-600",
  "from-lime-500 to-emerald-600",
  "from-sky-500 to-indigo-600",
  "from-orange-500 to-red-600",
]

function getInitialGradient(title: string) {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0
  }
  return INITIAL_GRADIENTS[hash % INITIAL_GRADIENTS.length]
}

function matchesQuery(title: string, description: string | undefined, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    title.toLowerCase().includes(q) || (description ?? "").toLowerCase().includes(q)
  )
}

export function Launchpad() {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)

  const visible = LAUNCHPAD_PROJECTS.filter((project) =>
    matchesQuery(project.title, project.description, deferredQuery)
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <h1 className="heading-1">🚀 Launchpad</h1>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {visible.length} project{visible.length === 1 ? "" : "s"}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          All my live projects in one place. Search and open any project
          instantly.
        </p>
      </div>

      {/* Search */}
      <div role="search">
        <label htmlFor="launchpad-search" className="sr-only">
          Search projects
        </label>
        <input
          id="launchpad-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects"
          autoComplete="off"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      {/* Cards */}
      {visible.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.title}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live site`}
                className="flex h-full gap-3 rounded-2xl border border-border bg-card p-4 hover:border-foreground"
              >
                {/* Icon */}
                {project.iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.iconUrl}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-xl border border-border object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-sm ${getInitialGradient(project.title)}`}
                  >
                    {project.title.charAt(0).toUpperCase()}
                  </span>
                )}

                {/* Text */}
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-base font-semibold text-foreground">
                    {project.title}
                  </span>
                  {project.description ? (
                    <span className="text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </span>
                  ) : null}
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted-foreground"
                />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
          No projects found. Try a different search.
        </p>
      )}
    </div>
  )
}
