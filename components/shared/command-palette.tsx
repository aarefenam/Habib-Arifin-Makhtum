"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Search } from "lucide-react"

import { PALETTE_COMMANDS, PALETTE_NAVIGATE } from "@/constants/command-palette"
import { scrollToBottom, scrollToSection, scrollToTop } from "@/lib/scroll"
import { isTypingTarget, toggleFullscreen } from "@/lib/fullscreen"
import { useCommandPaletteStore } from "@/stores/command-palette-store"
import { cn } from "@/lib/utils"

type Item =
  | {
      kind: "nav"
      id: string
      label: string
      icon: React.ElementType
      target: string
    }
  | {
      kind: "cmd"
      id: string
      label: string
      icon: React.ElementType
      hint: string
    }

const NAV_ITEMS: Item[] = PALETTE_NAVIGATE.map((n) => ({ ...n, kind: "nav" }))
const CMD_ITEMS: Item[] = PALETTE_COMMANDS.map((c) => ({ ...c, kind: "cmd" }))
const ALL_ITEMS = [...NAV_ITEMS, ...CMD_ITEMS]
const LAST_KEY = "command-palette:last"

export function CommandPalette() {
  const isOpen = useCommandPaletteStore((s) => s.isOpen)
  const close = useCommandPaletteStore((s) => s.close)
  const toggle = useCommandPaletteStore((s) => s.toggle)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  // Ctrl/Cmd+K to open/close
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [toggle])

  // Focus + reset on open, restore last pressed item as selected
  React.useEffect(() => {
    if (isOpen) {
      setQuery("")
      let initial = 0
      try {
        const last = localStorage.getItem(LAST_KEY)
        if (last) {
          const found = ALL_ITEMS.findIndex((i) => i.id === last)
          if (found >= 0) initial = found
        }
      } catch {
        // storage unavailable - fall back to first item
      }
      setActiveIndex(initial)
      const id = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(id)
    }
  }, [isOpen])

  function goHome() {
    close()
    if (pathname === "/") scrollToTop()
    else router.push("/")
  }

  function goToSection(target: string) {
    close()
    if (pathname === "/") {
      scrollToSection(target)
    } else {
      router.push("/")
      setTimeout(() => scrollToSection(target), 350)
    }
  }

  function runCommand(id: string) {
    close()
    if (id === "fullscreen") toggleFullscreen()
    else if (id === "theme")
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    else if (id === "top") scrollToTop()
    else if (id === "bottom") scrollToBottom()
  }

  function runItem(item: Item) {
    try {
      localStorage.setItem(LAST_KEY, item.id)
    } catch {
      // storage unavailable - selection just won't persist
    }
    if (item.kind === "nav") {
      if (item.target === "top") goHome()
      else goToSection(item.target)
    } else {
      runCommand(item.id)
    }
  }

  const q = query.trim().toLowerCase()
  const nav = q
    ? NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(q))
    : NAV_ITEMS
  const cmds = q
    ? CMD_ITEMS.filter((i) => i.label.toLowerCase().includes(q))
    : CMD_ITEMS
  const flat = [...nav, ...cmds]

  React.useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Keep active item in view
  React.useEffect(() => {
    if (!isOpen) return
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [activeIndex, isOpen])

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => (flat.length ? (i + 1) % flat.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) =>
        flat.length ? (i - 1 + flat.length) % flat.length : 0
      )
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = flat[activeIndex]
      if (item) runItem(item)
    } else if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }

  // Single-key shortcuts (F/D/P/L) when palette open but not typing in input
  React.useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (isTypingTarget(e.target)) return
      const key = e.key.toLowerCase()
      if (key === "f") runCommand("fullscreen")
      else if (key === "d")
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      else if (key === "p") scrollToTop()
      else if (key === "l") scrollToBottom()
      else if (key === "escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, resolvedTheme])

  const renderItem = (item: Item, index: number) => {
    const Icon = item.icon
    const active = index === activeIndex
    return (
      <button
        key={item.id}
        type="button"
        data-index={index}
        onMouseEnter={() => setActiveIndex(index)}
        onClick={() => runItem(item)}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-left text-[15px] font-medium transition-colors",
          active ? "bg-blue-600/15 text-foreground" : "text-foreground"
        )}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
            active
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-foreground/10 bg-muted text-muted-foreground"
          )}
        >
          <Icon aria-hidden className="size-4" />
        </span>
        <span className="flex-1">{item.label}</span>
        {item.kind === "cmd" && (
          <kbd className="flex size-7 items-center justify-center rounded-md border border-foreground/10 bg-muted font-mono text-xs text-muted-foreground">
            {item.hint}
          </kbd>
        )}
      </button>
    )
  }

  let offset = 0
  const navWithIndex = nav.map((item) => ({ item, index: offset++ }))
  const cmdsWithIndex = cmds.map((item) => ({ item, index: offset++ }))

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/20 backdrop-blur"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[12vh] left-1/2 w-[min(92vw,600px)] -translate-x-1/2 animate-in overflow-hidden rounded-2xl border border-foreground/15 text-popover-foreground shadow-2xl duration-150 fade-in-0 zoom-in-95 supports-backdrop-filter:bg-popover/60"
      >
        {/* Search header */}
        <div className="flex items-center gap-2.5 border-b border-foreground/10 px-4 py-3.5">
          <Search
            aria-hidden
            className="size-5 shrink-0 text-muted-foreground"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Type a command or jump to a section..."
            aria-label="Type a command or jump to a section"
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <kbd
            onClick={close}
            className="cursor-pointer rounded-md border border-foreground/10 bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
          >
            Esc
          </kbd>
        </div>

        {/* List */}
        <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2.5">
          {flat.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &quot;{query}&quot;
            </p>
          )}
          {navWithIndex.length > 0 && (
            <>
              <p className="px-2.5 pt-1.5 pb-1 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                NAVIGATE
              </p>
              {navWithIndex.map(({ item, index }) => renderItem(item, index))}
            </>
          )}
          {cmdsWithIndex.length > 0 && (
            <>
              <p className="px-2.5 pt-3 pb-1 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                COMMANDS
              </p>
              {cmdsWithIndex.map(({ item, index }) => renderItem(item, index))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 border-t border-foreground/10 px-4 py-3 text-xs text-muted-foreground">
          <kbd className="flex size-7 items-center justify-center rounded-md border border-foreground/10 bg-muted font-mono">
            ↑
          </kbd>
          <kbd className="flex size-7 items-center justify-center rounded-md border border-foreground/10 bg-muted font-mono">
            ↓
          </kbd>
          <span className="mr-3">navigate</span>
          <kbd className="flex size-7 items-center justify-center rounded-md border border-foreground/10 bg-muted font-mono">
            ↵
          </kbd>
          <span>select</span>
          <span className="ml-auto flex items-center gap-1.5">
            <kbd className="rounded-md border border-foreground/10 bg-muted px-2 py-1 font-mono">
              Ctrl
            </kbd>
            <kbd className="flex size-7 items-center justify-center rounded-md border border-foreground/10 bg-muted font-mono">
              K
            </kbd>
            <span className="ml-1 font-semibold text-foreground">
              to open / close
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
