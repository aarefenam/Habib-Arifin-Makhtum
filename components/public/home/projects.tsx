import Link from "next/link"

import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/shared/section-header"
import type {
  HomePageContent,
  PortfolioMediaAsset,
  PortfolioProject,
} from "@/types/cms"

// 2 rows on desktop (3 columns), 3 rows on tablet (2 columns)
const HOME_PROJECT_LIMIT = 6

export function Projects({
  content,
  media,
  projects,
}: {
  content: HomePageContent["projects"]
  media: PortfolioMediaAsset[]
  projects: PortfolioProject[]
}) {
  // Homepage shows featured projects only (fallback: latest published), capped
  const published = projects.filter((project) => project.status === "published")
  const featured = published.filter((project) => project.featured)
  const publishedProjects = (featured.length ? featured : published).slice(
    0,
    HOME_PROJECT_LIMIT
  )
  const hasMore = published.length > publishedProjects.length

  return (
    <section id="projects" aria-label="Projects" className="mt-6 sm:mt-10">
      <div className="flex flex-col gap-8">
        <SectionHeader
          badge={content.headerBadge}
          titleBlack={content.headerTitleBlack}
          titleGray={content.headerTitleGray}
          sideNote={content.headerSideNote}
          center={false}
          badgeCenter
        />

        {publishedProjects.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {publishedProjects.map((project) => {
              const cover = project.coverKey
                ? media.find((asset) => asset.storageKey === project.coverKey)
                : undefined

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[16/9] bg-muted">
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cover.publicUrl}
                        alt={cover.altText ?? project.title}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex-center size-full justify-center text-sm font-medium text-muted-foreground">
                        {project.projectType}
                      </div>
                    )}
                  </div>
                  <div className="flex-center justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <h3 className="heading-6 truncate">{project.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {project.shortDescription}
                      </p>
                    </div>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-blue-600"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center sm:p-8">
            <p className="font-semibold">{content.emptyTitle}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {content.emptyDescription}
            </p>
          </div>
        )}

        {/* Read more: always leads to the full projects page */}
        {published.length ? (
          <Link
            href="/projects"
            className="group mx-auto flex-center h-11 gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold transition-colors hover:bg-muted"
          >
            {hasMore ? `Read more (${published.length} projects)` : "Read more"}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        ) : null}
      </div>
    </section>
  )
}
