export type ContentStatus = "draft" | "published"

export type HomePageContent = {
  about: {
    experienceBadge: string
    experienceMuted: string
    experienceText: string
    experienceValue: string
    nowBadge: string
    nowBody: string
    nowHeading: string
    sideNote: string
    titleBlack: string
    titleGray: string
    whoBadge: string
    whoBody: string
    whoHeading: string
    workBadge: string
    workBody: string
    workHeading: string
  }
  contact: {
    cardHeading: string
    cardHeadingAccent: string
    cardSub: string
    ctaLabel: string
    eyebrow: string
    giantWord: string
    headerBadge: string
    headerSideNote: string
    headerTitleBlack: string
    headerTitleGray: string
  }
  faq: {
    badge: string
    sideNote: string
    titleBlack: string
    titleGray: string
  }
  hero: {
    availability: string
    badgeRole: string
    buildItems: Array<{ icon: string; label: string }>
    chips: string[]
    detail: string
    lead: string
    secondaryCtaLabel: string
    title: string
    titleAccent: string
  }
  projects: {
    emptyDescription: string
    emptyTitle: string
    headerBadge: string
    headerSideNote: string
    headerTitleBlack: string
    headerTitleGray: string
  }
  skills: {
    additionalDescription: string
    additionalTitle: string
    badge: string
    coreDescription: string
    coreTitle: string
    sideNote: string
    titleBlack: string
    titleGray: string
    toolkitDescription: string
    toolkitTitle: string
  }
}

export type PortfolioSiteSettings = {
  bio: string
  businessRole: string
  email: string
  handle: string
  location: string
  name: string
  origin: string
  phone: string
  profileImageKey: string | null
  role: string
  seoDescription: string
  seoTitle: string
  shortName: string
  socialLinks: Record<string, string>
  whatsappUrl: string
}

export type PortfolioProject = {
  content: Record<string, unknown>
  coverKey: string | null
  createdAt: string
  featured: boolean
  id: string
  liveUrl: string | null
  projectType: string
  publishedAt: string | null
  repositoryUrl: string | null
  shortDescription: string
  slug: string
  sortOrder: number
  status: ContentStatus
  technologies: string[]
  title: string
}

export type PortfolioSkill = {
  category: string
  description: string | null
  iconKey: string | null
  id: string
  name: string
  sortOrder: number
  visible: boolean
}

export type PortfolioService = {
  description: string
  id: string
  sortOrder: number
  title: string
  visible: boolean
}

export type PortfolioFaq = {
  answer: string
  id: string
  question: string
  sortOrder: number
  visible: boolean
}

export type PortfolioTimelineEntry = {
  description: string | null
  endDate: string | null
  entryType: "education" | "experience"
  id: string
  isCurrent: boolean
  organization: string | null
  sortOrder: number
  startDate: string | null
  title: string
  visible: boolean
}

export type PortfolioMediaAsset = {
  altText: string | null
  createdAt: string
  fileSize: number
  id: string
  mimeType: string
  publicUrl: string
  storageKey: string
}

export type PortfolioContactMessage = {
  createdAt: string
  id: string
  internalNote: string | null
  message: string
  senderEmail: string
  senderName: string
  status: "unread" | "read" | "archived"
}

export type PortfolioCmsSnapshot = {
  configured: boolean
  content: HomePageContent
  faqs: PortfolioFaq[]
  media: PortfolioMediaAsset[]
  messages: PortfolioContactMessage[]
  projects: PortfolioProject[]
  services: PortfolioService[]
  site: PortfolioSiteSettings
  skills: PortfolioSkill[]
  timeline: PortfolioTimelineEntry[]
}

export type CmsActionState = {
  message: string | null
  status: "error" | "idle" | "success"
}
