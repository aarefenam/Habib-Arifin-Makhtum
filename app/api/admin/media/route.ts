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

function getErrorCode(error: unknown) {
  if (!error || typeof error !== "object") return ""

  const record = error as Record<string, unknown>
  return [record.Code, record.code, record.name]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
}

function getR2UploadMessage(error: unknown) {
  const errorCode = getErrorCode(error)

  if (
    /AccessDenied|InvalidAccessKeyId|SignatureDoesNotMatch|ExpiredToken/i.test(
      errorCode
    )
  ) {
    return "Cloudflare R2 menolak kredensial. Buat atau perbarui R2 API token dengan izin Object Read & Write untuk bucket ini, lalu restart server."
  }

  if (/NoSuchBucket|InvalidBucketName/i.test(errorCode)) {
    return "Bucket Cloudflare R2 tidak ditemukan. Pastikan R2_BUCKET sama persis dengan nama bucket di Cloudflare."
  }

  if (/RequestEntityTooLarge/i.test(errorCode)) {
    return "Cloudflare R2 menolak ukuran file ini. Gunakan gambar yang lebih kecil."
  }

  return "Cloudflare R2 tidak dapat menyimpan gambar. Periksa R2_ACCOUNT_ID, R2_BUCKET, dan izin API token, lalu coba lagi."
}

function getSupabaseInsertMessage(error: unknown) {
  const errorCode = getErrorCode(error)

  if (/42P01|PGRST204/i.test(errorCode)) {
    return "Tabel media_assets belum tersedia di Supabase. Jalankan migration 0001_portfolio_foundation.sql terlebih dahulu."
  }

  if (/42501|PGRST301/i.test(errorCode)) {
    return "Supabase menolak akses untuk menyimpan aset. Periksa SUPABASE_SERVICE_ROLE_KEY lalu restart server."
  }

  return "Gambar sudah terkirim, tetapi Supabase gagal mencatat asetnya. Pastikan migration database sudah dijalankan dan service-role key valid."
}

export async function POST(request: Request) {
  const session = await getAdminSession()
  if (!session) return unauthorized()

  if (!isSupabaseConfigured() || !isR2Configured()) {
    return uploadError("Supabase atau Cloudflare R2 belum dikonfigurasi.", 503)
  }

  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return uploadError(
      "File upload tidak dapat dibaca. Pilih gambar lalu coba lagi."
    )
  }

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

  try {
    await uploadR2Object({ body, contentType: file.type, key: storageKey })
  } catch (error) {
    return uploadError(getR2UploadMessage(error), 502)
  }

  try {
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
      try {
        await deleteR2Object(storageKey)
      } catch {
        // Do not obscure the database failure when cleanup of R2 also fails.
      }

      return uploadError(getSupabaseInsertMessage(error), 500)
    }

    return NextResponse.json({ asset: data }, { status: 201 })
  } catch {
    return uploadError(
      "Supabase tidak dapat dihubungi untuk mencatat aset. Periksa konfigurasi Supabase lalu coba lagi.",
      502
    )
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
