import "server-only"

import { connection } from "next/server"

import { DEFAULT_HOME_CONTENT, DEFAULT_SITE_SETTINGS } from "@/constants/cms"
import { FAQS } from "@/constants/faq"
import { ADDITIONAL, CORE_SKILLS, TOOLKIT } from "@/constants/skills"
import { isSupabaseConfigured } from "@/lib/env"
import { getSupabaseAdmin } from "@/lib/supabase"
import type {
  ContentStatus,
  HomePageContent,
  PortfolioCmsSnapshot,
  PortfolioContactMessage,
  PortfolioFaq,
  PortfolioMediaAsset,
  PortfolioProject,
  PortfolioService,
  PortfolioSiteSettings,
  PortfolioSkill,
  PortfolioTimelineEntry,
} from "@/types/cms"

type UnknownRecord = Record<string, unknown>

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {}
}

function asText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback
}

function asNullableText(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback
}

function asStringList(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback
  const items = value.filter((item): item is string => typeof item === "string")
  return items.length > 0 ? items : fallback
}

function mergeContent(value: unknown): HomePageContent {
  const source = asRecord(value)
  const hero = asRecord(source.hero)
  const about = asRecord(source.about)
  const skills = asRecord(source.skills)
  const projects = asRecord(source.projects)
  const faq = asRecord(source.faq)
  const contact = asRecord(source.contact)

  const buildItems = Array.isArray(hero.buildItems)
    ? hero.buildItems
        .map((item) => asRecord(item))
        .map((item, index) => ({
          icon: asText(
            item.icon,
            DEFAULT_HOME_CONTENT.hero.buildItems[index]?.icon ?? "globe"
          ),
          label: asText(item.label, "Solusi digital"),
        }))
        .filter((item) => item.label)
    : DEFAULT_HOME_CONTENT.hero.buildItems

  return {
    about: {
      experienceBadge: asText(
        about.experienceBadge,
        DEFAULT_HOME_CONTENT.about.experienceBadge
      ),
      experienceMuted: asText(
        about.experienceMuted,
        DEFAULT_HOME_CONTENT.about.experienceMuted
      ),
      experienceText: asText(
        about.experienceText,
        DEFAULT_HOME_CONTENT.about.experienceText
      ),
      experienceValue: asText(
        about.experienceValue,
        DEFAULT_HOME_CONTENT.about.experienceValue
      ),
      nowBadge: asText(about.nowBadge, DEFAULT_HOME_CONTENT.about.nowBadge),
      nowBody: asText(about.nowBody, DEFAULT_HOME_CONTENT.about.nowBody),
      nowHeading: asText(
        about.nowHeading,
        DEFAULT_HOME_CONTENT.about.nowHeading
      ),
      sideNote: asText(about.sideNote, DEFAULT_HOME_CONTENT.about.sideNote),
      titleBlack: asText(
        about.titleBlack,
        DEFAULT_HOME_CONTENT.about.titleBlack
      ),
      titleGray: asText(about.titleGray, DEFAULT_HOME_CONTENT.about.titleGray),
      whoBadge: asText(about.whoBadge, DEFAULT_HOME_CONTENT.about.whoBadge),
      whoBody: asText(about.whoBody, DEFAULT_HOME_CONTENT.about.whoBody),
      whoHeading: asText(
        about.whoHeading,
        DEFAULT_HOME_CONTENT.about.whoHeading
      ),
      workBadge: asText(about.workBadge, DEFAULT_HOME_CONTENT.about.workBadge),
      workBody: asText(about.workBody, DEFAULT_HOME_CONTENT.about.workBody),
      workHeading: asText(
        about.workHeading,
        DEFAULT_HOME_CONTENT.about.workHeading
      ),
    },
    contact: {
      cardHeading: asText(
        contact.cardHeading,
        DEFAULT_HOME_CONTENT.contact.cardHeading
      ),
      cardHeadingAccent: asText(
        contact.cardHeadingAccent,
        DEFAULT_HOME_CONTENT.contact.cardHeadingAccent
      ),
      cardSub: asText(contact.cardSub, DEFAULT_HOME_CONTENT.contact.cardSub),
      ctaLabel: asText(contact.ctaLabel, DEFAULT_HOME_CONTENT.contact.ctaLabel),
      eyebrow: asText(contact.eyebrow, DEFAULT_HOME_CONTENT.contact.eyebrow),
      giantWord: asText(
        contact.giantWord,
        DEFAULT_HOME_CONTENT.contact.giantWord
      ),
      headerBadge: asText(
        contact.headerBadge,
        DEFAULT_HOME_CONTENT.contact.headerBadge
      ),
      headerSideNote: asText(
        contact.headerSideNote,
        DEFAULT_HOME_CONTENT.contact.headerSideNote
      ),
      headerTitleBlack: asText(
        contact.headerTitleBlack,
        DEFAULT_HOME_CONTENT.contact.headerTitleBlack
      ),
      headerTitleGray: asText(
        contact.headerTitleGray,
        DEFAULT_HOME_CONTENT.contact.headerTitleGray
      ),
    },
    faq: {
      badge: asText(faq.badge, DEFAULT_HOME_CONTENT.faq.badge),
      sideNote: asText(faq.sideNote, DEFAULT_HOME_CONTENT.faq.sideNote),
      titleBlack: asText(faq.titleBlack, DEFAULT_HOME_CONTENT.faq.titleBlack),
      titleGray: asText(faq.titleGray, DEFAULT_HOME_CONTENT.faq.titleGray),
    },
    hero: {
      availability: asText(
        hero.availability,
        DEFAULT_HOME_CONTENT.hero.availability
      ),
      badgeRole: asText(hero.badgeRole, DEFAULT_HOME_CONTENT.hero.badgeRole),
      buildItems,
      chips: asStringList(hero.chips, DEFAULT_HOME_CONTENT.hero.chips),
      detail: asText(hero.detail, DEFAULT_HOME_CONTENT.hero.detail),
      lead: asText(hero.lead, DEFAULT_HOME_CONTENT.hero.lead),
      secondaryCtaLabel: asText(
        hero.secondaryCtaLabel,
        DEFAULT_HOME_CONTENT.hero.secondaryCtaLabel
      ),
      title: asText(hero.title, DEFAULT_HOME_CONTENT.hero.title),
      titleAccent: asText(
        hero.titleAccent,
        DEFAULT_HOME_CONTENT.hero.titleAccent
      ),
    },
    projects: {
      emptyDescription: asText(
        projects.emptyDescription,
        DEFAULT_HOME_CONTENT.projects.emptyDescription
      ),
      emptyTitle: asText(
        projects.emptyTitle,
        DEFAULT_HOME_CONTENT.projects.emptyTitle
      ),
      headerBadge: asText(
        projects.headerBadge,
        DEFAULT_HOME_CONTENT.projects.headerBadge
      ),
      headerSideNote: asText(
        projects.headerSideNote,
        DEFAULT_HOME_CONTENT.projects.headerSideNote
      ),
      headerTitleBlack: asText(
        projects.headerTitleBlack,
        DEFAULT_HOME_CONTENT.projects.headerTitleBlack
      ),
      headerTitleGray: asText(
        projects.headerTitleGray,
        DEFAULT_HOME_CONTENT.projects.headerTitleGray
      ),
    },
    skills: {
      additionalDescription: asText(
        skills.additionalDescription,
        DEFAULT_HOME_CONTENT.skills.additionalDescription
      ),
      additionalTitle: asText(
        skills.additionalTitle,
        DEFAULT_HOME_CONTENT.skills.additionalTitle
      ),
      badge: asText(skills.badge, DEFAULT_HOME_CONTENT.skills.badge),
      coreDescription: asText(
        skills.coreDescription,
        DEFAULT_HOME_CONTENT.skills.coreDescription
      ),
      coreTitle: asText(
        skills.coreTitle,
        DEFAULT_HOME_CONTENT.skills.coreTitle
      ),
      sideNote: asText(skills.sideNote, DEFAULT_HOME_CONTENT.skills.sideNote),
      titleBlack: asText(
        skills.titleBlack,
        DEFAULT_HOME_CONTENT.skills.titleBlack
      ),
      titleGray: asText(
        skills.titleGray,
        DEFAULT_HOME_CONTENT.skills.titleGray
      ),
      toolkitDescription: asText(
        skills.toolkitDescription,
        DEFAULT_HOME_CONTENT.skills.toolkitDescription
      ),
      toolkitTitle: asText(
        skills.toolkitTitle,
        DEFAULT_HOME_CONTENT.skills.toolkitTitle
      ),
    },
  }
}

