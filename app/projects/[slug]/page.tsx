import { notFound } from "next/navigation"

import { ProjectHero } from "@/components/public/projects/project-hero"
import { ProjectBody } from "@/components/public/projects/project-body"

import { FEATURED_PROJECTS } from "@/constants/projects"
import { getProjectBase, getProjectDetails } from "@/constants/project-details"

type ProjectDetailsPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.href.replace("/projects/", ""),
  }))
}

export async function generateMetadata({ params }: ProjectDetailsPageProps) {
  const { slug } = await params
  const base = getProjectBase(slug)
  const details = getProjectDetails(slug)

  if (!base || !details) {
    return { title: "Project not found" }
  }

  return {
    title: details.title,
    description: details.headline,
  }
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params
  const base = getProjectBase(slug)
  const details = getProjectDetails(slug)

  if (!base || !details) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-4 pb-24">
      <ProjectHero details={details} />
      <ProjectBody details={details} cover={base.cover} />
    </main>
  )
}
