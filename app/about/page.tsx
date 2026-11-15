import type { Metadata } from "next"
import Link from "next/link"

import { ArrowUpRight, GraduationCap, MapPin, Wrench } from "lucide-react"

import { getPortfolioCmsSnapshot } from "@/lib/cms"

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Pelajari fokus kerja, latar belakang, dan teknologi yang digunakan Habib Arifin Makhtum.",
}

export default async function AboutPage() {
  const snapshot = await getPortfolioCmsSnapshot()
  const visibleServices = snapshot.services.filter((service) => service.visible)
  const visibleTimeline = snapshot.timeline.filter((entry) => entry.visible)

  return (
    <main className="pb-24">
      <section aria-labelledby="about-title" className="py-6 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="flex-center w-fit gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-blue-600">
              <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
              Tentang
            </p>
            <h1 id="about-title" className="heading-1 mt-5 max-w-3xl">
              {snapshot.content.about.titleBlack}{" "}
              {snapshot.content.about.titleGray}
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-7 text-muted-foreground">
            {snapshot.site.bio}
          </p>
        </div>
      </section>

      <section
        aria-label="Fokus dan latar belakang"
        className="grid gap-4 md:grid-cols-2"
      >
        <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <Wrench aria-hidden className="size-5 text-blue-600" />
          <h2 className="heading-4 mt-5">Fokus kerja</h2>
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
              <li className="text-sm">
                Tambahkan layanan melalui CMS untuk ditampilkan di sini.
              </li>
            )}
          </ul>
        </article>

        <div className="grid gap-4">
          <article className="rounded-2xl border border-border bg-card p-6">
            <GraduationCap aria-hidden className="size-5 text-blue-600" />
            <h2 className="heading-5 mt-4">Pendidikan</h2>
            <p className="mt-2 text-muted-foreground">
              {visibleTimeline.find((entry) => entry.entryType === "education")
                ?.title ?? "Tambahkan riwayat pendidikan melalui CMS."}
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <MapPin aria-hidden className="size-5 text-blue-600" />
            <h2 className="heading-5 mt-4">Lokasi</h2>
            <p className="mt-2 text-muted-foreground">
              {snapshot.site.location}
            </p>
          </article>
        </div>
      </section>

      <section
        aria-label="Hubungi Habib"
        className="mt-12 rounded-2xl bg-foreground p-6 text-background sm:p-8"
      >
        <h2 className="heading-3">
          {snapshot.content.contact.headerTitleBlack}{" "}
          {snapshot.content.contact.headerTitleGray}
        </h2>
        <p className="mt-3 max-w-xl text-background/70">
          {snapshot.content.contact.headerSideNote}
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          {snapshot.content.contact.ctaLabel}
          <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </section>
    </main>
  )
}
