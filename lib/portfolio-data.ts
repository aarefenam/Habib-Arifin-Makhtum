export const hero_profile = {
  name: "Fazle Rabbi",
  handle: "fazlerabbidev",
  role: "Software Developer.",
  tagline:
    "I build secure & fast web apps with Next.js & Node. Based in Bangladesh · working worldwide.",
  avatar: "https://avatars.githubusercontent.com/u/71178740?v=4",
  email: "fazlerabbi1343@gmail.com",
  location: "Mymensingh, BD",
  status: "open to work",
  whatsapp:
    "https://wa.me/fazlerabbi_dev?text=Hi%20Rabbi!%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.",
}

export const stats = [
  { value: 32, label: "projects" },
  { value: 5, label: "yrs exp" },
  { value: 18, label: "clients" },
]

export const nowCard = {
  title: "Now",
  body: "Learning Rust · building a tiny analytics tool · reading Meditations.",
}

export const timeline = [
  { period: "2023 — now", text: "Senior FE @ Lumio" },
  { period: "2021 — 23", text: "Full-stack @ Craftly" },
  { period: "2019 — 21", text: "Freelance · 18 clients" },
]

export const traits = [
  "⚡ performance nerd",
  "🌿 minimalist",
  "📝 perfectionist",
]

export const csFoundationTopicsCover = [
  "🖥️ OS",
  "🌐 Networking",
  "🗄️ DBMS",
  "📜 Computer History",
]

export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "Next.js / React", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "Postgres / Prisma", level: 78 },
      { name: "REST / APIs", level: 86 },
    ],
  },
  {
    title: "Craft",
    skills: [
      { name: "GSAP / Motion", level: 82 },
      { name: "SEO / Perf", level: 89 },
      { name: "Git / CI", level: 84 },
    ],
  },
]

export const additionalSkills = [
  "🎯 SEO",
  "🔐 Web security",
  "🚀 MVP planning",
  "📚 Self-learning",
]

export type Project = {
  title: string
  desc: string
  tags: string[]
  category: "SaaS" | "Dashboard" | "API" | "Site"
  hue: string
  emoji: string
  year: string
}

export const projectCategories = [
  "All",
  "SaaS",
  "Dashboard",
  "API",
  "Site",
] as const

export const projects: Project[] = [
  {
    title: "Pulseboard",
    desc: "Realtime analytics SaaS with live charts, workspaces and a 95 Lighthouse score.",
    tags: ["Next.js", "WebSockets", "Tailwind"],
    category: "SaaS",
    hue: "from-violet-500 to-fuchsia-500",
    emoji: "📊",
    year: "2025",
  },
  {
    title: "Ledgerly",
    desc: "Finance dashboard with budget insights, CSV import and offline-first tables.",
    tags: ["React", "Postgres", "Prisma"],
    category: "Dashboard",
    hue: "from-cyan-500 to-blue-600",
    emoji: "💹",
    year: "2024",
  },
  {
    title: "ShipAPI",
    desc: "Mock REST API toolkit — rate limits, keys, docs and usage metering.",
    tags: ["Node.js", "Redis", "OpenAPI"],
    category: "API",
    hue: "from-amber-500 to-orange-600",
    emoji: "🔌",
    year: "2024",
  },
  {
    title: "Atelier Theme",
    desc: "Award-style portfolio theme with smooth scroll and dark-mode gallery.",
    tags: ["Next.js", "GSAP", "Lenis"],
    category: "Site",
    hue: "from-pink-500 to-rose-600",
    emoji: "🎨",
    year: "2023",
  },
  {
    title: "Nomad Store",
    desc: "Headless storefront with cart, checkout and CMS landing pages.",
    tags: ["React", "Stripe", "Sanity"],
    category: "Site",
    hue: "from-emerald-500 to-teal-600",
    emoji: "🛒",
    year: "2023",
  },
  {
    title: "Scribe AI",
    desc: "Meeting-notes copilot that turns calls into action items with streaming UI.",
    tags: ["Python", "OpenAI", "Next.js"],
    category: "SaaS",
    hue: "from-slate-500 to-zinc-700",
    emoji: "🤖",
    year: "2023",
  },
]

export const education = [
  { period: "2015 — 2019", text: "B.Tech, Computer Science (mock)" },
  {
    period: "2019",
    text: "Full-stack web dev — self-taught via YouTube & docs (mock)",
  },
  {
    period: "2022",
    text: "MERN stack mastery through building in public (mock)",
  },
]

export const certs = [
  "🎓 B.Tech CS",
  "🌐 Web fundamentals",
  "⚛️ React mastery (mock)",
  "☁️ Cloud basics (mock)",
]

export const apps_i_use = [
  {
    name: "Acode",
    note: "VS Code-like editor on Android",
    href: "https://github.com/Acode-Foundation/Acode",
  },
  { name: "Termux", note: "Terminal on Android" },
  { name: "Eruda", note: "Console for mobile web" },
  { name: "Obsidian", note: "Notes & writing (mock)" },
]

export const beliefs = [
  "Done is better than perfect.",
  "Just make things exist first, you can always make it better.",
  "Ugly action beats perfectionism.",
  "Success has a cost.",
]

export const principles = [
  "Fast software is a feature.",
  "Delete code > write code.",
  "Design is how it works.",
]

export const quotes = [
  {
    text: "Everything in your life is a reflection of your choices. To be better, make a different choice — not once, but consistently, even when it feels uncomfortable.",
    by: "Instagram",
  },
  {
    text: "Motivation is fickle. Discipline > motivation.",
    by: "Jocko Willink (paraphrased)",
  },
]

export const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "WhatsApp", href: "https://wa.me/" },
  { label: "Email", href: "mailto:hello@aarav.dev" },
]

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
]

export const services = [
  { title: "Web Apps", desc: "Next.js apps, from MVP to scale." },
  { title: "APIs & Backend", desc: "Node, Postgres, clean contracts." },
  { title: "Dashboards", desc: "Data-heavy UI that stays fast." },
  { title: "Performance & SEO", desc: "95+ Lighthouse as a habit." },
]

export const faqs = [
  {
    q: "What type of projects do you take on?",
    a: "SaaS apps, dashboards, marketing sites and APIs — mostly Next.js + Node. If it needs to be fast and calm, I'm in. (mock)",
  },
  {
    q: "Do you work solo or in a team?",
    a: "Both. I freelanced with 18+ clients and also embedded in product teams as a senior frontend dev. (mock)",
  },
  {
    q: "How do we start working together?",
    a: "A short call, a written scope, then weekly demos. You'll always know what's done and what's next. (mock)",
  },
  {
    q: "What is your availability?",
    a: "Currently open to work — booking mock projects for Q1 2026. I reply within 24 hours. (mock)",
  },
  {
    q: "Can you help with an existing codebase?",
    a: "Yes — audits, performance fixes, and feature work. I delete more code than I add. (mock)",
  },
  {
    q: "What tools do you use for communication?",
    a: "Async-first: Linear, Slack, Loom and a weekly call. No meeting marathons. (mock)",
  },
]
