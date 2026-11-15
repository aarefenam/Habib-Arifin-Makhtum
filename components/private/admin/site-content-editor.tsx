import Link from "next/link"

import { saveContentSection } from "@/actions/site-content"
import { AdminForm } from "@/components/private/admin/admin-form"
import { AssetField } from "@/components/private/admin/asset-field"
import { ContentRepeater } from "@/components/private/admin/content-repeater"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CONTENT_FIELD_LABELS,
  SECTION_COLLECTION_LINKS,
  SECTION_TITLES,
} from "@/constants/content-editor"
import type { EditorSectionKey } from "@/constants/content-editor"
import type { PortfolioCmsSnapshot } from "@/types/cms"

function TextField({
  name,
  label,
  value,
  long = false,
  type = "text",
}: {
  name: string
  label: string
  value: string
  long?: boolean
  type?: "text" | "email" | "url" | "tel"
}) {
  return (
    <div
      className={
        long ? "flex flex-col gap-2 sm:col-span-2" : "flex flex-col gap-2"
      }
    >
      <Label htmlFor={name}>{label}</Label>
      {long ? (
        <Textarea
          id={name}
          name={name}
          defaultValue={value}
          rows={4}
          maxLength={10000}
        />
      ) : (
        <Input
          id={name}
          name={name}
          defaultValue={value}
          type={type}
          maxLength={10000}
        />
      )}
    </div>
  )
}

export function SiteContentEditor({
  section,
  snapshot,
}: {
  section: EditorSectionKey
  snapshot: PortfolioCmsSnapshot
}) {
  const { site, content, media } = snapshot
  let fields: React.ReactNode
  if (section === "identity") {
    fields = (
      <>
        <TextField name="site_name" label="Nama lengkap" value={site.name} />
        <TextField
          name="short_name"
          label="Nama pendek"
          value={site.shortName}
        />
        <TextField name="handle" label="Handle" value={site.handle} />
        <TextField name="role" label="Role utama" value={site.role} />
        <TextField
          name="business_role"
          label="Peran bisnis"
          value={site.businessRole}
        />
        <TextField name="location" label="Domisili" value={site.location} />
        <TextField name="origin" label="Asal" value={site.origin} />
        <AssetField
          id="profile_image_key"
          name="profile_image_key"
          label="Foto profil"
          value={site.profileImageKey}
          assets={media}
        />
        <TextField name="bio" label="Bio singkat" value={site.bio} long />
      </>
    )
  } else if (section === "social") {
    fields = (
      <>
        <TextField name="email" label="Email" value={site.email} type="email" />
        <TextField name="phone" label="Telepon" value={site.phone} type="tel" />
        <TextField
          name="whatsapp_url"
          label="URL WhatsApp"
          value={site.whatsappUrl}
          type="url"
        />
        {["github", "linkedin", "instagram"].map((key) => (
          <TextField
            key={key}
            name={key}
            label={key}
            value={site.socialLinks[key] ?? ""}
            type="url"
          />
        ))}
      </>
    )
  } else if (section === "seo") {
    fields = (
      <>
        <TextField
          name="title"
          label="Judul SEO global"
          value={site.seoTitle}
        />
        <TextField
          name="description"
          label="Deskripsi SEO global"
          value={site.seoDescription}
          long
        />
      </>
    )
  } else {
    fields = Object.entries(content[section]).map(([key, value]) => {
      const label = CONTENT_FIELD_LABELS[key] ?? key
      if (key === "logoKey")
        return (
          <AssetField
            key={key}
            id={key}
            name={key}
            label={label}
            value={String(value)}
            assets={media}
          />
        )
      if (
        Array.isArray(value) &&
        (key === "links" || key === "legalLinks" || key === "buildItems")
      )
        return (
          <ContentRepeater
            key={key}
            name={key}
            label={label}
            value={value}
            kind={key === "buildItems" ? "buildItems" : "links"}
          />
        )
      if (Array.isArray(value))
        return (
          <TextField
            key={key}
            name={key}
            label={label}
            value={value.join("\n")}
            long
          />
        )
      return (
        <TextField
          key={key}
          name={key}
          label={label}
          value={String(value)}
          long={/description|body|sideNote|lead|detail|cardSub|Note/i.test(key)}
        />
      )
    })
  }

  return (
    <div className="space-y-5">
      {!snapshot.configured ? (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          Data Supabase belum dapat dibaca. Periksa koneksi dan migration
          sebelum mengedit; isian berikut menampilkan konten bawaan.
        </p>
      ) : null}
      <Card className="py-0 shadow-none">
        <CardContent className="p-5 sm:p-6">
          <AdminForm
            key={section}
            action={saveContentSection}
            disabled={!snapshot.configured}
            submitLabel={`Simpan ${SECTION_TITLES[section]}`}
          >
            <input type="hidden" name="section" value={section} />
            <div className="grid gap-5 sm:grid-cols-2">{fields}</div>
          </AdminForm>
        </CardContent>
      </Card>
      {SECTION_COLLECTION_LINKS[section]?.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block rounded-xl border border-border bg-card p-4 text-sm font-medium underline underline-offset-4"
        >
          {link.label} →
        </Link>
      ))}
    </div>
  )
}
