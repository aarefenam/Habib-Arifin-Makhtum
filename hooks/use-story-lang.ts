"use client"

import { useEffect, useState } from "react"

export type StoryLang = "en" | "bn"

const KEY = "story-lang"

function readSaved(): StoryLang | null {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === "en" || saved === "bn") return saved
  } catch {
    // storage unavailable - fall through to locale detection
  }
  return null
}

function detectLang(): StoryLang {
  const saved = readSaved()
  if (saved) return saved
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const isBD =
    tz === "Asia/Dhaka" ||
    tz === "Asia/Dacca" ||
    navigator.language.toLowerCase().includes("bn")
  return isBD ? "bn" : "en"
}

export function useStoryLang() {
  // Starts as "en" so the first client render matches the server.
  // Detection runs after mount (before paint) to avoid a hydration mismatch.
  const [lang, setLang] = useState<StoryLang>("en")

  useEffect(() => {
    const id = requestAnimationFrame(() => setLang(detectLang()))
    return () => cancelAnimationFrame(id)
  }, [])

  const pick = (next: StoryLang) => {
    setLang(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // storage unavailable - selection just won't persist
    }
  }

  return { lang, pick }
}
