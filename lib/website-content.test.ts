import assert from "node:assert/strict"
import { test } from "node:test"

import { DEFAULT_WEBSITE_CONTENT } from "@/constants/cms"
import {
  CONTENT_PAGES,
  SECTION_COLLECTION_LINKS,
  CONTENT_COLLECTIONS,
} from "@/constants/content-editor"
import { isSafeContentHref } from "@/lib/content-href"
import { mergeWebsiteContent } from "@/lib/website-content"

test("older content inherits new fields without changing saved copy", () => {
  const result = mergeWebsiteContent(
    {
      hero: { title: "Judul tersimpan" },
      about: { titleBlack: "Profil lama", titleGray: "Aksen lama" },
      contact: {
        ctaLabel: "Hubungi saya",
        headerTitleBlack: "Bicara",
        headerTitleGray: "bersama",
      },
      projects: { headerBadge: "Portfolio lama" },
    },
    { bio: "Bio tersimpan", shortName: "Nama tersimpan", name: "Nama Lengkap" }
  )
  assert.equal(result.hero.title, "Judul tersimpan")
  assert.equal(result.hero.primaryCtaLabel, "Hubungi saya")
  assert.equal(
    result.hero.terminalCommand,
    DEFAULT_WEBSITE_CONTENT.hero.terminalCommand
  )
  assert.equal(result.aboutIntro.title, "Profil lama")
  assert.equal(result.aboutIntro.description, "Bio tersimpan")
  assert.equal(result.aboutContact.ctaLabel, "Hubungi saya")
  assert.equal(result.projectsPage.headerBadge, "Portfolio lama")
  assert.equal(result.header.brandName, "Nama tersimpan")
  assert.equal(result.header.initials, "NL")
  assert.equal(result.footer.giantText, "NAMA")
})

test("page copy stays independent after editing a section", () => {
  const result = mergeWebsiteContent(
    {
      about: { titleBlack: "Homepage" },
      aboutIntro: { title: "Halaman About" },
      projects: { headerBadge: "Home projects" },
      projectsPage: { headerBadge: "Projects page" },
      header: { brandName: "Brand khusus" },
    },
    { shortName: "Identitas global" }
  )
  assert.equal(result.aboutIntro.title, "Halaman About")
  assert.equal(result.projectsPage.headerBadge, "Projects page")
  assert.equal(result.projects.headerBadge, "Home projects")
  assert.equal(result.header.brandName, "Brand khusus")
})

test("deliberately empty text and lists do not reappear as defaults", () => {
  const result = mergeWebsiteContent({
    header: { links: [], logoKey: "" },
    hero: { chips: [], terminalLines: [], detail: "" },
    footer: { links: [], legalLinks: [] },
  })
  assert.deepEqual(result.header.links, [])
  assert.deepEqual(result.hero.chips, [])
  assert.deepEqual(result.hero.terminalLines, [])
  assert.equal(result.hero.detail, "")
  assert.deepEqual(result.footer.legalLinks, [])
})

test("malformed data and unsafe saved links cannot reach public navigation", () => {
  const result = mergeWebsiteContent({
    header: {
      links: [
        null,
        { label: "Bad", href: "javascript:alert(1)" },
        { label: "Wrong shape", icon: "globe" },
        { label: "About", href: "/about" },
      ],
      ctaHref: "//evil.example",
    },
    hero: { chips: [null, "ERP", 5], secondaryCtaHref: "javascript:alert(1)" },
  })
  assert.deepEqual(result.header.links, [{ label: "About", href: "/about" }])
  assert.equal(result.header.ctaHref, DEFAULT_WEBSITE_CONTENT.header.ctaHref)
  assert.equal(result.hero.secondaryCtaHref, "/about")
  assert.deepEqual(result.hero.chips, ["ERP"])
  assert.deepEqual(mergeWebsiteContent(null), DEFAULT_WEBSITE_CONTENT)
})

test("all editable sections and collection links have a registered page", () => {
  const keys = CONTENT_PAGES.flatMap((page) => [...page.sections])
  for (const key of Object.keys(DEFAULT_WEBSITE_CONTENT))
    assert.ok(keys.includes(key as (typeof keys)[number]), key)
  assert.equal(new Set(keys).size, keys.length)
  for (const links of Object.values(SECTION_COLLECTION_LINKS)) {
    for (const link of links) {
      assert.ok(
        link.href === "/admin/projects" ||
          CONTENT_COLLECTIONS.some(
            (collection) => link.href === `/admin/collections/${collection.id}`
          ),
        link.href
      )
    }
  }
})

test("navigation allows supported destinations and rejects script or host escapes", () => {
  for (const value of [
    "#about",
    "/about",
    "/#contact",
    "https://example.com",
    "mailto:hello@example.com",
    "tel:+6281234",
  ])
    assert.equal(isSafeContentHref(value), true, value)
  for (const value of [
    "",
    "//evil.example",
    "/\\evil.example",
    "javascript:alert(1)",
    "data:text/html,hello",
    "https://user:password@example.com",
    "#bad selector",
    "https://example.com\n",
  ])
    assert.equal(isSafeContentHref(value), false, value)
})
