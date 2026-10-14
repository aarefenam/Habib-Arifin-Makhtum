import type { MetadataRoute } from "next"

const baseUrl = "https://fazle-rabbi-dev.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    "",
    "/about",
    "/projects",
    "/my-tech-journey",
    "/project-launchpad",
    "/projects/link-leaf",
    "/projects/tube-brief",
    "/projects/quiet-stack",
    "/projects/clipo",
    "/projects/pdf-reader",
    "/projects/story-book",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.6 : 0.8,
  }))
}
