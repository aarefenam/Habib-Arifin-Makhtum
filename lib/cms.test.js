import { expect, mock, test } from "bun:test"

import { DEFAULT_SITE_SETTINGS } from "@/constants/cms"

let settings = {}
let settingsError = null
const maybeSingle = async () => ({ data: settings, error: settingsError })
mock.module("server-only", () => ({}))
mock.module("next/server", () => ({ connection: async () => {} }))
mock.module("@/lib/env", () => ({ isSupabaseConfigured: () => true }))
mock.module("@/lib/r2", () => ({ getR2PublicUrl: (key) => `/media/${key}` }))
mock.module("@/lib/supabase", () => ({
  getSupabaseAdmin: () => ({
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle }) }) }),
  }),
}))

const { getPublicSiteConfiguration } = await import("@/lib/cms")

test("cleared optional settings stay empty after reading from the database", async () => {
  settings = {
    site_name: "Test Person",
    short_name: "Test",
    phone: "",
    whatsapp_url: "",
    location: "",
    origin: "",
    bio: "",
    business_role: null,
    social_links: { github: "", linkedin: "", instagram: "" },
    seo: { title: "", description: "" },
  }
  const { site, content } = await getPublicSiteConfiguration()
  for (const field of [
    "phone",
    "whatsappUrl",
    "location",
    "origin",
    "bio",
    "businessRole",
    "seoTitle",
    "seoDescription",
  ])
    expect(site[field]).toBe("")
  expect(site.socialLinks).toEqual({ github: "", linkedin: "", instagram: "" })
  expect(content.header.brandName).toBe("Test")
  expect(content.aboutIntro.description).toBe("")
})

test("a failed settings read uses public defaults", async () => {
  settingsError = { code: "test-error" }
  expect((await getPublicSiteConfiguration()).site).toEqual(
    DEFAULT_SITE_SETTINGS
  )
  settingsError = null
})
