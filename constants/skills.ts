export const SKILLS_HEADER = {
  badge: "Skills",
  titleBlack: "The stack behind",
  titleGray: "every app I ship.",
  sideNote: "The languages, frameworks and tools behind my apps.",
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
  { name: "TypeScript", tag: "Language", logo: "/logos/typescript.svg" },
  { name: "MongoDB", tag: "Database", logo: "/logos/mongodb.svg" },
  { name: "Node.js", tag: "Runtime", logo: "/logos/nodedotjs.svg" },
  {
    name: "Express",
    tag: "Backend",
    logo: "/logos/express.svg",
    darkInvert: true,
  },
  { name: "JavaScript", tag: "Language", logo: "/logos/javascript.svg" },

  { name: "React", tag: "UI library", logo: "/logos/react.svg" },
  { name: "React Native", tag: "Mobile apps", logo: "/logos/react.svg" },
  {
    name: "Expo",
    tag: "Mobile apps",
    logo: "/logos/expo.svg",
    darkInvert: true,
  },
  { name: "Zustand", tag: "State management", logo: "/logos/zustand.svg" },
  { name: "Clerk", tag: "Authentication", logo: "/logos/clerk.svg" },
  { name: "WebSocket", tag: "Real-time", logo: "/logos/socketio.svg" },
  { name: "Supabase", tag: "Backend platform", logo: "/logos/supabase.svg" },
  { name: "Tailwind CSS", tag: "Styling", logo: "/logos/tailwindcss.svg" },
  {
    name: "shadcn/ui",
    tag: "UI components",
    logo: "/logos/shadcnui.svg",
    darkInvert: true,
  },
]

export const TOOLKIT: SkillItem[] = [
  { name: "VS Code", tag: "Editor", logo: "/logos/vscode.svg" },
  { name: "Git", tag: "Version control", logo: "/logos/git.svg" },
  {
    name: "GitHub",
    tag: "Code hosting",
    logo: "/logos/github.svg",
    darkInvert: true,
  },
  {
    name: "Vercel",
    tag: "Hosting",
    logo: "/logos/vercel.svg",
    darkInvert: true,
  },
  { name: "Netlify", tag: "Hosting", logo: "/logos/netlify.svg" },
  { name: "Docker", tag: "DevOps", logo: "/logos/docker.svg" },
  { name: "Bun", tag: "Runtime & packages", logo: "/logos/bun.svg" },
  {
    name: "Herdr",
    tag: "Terminal multiplexer",
    logo: "/logos/herdr.svg",
    darkInvert: true,
  },
  {
    name: "OpenCode",
    tag: "AI coding agent",
    logo: "/logos/opencode.svg",
    darkInvert: true,
  },
  {
    name: "Pi",
    tag: "Coding agent",
    logo: "/logos/pi-agent.svg",
    darkInvert: true,
  },
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
  { label: "SEO", icon: "search" },
  { label: "Web security", icon: "shield-check" },
  { label: "Prototyping", icon: "rocket" },
  { label: "Self-learning", icon: "book-open" },
] as const
