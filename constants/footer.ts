import { hero_profile } from "@/lib/portfolio-data"

import type { SocialBrand } from "@/components/shared/social-icons"

export type FooterSocial = {
  label: string
  brand: SocialBrand
  href: string
  handle: string
  followers?: string
}

export const FOOTER_SOCIALS: FooterSocial[] = [
  {
    label: "GitHub",
    brand: "github",
    href: "https://github.com/aarefenam",
    handle: "@aarefenam",
  },
  {
    label: "LinkedIn",
    brand: "linkedin",
    href: "https://www.linkedin.com/in/habib-arifin-makhtum",
    handle: "Habib Arifin Makhtum",
  },
  {
    label: "Instagram",
    brand: "instagram",
    href: "https://www.instagram.com/sowlyy_/",
    handle: "@sowlyy_",
  },
  {
    label: "WhatsApp",
    brand: "whatsapp",
    href: hero_profile.whatsapp,
    handle: "WhatsApp",
  },
]

export const FOOTER_LEGAL = [
  { label: "Terms of service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
]
