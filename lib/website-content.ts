import { DEFAULT_WEBSITE_CONTENT } from "@/constants/cms"
import { isSafeContentHref } from "@/lib/content-href"
import type { PortfolioSiteSettings, WebsiteContent } from "@/types/cms"

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}
}

// Missing fields inherit defaults; deliberately empty strings and lists stay empty.
function mergeValue(fallback: unknown, value: unknown, key = ""): unknown {
  if (typeof fallback === "string") {
    if (typeof value !== "string") return fallback
    return key.endsWith("Href") && !isSafeContentHref(value) ? fallback : value
  }
  if (Array.isArray(fallback)) {
    if (!Array.isArray(value)) return fallback
    if (!fallback.length || typeof fallback[0] === "object") {
      return value.filter((item) => {
        const row = record(item)
        return (
          typeof row.label === "string" &&
          (key === "buildItems"
            ? typeof row.icon === "string"
            : typeof row.href === "string" && isSafeContentHref(row.href))
        )
      })
    }
    return value.filter((item) => typeof item === "string")
  }
  const source = record(value)
  return Object.fromEntries(
    Object.entries(record(fallback)).map(([field, item]) => [
      field,
      mergeValue(item, source[field], field),
    ])
  )
}

export function mergeWebsiteContent(
  value: unknown,
  site?: Partial<PortfolioSiteSettings>
): WebsiteContent {
  const source = record(value)
  // The old editor shared these fields between pages. Preserve that copy on first read.
  const about = record(source.about)
  const contact = record(source.contact)
  const hero = record(source.hero)
  const compatible = {
    ...source,
    hero: { primaryCtaLabel: contact.ctaLabel, ...hero },
    aboutIntro: source.aboutIntro ?? {
      badge: "About",
      title: about.titleBlack,
      titleAccent: about.titleGray,
      description: site?.bio,
    },
    aboutContact: source.aboutContact ?? {
      title: contact.headerTitleBlack,
      titleAccent: contact.headerTitleGray,
      description: contact.headerSideNote,
      ctaLabel: contact.ctaLabel,
    },
    projectsPage: source.projectsPage ?? source.projects,
  }
  const defaults = {
    ...DEFAULT_WEBSITE_CONTENT,
    header: {
      ...DEFAULT_WEBSITE_CONTENT.header,
      brandName: site?.shortName ?? DEFAULT_WEBSITE_CONTENT.header.brandName,
      initials:
        site?.name
          ?.split(" ")
          .map((part) => part.slice(0, 1))
          .slice(0, 2)
          .join("") ?? DEFAULT_WEBSITE_CONTENT.header.initials,
    },
    footer: {
      ...DEFAULT_WEBSITE_CONTENT.footer,
      giantText:
        site?.name?.split(" ")[0].toUpperCase() ??
        DEFAULT_WEBSITE_CONTENT.footer.giantText,
    },
  }
  return mergeValue(defaults, compatible) as WebsiteContent
}
