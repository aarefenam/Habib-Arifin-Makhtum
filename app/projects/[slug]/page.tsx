import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeft, ExternalLink, GitFork } from "lucide-react"

import { getPortfolioCmsSnapshot } from "@/lib/cms"

type ProjectDetailsPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const [{ slug }, snapshot] = await Promise.all([
    params,
    getPortfolioCmsSnapshot(),
  ])
  const project = snapshot.projects.find(
    (item) => item.slug === slug && item.status === "published"
  )

  if (!project) notFound()

  const cover = project.coverKey
    ? snapshot.media.find((asset) => asset.storageKey === project.coverKey)
    : undefined
  const body =
    typeof project.content.body === "string" ? project.content.body : ""

  return (
    <main className="pb-24">
      <section className="py-6 sm:py-12">
        <Link
          href="/projects"
          className="flex-center min-h-11 w-fit gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Kembali ke projects
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600">
              {project.projectType}
            </p>
            <h1 className="heading-1 mt-3 text-balance">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {project.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-center min-h-11 gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
              >
                Lihat website
                <ExternalLink aria-hidden className="size-4" />
              </a>
            ) : null}
            {project.repositoryUrl ? (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-center min-h-11 gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                <GitFork aria-hidden className="size-4" />
                Repository
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-muted">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover.publicUrl}
              alt={cover.altText ?? project.title}
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="flex-center aspect-video justify-center text-sm text-muted-foreground">
              Cover project belum ditambahkan.
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article>
            <h2 className="heading-4">Tentang project</h2>
            <div className="mt-4 leading-8 whitespace-pre-wrap text-muted-foreground">
              {body || project.shortDescription}
            </div>
          </article>
          <aside className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-medium">Teknologi</p>
            {project.technologies.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Belum ditambahkan.
              </p>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}
