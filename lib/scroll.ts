import type Lenis from "lenis"

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function scrollToSection(selector: string) {
  if (lenis) {
    lenis.scrollTo(selector, { offset: -80, duration: 1.2 })
    return
  }
  document
    .querySelector(selector)
    ?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 })
    return
  }
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export function scrollToBottom() {
  const bottom = document.documentElement.scrollHeight
  if (lenis) {
    lenis.scrollTo(bottom, { duration: 1.2 })
    return
  }
  window.scrollTo({ top: bottom, behavior: "smooth" })
}
