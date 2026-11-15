import type { Metadata } from "next"

import { ArrowUpRight, MapPin, Wrench } from "lucide-react"

import { getPortfolioCmsSnapshot } from "@/lib/cms"

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getPortfolioCmsSnapshot()
  return {
    title: content.aboutSeo.title,
    description: content.aboutSeo.description,
  }
}

export default async function AboutPage() {
  const snapshot = await getPortfolioCmsSnapshot()
  const visibleServices = snapshot.services.filter((service) => service.visible)
  const visibleTimeline = snapshot.timeline.filter((entry) => entry.visible)
  const { aboutIntro, aboutServices, aboutTimeline, aboutContact } =
    snapshot.content

  return (
    <main className="pb-24">
      <section aria-labelledby="about-title" className="py-6 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="flex-center w-fit gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-blue-600">
              <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
              {aboutIntro.badge}
            </p>
            <h1 id="about-title" className="heading-1 mt-5 max-w-3xl">
              {aboutIntro.title} {aboutIntro.titleAccent}
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-7 text-muted-foreground">
            {aboutIntro.description}
          </p>
        </div>
      </section>

      <section
        aria-label="Fokus dan latar belakang"
        className="grid gap-4 md:grid-cols-2"
      >
        <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <Wrench aria-hidden className="size-5 text-blue-600" />
          <h2 className="heading-4 mt-5">{aboutServices.title}</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {visibleServices.length ? (
              visibleServices.map((service) => (
                <li key={service.id} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600"
                  />
                  <span>
                    <span className="font-medium text-foreground">
                      {service.title}
                    </span>
                    <span className="block text-sm">{service.description}</span>
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm">{aboutServices.emptyText}</li>
            )}
          </ul>
        </article>

        <div className="grid gap-4">
          <AboutTimeline
            entries={visibleTimeline.filter(
              (entry) => entry.entryType === "education"
            )}
            title={aboutTimeline.educationTitle}
            emptyText={aboutTimeline.emptyEducation}
            currentLabel={aboutTimeline.currentLabel}
          />
          <AboutTimeline
            entries={visibleTimeline.filter(
              (entry) => entry.entryType === "experience"
            )}
            title={aboutTimeline.experienceTitle}
            emptyText={aboutTimeline.emptyExperience}
            currentLabel={aboutTimeline.currentLabel}
          />

          <article className="rounded-2xl border border-border bg-card p-6">
            <MapPin aria-hidden className="size-5 text-blue-600" />
            <h2 className="heading-5 mt-4">{aboutTimeline.locationTitle}</h2>
            <p className="mt-2 text-muted-foreground">
              {snapshot.site.location}
            </p>
          </article>
        </div>
      </section>

      <section
        aria-label={aboutContact.title}
        className="mt-12 rounded-2xl bg-foreground p-6 text-background sm:p-8"
      >
        <h2 className="heading-3">
          {aboutContact.title} {aboutContact.titleAccent}
        </h2>
        <p className="mt-3 max-w-xl text-background/70">
          {aboutContact.description}
        </p>
        <ContentLink
          href={aboutContact.ctaHref}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          {aboutContact.ctaLabel}
          <ArrowUpRight aria-hidden className="size-4" />
        </ContentLink>
      </section>
    </main>
  )
}
import { AboutTimeline } from "@/components/public/about/about-timeline"
import { ContentLink } from "@/components/shared/content-link"
