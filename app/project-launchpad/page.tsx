import type { Metadata } from "next"

import { Launchpad } from "@/components/public/project-launchpad/launchpad"

export const metadata: Metadata = {
  title: "Project Launchpad | Fazle Rabbi",
  description:
    "Search and open live project URLs by Fazle Rabbi from one place, web apps built with Next.js and modern web tech.",
}

export default function ProjectLaunchpadPage() {
  return (
    <main className="flex flex-col gap-4 pb-24">
      <section aria-label="Project launchpad" className="py-6">
        <Launchpad />
      </section>
    </main>
  )
}
