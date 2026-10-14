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
    label: "X",
    brand: "x",
    href: "https://x.com/fazle_rabbi_dev",
    handle: "@fazle_rabbi_dev",
  },
  {
    label: "GitHub",
    brand: "github",
    href: "https://github.com/fazle-rabbi-dev",
    handle: "@fazle-rabbi-dev",
  },
  {
    label: "LinkedIn",
    brand: "linkedin",
    href: "https://www.linkedin.com/in/fazlerabbidev",
    handle: "@fazlerabbidev",
    followers: "1300+",
  },
  // { label: "WhatsApp", brand: "whatsapp", href: hero_profile.whatsapp },
  // { label: "Telegram", brand: "telegram", href: "https://t.me/fazlerabbidev" },
]

export const FOOTER_LEGAL = [
  { label: "Terms of service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
]
