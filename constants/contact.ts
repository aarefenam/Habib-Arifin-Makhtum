import { hero_profile } from "@/lib/portfolio-data"

export const CONTACT_HEADER = {
  badge: "Contact",
  titleBlack: "Punya ide?",
  titleGray: "Mari wujudkan.",
  sideNote: "Ceritakan kebutuhan Anda. Saya akan membalas secepatnya.",
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
    label: "Telepon",
    value: "+20 150 704 9289",
    href: "tel:+201507049289",
    icon: "phone",
  },
]

export const CONTACT_SOCIALS_LABEL = "Temukan saya di"

export const CONTACT_CARD = {
  eyebrow: "Kirim pesan",
  heading: "Lebih nyaman berdiskusi lewat pesan?",
  headingAccent: "pesan",
  sub: "Jelaskan kebutuhan Anda, lalu saya akan menyiapkan langkah awalnya.",
  ctaLabel: "Kirim pesan",
  giantWord: "ide",
}

export const CONTACT_PROFILE = {
  initial: "HA",
  name: "Habib Arifin Makhtum",
  role: "Full-Stack Developer & IT Solver",
  location: "Kairo, Mesir",
}
