import "server-only"

import { connection } from "next/server"

import { DEFAULT_WEBSITE_CONTENT, DEFAULT_SITE_SETTINGS } from "@/constants/cms"
import { FAQS } from "@/constants/faq"
import { ADDITIONAL, CORE_SKILLS, TOOLKIT } from "@/constants/skills"
import { isSupabaseConfigured } from "@/lib/env"
import { getSupabaseAdmin } from "@/lib/supabase"
import { mergeWebsiteContent } from "@/lib/website-content"
import type {
  ContentStatus,
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

function optionalSetting(value: unknown, fallback: string) {
  return value === null ? "" : typeof value === "string" ? value : fallback
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

function normalizeSite(value: unknown): PortfolioSiteSettings {
  const source = asRecord(value)
  const socialLinks = asRecord(source.social_links)
  const seo = asRecord(source.seo)

  return {
    bio: optionalSetting(source.bio, DEFAULT_SITE_SETTINGS.bio),
    businessRole: optionalSetting(
      source.business_role,
      DEFAULT_SITE_SETTINGS.businessRole
    ),
    email: asText(source.email, DEFAULT_SITE_SETTINGS.email),
    handle: asText(source.handle, DEFAULT_SITE_SETTINGS.handle),
    location: optionalSetting(source.location, DEFAULT_SITE_SETTINGS.location),
    name: asText(source.site_name, DEFAULT_SITE_SETTINGS.name),
    origin: optionalSetting(source.origin, DEFAULT_SITE_SETTINGS.origin),
    phone: optionalSetting(source.phone, DEFAULT_SITE_SETTINGS.phone),
    profileImageKey: asNullableText(source.profile_image_key),
    role: asText(source.role, DEFAULT_SITE_SETTINGS.role),
    seoDescription: optionalSetting(
      seo.description,
      DEFAULT_SITE_SETTINGS.seoDescription
    ),
    seoTitle: optionalSetting(seo.title, DEFAULT_SITE_SETTINGS.seoTitle),
    shortName: asText(source.short_name, DEFAULT_SITE_SETTINGS.shortName),
    socialLinks: {
      github: optionalSetting(
        socialLinks.github,
        DEFAULT_SITE_SETTINGS.socialLinks.github
      ),
      instagram: optionalSetting(
        socialLinks.instagram,
        DEFAULT_SITE_SETTINGS.socialLinks.instagram
      ),
      linkedin: optionalSetting(
        socialLinks.linkedin,
        DEFAULT_SITE_SETTINGS.socialLinks.linkedin
      ),
    },
    whatsappUrl: optionalSetting(
      source.whatsapp_url,
      DEFAULT_SITE_SETTINGS.whatsappUrl
    ),
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
    content: DEFAULT_WEBSITE_CONTENT,
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
      !settings.data ||
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
      content: mergeWebsiteContent(
        settingsData.content,
        normalizeSite(settingsData)
      ),
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

export async function getPublicSiteConfiguration() {
  await connection()

  const fallback = {
    site: DEFAULT_SITE_SETTINGS,
    content: DEFAULT_WEBSITE_CONTENT,
    logoUrl: undefined as string | undefined,
  }
  if (!isSupabaseConfigured()) return fallback

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("site_settings")
      .select("*")
      .eq("id", true)
      .maybeSingle()

    if (error || !data) return fallback
    const site = normalizeSite(data)
    const content = mergeWebsiteContent(asRecord(data).content, site)
    let logoUrl: string | undefined
    if (content.header.logoKey) {
      const { data: logo } = await getSupabaseAdmin()
        .from("media_assets")
        .select("public_url")
        .eq("storage_key", content.header.logoKey)
        .maybeSingle()
      logoUrl = logo?.public_url
    }
    return { site, content, logoUrl }
  } catch {
    return fallback
  }
}

export async function getPublicSiteSettings(): Promise<PortfolioSiteSettings> {
  return (await getPublicSiteConfiguration()).site
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
