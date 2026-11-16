"use server"

import { revalidatePath } from "next/cache"

import { getPublishedStatus } from "@/lib/cms"
import { requireAdminSession } from "@/lib/auth/guard"
import { getSupabaseAdmin } from "@/lib/supabase"
import type { CmsActionState } from "@/types/cms"

const DEFAULT_ERROR = "Perubahan tidak dapat disimpan. Coba lagi."

function success(message: string): CmsActionState {
  return { message, status: "success" }
}

function failure(message = DEFAULT_ERROR): CmsActionState {
  return { message, status: "error" }
}

function requiredText(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === "string" ? value.trim() : ""
}

function optionalText(formData: FormData, name: string) {
  const value = requiredText(formData, name)
  return value || null
}

function numberValue(formData: FormData, name: string) {
  const parsed = Number(requiredText(formData, name))
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === "on"
}

function commaSeparated(formData: FormData, name: string) {
  return requiredText(formData, name)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
}

function refreshPublicContent() {
  revalidatePath("/", "layout")
  revalidatePath("/about")
  revalidatePath("/projects")
  revalidatePath("/admin")
}

export async function saveProject(
  _previousState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireAdminSession()

  const id = optionalText(formData, "id")
  const intent = requiredText(formData, "intent")

  try {
    const client = getSupabaseAdmin()

    if (intent === "delete") {
      if (!id) return failure("Project tidak ditemukan.")
      const { error } = await client.from("projects").delete().eq("id", id)
      if (error) return failure()
      refreshPublicContent()
      revalidatePath("/admin/projects")
      return success("Project dihapus.")
    }

    const title = requiredText(formData, "title")
    const slug = requiredText(formData, "slug")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/(^-|-$)/g, "")
    const shortDescription = requiredText(formData, "short_description")

    if (!title || !slug || !shortDescription) {
      return failure("Judul, slug, dan ringkasan project wajib diisi.")
    }

    const status = getPublishedStatus(requiredText(formData, "status"))
    const payload = {
      // Detail page copy lives in the JSON content column (no migration needed)
      content: {
        body: optionalText(formData, "content") ?? "",
        headline: optionalText(formData, "headline") ?? "",
        timeline: optionalText(formData, "timeline") ?? "",
        features: optionalText(formData, "features") ?? "",
        problem: optionalText(formData, "problem") ?? "",
        solution: optionalText(formData, "solution") ?? "",
        insight: optionalText(formData, "insight") ?? "",
      },
      cover_key: optionalText(formData, "cover_key"),
      featured: checked(formData, "featured"),
      live_url: optionalText(formData, "live_url"),
      project_type: requiredText(formData, "project_type") || "Other",
      published_at: status === "published" ? new Date().toISOString() : null,
      repository_url: optionalText(formData, "repository_url"),
      short_description: shortDescription,
      slug,
      sort_order: numberValue(formData, "sort_order"),
      status,
      technologies: commaSeparated(formData, "technologies"),
      title,
    }

    const result = id
      ? await client.from("projects").update(payload).eq("id", id)
      : await client.from("projects").insert(payload)

    if (result.error) return failure()
  } catch {
    return failure()
  }

  refreshPublicContent()
  revalidatePath("/admin/projects")
  return success(id ? "Project diperbarui." : "Project baru dibuat.")
}

export async function saveSkill(
  _previousState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireAdminSession()

  const id = optionalText(formData, "id")
  const intent = requiredText(formData, "intent")

  try {
    const client = getSupabaseAdmin()
    if (intent === "delete") {
      if (!id) return failure("Skill tidak ditemukan.")
      const { error } = await client.from("skills").delete().eq("id", id)
      if (error) return failure()
      refreshPublicContent()
      revalidatePath("/admin/collections")
      return success("Skill dihapus.")
    }

    const name = requiredText(formData, "name")
    if (!name) return failure("Nama skill wajib diisi.")
    const payload = {
      category: requiredText(formData, "category") || "core",
      description: optionalText(formData, "description"),
      icon_key: optionalText(formData, "icon_key"),
      name,
      sort_order: numberValue(formData, "sort_order"),
      visible: checked(formData, "visible"),
    }
    const result = id
      ? await client.from("skills").update(payload).eq("id", id)
      : await client.from("skills").insert(payload)
    if (result.error) return failure()
  } catch {
    return failure()
  }

  refreshPublicContent()
  revalidatePath("/admin/collections")
  return success(id ? "Skill diperbarui." : "Skill baru ditambahkan.")
}

