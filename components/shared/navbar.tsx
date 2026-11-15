"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { X } from "lucide-react"

import {
  NAVBAR_INITIALS,
  NAVBAR_NAME,
  NAV_CONTACT,
  NAV_LINKS,
} from "@/constants/navigation"
import { cn } from "@/lib/utils"
import { scrollToSection, scrollToTop } from "@/lib/scroll"

export function Navbar() {
  const [collapsed, setCollapsed] = React.useState(false)
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [navHovered, setNavHovered] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  // Killer hack: keep the card radius until the collapse finishes,
  // then snap back to pill. Snapping radius while content is still
  // tall is what caused the circle/oval flicker on close.
  const [radiusOpen, setRadiusOpen] = React.useState(false)
  const radiusTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const pendingTarget = React.useRef<string | null>(null)
  const pendingTop = React.useRef(false)

  function goHome() {
    closeMobile()
    if (pathname === "/") {
      scrollToTop()
    } else {
      pendingTop.current = true
      router.push("/")
    }
  }

  function goToSection(target: string) {
    closeMobile()
    if (pathname === "/") {
      scrollToSection(target)
    } else {
      pendingTarget.current = target
      router.push("/")
    }
  }

  React.useEffect(() => {
    if (pathname === "/" && pendingTop.current) {
      pendingTop.current = false
      const id = setTimeout(() => scrollToTop(), 100)
      return () => clearTimeout(id)
    }
    if (pathname === "/" && pendingTarget.current) {
      const target = pendingTarget.current
      pendingTarget.current = null
      // Wait a tick for home sections to mount after navigation
      const id = setTimeout(() => scrollToSection(target), 100)
      return () => clearTimeout(id)
    }
  }, [pathname])

  function toggleMobile() {
    if (radiusTimer.current) {
      clearTimeout(radiusTimer.current)
      radiusTimer.current = null
    }
    if (!mobileOpen) {
      setMobileOpen(true)
      setRadiusOpen(true)
    } else {
      setMobileOpen(false)
      radiusTimer.current = setTimeout(() => setRadiusOpen(false), 300)
    }
  }

  function closeMobile() {
    if (radiusTimer.current) {
      clearTimeout(radiusTimer.current)
      radiusTimer.current = null
    }
    setMobileOpen(false)
    radiusTimer.current = setTimeout(() => setRadiusOpen(false), 300)
  }

  React.useEffect(() => {
    return () => {
      if (radiusTimer.current) clearTimeout(radiusTimer.current)
    }
  }, [])
  const lastY = React.useRef(0)

  // Hovering the pill (e.g. the typing indicator) forces it open
  const showFull = !collapsed || navHovered

  React.useEffect(() => {
    lastY.current = window.scrollY

    function onScroll() {
      const y = window.scrollY
      if (y < 50) {
        setCollapsed(false)
      } else if (y > lastY.current) {
        // scrolling down -> collapse
        setCollapsed(true)
      } else if (y < lastY.current) {
        // scrolling up -> expand
        setCollapsed(false)
      }
      lastY.current = y
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    if (!mobileOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobile()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        onMouseLeave={() => setNavHovered(false)}
        className={cn(
          "w-[min(78vw,280px)] overflow-clip border border-foreground/15 bg-background/40 backdrop-blur-xs transition-[padding,background-color] duration-300 ease-in-out md:w-auto",
          radiusOpen
            ? "rounded-[28px] py-2 pr-4 pl-2 md:rounded-full md:p-0 md:py-2 md:pl-2"
            : "rounded-full py-2 pr-4 pl-2",
          !radiusOpen && (showFull ? "md:pr-2" : "md:pr-6"),
          "md:flex-center md:gap-7"
        )}
      >
        {/* Top row - same nav, grows taller when open on mobile */}
        <div className="flex-center justify-between gap-2 md:justify-start md:gap-7">
          <button
            type="button"
            onClick={goHome}
            aria-label="Go to home"
            className="flex-center cursor-pointer gap-2.5 pl-1"
          >
            <span
              aria-hidden
              className="flex-center size-8 justify-center rounded-full bg-blue-600 text-xs font-bold text-white"
            >
              {NAVBAR_INITIALS}
            </span>
            <span className="text-[15px] font-bold tracking-tight whitespace-nowrap">
              {NAVBAR_NAME}
            </span>
          </button>

          {/* Mobile toggle: typing dots when closed, X when open + during close */}
          <button
            type="button"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-label={radiusOpen ? "Close menu" : "Open menu"}
            className="flex-center h-8 cursor-pointer gap-1 pr-2 pl-3 text-muted-foreground md:hidden"
          >
            {radiusOpen ? (
              <X aria-hidden className="size-5" />
            ) : (
              <>
                <span
                  aria-hidden="true"
                  className="typing-dot size-1.5 shrink-0 rounded-full bg-current"
                />
                <span
                  aria-hidden="true"
                  className="typing-dot size-1.5 shrink-0 rounded-full bg-current"
                />
                <span
                  aria-hidden="true"
                  className="typing-dot size-1.5 shrink-0 rounded-full bg-current"
                />
              </>
            )}
          </button>

          {/* Desktop trailing slot - links + dots share one grid cell
                so widths overlap (max) instead of adding (sum).
                Only the links animate width, dots crossfade on top. */}
          <div className="relative hidden md:grid">
            {/* Desktop expanded links - the only width driver */}
            <div
              className={cn(
                "col-start-1 row-start-1 gap-1 self-center overflow-hidden whitespace-nowrap transition-[max-width,opacity] ease-in-out md:flex md:items-center",
                showFull
                  ? "max-w-[500px] opacity-100 duration-1000"
                  : "max-w-0 opacity-0 duration-500"
              )}
            >
              <div
                className="hidden md:flex-center"
                onMouseLeave={() => setHovered(null)}
              >
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => goToSection(link.target)}
                    onMouseEnter={() => setHovered(link.label)}
                    className={cn(
                      "cursor-pointer rounded-full px-2 py-1.5 text-[15px] font-semibold tracking-tight transition-colors",
                      hovered === link.label
                        ? "text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => goToSection(NAV_CONTACT.href)}
                className="cursor-pointer rounded-full border border-foreground/15 bg-background px-5 py-1.5 text-[15px] font-semibold tracking-tight text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                {NAV_CONTACT.label}
              </button>
            </div>

            {/* Desktop typing indicator - overlays the links slot,
                opacity-only crossfade so it never affects layout width */}
            <button
              type="button"
              onMouseEnter={() => setNavHovered(true)}
              aria-label="Typing"
              aria-hidden={showFull}
              tabIndex={-1}
              className={cn(
                "col-start-1 row-start-1 h-8 items-center gap-1 self-center justify-self-start pr-2 pl-3 whitespace-nowrap text-muted-foreground transition-[opacity,scale] ease-out md:flex",
                showFull
                  ? "pointer-events-none scale-95 opacity-0 delay-100 duration-200"
                  : "scale-100 opacity-100 duration-300"
              )}
            >
              <span
                aria-hidden="true"
                className="typing-dot size-1.5 shrink-0 rounded-full bg-current"
              />
              <span
                aria-hidden="true"
                className="typing-dot size-1.5 shrink-0 rounded-full bg-current"
              />
              <span
                aria-hidden="true"
                className="typing-dot size-1.5 shrink-0 rounded-full bg-current"
              />
              {/* <Layers
                aria-hidden
                className="grip-tilt size-4 shrink-0"
              /> */}
            </button>
          </div>
        </div>

        {/* Mobile links - content fades fast on close, height collapses after */}
        <div
          aria-hidden={!mobileOpen}
          className={cn(
            "grid transition-[grid-template-rows,opacity,margin] md:hidden",
            mobileOpen
              ? "mt-2 grid-rows-[1fr] opacity-100 duration-300 ease-in-out"
              : "pointer-events-none mt-0 grid-rows-[0fr] opacity-0 duration-150 ease-out"
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => goToSection(link.target)}
                  tabIndex={mobileOpen ? 0 : -1}
                  style={{
                    transitionDelay: mobileOpen ? `${index * 70}ms` : "0ms",
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl px-3 py-2.5 text-left text-2xl font-medium tracking-tight transition-[opacity,translate,background-color] duration-300 ease-out hover:bg-muted",
                    mobileOpen
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none -translate-x-4 opacity-0"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                tabIndex={mobileOpen ? 0 : -1}
                style={{
                  transitionDelay: mobileOpen
                    ? `${NAV_LINKS.length * 70}ms`
                    : "0ms",
                }}
                onClick={() => {
                  closeMobile()
                  goToSection(NAV_CONTACT.href)
                }}
                className={cn(
                  "mt-3 w-full cursor-pointer rounded-full border border-foreground/15 bg-background px-5 py-3 text-[15px] font-semibold shadow-sm transition-[opacity,translate,background-color] duration-300 ease-out hover:bg-muted",
                  mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none -translate-x-4 opacity-0"
                )}
              >
                {NAV_CONTACT.label}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
