import "server-only"

import type { z } from "zod"

import { isSupabaseConfigured } from "@/lib/env"
import { getSupabaseAdmin } from "@/lib/supabase"
import type { PortfolioTestimonial } from "@/types/cms"
import type { testimonialSchema } from "@/validations/testimonial"

type TestimonialInput = z.infer<typeof testimonialSchema>

function toText(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null
}

// Read ratings. Kept outside the CMS snapshot so a missing table
// (migration 0004 not applied yet) never breaks the rest of the site.
export async function getTestimonials({
  visibleOnly,
}: {
  visibleOnly: boolean
}): Promise<PortfolioTestimonial[]> {
  if (!isSupabaseConfigured()) return []

  try {
    let query = getSupabaseAdmin()
      .from("testimonials")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false })
    if (visibleOnly) query = query.eq("visible", true)

    const { data, error } = await query
    if (error || !Array.isArray(data)) return []

    return data.flatMap((item) => {
      const id = toText(item.id)
      const clientName = toText(item.client_name)
      const message = toText(item.message)
      if (!id || !clientName || !message) return []

      return [
        {
          clientName,
          clientRole: toText(item.client_role),
          createdAt: toText(item.created_at) ?? "",
          id,
          message,
          projectName: toText(item.project_name),
          rating: Number(item.rating) || 5,
          sortOrder: Number(item.sort_order) || 0,
          visible: item.visible === true,
        },
      ]
    })
  } catch {
    return []
  }
}

export async function createTestimonial({
  message,
  name,
  project,
  rating,
  role,
}: TestimonialInput) {
  const { error } = await getSupabaseAdmin()
    .from("testimonials")
    .insert({
      client_name: name,
      client_role: role || null,
      message,
      project_name: project || null,
      rating,
    })

  if (error) throw new Error("Unable to save testimonial")
}
