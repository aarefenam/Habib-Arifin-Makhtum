"use client"

import * as React from "react"
import { ArrowUpRight, Mail, MessageCircle, Phone, Send } from "lucide-react"

import { SectionHeader } from "@/components/shared/section-header"
import { SocialIcon } from "@/components/shared/social-icons"
import { useContactStore } from "@/stores/contact-store"

import {
  CONTACT_CARD,
  CONTACT_HEADER,
  CONTACT_METHODS,
  CONTACT_PROFILE,
  CONTACT_SOCIALS_LABEL,
} from "@/constants/contact"
import { FOOTER_SOCIALS } from "@/constants/footer"
import { ShineBorder } from "@/components/ui/shine-border"
import Image from "next/image"

const METHOD_ICONS = {
  mail: Mail,
  whatsapp: MessageCircle,
  telegram: Send,
  phone: Phone,
}

export function Contact() {
  const open = useContactStore((s) => s.open)

  return (
    <section id="contact" aria-label="Contact" className="mt-6 sm:mt-10">
      <div className="flex flex-col gap-8">
        <SectionHeader
          badge={CONTACT_HEADER.badge}
          titleBlack={CONTACT_HEADER.titleBlack}
          titleGray={CONTACT_HEADER.titleGray}
          sideNote={CONTACT_HEADER.sideNote}
          center={false}
          badgeCenter
        />

        <div className="grid gap-4 md:grid-cols-2">
          {/* Direct channels */}
          <div className="flex flex-col gap-3">
            {CONTACT_METHODS.map((method) => {
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
              {CONTACT_SOCIALS_LABEL}
            </p>
            <div className="flex flex-wrap gap-2">
              {FOOTER_SOCIALS.map((social) => (
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
              {CONTACT_CARD.giantWord}
            </span>

            <div className="relative">
              <p className="flex-center gap-2 font-mono text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
                <span aria-hidden className="size-2 rounded-full bg-blue-600" />
                {CONTACT_HEADER.badge} · {CONTACT_CARD.eyebrow}
              </p>
              <h3 className="heading-3 mt-4 max-w-sm text-white">
                {CONTACT_CARD.heading
                  .split(CONTACT_CARD.headingAccent)
                  .reduce<React.ReactNode[]>(
                    (parts, part, i, arr) => [
                      ...parts,
                      part,
                      ...(i < arr.length - 1
                        ? [
                            <span key={i} className="text-blue-500">
                              {CONTACT_CARD.headingAccent}
                            </span>,
                          ]
                        : []),
                    ],
                    []
                  )}
              </h3>
              <p className="mt-3 max-w-xs text-white/60">{CONTACT_CARD.sub}</p>

              <button
                type="button"
                onClick={open}
                className="group mt-6 inline-flex cursor-pointer items-center gap-3 rounded-full bg-blue-600 py-2 pr-2 pl-6 font-semibold text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-105"
              >
                {CONTACT_CARD.ctaLabel}
                <span
                  aria-hidden
                  className="flex-center size-10 justify-center rounded-full bg-white text-blue-600"
                >
                  <ArrowUpRight aria-hidden className="size-5" />
                </span>
              </button>

              <div className="mt-8 flex-center gap-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-indigo-200">
                  {/* Centered fallback - visible while the avatar loads or if it fails */}
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-900"
                  >
                    {CONTACT_PROFILE.initial}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CONTACT_PROFILE.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="absolute inset-0 size-full rounded-full object-cover"
                    loading="lazy"
                  />
                </span>
                <span>
                  <span className="block font-bold">
                    {CONTACT_PROFILE.name}
                  </span>
                  <span className="block font-mono text-sm text-white/60">
                    {CONTACT_PROFILE.role} · {CONTACT_PROFILE.location}
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
