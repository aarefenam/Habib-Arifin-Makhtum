import type { Metadata } from "next"

import { GitFork } from "lucide-react"

import { SectionHeader } from "@/components/shared/section-header"
import { PROJECTS_CTA, PROJECTS_HEADER } from "@/constants/projects"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case study aplikasi web, ERP, integrasi sistem, dan solusi digital oleh Habib Arifin Makhtum.",
}

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-4 pb-24">
      <section aria-label="Portfolio" className="py-6">
        <div className="flex flex-col gap-8">
          <SectionHeader
            badge={PROJECTS_HEADER.badge}
            titleBlack={PROJECTS_HEADER.titleBlack}
            titleGray={PROJECTS_HEADER.titleGray}
            sideNote={PROJECTS_HEADER.sideNote}
            center={false}
            badgeCenter
          />

          <div className="rounded-2xl border border-dashed border-border bg-card p-6 sm:p-8">
            <h2 className="heading-4">Menyiapkan portfolio yang relevan.</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Setiap proyek akan dipublikasikan dengan konteks masalah,
              pendekatan, dan hasilnya. Sementara itu, kunjungi GitHub untuk
              melihat aktivitas pengembangan yang tersedia.
            </p>
            <a
              href={PROJECTS_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              <GitFork aria-hidden className="size-4" />
              {PROJECTS_CTA.label}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
