"use client"

import { usePathname } from "next/navigation"

export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) {
    return children
  }

  return (
    <div className="max-body">
      {/* Side rails only on tablet; PC stays clean without vertical lines */}
      <div className="page-inset border-foreground/15 pt-24 sm:border-x lg:border-x-0 dark:border-foreground/10">
        {children}
      </div>
    </div>
  )
}
