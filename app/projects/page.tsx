import type { Metadata } from "next"
import Link from "next/link"

import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/shared/section-header"
import { getPortfolioCmsSnapshot } from "@/lib/cms"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case study aplikasi web, ERP, integrasi sistem, dan solusi digital oleh Habib Arifin Makhtum.",
}

export default async function ProjectsPage() {
  const snapshot = await getPortfolioCmsSnapshot()
  const projects = snapshot.projects.filter(
    (project) => project.status === "published"
  )

  return (
    <main className="flex flex-col gap-4 pb-24">
      <section aria-label="Portfolio" className="py-6">
        <div className="flex flex-col gap-8">
          <SectionHeader
            badge={snapshot.content.projects.headerBadge}
            titleBlack={snapshot.content.projects.headerTitleBlack}
            titleGray={snapshot.content.projects.headerTitleGray}
            sideNote={snapshot.content.projects.headerSideNote}
            center={false}
            badgeCenter
          />

          {projects.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => {
                const cover = project.coverKey
                  ? snapshot.media.find(
                      (asset) => asset.storageKey === project.coverKey
                    )
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
                        <div className="flex-center size-full justify-center text-sm text-muted-foreground">
                          {project.projectType}
                        </div>
                      )}
                    </div>
                    <div className="flex-center justify-between gap-4 p-5">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-blue-600">
                          {project.projectType}
                        </p>
                        <h2 className="heading-6 mt-1 truncate">
                          {project.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
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
              <h2 className="heading-4">
                {snapshot.content.projects.emptyTitle}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {snapshot.content.projects.emptyDescription}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
