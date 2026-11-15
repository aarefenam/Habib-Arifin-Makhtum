export const SKILLS_HEADER = {
  badge: "Skills",
  titleBlack: "Teknologi di balik",
  titleGray: "setiap solusi yang dibangun.",
  sideNote:
    "Stack untuk membangun, menjalankan, dan mengembangkan produk digital.",
}

export const CS_CARD = {
  eyebrow: "Self-studied, Feb to Apr 2026",
  heading: "Computer Science Foundation",
  sub: "The fundamentals behind everything I build.",
  notesLabel: "Read more",
  notesHref: "/more-about",
  image: "/cs-ss.png",
  imageAlt: "Computer Science knowledge base notes screenshot",
  topics: [
    { label: "OS", icon: "cpu" },
    { label: "Networking", icon: "network" },
    { label: "DBMS", icon: "database" },
    { label: "Computer History", icon: "history" },
  ] as const,
}

export type SkillItem = {
  name: string
  tag: string
  logo?: string
  monogram?: string
  custom?: "websocket"
  darkInvert?: boolean
}

export const CORE_SKILLS: SkillItem[] = [
  { name: "Next.js", tag: "Framework", logo: "/logos/nextdotjs.svg" },
  { name: "React", tag: "UI library", logo: "/logos/react.svg" },
  { name: "Tailwind CSS", tag: "Styling", logo: "/logos/tailwindcss.svg" },
  { name: "JavaScript", tag: "Language", logo: "/logos/javascript.svg" },
  { name: "PostgreSQL", tag: "Database" },
  { name: "Supabase", tag: "Backend platform", logo: "/logos/supabase.svg" },
  { name: "MongoDB Atlas", tag: "Database", logo: "/logos/mongodb.svg" },
  { name: "Payload CMS", tag: "CMS" },
  {
    name: "API Integration",
    tag: "Systems",
  },
]

export const TOOLKIT: SkillItem[] = [
  {
    name: "Vercel",
    tag: "Deployment",
    logo: "/logos/vercel.svg",
    darkInvert: true,
  },
  { name: "Git", tag: "Version control", logo: "/logos/git.svg" },
  { name: "Docker", tag: "Container", logo: "/logos/docker.svg" },
  { name: "Linux VPS", tag: "Infrastructure" },
  { name: "Cloudflare R2", tag: "Object storage" },
  { name: "SSH", tag: "Server access" },
]

export const LEGACY: SkillItem[] = [
  { name: "Python", tag: "Language", logo: "/logos/python.svg" },
  {
    name: "Flask",
    tag: "Web Framework",
    logo: "/logos/flask.svg",
    darkInvert: true,
  },
  { name: "Java", tag: "Language", logo: "/logos/java.svg" },
  { name: "Android", tag: "Mobile apps", logo: "/logos/android.svg" },
  { name: "MySQL", tag: "Database", logo: "/logos/mysql.svg" },
  { name: "Bootstrap", tag: "CSS framework", logo: "/logos/bootstrap.svg" },
]

export const ADDITIONAL = [
  { label: "ERP Systems", icon: "search" },
  { label: "UI Design", icon: "shield-check" },
  { label: "Rapid prototyping", icon: "rocket" },
  { label: "IoT integration", icon: "book-open" },
] as const