function normalizeSite(value: unknown): PortfolioSiteSettings {
  const source = asRecord(value)
  const socialLinks = asRecord(source.social_links)
  const seo = asRecord(source.seo)

  return {
    bio: asText(source.bio, DEFAULT_SITE_SETTINGS.bio),
    businessRole: asText(
      source.business_role,
      DEFAULT_SITE_SETTINGS.businessRole
    ),
    email: asText(source.email, DEFAULT_SITE_SETTINGS.email),
    handle: asText(source.handle, DEFAULT_SITE_SETTINGS.handle),
    location: asText(source.location, DEFAULT_SITE_SETTINGS.location),
    name: asText(source.site_name, DEFAULT_SITE_SETTINGS.name),
    origin: asText(source.origin, DEFAULT_SITE_SETTINGS.origin),
    phone: asText(source.phone, DEFAULT_SITE_SETTINGS.phone),
    profileImageKey: asNullableText(source.profile_image_key),
    role: asText(source.role, DEFAULT_SITE_SETTINGS.role),
    seoDescription: asText(
      seo.description,
      DEFAULT_SITE_SETTINGS.seoDescription
    ),
    seoTitle: asText(seo.title, DEFAULT_SITE_SETTINGS.seoTitle),
    shortName: asText(source.short_name, DEFAULT_SITE_SETTINGS.shortName),
    socialLinks: {
      github: asText(
        socialLinks.github,
        DEFAULT_SITE_SETTINGS.socialLinks.github
      ),
      instagram: asText(
        socialLinks.instagram,
        DEFAULT_SITE_SETTINGS.socialLinks.instagram
      ),
      linkedin: asText(
        socialLinks.linkedin,
        DEFAULT_SITE_SETTINGS.socialLinks.linkedin
      ),
    },
    whatsappUrl: asText(source.whatsapp_url, DEFAULT_SITE_SETTINGS.whatsappUrl),
  }
}

