import { SectionHeader } from "@/components/shared/section-header"
import { PROJECTS_CTA, PROJECTS_HEADER } from "@/constants/projects"

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

        <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center sm:p-8">
          <p className="font-semibold">Portfolio sedang diperbarui.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Case study akan hadir setelah melalui proses kurasi dan dokumentasi.
          </p>
          <a
            href={PROJECTS_CTA.href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full border border-border px-5 py-2 text-sm font-semibold transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            {PROJECTS_CTA.label}
          </a>
        </div>
      </div>
    </section>
  )
}
