import "server-only"

import type { getSupabaseAdmin } from "@/lib/supabase"
import type { WebsiteContent } from "@/types/cms"

export async function persistContentSection(
  client: ReturnType<typeof getSupabaseAdmin>,
  section: keyof WebsiteContent,
  content: unknown
): Promise<{ error: { code?: string } | null }> {
  const result = await client.rpc("update_site_content_section", {
    section_key: section,
    section_content: content,
  })
  if (!result.error || !["PGRST202", "42883"].includes(result.error.code)) {
    return { error: result.error }
  }

  // Older databases already have content and updated_at. Compare the version in
  // the UPDATE itself, then retry with fresh content if another section changed.
  // Never fall back to an unconditional read/merge/write that can lose edits.
  for (let attempt = 0; attempt < 3; attempt++) {
    const current = await client
      .from("site_settings")
      .select("content, updated_at")
      .eq("id", true)
      .single()
    if (current.error) return { error: current.error }
    if (!current.data || typeof current.data.updated_at !== "string") {
      return { error: { code: "MISSING_SETTINGS" } }
    }
    const previous = current.data.content
    if (
      previous !== null &&
      (typeof previous !== "object" || Array.isArray(previous))
    ) {
      return { error: { code: "INVALID_CONTENT" } }
    }

    const saved = await client
      .from("site_settings")
      .update({ content: { ...previous, [section]: content } })
      .eq("id", true)
      .eq("updated_at", current.data.updated_at)
      .select("id")
      .maybeSingle()
    if (saved.error) return { error: saved.error }
    if (saved.data) return { error: null }
  }
  return { error: { code: "CONTENT_CONFLICT" } }
}