function normalizeProjects(value: unknown): PortfolioProject[] {
  if (!Array.isArray(value)) return []

  return value.map(asRecord).flatMap((item) => {
    const id = asNullableText(item.id)
    const title = asNullableText(item.title)
    const slug = asNullableText(item.slug)
    const shortDescription = asNullableText(item.short_description)

    if (!id || !title || !slug || !shortDescription) return []

    return [
      {
        content: asRecord(item.content),
        coverKey: asNullableText(item.cover_key),
        createdAt: asText(item.created_at, ""),
        featured: asBoolean(item.featured),
        id,
        liveUrl: asNullableText(item.live_url),
        projectType: asText(item.project_type, "Other"),
        publishedAt: asNullableText(item.published_at),
        repositoryUrl: asNullableText(item.repository_url),
        shortDescription,
        slug,
        sortOrder: asNumber(item.sort_order),
        status: item.status === "published" ? "published" : "draft",
        technologies: asStringList(item.technologies, []),
        title,
      },
    ]
  })
}

function normalizeSkills(value: unknown): PortfolioSkill[] {
  if (!Array.isArray(value)) return []

  return value.map(asRecord).flatMap((item) => {
    const id = asNullableText(item.id)
    const name = asNullableText(item.name)
    if (!id || !name) return []

    return [
      {
        category: asText(item.category, "core"),
        description: asNullableText(item.description),
        iconKey: asNullableText(item.icon_key),
        id,
        name,
        sortOrder: asNumber(item.sort_order),
        visible: asBoolean(item.visible, true),
      },
    ]
  })
}

function normalizeServices(value: unknown): PortfolioService[] {
  if (!Array.isArray(value)) return []

  return value.map(asRecord).flatMap((item) => {
    const id = asNullableText(item.id)
    const title = asNullableText(item.title)
    const description = asNullableText(item.description)
    if (!id || !title || !description) return []

    return [
      {
        description,
        id,
        sortOrder: asNumber(item.sort_order),
        title,
        visible: asBoolean(item.visible, true),
      },
    ]
  })
}

function normalizeFaqs(value: unknown): PortfolioFaq[] {
  if (!Array.isArray(value)) return []

  return value.map(asRecord).flatMap((item) => {
    const id = asNullableText(item.id)
    const question = asNullableText(item.question)
    const answer = asNullableText(item.answer)
    if (!id || !question || !answer) return []

    return [
      {
        answer,
        id,
        question,
        sortOrder: asNumber(item.sort_order),
        visible: asBoolean(item.visible, true),
      },
    ]
  })
}

function normalizeTimeline(value: unknown): PortfolioTimelineEntry[] {
  if (!Array.isArray(value)) return []

  return value.map(asRecord).flatMap((item) => {
    const id = asNullableText(item.id)
    const title = asNullableText(item.title)
    if (!id || !title) return []

    return [
      {
        description: asNullableText(item.description),
        endDate: asNullableText(item.end_date),
        entryType: item.entry_type === "education" ? "education" : "experience",
        id,
        isCurrent: asBoolean(item.is_current),
        organization: asNullableText(item.organization),
        sortOrder: asNumber(item.sort_order),
        startDate: asNullableText(item.start_date),
        title,
        visible: asBoolean(item.visible, true),
      },
    ]
  })
}

function normalizeMedia(value: unknown): PortfolioMediaAsset[] {
  if (!Array.isArray(value)) return []

  return value.map(asRecord).flatMap((item) => {
    const id = asNullableText(item.id)
    const storageKey = asNullableText(item.storage_key)
    const publicUrl = asNullableText(item.public_url)
    const mimeType = asNullableText(item.mime_type)
    if (!id || !storageKey || !publicUrl || !mimeType) return []

    return [
      {
        altText: asNullableText(item.alt_text),
        createdAt: asText(item.created_at, ""),
        fileSize: asNumber(item.file_size),
        id,
        mimeType,
        publicUrl,
        storageKey,
      },
    ]
  })
}

