"use server"

import { revalidatePath } from "next/cache"

import { DEFAULT_WEBSITE_CONTENT } from "@/constants/cms"
import { requireAdminSession } from "@/lib/auth/guard"
import { getSupabaseAdmin } from "@/lib/supabase"
import { persistContentSection } from "@/lib/save-content-section"
import {
  parseSectionForm,
  settingsGroupSchemas,
} from "@/validations/site-content"
import type { CmsActionState, WebsiteContent } from "@/types/cms"

export async function saveContentSection(
  _state: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireAdminSession()
  const section = formData.get("section")
  if (typeof section !== "string")
    return { status: "error", message: "Section tidak valid." }

  try {
    const client = getSupabaseAdmin()
    let error: { code?: string } | null
    if (Object.hasOwn(settingsGroupSchemas, section)) {
      const schema =
        settingsGroupSchemas[section as keyof typeof settingsGroupSchemas]
      const parsed = schema.safeParse(Object.fromEntries(formData))
      if (!parsed.success)
        return {
          status: "error",
          message: parsed.error.issues[0]?.message ?? "Periksa isian.",
        }
      const result = await client
        .from("site_settings")
        .update(parsed.data)
        .eq("id", true)
        .select("id")
        .single()
      error = result.error
    } else if (Object.hasOwn(DEFAULT_WEBSITE_CONTENT, section)) {
      const parsed = parseSectionForm(section as keyof WebsiteContent, formData)
      if (!parsed.success)
        return {
          status: "error",
          message: parsed.error.issues[0]?.message ?? "Periksa isian section.",
        }
      const result = await persistContentSection(
        client,
        section as keyof WebsiteContent,
        parsed.data
      )
      error = result.error
    } else {
      return { status: "error", message: "Section tidak dikenal." }
    }

    if (error) {
      return {
        status: "error",
        message:
          error.code === "CONTENT_CONFLICT"
            ? "Konten sedang diperbarui dari sesi lain. Isian Anda tetap tersedia; coba simpan lagi."
            : ["42703", "PGRST204"].includes(error.code ?? "")
              ? "Kolom konten belum tersedia. Jalankan migration 0002_content_editor.sql di Supabase."
              : "Section gagal disimpan. Periksa koneksi, tabel site_settings, dan hak akses Supabase.",
      }
    }
  } catch {
    return {
      status: "error",
      message:
        "Server tidak dapat menyimpan section. Periksa koneksi Supabase.",
    }
  }

  revalidatePath("/", "layout")
  return {
    status: "success",
    message: "Section berhasil disimpan. Perubahan sudah tersedia di website.",
  }
}
