import { z } from "zod"

import { DEFAULT_WEBSITE_CONTENT } from "@/constants/cms"
import { isSafeContentHref } from "@/lib/content-href"
import type { WebsiteContent } from "@/types/cms"

const text = z.string().trim().max(10000, "Teks maksimal 10.000 karakter.")
const href = text.refine(
  isSafeContentHref,
  "Gunakan #section, /halaman, https://, mailto:, atau tel: yang valid."
)
const link = z.object({ label: text.min(1, "Label link wajib diisi."), href })

const optionalUrl = text.refine(
  (value) => !value || (isSafeContentHref(value) && /^https?:/.test(value)),
  "Gunakan URL lengkap https:// yang valid."
)
export const settingsGroupSchemas = {
  identity: z.object({
    site_name: text.min(1, "Nama wajib diisi."),
    short_name: text.min(1, "Nama pendek wajib diisi."),
    handle: text.min(1, "Handle wajib diisi."),
    role: text.min(1, "Role wajib diisi."),
    business_role: text,
    location: text,
    origin: text,
    bio: text,
    profile_image_key: text,
  }),
  social: z
    .object({
      email: z.email("Email tidak valid."),
      phone: text,
      whatsapp_url: optionalUrl,
      github: optionalUrl,
      linkedin: optionalUrl,
      instagram: optionalUrl,
    })
    .transform(({ github, linkedin, instagram, ...values }) => ({
      ...values,
      social_links: { github, linkedin, instagram },
    })),
  seo: z
    .object({ title: text, description: text })
    .transform((seo) => ({ seo })),
}

export const websiteSectionSchemas: Record<string, z.ZodType> =
  Object.fromEntries(
    Object.entries(DEFAULT_WEBSITE_CONTENT).map(([section, fields]) => [
      section,
      z.object(
        Object.fromEntries(
          Object.entries(fields).map(([key, value]) => {
            if (key === "links" || key === "legalLinks")
              return [key, z.array(link).max(12, "Maksimal 12 link.")]
            if (key === "buildItems")
              return [
                key,
                z
                  .array(
                    z.object({
                      label: text.min(1),
                      icon: z.enum([
                        "globe",
                        "shield",
                        "briefcase",
                        "store",
                        "smartphone",
                        "graduation",
                        "calendar",
                      ]),
                    })
                  )
                  .max(20),
              ]
            if (Array.isArray(value))
              return [key, z.array(text.min(1)).max(key === "chips" ? 4 : 20)]
            if (key.endsWith("Href")) return [key, href]
            return [key, text]
          })
        )
      ),
    ])
  )

export function parseSectionForm(
  section: keyof WebsiteContent,
  formData: FormData
) {
  const defaults = DEFAULT_WEBSITE_CONTENT[section]
  const values = Object.fromEntries(
    Object.entries(defaults).map(([key, value]) => {
      if (key === "links" || key === "legalLinks" || key === "buildItems") {
        const rawCount = formData.get(`${key}.count`)
        if (typeof rawCount !== "string" || !/^\d+$/.test(rawCount))
          return [key, null]
        const count = Number(rawCount)
        if (!Number.isInteger(count) || count < 0 || count > 20)
          return [key, null]
        return [
          key,
          Array.from({ length: count }, (_, index) =>
            key === "buildItems"
              ? {
                  label: formData.get(`${key}.${index}.label`),
                  icon: formData.get(`${key}.${index}.icon`),
                }
              : {
                  label: formData.get(`${key}.${index}.label`),
                  href: formData.get(`${key}.${index}.href`),
                }
          ),
        ]
      }
      if (Array.isArray(value)) {
        const raw = formData.get(key)
        return [
          key,
          typeof raw === "string"
            ? raw
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            : null,
        ]
      }
      return [key, formData.get(key)]
    })
  )
  return websiteSectionSchemas[section].safeParse(values)
}