function normalizeMessages(value: unknown): PortfolioContactMessage[] {
  if (!Array.isArray(value)) return []

  return value.map(asRecord).flatMap((item) => {
    const id = asNullableText(item.id)
    const senderName = asNullableText(item.sender_name)
    const senderEmail = asNullableText(item.sender_email)
    const message = asNullableText(item.message)
    if (!id || !senderName || !senderEmail || !message) return []

    return [
      {
        createdAt: asText(item.created_at, ""),
        id,
        internalNote: asNullableText(item.internal_note),
        message,
        senderEmail,
        senderName,
        status:
          item.status === "read" || item.status === "archived"
            ? item.status
            : "unread",
      },
    ]
  })
}

function getFallbackSnapshot(): PortfolioCmsSnapshot {
  return {
    configured: false,
    content: DEFAULT_HOME_CONTENT,
    faqs: FAQS.map((item, index) => ({
      ...item,
      id: `fallback-faq-${index}`,
      sortOrder: index,
      visible: true,
    })),
    media: [],
    messages: [],
    projects: [],
    services: [],
    site: DEFAULT_SITE_SETTINGS,
    skills: [
      ...CORE_SKILLS.map((item, index) => ({
        category: "core",
        description: item.tag,
        iconKey: item.logo ?? null,
        id: `fallback-core-${index}`,
        name: item.name,
        sortOrder: index,
        visible: true,
      })),
      ...TOOLKIT.map((item, index) => ({
        category: "toolkit",
        description: item.tag,
        iconKey: item.logo ?? null,
        id: `fallback-toolkit-${index}`,
        name: item.name,
        sortOrder: index,
        visible: true,
      })),
      ...ADDITIONAL.map((item, index) => ({
        category: "additional",
        description: null,
        iconKey: null,
        id: `fallback-additional-${index}`,
        name: item.label,
        sortOrder: index,
        visible: true,
      })),
    ],
    timeline: [],
  }
}

export async function getPortfolioCmsSnapshot(): Promise<PortfolioCmsSnapshot> {
  await connection()

  if (!isSupabaseConfigured()) return getFallbackSnapshot()

  try {
    const client = getSupabaseAdmin()
    const [
      settings,
      projects,
      skills,
      services,
      faqs,
      timeline,
      media,
      messages,
    ] = await Promise.all([
      client.from("site_settings").select("*").eq("id", true).maybeSingle(),
      client.from("projects").select("*").order("sort_order"),
      client.from("skills").select("*").order("sort_order"),
      client.from("services").select("*").order("sort_order"),
      client.from("faqs").select("*").order("sort_order"),
      client.from("timeline_entries").select("*").order("sort_order"),
      client
        .from("media_assets")
        .select("*")
        .order("created_at", { ascending: false }),
      client
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false }),
    ])

    if (
      settings.error ||
      projects.error ||
      skills.error ||
      services.error ||
      faqs.error ||
      timeline.error ||
      media.error ||
      messages.error
    ) {
      return getFallbackSnapshot()
    }

    const settingsData = asRecord(settings.data)
    return {
      configured: true,
      content: mergeContent(settingsData.content),
      faqs: normalizeFaqs(faqs.data),
      media: normalizeMedia(media.data),
      messages: normalizeMessages(messages.data),
      projects: normalizeProjects(projects.data),
      services: normalizeServices(services.data),
      site: normalizeSite(settingsData),
      skills: normalizeSkills(skills.data),
      timeline: normalizeTimeline(timeline.data),
    }
  } catch {
    return getFallbackSnapshot()
  }
}

export async function getPublicSiteSettings(): Promise<PortfolioSiteSettings> {
  await connection()

  if (!isSupabaseConfigured()) return DEFAULT_SITE_SETTINGS

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("site_settings")
      .select("*")
      .eq("id", true)
      .maybeSingle()

    return error ? DEFAULT_SITE_SETTINGS : normalizeSite(data)
  } catch {
    return DEFAULT_SITE_SETTINGS
  }
}

export function getPublishedProjects(projects: PortfolioProject[]) {
  return projects.filter((project) => project.status === "published")
}

export function getVisibleSkills(skills: PortfolioSkill[], category: string) {
  return skills.filter((skill) => skill.visible && skill.category === category)
}

export function getVisibleFaqs(faqs: PortfolioFaq[]) {
  return faqs.filter((faq) => faq.visible)
}

export function getPublishedStatus(value: unknown): ContentStatus {
  return value === "published" ? "published" : "draft"
}
