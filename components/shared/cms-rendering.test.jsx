import { expect, mock, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import { DEFAULT_SITE_SETTINGS, DEFAULT_WEBSITE_CONTENT } from "@/constants/cms"

mock.module("next/navigation", () => ({ usePathname: () => "/about" }))

const { Navbar } = await import("@/components/shared/navbar")
const { Footer } = await import("@/components/shared/footer")
const { Skills } = await import("@/components/public/home/skills")
const { Hero } = await import("@/components/public/home/hero")
const { Contact } = await import("@/components/public/home/contact")
const { AboutTimeline } =
  await import("@/components/public/about/about-timeline")

test("public header renders edited branding, logo, navigation and CTA", () => {
  const html = renderToStaticMarkup(
    <Navbar
      content={{
        ...DEFAULT_WEBSITE_CONTENT.header,
        brandName: "Custom Brand",
        initials: "CB",
        links: [
          { label: "Custom Skills", href: "#skills" },
          { label: "All work", href: "/projects" },
        ],
        ctaLabel: "Discuss a project",
        ctaHref: "mailto:hello@example.com",
      }}
      logoUrl="https://example.com/logo.png"
    />
  )
  expect(html).toContain("Custom Brand")
  expect(html).toContain('src="https://example.com/logo.png"')
  expect(html).toContain('href="/#skills"')
  expect(html).toContain('href="/projects"')
  expect(html).toContain("Custom Skills")
  expect(html).toContain('href="mailto:hello@example.com"')
  expect(html).toContain("Discuss a project")
})

test("footer uses its own menu, labels, copyright tokens and giant text", () => {
  const html = renderToStaticMarkup(
    <Footer
      site={DEFAULT_SITE_SETTINGS}
      content={{
        ...DEFAULT_WEBSITE_CONTENT.footer,
        title: "Footer title",
        titleAccent: "Footer accent",
        links: [{ label: "Custom footer link", href: "/about" }],
        legalLinks: [],
        copyright: "{name} / {year}",
        giantText: "CUSTOM",
      }}
    />
  )
  for (const value of [
    "Footer title",
    "Footer accent",
    "Custom footer link",
    DEFAULT_SITE_SETTINGS.name,
    "CUSTOM",
  ])
    expect(html).toContain(value)
  expect(html).not.toContain("{year}")
  expect(html).not.toContain("Terms of service")
})

test("hero renders independent CTA labels, destination and marquee label", () => {
  const html = renderToStaticMarkup(
    <Hero
      content={{
        ...DEFAULT_WEBSITE_CONTENT.hero,
        primaryCtaLabel: "Primary custom",
        secondaryCtaLabel: "Browse custom",
        secondaryCtaHref: "/projects",
        buildLabel: "Custom builds",
      }}
    />
  )
  expect(html).toContain("Primary custom")
  expect(html).toContain("Browse custom")
  expect(html).toContain('href="/projects"')
  expect(html).toContain("Custom builds")
})

test("skills render stored icon images, edited count labels and visible items only", () => {
  const html = renderToStaticMarkup(
    <Skills
      content={{ ...DEFAULT_WEBSITE_CONTENT.skills, countLabel: "keahlian" }}
      skills={[
        {
          id: "a",
          name: "Visible skill",
          category: "core",
          visible: true,
          iconKey: "icons/a.png",
        },
        {
          id: "b",
          name: "Hidden skill",
          category: "core",
          visible: false,
          iconKey: null,
        },
      ]}
      media={[
        {
          id: "asset-a",
          storageKey: "icons/a.png",
          publicUrl: "https://example.com/icon.png",
        },
      ]}
    />
  )
  expect(html).toContain("Visible skill")
  expect(html).not.toContain("Hidden skill")
  expect(html).toContain("1 keahlian")
  expect(html).toContain('src="https://example.com/icon.png"')
})

test("contact renders edited channel labels and handles an empty title accent", () => {
  const html = renderToStaticMarkup(
    <Contact
      site={DEFAULT_SITE_SETTINGS}
      content={{
        ...DEFAULT_WEBSITE_CONTENT.contact,
        emailLabel: "Email custom",
        whatsappLabel: "WhatsApp custom",
        phoneLabel: "Phone custom",
        socialLabel: "Social custom",
        cardHeading: "Keep this title",
        cardHeadingAccent: "",
      }}
    />
  )
  for (const value of [
    "Email custom",
    "WhatsApp custom",
    "Phone custom",
    "Social custom",
    "Keep this title",
  ])
    expect(html).toContain(value)
})

test("timeline renders every entry with organization, period and description", () => {
  const entries = [
    {
      id: "a",
      title: "First education",
      organization: "University",
      startDate: "2020-01-01",
      endDate: "2024-06-01",
      isCurrent: false,
      description: "Education detail",
    },
    {
      id: "b",
      title: "Second education",
      organization: "Institute",
      startDate: "2025-01-01",
      endDate: null,
      isCurrent: true,
      description: "More detail",
    },
  ]
  const html = renderToStaticMarkup(
    <AboutTimeline
      entries={entries}
      title="Education custom"
      emptyText="No education"
      currentLabel="Ongoing custom"
    />
  )
  for (const value of [
    "First education",
    "Second education",
    "University",
    "Institute",
    "2020",
    "2024",
    "Ongoing custom",
    "Education detail",
    "More detail",
  ])
    expect(html).toContain(value)
  expect(html).not.toContain("No education")
  const empty = renderToStaticMarkup(
    <AboutTimeline
      entries={[]}
      title="Experience"
      emptyText="No experience"
      currentLabel="Ongoing"
    />
  )
  expect(empty).toContain("No experience")
})
