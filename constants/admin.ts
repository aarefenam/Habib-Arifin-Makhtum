import {
  BriefcaseBusiness,
  Images,
  Inbox,
  Settings2,
  Sparkles,
} from "lucide-react"

export const ADMIN_CONTENT_AREAS = [
  {
    description: "Global, homepage, About, dan Projects - per section.",
    href: "/admin/content",
    id: "site-settings",
    icon: Settings2,
    priority: "Mulai dari sini",
    title: "Halaman & section",
  },
  {
    description: "Case study, teknologi, link, dan urutan tampilan.",
    href: "/admin/projects",
    id: "projects",
    icon: BriefcaseBusiness,
    priority: "Konten utama",
    title: "Projects",
  },
  {
    description: "Stack, layanan, riwayat, dan pertanyaan umum.",
    href: "/admin/collections",
    id: "content",
    icon: Sparkles,
    priority: "Konten pendukung",
    title: "Koleksi konten",
  },
  {
    description: "Avatar, project cover, dan seluruh aset R2.",
    href: "/admin/media",
    id: "media-library",
    icon: Images,
    priority: "Aset visual",
    title: "Media library",
  },
  {
    description: "Pesan dari formulir kontak website.",
    href: "/admin/inbox",
    id: "inbox",
    icon: Inbox,
    priority: "Komunikasi masuk",
    title: "Inbox",
  },
] as const
