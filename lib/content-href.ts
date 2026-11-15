export function isSafeContentHref(value: string) {
  if (!value || /[\\\s\u0000-\u001f]/.test(value)) return false
  if (value.startsWith("#")) return /^#[a-zA-Z0-9_-]+$/.test(value)
  if (value.startsWith("/")) return !value.startsWith("//")

  try {
    const url = new URL(value)
    return (
      ["https:", "http:", "mailto:", "tel:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    )
  } catch {
    return false
  }
}
