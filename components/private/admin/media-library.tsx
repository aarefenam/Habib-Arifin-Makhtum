"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Clipboard, Loader2, Trash2, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PortfolioMediaAsset } from "@/types/cms"

export function MediaLibrary({ assets }: { assets: PortfolioMediaAsset[] }) {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  async function uploadAsset(formData: FormData) {
    setIsUploading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/admin/media", {
        body: formData,
        method: "POST",
      })
      const result = (await response.json()) as { message?: string }

      if (!response.ok) {
        setIsError(true)
        setMessage(result.message ?? "Upload gambar gagal.")
        return
      }

      setIsError(false)
      setMessage("Gambar berhasil diunggah ke R2.")
      router.refresh()
    } catch {
      setIsError(true)
      setMessage("Upload gambar gagal. Periksa koneksi lalu coba lagi.")
    } finally {
      setIsUploading(false)
    }
  }

  async function removeAsset(id: string) {
    if (!window.confirm("Hapus aset ini dari R2 dan database?")) return

    setRemovingId(id)
    setMessage(null)

    try {
      const response = await fetch("/api/admin/media", {
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      })
      const result = (await response.json()) as { message?: string }

      if (!response.ok) {
        setIsError(true)
        setMessage(result.message ?? "Aset gagal dihapus.")
        return
      }

      setIsError(false)
      setMessage("Aset berhasil dihapus.")
      router.refresh()
    } catch {
      setIsError(true)
      setMessage("Aset gagal dihapus. Coba lagi.")
    } finally {
      setRemovingId(null)
    }
  }

  async function copyStorageKey(storageKey: string) {
    try {
      await navigator.clipboard.writeText(storageKey)
      setIsError(false)
      setMessage(
        "Storage key disalin. Tempelkan pada foto profil atau cover project."
      )
    } catch {
      setIsError(true)
      setMessage("Storage key tidak dapat disalin otomatis.")
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <form
        action={uploadAsset}
        className="rounded-2xl border border-border bg-card p-5 shadow-none sm:p-6"
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Unggah gambar</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Gambar disimpan ke Cloudflare R2 dan dicatat di Supabase. Maksimal 8
            MB per file.
          </p>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div className="flex flex-col gap-2">
            <Label htmlFor="media-file">File gambar</Label>
            <Input
              id="media-file"
              name="file"
              type="file"
              accept="image/*"
              required
              className="h-11 pt-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="media-alt">Alt text</Label>
            <Input
              id="media-alt"
              name="altText"
              placeholder="Deskripsikan gambar"
              className="h-11"
            />
          </div>
          <Button type="submit" disabled={isUploading} className="h-11">
            {isUploading ? (
              <Loader2 aria-hidden className="size-4 animate-spin" />
            ) : (
              <UploadCloud aria-hidden className="size-4" />
            )}
            {isUploading ? "Mengunggah..." : "Upload gambar"}
          </Button>
        </div>
        {message ? (
          <p
            role={isError ? "alert" : "status"}
            className={
              isError
                ? "mt-4 text-sm text-destructive"
                : "mt-4 text-sm text-muted-foreground"
            }
          >
            {message}
          </p>
        ) : null}
      </form>

      <section aria-labelledby="media-assets">
        <div className="mb-4">
          <h2 id="media-assets" className="heading-5">
            Aset tersimpan
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Salin storage key untuk menjadikannya foto profil atau cover
            project.
          </p>
        </div>
        {assets.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {assets.map((asset) => (
              <article
                key={asset.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[4/3] bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.publicUrl}
                    alt={asset.altText ?? ""}
                    className="size-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-medium">
                    {asset.altText || "Tanpa alt text"}
                  </p>
                  <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                    {asset.storageKey}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 flex-1"
                      onClick={() => copyStorageKey(asset.storageKey)}
                    >
                      <Clipboard aria-hidden className="size-4" />
                      Salin key
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon-lg"
                      aria-label="Hapus aset"
                      disabled={removingId === asset.id}
                      onClick={() => removeAsset(asset.id)}
                    >
                      {removingId === asset.id ? (
                        <Loader2 aria-hidden className="size-4 animate-spin" />
                      ) : (
                        <Trash2 aria-hidden className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-12 text-center text-sm text-muted-foreground">
            Belum ada aset. Upload foto profil, logo teknologi, atau cover
            project pertama Anda.
          </div>
        )}
      </section>
    </div>
  )
}
