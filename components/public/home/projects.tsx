import { SectionHeader } from "@/components/shared/section-header"
import { FeaturedProjectCard } from "@/components/shared/featured-project-card"
import { CtaPill } from "@/components/shared/cta-pill"

import {
  FEATURED_PROJECTS,
  PROJECTS_CTA,
  PROJECTS_HEADER,
} from "@/constants/projects"

export function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="mt-6 sm:mt-10">
      <div className="flex flex-col gap-8">
        <SectionHeader
          badge={PROJECTS_HEADER.badge}
          titleBlack={PROJECTS_HEADER.titleBlack}
          titleGray={PROJECTS_HEADER.titleGray}
          sideNote={PROJECTS_HEADER.sideNote}
          center={false}
          badgeCenter
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FEATURED_PROJECTS.slice(0, 4).map((project) => (
            <FeaturedProjectCard key={project.name} project={project} />
          ))}
        </div>

        <div className="flex justify-center">
          <CtaPill href={PROJECTS_CTA.href} label={PROJECTS_CTA.label} />
        </div>
      </div>
    </section>
  )
}
