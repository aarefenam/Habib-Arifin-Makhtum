import { NextResponse } from "next/server"

import { getAdminSession } from "@/lib/auth/session"
import { isR2Configured, isSupabaseConfigured } from "@/lib/env"
import { deleteR2Object, getR2PublicUrl, uploadR2Object } from "@/lib/r2"
import { getSupabaseAdmin } from "@/lib/supabase"

const MAX_FILE_SIZE = 8 * 1024 * 1024

function unauthorized() {
  return NextResponse.json(
    { message: "Sesi admin tidak valid." },
    { status: 401 }
  )
}

function uploadError(message: string, status = 400) {
  return NextResponse.json({ message }, { status })
}

function fileExtension(fileName: string, mimeType: string) {
  const fromName = fileName.split(".").pop()?.toLowerCase()
  if (fromName && /^[a-z0-9]{1,8}$/.test(fromName)) return fromName

  return mimeType.split("/")[1]?.replace("jpeg", "jpg") || "bin"
}

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) return unauthorized()

  if (!isSupabaseConfigured() || !isR2Configured()) {
    return uploadError("Supabase atau Cloudflare R2 belum dikonfigurasi.", 503)
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const altText = formData.get("altText")

    if (!(file instanceof File)) {
      return uploadError("Pilih file gambar terlebih dahulu.")
    }

    if (!file.type.startsWith("image/")) {
      return uploadError("Hanya file gambar yang dapat diunggah.")
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return uploadError("Ukuran gambar maksimal 8 MB.")
    }

    const storageKey = `portfolio/${crypto.randomUUID()}.${fileExtension(
      file.name,
      file.type
    )}`
    const publicUrl = getR2PublicUrl(storageKey)
    const body = new Uint8Array(await file.arrayBuffer())

    await uploadR2Object({ body, contentType: file.type, key: storageKey })

    const { data, error } = await getSupabaseAdmin()
      .from("media_assets")
      .insert({
        alt_text:
          typeof altText === "string" && altText.trim() ? altText.trim() : null,
        file_size: file.size,
        mime_type: file.type,
        public_url: publicUrl,
        storage_key: storageKey,
      })
      .select("*")
      .single()

    if (error) {
      await deleteR2Object(storageKey)
      return uploadError("Aset gagal dicatat di database.", 500)
    }

    return NextResponse.json({ asset: data }, { status: 201 })
  } catch {
    return uploadError("Upload gambar gagal. Coba lagi.", 500)
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession()
  if (!session) return unauthorized()

  if (!isSupabaseConfigured() || !isR2Configured()) {
    return uploadError("Supabase atau Cloudflare R2 belum dikonfigurasi.", 503)
  }

  try {
    const body = (await request.json()) as { id?: string }
    if (!body.id) return uploadError("Aset tidak ditemukan.")

    const client = getSupabaseAdmin()
    const { data: asset, error: assetError } = await client
      .from("media_assets")
      .select("id, storage_key")
      .eq("id", body.id)
      .maybeSingle()

    if (assetError || !asset) return uploadError("Aset tidak ditemukan.", 404)

    await deleteR2Object(asset.storage_key)

    const { error: deleteError } = await client
      .from("media_assets")
      .delete()
      .eq("id", asset.id)

    if (deleteError)
      return uploadError("Aset gagal dihapus dari database.", 500)

    return NextResponse.json({ success: true })
  } catch {
    return uploadError("Aset gagal dihapus. Coba lagi.", 500)
  }
}
