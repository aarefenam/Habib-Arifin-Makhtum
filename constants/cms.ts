import {
  ABOUT_EXPERIENCE,
  ABOUT_HEADER,
  ABOUT_NOW,
  ABOUT_WHO,
  ABOUT_WORK,
} from "@/constants/about"
import { CONTACT_CARD, CONTACT_HEADER } from "@/constants/contact"
import { FAQ_HEADER } from "@/constants/faq"
import {
  HERO_BADGE,
  HERO_BUILD_ITEMS,
  HERO_CHIPS,
  HERO_COPY,
} from "@/constants/hero"
import { PROJECTS_HEADER } from "@/constants/projects"
import { SITE, SITE_DESCRIPTION } from "@/constants/site"
import { SKILLS_HEADER } from "@/constants/skills"
import type { HomePageContent, PortfolioSiteSettings } from "@/types/cms"

export const DEFAULT_SITE_SETTINGS: PortfolioSiteSettings = {
  bio: "Full-Stack Developer dan IT Solver yang membangun aplikasi web, ERP, integrasi API, dan sistem digital dari purwarupa hingga production.",
  businessRole: SITE.businessRole,
  email: SITE.email,
  handle: SITE.handle,
  location: SITE.location,
  name: SITE.name,
  origin: SITE.origin,
  phone: SITE.phone,
  profileImageKey: null,
  role: SITE.role,
  seoDescription: SITE_DESCRIPTION,
  seoTitle: `${SITE.name} | ${SITE.role}`,
  shortName: SITE.shortName,
  socialLinks: {
    github: SITE.github,
    instagram: SITE.instagram,
    linkedin: SITE.linkedin,
  },
  whatsappUrl: SITE.whatsapp,
}

export const DEFAULT_HOME_CONTENT: HomePageContent = {
  about: {
    experienceBadge: ABOUT_EXPERIENCE.badge,
    experienceMuted: ABOUT_EXPERIENCE.muted,
    experienceText: ABOUT_EXPERIENCE.text,
    experienceValue: ABOUT_EXPERIENCE.value,
    nowBadge: ABOUT_NOW.badge,
    nowBody: ABOUT_NOW.body,
    nowHeading: ABOUT_NOW.heading,
    sideNote: ABOUT_HEADER.sideNote,
    titleBlack: ABOUT_HEADER.titleBlack,
    titleGray: ABOUT_HEADER.titleGray,
    whoBadge: ABOUT_WHO.badge,
    whoBody: ABOUT_WHO.para1,
    whoHeading: ABOUT_WHO.heading,
    workBadge: ABOUT_WORK.badge,
    workBody: ABOUT_WORK.sub,
    workHeading: ABOUT_WORK.heading,
  },
  contact: {
    cardHeading: CONTACT_CARD.heading,
    cardHeadingAccent: CONTACT_CARD.headingAccent,
    cardSub: CONTACT_CARD.sub,
    ctaLabel: CONTACT_CARD.ctaLabel,
    eyebrow: CONTACT_CARD.eyebrow,
    giantWord: CONTACT_CARD.giantWord,
    headerBadge: CONTACT_HEADER.badge,
    headerSideNote: CONTACT_HEADER.sideNote,
    headerTitleBlack: CONTACT_HEADER.titleBlack,
    headerTitleGray: CONTACT_HEADER.titleGray,
  },
  faq: {
    badge: FAQ_HEADER.badge,
    sideNote: FAQ_HEADER.sideNote,
    titleBlack: FAQ_HEADER.titleBlack,
    titleGray: FAQ_HEADER.titleGray,
  },
  hero: {
    availability: HERO_BADGE.availability,
    badgeRole: HERO_BADGE.role,
    buildItems: HERO_BUILD_ITEMS.map((item) => ({ ...item })),
    chips: [...HERO_CHIPS],
    detail: HERO_COPY.detail,
    lead: HERO_COPY.lead,
    secondaryCtaLabel: HERO_COPY.projectsLabel,
    title: HERO_COPY.title,
    titleAccent: HERO_COPY.titleAccent,
  },
  projects: {
    emptyDescription:
      "Case study akan hadir setelah melalui proses kurasi dan dokumentasi.",
    emptyTitle: "Portfolio sedang diperbarui.",
    headerBadge: PROJECTS_HEADER.badge,
    headerSideNote: PROJECTS_HEADER.sideNote,
    headerTitleBlack: PROJECTS_HEADER.titleBlack,
    headerTitleGray: PROJECTS_HEADER.titleGray,
  },
  skills: {
    additionalDescription: "Beyond the code.",
    additionalTitle: "Additional",
    badge: SKILLS_HEADER.badge,
    coreDescription: "The stack I build products with.",
    coreTitle: "Core skills",
    sideNote: SKILLS_HEADER.sideNote,
    titleBlack: SKILLS_HEADER.titleBlack,
    titleGray: SKILLS_HEADER.titleGray,
    toolkitDescription: "The tools I work in every day.",
    toolkitTitle: "Toolkit",
  },
}
