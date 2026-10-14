export const PROJECTS_HEADER = {
  badge: "Projects",
  titleBlack: "Selected work",
  titleGray: "that's live.",
  sideNote: "A selection of projects I've taken from idea to launch.",
}

export type ProjectType =
  "web" | "mobile" | "desktop" | "cli" | "vibe-coded" | "misc"

export type FeaturedProject = {
  name: string
  shortDesc: string
  // description: string
  tags: string[]
  href: string
  cover: string
  type: ProjectType
}

export const PROJECT_FILTERS: { label: string; value: ProjectType | "all" }[] =
  [
    { label: "All", value: "all" },
    { label: "Web", value: "web" },
    { label: "Mobile", value: "mobile" },
    { label: "Desktop", value: "desktop" },
    { label: "CLI", value: "cli" },
    { label: "Vibe coded", value: "vibe-coded" },
    { label: "Miscellaneous", value: "misc" },
  ]

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: "Link Leaf",
    shortDesc: "A bio-link page builder for your social media bios.",
    tags: ["Next.js", "Full-stack"],
    href: "/projects/link-leaf",
    // cover:
    //   "https://framerusercontent.com/images/vYf7Bp88A2oX0r0rBYroXDxsSI.jpg?scale-down-to=1024&width=1600&height=1200",
    cover: "/project-covers/link-leaf.png",
    type: "web",
  },
  {
    name: "TubeBrief",
    shortDesc: "Paste a YouTube video and get a short summary.",
    tags: ["Web app", "Side project"],
    href: "/projects/tube-brief",
    // cover: "https://framerusercontent.com/images/ktcimUvwboXOgQi2AvOrS6Bj760.jpg?scale-down-to=1024&width=1600&height=1200",
    cover: "/project-covers/tube-brief.png",
    type: "web",
  },
  {
    name: "Quiet Stack",
    shortDesc: "Personal blog website with aesthetic vibe.",
    tags: ["Web app", "Side project"],
    href: "/projects/quiet-stack",
    // cover: "https://framerusercontent.com/images/ktcimUvwboXOgQi2AvOrS6Bj760.jpg?scale-down-to=1024&width=1600&height=1200",
    cover: "/project-covers/quiet-stack.png",
    type: "web",
  },

  {
    name: "Clipo",
    shortDesc: "An aesthetic clipboard manager for windows.",
    tags: ["Web app", "Side project"],
    href: "/projects/clipo",
    // cover: "https://framerusercontent.com/images/ktcimUvwboXOgQi2AvOrS6Bj760.jpg?scale-down-to=1024&width=1600&height=1200",
    cover: "/project-covers/clipo.png",
    type: "desktop",
  },
  {
    name: "Pdf Reader ",
    shortDesc: "A minimal pdf reader for windows with essential features.",
    tags: ["Web app", "Side project"],
    href: "/projects/pdf-reader",
    // cover: "https://framerusercontent.com/images/ktcimUvwboXOgQi2AvOrS6Bj760.jpg?scale-down-to=1024&width=1600&height=1200",
    cover: "/project-covers/pdf-reader.png",
    type: "desktop",
  },
  {
    name: "Story Book",
    shortDesc: "A story book web app with prophets story.",
    tags: ["Web app", "Side project"],
    href: "/projects/story-book",
    // cover: "https://framerusercontent.com/images/ktcimUvwboXOgQi2AvOrS6Bj760.jpg?scale-down-to=1024&width=1600&height=1200",
    cover: "/project-covers/story-book.png",
    type: "web",
  },
]

export const PROJECTS_CTA = {
  label: "View all projects",
  href: "/projects",
}
