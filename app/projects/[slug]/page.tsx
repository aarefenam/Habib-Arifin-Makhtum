import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { ProjectCover } from "@/components/shared/project-cover"
import { SocialIcon } from "@/components/shared/social-icons"
import { getPortfolioCmsSnapshot } from "@/lib/cms"
import { countryFlagUrl, countryName } from "@/lib/countries"

type ProjectDetailsPageProps = {
  params: Promise<{ slug: string }>
}

// Read an optional string field from the project's JSON content
function contentText(content: Record<string, unknown>, key: string) {
  const value = content[key]
  return typeof value === "string" ? value.trim() : ""
}

// Features are stored one per line as "Title | Description"
function parseFeatures(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("|")
      return { title: title.trim(), desc: rest.join("|").trim() }
    })
}

function Eyebrow({ label }: { label: string }) {
  return (
    <p className="flex-center gap-2 text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
      <span aria-hidden className="h-px w-5 bg-blue-600" />
      {label}
    </p>
  )
}

// Two-column section: eyebrow + title on the left, content on the right
function DetailSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
      <div>
        <Eyebrow label={eyebrow} />
        <h2 className="heading-3 mt-2">{title}</h2>
      </div>
      {children}
    </section>
  )
}

async function getProject(slug: string) {
  const snapshot = await getPortfolioCmsSnapshot()
  const project = snapshot.projects.find(
    (item) => item.slug === slug && item.status === "published"
  )
  return { snapshot, project }
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { project } = await getProject((await params).slug)
  if (!project) notFound()
  return { title: project.title, description: project.shortDescription }
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { snapshot, project } = await getProject((await params).slug)
  if (!project) notFound()

  const labels = snapshot.content.projectDetail
  const cover = project.coverKey
    ? snapshot.media.find((asset) => asset.storageKey === project.coverKey)
    : undefined

  const headline = contentText(project.content, "headline")
  const timeline = contentText(project.content, "timeline")
  const client = contentText(project.content, "client")
  const clientCountry = contentText(project.content, "clientCountry")
  const country = countryName(clientCountry)
  const body = contentText(project.content, "body")
  const features = parseFeatures(contentText(project.content, "features"))
  const deepDive = [
    { label: "Problem", text: contentText(project.content, "problem") },
    { label: "Solution", text: contentText(project.content, "solution") },
    { label: "Insight", text: contentText(project.content, "insight") },
  ].filter((row) => row.text)

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 pb-24 sm:gap-16">
      {/* ===== Hero: back link, status, title, links, meta ===== */}
      <section aria-label={`${project.title} overview`} className="pt-6">
        <div className="flex-center justify-between gap-4">
          <Link
            href="/projects"
            className="flex-center h-8 gap-1 rounded-full border border-border bg-background px-3 text-[0.8rem] font-medium transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            {labels.backLabel}
          </Link>
          {project.liveUrl ? (
            <p className="flex-center gap-1.5 text-sm font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              Live
            </p>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <Eyebrow label={project.projectType} />
          <h1 className="heading-1 text-balance">
            {project.title}
            <span className="text-blue-600">.</span>
          </h1>
          {headline ? <p className="heading-5 max-w-2xl">{headline}</p> : null}
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {project.shortDescription}
          </p>

          {/* Links: glowing blue pill, inverted repo pill */}
          {project.liveUrl || project.repositoryUrl ? (
            <div className="flex-center flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-center h-12 gap-2 rounded-full bg-blue-600 px-7 text-[15px] font-semibold text-white shadow-[0_10px_36px_-6px_var(--color-blue-600)] transition-transform hover:scale-[1.02]"
                >
                  {labels.liveLabel}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ) : null}
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-center h-12 gap-2 rounded-full border border-foreground/10 bg-foreground px-7 text-[15px] font-semibold text-background transition-transform hover:scale-[1.02]"
                >
                  <SocialIcon brand="github" className="size-5" />
                  {labels.repositoryLabel}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Meta rows */}
        <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-dashed border-border pt-6 sm:grid-cols-[120px_1fr]">
          {client || country ? (
            <>
              <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Client
              </dt>
              <dd className="flex-center flex-wrap gap-x-3 gap-y-1 text-sm font-medium">
                {client}
                {country ? (
                  <span className="flex-center gap-1.5 text-muted-foreground">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={countryFlagUrl(clientCountry)}
                      alt=""
                      className="h-3.5 w-5 rounded-[3px] object-cover ring-1 ring-border"
                    />
                    {country}
                  </span>
                ) : null}
              </dd>
            </>
          ) : null}
          {timeline ? (
            <>
              <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Timeline
              </dt>
              <dd className="text-sm font-medium">{timeline}</dd>
            </>
          ) : null}
          <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {labels.technologiesTitle}
          </dt>
          <dd className="flex flex-wrap gap-2">
            {project.technologies.length ? (
              project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium shadow-sm"
                >
                  {technology}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                {labels.emptyTechnologies}
              </span>
            )}
          </dd>
        </dl>
      </section>

      {/* ===== Cover: framed card ===== */}
      <section aria-label={`${project.title} preview`}>
        {cover ? (
          <ProjectCover
            cover={cover.publicUrl}
            name={project.title}
            innerClassName="aspect-video"
            imgClassName="object-top"
          />
        ) : (
          <div className="flex-center aspect-video justify-center rounded-[20px] border border-border bg-muted text-sm text-muted-foreground">
            {labels.emptyCover}
          </div>
        )}
      </section>

      {/* ===== About the project ===== */}
      <DetailSection eyebrow="Overview" title={labels.bodyTitle}>
        <p className="leading-7 whitespace-pre-wrap text-muted-foreground sm:text-lg sm:leading-8">
          {body || project.shortDescription}
        </p>
      </DetailSection>

      {/* ===== Core features (optional) ===== */}
      {features.length ? (
        <DetailSection eyebrow="Features" title="Core features">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature, index) => (
              <article
                key={`${index}-${feature.title}`}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition hover:ring-2 hover:ring-blue-600/50"
              >
                <span className="flex-center size-8 justify-center rounded-lg bg-blue-600/10 font-mono text-xs font-semibold text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                {feature.desc ? (
                  <p className="leading-6 text-muted-foreground">
                    {feature.desc}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </DetailSection>
      ) : null}

      {/* ===== Deep dive (optional) ===== */}
      {deepDive.length ? (
        <DetailSection eyebrow="Deep dive" title="A closer look">
          <div className="divide-y divide-dashed divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {deepDive.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[140px_1fr] sm:gap-4"
              >
                <p className="pt-0.5 text-sm font-semibold tracking-[0.2em] text-blue-600 uppercase">
                  {row.label}
                </p>
                <p className="leading-6">{row.text}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      ) : null}
    </main>
  )
}
