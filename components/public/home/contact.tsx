"use client"

import * as React from "react"
import { ArrowUpRight, Mail, MessageCircle, Phone, Send } from "lucide-react"

import { SectionHeader } from "@/components/shared/section-header"
import { SocialIcon } from "@/components/shared/social-icons"
import { useContactStore } from "@/stores/contact-store"
import { ShineBorder } from "@/components/ui/shine-border"
import type { HomePageContent, PortfolioSiteSettings } from "@/types/cms"

const METHOD_ICONS = {
  mail: Mail,
  whatsapp: MessageCircle,
  telegram: Send,
  phone: Phone,
}

export function Contact({
  content,
  site,
}: {
  content: HomePageContent["contact"]
  site: PortfolioSiteSettings
}) {
  const open = useContactStore((s) => s.open)
  const socialLinks = [
    {
      brand: "github" as const,
      href: site.socialLinks.github,
      label: "GitHub",
    },
    {
      brand: "linkedin" as const,
      href: site.socialLinks.linkedin,
      label: "LinkedIn",
    },
    {
      brand: "instagram" as const,
      href: site.socialLinks.instagram,
      label: "Instagram",
    },
  ].filter((social) => social.href)
  const methods = [
    {
      href: `mailto:${site.email}`,
      icon: "mail" as const,
      label: "Email",
      value: site.email,
    },
    {
      href: site.whatsappUrl,
      icon: "whatsapp" as const,
      label: "WhatsApp",
      value: site.phone,
    },
    {
      href: `tel:${site.phone.replace(/\s/g, "")}`,
      icon: "phone" as const,
      label: "Telepon",
      value: site.phone,
    },
  ].filter((method) => method.href && method.value)

  return (
    <section id="contact" aria-label="Contact" className="mt-6 sm:mt-10">
      <div className="flex flex-col gap-8">
        <SectionHeader
          badge={content.headerBadge}
          titleBlack={content.headerTitleBlack}
          titleGray={content.headerTitleGray}
          sideNote={content.headerSideNote}
          center={false}
          badgeCenter
        />

        <div className="grid gap-4 md:grid-cols-2">
          {/* Direct channels */}
          <div className="flex flex-col gap-3">
            {methods.map((method) => {
              const Icon = METHOD_ICONS[method.icon]
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="group flex-center flex-wrap gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600/40 hover:shadow-md"
                >
                  <span
                    aria-hidden
                    className="flex-center size-12 shrink-0 justify-center rounded-xl border border-dashed border-border text-blue-600 transition-colors duration-300 group-hover:border-blue-600"
                  >
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted-foreground">
                      {method.label}
                    </span>
                    <span className="block truncate text-sm font-bold">
                      {method.value}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="hidden size-7 shrink-0 justify-center rounded-full bg-blue-600/10 text-blue-600 xsm:flex-center"
                  >
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </a>
              )
            })}

            <p className="mt-2 text-xs text-muted-foreground">
              Temukan saya di
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex-center size-11 justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition-colors hover:border-blue-600/40 hover:text-blue-600"
                >
                  <SocialIcon brand={social.brand} className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Message card - dark sunset card */}
          <article className="relative flex flex-col overflow-hidden rounded-2xl bg-zinc-950 p-6 text-white md:p-8 dark:border dark:border-white/10">
            <ShineBorder shineColor={"#2196f3"} duration={10} />

            {/* Blue glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/3 -left-24 size-72 rounded-full bg-blue-600/25 blur-3xl"
            />
            {/* Giant background word */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 -bottom-10 translate-y-[12%] text-[9rem] leading-none font-bold tracking-tight whitespace-nowrap text-blue-600/15 select-none"
            >
              {content.giantWord}
            </span>

            <div className="relative">
              <p className="flex-center gap-2 font-mono text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
                <span aria-hidden className="size-2 rounded-full bg-blue-600" />
                {content.headerBadge} · {content.eyebrow}
              </p>
              <h3 className="heading-3 mt-4 max-w-sm text-white">
                {content.cardHeading
                  .split(content.cardHeadingAccent)
                  .reduce<React.ReactNode[]>(
                    (parts, part, i, arr) => [
                      ...parts,
                      part,
                      ...(i < arr.length - 1
                        ? [
                            <span key={i} className="text-blue-500">
                              {content.cardHeadingAccent}
                            </span>,
                          ]
                        : []),
                    ],
                    []
                  )}
              </h3>
              <p className="mt-3 max-w-xs text-white/60">{content.cardSub}</p>

              <button
                type="button"
                onClick={open}
                className="group mt-6 inline-flex cursor-pointer items-center gap-3 rounded-full bg-blue-600 py-2 pr-2 pl-6 font-semibold text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-105"
              >
                {content.ctaLabel}
                <span
                  aria-hidden
                  className="flex-center size-10 justify-center rounded-full bg-white text-blue-600"
                >
                  <ArrowUpRight aria-hidden className="size-5" />
                </span>
              </button>

              <div className="mt-8 flex-center gap-3">
                <span
                  aria-hidden
                  className="flex-center size-12 shrink-0 justify-center rounded-full bg-blue-600 text-lg font-bold text-white"
                >
                  {site.name
                    .split(" ")
                    .map((part) => part.slice(0, 1))
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <span className="block font-bold">{site.name}</span>
                  <span className="block font-mono text-sm text-white/60">
                    {site.role} · {site.location}
                  </span>
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
