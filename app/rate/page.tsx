import type { Metadata } from "next"

import { RatingForm } from "@/components/public/rate/rating-form"
import { getPortfolioCmsSnapshot } from "@/lib/cms"

// Private link shared with clients, so keep it out of search results
export const metadata: Metadata = {
  title: "Rate my work",
  description: "Share your experience working with me.",
  robots: { index: false, follow: false },
}

export default async function RatePage() {
  const snapshot = await getPortfolioCmsSnapshot()
  const { site, content } = snapshot
  const projects = snapshot.projects
    .filter((project) => project.status === "published")
    .map((project) => project.title)
  const avatarKey = content.contact.avatarKey || content.header.logoKey
  const avatarUrl = avatarKey
    ? snapshot.media.find((asset) => asset.storageKey === avatarKey)?.publicUrl
    : undefined
  const initials = site.name
    .split(" ")
    .map((part) => part.slice(0, 1))
    .slice(0, 2)
    .join("")

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 py-6 pb-24 sm:py-12">
      <header className="flex flex-col items-center gap-4 text-center">
        <span className="flex-center size-16 justify-center overflow-hidden rounded-full bg-blue-600 text-lg font-bold text-white ring-1 ring-border ring-offset-4 ring-offset-background">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={site.name}
              className="size-full object-cover object-top"
            />
          ) : (
            initials
          )}
        </span>
        <p className="flex-center w-fit gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-blue-600">
          <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
          Client feedback
        </p>
        <h1 className="heading-2 text-balance">
          How was working with {site.shortName || site.name}?
        </h1>
        <p className="max-w-md text-muted-foreground">
          Your honest rating helps me improve and helps future clients decide.
          It takes less than a minute.
        </p>
      </header>

      <RatingForm projects={projects} />
    </main>
  )
}
