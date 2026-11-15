import assert from "node:assert/strict"
import { test } from "node:test"

import { DEFAULT_WEBSITE_CONTENT } from "@/constants/cms"
import {
  parseSectionForm,
  settingsGroupSchemas,
} from "@/validations/site-content"
import type { WebsiteContent } from "@/types/cms"

function sectionForm(section: keyof WebsiteContent) {
  const form = new FormData()
  for (const [key, value] of Object.entries(DEFAULT_WEBSITE_CONTENT[section])) {
    if (
      Array.isArray(value) &&
      ["links", "legalLinks", "buildItems"].includes(key)
    ) {
      form.set(`${key}.count`, String(value.length))
      value.forEach((item, index) =>
        Object.entries(item).forEach(([field, text]) =>
          form.set(`${key}.${index}.${field}`, String(text))
        )
      )
    } else
      form.set(key, Array.isArray(value) ? value.join("\n") : String(value))
  }
  return form
}

test("every section can round trip through its editor form", () => {
  for (const section of Object.keys(
    DEFAULT_WEBSITE_CONTENT
  ) as (keyof WebsiteContent)[]) {
    const parsed = parseSectionForm(section, sectionForm(section))
    assert.ok(
      parsed.success,
      `${section}: ${JSON.stringify(parsed.error?.issues)}`
    )
    assert.deepEqual(parsed.data, DEFAULT_WEBSITE_CONTENT[section])
  }
})

test("header accepts reordering and removing all menu items", () => {
  const form = sectionForm("header")
  form.set("links.0.label", "Projects")
  form.set("links.0.href", "/projects")
  form.set("links.1.label", "About")
  form.set("links.1.href", "/about")
  form.set("links.count", "2")
  const parsed = parseSectionForm("header", form)
  assert.ok(parsed.success)
  assert.deepEqual((parsed.data as WebsiteContent["header"]).links, [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
  ])
  form.set("links.count", "0")
  assert.deepEqual(
    (parseSectionForm("header", form).data as WebsiteContent["header"]).links,
    []
  )
})

test("missing or malformed repeater counts cannot silently delete menu items", () => {
  for (const value of [null, "", "-1", "1.5", "21", "abc"]) {
    const form = sectionForm("header")
    if (value === null) form.delete("links.count")
    else form.set("links.count", value)
    assert.equal(parseSectionForm("header", form).success, false, String(value))
  }
})

test("rejects unsafe destinations, incomplete fields, and too many chips", () => {
  const header = sectionForm("header")
  header.set("links.0.href", "javascript:alert(1)")
  assert.equal(parseSectionForm("header", header).success, false)
  header.set("links.0.href", "/about")
  header.delete("brandName")
  assert.equal(parseSectionForm("header", header).success, false)
  const hero = sectionForm("hero")
  hero.set("chips", "one\ntwo\nthree\nfour\nfive")
  assert.equal(parseSectionForm("hero", hero).success, false)
  hero.set("chips", "")
  hero.set("terminalLines", "")
  assert.equal(parseSectionForm("hero", hero).success, true)
})

test("settings accept clearing optional contact fields and cannot overwrite identity", () => {
  const parsed = settingsGroupSchemas.social.safeParse({
    email: "hi@example.com",
    phone: "",
    whatsapp_url: "",
    github: "",
    linkedin: "",
    instagram: "",
    site_name: "Must not persist",
  })
  assert.ok(parsed.success)
  assert.deepEqual(parsed.data, {
    email: "hi@example.com",
    phone: "",
    whatsapp_url: "",
    social_links: { github: "", linkedin: "", instagram: "" },
  })
  assert.equal(
    settingsGroupSchemas.social.safeParse({
      email: "invalid",
      phone: "",
      whatsapp_url: "",
      github: "",
      linkedin: "",
      instagram: "",
    }).success,
    false
  )
})
