import { FEATURED_PROJECTS } from "@/constants/projects"

export type ProjectFeatureIcon =
  "auth" | "safety" | "links" | "theming" | "analytics" | "seo"

export type ProjectDetails = {
  slug: string
  title: string
  headline: string
  summary: string
  liveLabel: string
  liveUrl?: string
  githubUrl?: string
  secondaryLinkLabel?: string
  secondaryLinkUrl?: string
  timeline: string
  stack: string[]
  whyTitle: string
  whyLead: string
  whyRest: string
  features: { icon: ProjectFeatureIcon; title: string; desc: string }[]
  deepDive: { label: "problem" | "solution" | "insight"; text: string }[]
}

export const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  "link-leaf": {
    slug: "link-leaf",
    title: "Link Leaf",
    headline: "A modern, open-source and highly customizable Linktree web app.",
    summary:
      "Create a personal profile page that gathers all your important links (social media, portfolio, blog) behind one shareable URL. Pick your theme and colors, add your links, and track profile views and link clicks.",
    liveLabel: "Live",
    liveUrl: "https://link-leaf.vercel.app/",
    githubUrl: "https://github.com/fazle-rabbi-dev/Link-Leaf",
    secondaryLinkLabel: "Backend repo",
    secondaryLinkUrl: "https://github.com/fazle-rabbi-dev/Link-Leaf-Backend/",
    timeline: "May 2026 to Sep 2026",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Zustand",
      "Express",
      "MongoDB",
      "Cloudinary",
    ],
    whyTitle: "Why I built it",
    whyLead:
      "I wanted to build a production-grade full-stack app with MERN stack along Typescript",
    whyRest:
      " with real-world features: complete complex authentication, user and link management, file uploads, analytics and dynamic SEO.",
    features: [
      {
        icon: "auth",
        title: "Secure sign-in",
        desc: "Email and password, or Google and GitHub, with rotating JWT tokens.",
      },
      {
        icon: "safety",
        title: "Account safety",
        desc: "Email verification, password reset and a 7-day link to undo an unauthorized email change.",
      },
      {
        icon: "links",
        title: "Links, your way",
        desc: "Ready-made social links plus custom ones, and an avatar upload.",
      },
      {
        icon: "theming",
        title: "Make it yours",
        desc: "Colors, fonts, button styles and layouts, with dark and light mode.",
      },
      // {
      //   icon: "analytics",
      //   title: "Analytics",
      //   desc: "See profile views and link clicks at a glance.",
      // },
      // {
      //   icon: "seo",
      //   title: "Dynamic SEO",
      //   desc: "Every profile gets its own OpenGraph image and metadata.",
      // },
    ],
    deepDive: [
      {
        label: "problem",
        text: "Changing an account's email is a common way to take it over.",
      },
      {
        label: "solution",
        text: "The old address gets a special link that reverts the change. The attacker's email is deleted, and email changes stay locked for 7 days.",
      },
      {
        label: "insight",
        text: "Security is mostly small decisions. Hashed tokens and uniform error responses cost little to add, but they limit what an attacker can learn.",
      },
    ],
  },
  "tube-brief": {
    slug: "tube-brief",
    title: "TubeBrief",
    headline: "Paste a YouTube video URL and get a short summary.",
    summary:
      "TubeBrief turns long videos into quick briefs so you can decide what is worth watching. Paste a link, get the key points, and jump to the moments that matter.",
    liveLabel: "Live",
    liveUrl: "https://tube-brief.vercel.app/",
    githubUrl: "https://github.com/fazle-rabbi-dev/Tube-Brief",
    timeline: "Dec 2025",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    whyTitle: "Why I built it",
    whyLead: "I wanted a faster way to consume long videos, ",
    whyRest: " since I normally couldn't find the time to watch them.",
    features: [
      {
        icon: "links",
        title: "Link to brief",
        desc: "Paste any YouTube URL and get a clean summary in seconds.",
      },
      {
        icon: "analytics",
        title: "Key points",
        desc: "Skimmable takeaways with TLDR;.",
      },
      {
        icon: "seo",
        title: "Shareable output",
        desc: "Copy the brief and share it with other.",
      },
      {
        icon: "auth",
        title: "Secure sign-in ",
        desc: "Secure sign-in to save all summaries to your account.",
      },
      {
        icon: "theming",
        title: "Clean reading",
        desc: "Focused layout with dark and light mode.",
      },
      {
        icon: "safety",
        title: "Grounded output",
        desc: "Summaries stay close to the transcript, not invented.",
      },
    ],
    deepDive: [],
  },
  "quiet-stack": {
    slug: "quiet-stack",
    title: "Quiet Stack",
    headline: "Personal blog website with aesthetic vibe..",
    summary:
      "I always wanted a personal blog where I could write about what I know, what I’ve learned, and what I want to share. I had already written many tech posts on Facebook and LinkedIn, so I finally created one place to keep all my writing.",
    liveLabel: "Live",
    liveUrl: "https://quiet-stack.vercel.app/",
    githubUrl: "https://github.com/fazle-rabbi-dev/quiet-stack/",
    timeline: "Sept 2026",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    whyTitle: "Why I built it",
    whyLead: "Just to keep my thoughts in one single place",
    whyRest: "",
    features: [],
    deepDive: [],
  },
  "story-book": {
    slug: "story-book",
    title: "Story Book",
    headline: "A story book web app with narration. (currently closed source)",
    summary:
      "Press play and each page appears with automatic narration, the spoken text highlighted, and an aesthetic SVG animation for every chapter on the left/top.",
    liveLabel: "Live",
    liveUrl: "https://story-book-fr.vercel.app/",
    githubUrl: "",
    timeline: "Oct 2026",
    stack: ["React 19", "TypeScript"],
    whyTitle: "Why I built it",
    whyLead:
      "I was inspired by another story book built by Ahmed Shamim Hasan Shaon,",
    whyRest:
      " so I decided to vibe code a similar one, but for the stories of the prophets.",
    features: [],
    deepDive: [],
  },
  clipo: {
    slug: "clipo",
    title: "Clipo",
    headline: "An aesthetic clipboard manager for Windows, built for myself.",
    summary:
      "Press Ctrl+Shift+V to open a clean popup with a search bar, your copied items and a favourites section.",
    liveLabel: "Live",
    liveUrl: "",
    githubUrl: "https://github.com/fazle-rabbi-dev/clipo",
    timeline: "Oct 2026",
    stack: ["React 19", "TypeScript", "Rust", "Tauri"],
    whyTitle: "Why I built it",
    whyLead:
      "I built it to replace Ditto and the default Windows clipboard manager",
    whyRest: " with something more aesthetic, modern and feature-rich.",
    features: [],
    deepDive: [],
  },
  "pdf-reader": {
    slug: "pdf-reader",
    title: "PDF Reader",
    headline: "An opinionated PDF reader for Windows, built for myself.",
    summary:
      "A simple PDF reader for Windows with dark mode and the essential features I need every day.",
    liveLabel: "Live",
    liveUrl: "",
    githubUrl: "https://github.com/fazle-rabbi-dev/pdf-reader",
    timeline: "Oct 2026",
    stack: ["React 19", "TypeScript", "Rust", "Tauri"],
    whyTitle: "Why I built it",
    whyLead: "I wanted an opinionated PDF reader for Windows, with dark mode",
    whyRest: " and other essential features.",
    features: [],
    deepDive: [],
  },
}

export function getProjectBase(slug: string) {
  return FEATURED_PROJECTS.find((p) => p.href === `/projects/${slug}`)
}

export function getProjectDetails(slug: string) {
  return PROJECT_DETAILS[slug]
}
