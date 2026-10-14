import { hero_profile } from "@/lib/portfolio-data"

export const CONTACT_HEADER = {
  badge: "Contact",
  titleBlack: "Have an idea?",
  titleGray: "Let's build it.",
  sideNote: "Tell me what you need. I'll reply as soon as I can.",
}

export type ContactMethod = {
  label: string
  value: string
  href: string
  icon: "mail" | "whatsapp" | "telegram" | "phone"
}

export const CONTACT_METHODS: ContactMethod[] = [
  {
    label: "Email",
    value: hero_profile.email,
    href: `mailto:${hero_profile.email}`,
    icon: "mail",
  },
  {
    label: "WhatsApp",
    value: "fazlerabbi_dev",
    href: hero_profile.whatsapp,
    icon: "whatsapp",
  },
  {
    label: "Telegram",
    value: "@fazlerabbidev",
    href: "https://t.me/fazlerabbidev",
    icon: "telegram",
  },
  // {
  //   label: "Phone",
  //   value: "+62 812-5027-4043",
  //   href: "tel:+6281250274043",
  //   icon: "phone",
  // },
]

export const CONTACT_SOCIALS_LABEL = "Find me online"

export const CONTACT_CARD = {
  eyebrow: "Send a message",
  heading: "Prefer to write it down?",
  headingAccent: "write",
  sub: "Describe your idea and I'll reply with a few questions and a plan.",
  ctaLabel: "Send a message",
  giantWord: "idea",
}

export const CONTACT_PROFILE = {
  initial: "R",
  avatar: "/avatar.webp",
  name: "Rabbi",
  role: "Software Developer",
  location: "Bangladesh",
}
