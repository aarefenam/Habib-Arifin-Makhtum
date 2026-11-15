"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"

import { isSafeContentHref } from "@/lib/content-href"
import { scrollToSection } from "@/lib/scroll"

// Section links always refer to the homepage, including from About and Projects.
export function ContentLink({
  href,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname()
  const safeHref = isSafeContentHref(href) ? href : "/"

  return (
    <Link
      {...props}
      href={safeHref.startsWith("#") ? `/${safeHref}` : safeHref}
      onClick={(event) => {
        onClick?.(event)
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank"
        )
          return
        if (pathname === "/" && safeHref.startsWith("#")) {
          event.preventDefault()
          scrollToSection(safeHref)
        }
      }}
    />
  )
}
