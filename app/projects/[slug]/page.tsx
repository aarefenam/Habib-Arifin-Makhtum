import { notFound } from "next/navigation"

type ProjectDetailsPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  await params
  notFound()
}
