export const PROJECTS_HEADER = {
  badge: "Portfolio",
  titleBlack: "Work built",
  titleGray: "to make an impact.",
  sideNote: "A selection of systems and digital products I have built.",
}

export type ProjectType =
  "web" | "mobile" | "desktop" | "cli" | "vibe-coded" | "misc"

export type FeaturedProject = {
  name: string
  shortDesc: string
  tags: string[]
  href: string
  cover: string
  type: ProjectType
}

export const PROJECT_FILTERS: { label: string; value: ProjectType | "all" }[] =
  []

// Keep the public portfolio empty until Habib's case studies are added through the ERP.
export const FEATURED_PROJECTS: FeaturedProject[] = []

export const PROJECTS_CTA = {
  label: "Kunjungi GitHub",
  href: "https://github.com/aarefenam",
}
