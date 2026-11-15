import type { MetadataRoute } from "next"

import { SITE } from "@/constants/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = ["", "/about", "/projects"]

  return routes.map((route) => ({
    url: `${SITE.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
