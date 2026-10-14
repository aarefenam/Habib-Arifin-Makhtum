import Link from "next/link"
import { Rocket } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { SocialIcon } from "@/components/shared/social-icons"

import { SectionHeader } from "@/components/shared/section-header"
import { FilterableProjects } from "@/components/public/projects/filterable-projects"

import { PROJECTS_HEADER } from "@/constants/projects"

export const metadata = {
  title: "Projects by Fazle Rabbi | Software Developer",
  description:
    "Explore projects by Fazle Rabbi, a Bangladeshi software developer building web apps with the MERN stack and Next.js, from idea to live launch.",
}

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-4 pb-24">
      <section aria-label="Projects" className="py-6">
        <div className="flex flex-col gap-8">
          <SectionHeader
            badge={PROJECTS_HEADER.badge}
            titleBlack={PROJECTS_HEADER.titleBlack}
            titleGray={PROJECTS_HEADER.titleGray}
            sideNote={PROJECTS_HEADER.sideNote}
            center={false}
            badgeCenter
          />

          <FilterableProjects />

          <div aria-hidden className="mt-8 border-t border-dashed border-foreground/25" />

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/fazle-rabbi-dev?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              All of my projects can be found on GitHub
              <SocialIcon brand="github" className="size-4" />
            </a>

            <Link
              href="/project-launchpad"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Open and try live projects from the Launchpad
              <Rocket className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
