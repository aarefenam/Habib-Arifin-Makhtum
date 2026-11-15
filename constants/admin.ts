import {
  BriefcaseBusiness,
  Images,
  Inbox,
  Settings2,
  Sparkles,
} from "lucide-react"

export const ADMIN_CONTENT_AREAS = [
  {
    description: "Identitas, bio, sosial media, dan SEO global.",
    id: "site-settings",
    icon: Settings2,
    priority: "Mulai dari sini",
    title: "Site settings",
  },
  {
    description: "Case study, teknologi, link, dan urutan tampilan.",
    id: "projects",
    icon: BriefcaseBusiness,
    priority: "Konten utama",
    title: "Projects",
  },
  {
    description: "Stack, layanan, riwayat, dan pertanyaan umum.",
    id: "content",
    icon: Sparkles,
    priority: "Konten pendukung",
    title: "Content",
  },
  {
    description: "Avatar, project cover, dan seluruh aset R2.",
    id: "media-library",
    icon: Images,
    priority: "Aset visual",
    title: "Media library",
  },
  {
    description: "Pesan dari formulir kontak website.",
    id: "inbox",
    icon: Inbox,
    priority: "Komunikasi masuk",
    title: "Inbox",
  },
] as const
