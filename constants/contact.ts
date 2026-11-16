import { hero_profile } from "@/lib/portfolio-data"

export const CONTACT_HEADER = {
  badge: "Contact",
  titleBlack: "Have an idea?",
  titleGray: "Let's make it real.",
  sideNote: "Tell me what you need. I will reply as soon as I can.",
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
    value: "+20 150 704 9289",
    href: hero_profile.whatsapp,
    icon: "whatsapp",
  },
  {
    label: "Phone",
    value: "+20 150 704 9289",
    href: "tel:+201507049289",
    icon: "phone",
  },
]

export const CONTACT_SOCIALS_LABEL = "Find me on"

export const CONTACT_CARD = {
  eyebrow: "Send a message",
  heading: "Prefer to talk it through over a message?",
  headingAccent: "message",
  sub: "Describe what you need, and I will prepare the first steps.",
  ctaLabel: "Send a message",
  giantWord: "idea",
}

export const CONTACT_PROFILE = {
  initial: "HA",
  name: "Habib Arifin Makhtum",
  role: "Full-Stack Developer & IT Solver",
  location: "Cairo, Egypt",
}
