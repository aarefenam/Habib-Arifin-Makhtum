import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { HomePageContent, PortfolioSiteSettings } from "@/types/cms"

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex-center gap-1.5 font-mono text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
      <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
      {children}
    </p>
  )
}

export function About({
  content,
  profileImageUrl,
  site,
}: {
  content: HomePageContent["about"]
  profileImageUrl?: string
  site: PortfolioSiteSettings
}) {
  const initials = site.name
    .split(" ")
    .map((part) => part.slice(0, 1))
    .slice(0, 2)
    .join("")

  return (
    <section id="about" aria-label="About me" className="py-6">
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex flex-col gap-4">
          {/* <Eyebrow>{ABOUT_HEADER.badge}</Eyebrow> */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="big-heading font-bold">
              {content.titleBlack}
              <br />
              <span className="text-muted-foreground">{content.titleGray}</span>
            </h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              {content.sideNote}
            </p>
          </div>
        </header>

        <hr className="my-8 border-border" />

        {/* Who I am */}
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Profile photo: fixed ratio so any upload crops cleanly */}
          <div className="relative flex-center aspect-video w-full justify-center overflow-hidden rounded-2xl bg-blue-600/10 select-none">
            {profileImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profileImageUrl}
                alt={`Foto ${site.name}`}
                className="absolute inset-0 size-full object-cover object-[center_25%]"
              />
            ) : (
              <span className="text-[8rem] leading-none font-extrabold tracking-tight text-blue-600/30">
                {initials}
              </span>
            )}
          </div>

          <div>
            <Eyebrow>{content.whoBadge}</Eyebrow>
            <h3 className="heading-4 mt-4">{content.whoHeading}</h3>
            <p className="mt-4 leading-6 tracking-wide text-muted-foreground">
              {content.whoBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { href: site.socialLinks.github, label: "GitHub" },
                { href: site.socialLinks.linkedin, label: "LinkedIn" },
              ]
                .filter((link) => link.href)
                .map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex-center gap-2 text-sm font-semibold text-blue-600"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="flex-center size-6 justify-center rounded-full bg-blue-600 text-white"
                    >
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <hr className="my-8 border-border" />

        {/* Stats row */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
          <div className="md:pr-8">
            <Eyebrow>{content.experienceBadge}</Eyebrow>
            <p className="mt-3 text-6xl font-extrabold tracking-tight text-blue-600">
              {content.experienceValue}
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">{content.experienceText}</span>{" "}
              <span className="text-muted-foreground">
                {content.experienceMuted}
              </span>
            </p>
          </div>

          <div className="md:px-8">
            <Eyebrow>{content.workBadge}</Eyebrow>
            <h3 className="heading-5 mt-3 text-balance">
              {content.workHeading}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {content.workBody}
            </p>
          </div>

          <div className="md:pl-8">
            <Eyebrow>{content.nowBadge}</Eyebrow>
            <h3 className="heading-5 mt-3 text-balance">
              {content.nowHeading}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {content.nowBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
