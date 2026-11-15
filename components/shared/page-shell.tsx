"use client"

import { usePathname } from "next/navigation"

export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) {
    return children
  }

  return (
    <div className="max-body">
      <div className="border-foreground/15 px-2 pt-24 sm:border-x sm:px-6 dark:border-foreground/10">
        {children}
      </div>
    </div>
  )
}
