"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { FOOTER_LEGAL } from "@/constants/footer"
import { NAV_LINKS } from "@/constants/navigation"
import { scrollToSection } from "@/lib/scroll"
import { SocialIcon } from "@/components/shared/social-icons"
import type { PortfolioSiteSettings } from "@/types/cms"

export function Footer({ site }: { site: PortfolioSiteSettings }) {
  const year = new Date().getFullYear()
  const firstName = site.name.split(" ")[0].toUpperCase()
  const pathname = usePathname()
  const router = useRouter()
  const pendingTarget = React.useRef<string | null>(null)
  const socials = [
    {
      brand: "github" as const,
      handle: "GitHub",
      href: site.socialLinks.github,
      label: "GitHub",
    },
    {
      brand: "linkedin" as const,
      handle: "LinkedIn",
      href: site.socialLinks.linkedin,
      label: "LinkedIn",
    },
    {
      brand: "instagram" as const,
      handle: "Instagram",
      href: site.socialLinks.instagram,
      label: "Instagram",
    },
    {
      brand: "whatsapp" as const,
      handle: "WhatsApp",
      href: site.whatsappUrl,
      label: "WhatsApp",
    },
  ].filter((social) => social.href)
  const featuredSocial = socials[0]
  const iconSocials = socials.slice(1)

  function goToSection(target: string) {
    if (pathname === "/") {
      scrollToSection(target)
    } else {
      pendingTarget.current = target
      router.push("/")
    }
  }

  React.useEffect(() => {
    if (pathname === "/" && pendingTarget.current) {
      const target = pendingTarget.current
      pendingTarget.current = null
      const id = setTimeout(() => scrollToSection(target), 100)
      return () => clearTimeout(id)
    }
  }, [pathname])

  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <footer className="overflow-hidden bg-black text-white">
      <div className="max-body mx-auto px-6 pt-16 md:pt-24">
        {/* Headline */}
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-bold tracking-tight">
          Mari membangun
          <br />
          <span className="text-white/50">sistem yang berguna bersama.</span>
          <span
            aria-hidden
            className="ml-4 inline-block size-[0.18em] rounded-full bg-white/70 align-baseline"
          />
        </h2>

        {/* Contact row */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm text-white/50">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block text-lg font-semibold break-all hover:text-white/70"
            >
              {site.email}
            </a>
          </div>
          <div>
            <p className="text-sm text-white/50">WhatsApp</p>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-lg font-semibold hover:text-white/70"
            >
              Mulai percakapan
            </a>
          </div>
          <div>
            <p className="text-sm text-white/50">Social</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {featuredSocial ? (
                <a
                  href={featuredSocial.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${featuredSocial.label} - ${featuredSocial.handle}`}
                  className="flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-sm font-bold text-black"
                >
                  <SocialIcon brand={featuredSocial.brand} className="size-4" />
                  <span>{featuredSocial.handle}</span>
                </a>
              ) : null}
              {iconSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${social.label} - ${social.handle}`}
                  className="flex size-9 items-center justify-center rounded-full bg-white text-black"
                >
                  <SocialIcon brand={social.brand} className="size-4" />
                  <span className="sr-only">{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="mt-12 border-white/15" />

        {/* Links row */}
        <div className="grid gap-8 py-8 md:grid-cols-3">
          <nav aria-label="Footer">
            <p className="text-sm text-white/50">Menu</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => goToSection(link.target)}
                    className="cursor-pointer text-sm font-semibold hover:text-white/70"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-sm text-white/50">Legal</p>
            <ul className="mt-3 flex flex-col gap-2">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-white/70 md:self-end">
            &copy; {year} {site.name}
          </p>
        </div>
      </div>

      {/* Giant clipped name with sunset glow */}
      <div aria-hidden className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse_55%_85%_at_50%_100%,rgb(251_146_60/0.5),rgb(244_63_94/0.22),transparent_70%)]" />
        <p className="relative translate-y-[18%] bg-gradient-to-b from-white via-white to-blue-600 [mask-image:linear-gradient(to_bottom,black_70%,transparent)] bg-clip-text text-center text-[19vw] leading-[0.8] font-bold tracking-tight whitespace-nowrap text-transparent">
          {firstName}
        </p>
      </div>
    </footer>
  )
}