export async function saveService(
  _previousState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireAdminSession()

  const id = optionalText(formData, "id")
  const intent = requiredText(formData, "intent")

  try {
    const client = getSupabaseAdmin()
    if (intent === "delete") {
      if (!id) return failure("Layanan tidak ditemukan.")
      const { error } = await client.from("services").delete().eq("id", id)
      if (error) return failure()
      refreshPublicContent()
      revalidatePath("/admin/collections")
      return success("Layanan dihapus.")
    }

    const title = requiredText(formData, "title")
    const description = requiredText(formData, "description")
    if (!title || !description)
      return failure("Judul dan deskripsi wajib diisi.")
    const payload = {
      description,
      sort_order: numberValue(formData, "sort_order"),
      title,
      visible: checked(formData, "visible"),
    }
    const result = id
      ? await client.from("services").update(payload).eq("id", id)
      : await client.from("services").insert(payload)
    if (result.error) return failure()
  } catch {
    return failure()
  }

  revalidatePath("/admin/collections")
  refreshPublicContent()
  return success(id ? "Layanan diperbarui." : "Layanan baru ditambahkan.")
}

export async function saveFaq(
  _previousState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireAdminSession()

  const id = optionalText(formData, "id")
  const intent = requiredText(formData, "intent")

  try {
    const client = getSupabaseAdmin()
    if (intent === "delete") {
      if (!id) return failure("FAQ tidak ditemukan.")
      const { error } = await client.from("faqs").delete().eq("id", id)
      if (error) return failure()
      refreshPublicContent()
      revalidatePath("/admin/collections")
      return success("FAQ dihapus.")
    }

    const question = requiredText(formData, "question")
    const answer = requiredText(formData, "answer")
    if (!question || !answer)
      return failure("Pertanyaan dan jawaban wajib diisi.")
    const payload = {
      answer,
      question,
      sort_order: numberValue(formData, "sort_order"),
      visible: checked(formData, "visible"),
    }
    const result = id
      ? await client.from("faqs").update(payload).eq("id", id)
      : await client.from("faqs").insert(payload)
    if (result.error) return failure()
  } catch {
    return failure()
  }

  refreshPublicContent()
  revalidatePath("/admin/collections")
  return success(id ? "FAQ diperbarui." : "FAQ baru ditambahkan.")
}

export async function saveTimelineEntry(
  _previousState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireAdminSession()

  const id = optionalText(formData, "id")
  const intent = requiredText(formData, "intent")

  try {
    const client = getSupabaseAdmin()
    if (intent === "delete") {
      if (!id) return failure("Riwayat tidak ditemukan.")
      const { error } = await client
        .from("timeline_entries")
        .delete()
        .eq("id", id)
      if (error) return failure()
      revalidatePath("/admin/collections")
      refreshPublicContent()
      return success("Riwayat dihapus.")
    }

    const title = requiredText(formData, "title")
    if (!title) return failure("Judul riwayat wajib diisi.")
    const payload = {
      description: optionalText(formData, "description"),
      end_date: optionalText(formData, "end_date"),
      entry_type:
        requiredText(formData, "entry_type") === "education"
          ? "education"
          : "experience",
      is_current: checked(formData, "is_current"),
      organization: optionalText(formData, "organization"),
      sort_order: numberValue(formData, "sort_order"),
      start_date: optionalText(formData, "start_date"),
      title,
      visible: checked(formData, "visible"),
    }
    const result = id
      ? await client.from("timeline_entries").update(payload).eq("id", id)
      : await client.from("timeline_entries").insert(payload)
    if (result.error) return failure()
  } catch {
    return failure()
  }

  revalidatePath("/admin/collections")
  refreshPublicContent()
  return success(id ? "Riwayat diperbarui." : "Riwayat baru ditambahkan.")
}

export async function updateMessageStatus(
  _previousState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireAdminSession()

  const id = requiredText(formData, "id")
  const status = requiredText(formData, "status")
  const allowed = ["unread", "read", "archived"]

  if (!id || !allowed.includes(status))
    return failure("Status pesan tidak valid.")

  try {
    const { error } = await getSupabaseAdmin()
      .from("contact_messages")
      .update({
        internal_note: optionalText(formData, "internal_note"),
        status,
      })
      .eq("id", id)

    if (error) return failure()
  } catch {
    return failure()
  }

  revalidatePath("/admin/inbox")
  return success("Status pesan diperbarui.")
}
