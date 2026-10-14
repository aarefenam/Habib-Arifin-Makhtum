import { ArrowUpRight } from "lucide-react"

import { ABOUT_BLOGS, RECENT_BLOGS } from "@/constants/about"

import { AboutCard, AboutSectionHead } from "./about-card"

export function RecentBlogs() {
  return (
    <section id="blogs" aria-label="Recent blogs" className="mt-20">
      <div className="flex flex-col gap-4">
        <AboutSectionHead index={ABOUT_BLOGS.index} title={ABOUT_BLOGS.title} />

        <AboutCard className="p-2 sm:p-3">
          <ul className="flex flex-col divide-y divide-border">
            {RECENT_BLOGS.map((post) => (
              <li key={post.title}>
                <a
                  href={post.href}
                  target={post.href.startsWith("http") ? "_blank" : undefined}
                  rel={post.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-xl px-3 py-4 transition-colors hover:bg-muted/60"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold group-hover:text-blue-600">
                      {post.title}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                      {post.excerpt}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {post.date} · {post.readTime}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600"
                  />
                </a>
              </li>
            ))}
          </ul>
        </AboutCard>
        <a
          href="https://quiet-stack.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
        >
          Read My All Blog Here
          <ArrowUpRight aria-hidden className="size-3.5" />
        </a>
      </div>
    </section>
  )
}
