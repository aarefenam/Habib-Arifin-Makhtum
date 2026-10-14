import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type CtaPillVariant = "solid" | "outline" | "white"

const PILL_STYLES: Record<CtaPillVariant, string> = {
  solid: "bg-blue-600 text-white hover:opacity-90",
  outline:
    "border border-border bg-card text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white",
  white: "bg-white text-blue-600 shadow-sm hover:opacity-90",
}

const CIRCLE_STYLES: Record<CtaPillVariant, string> = {
  solid: "bg-white text-blue-600",
  outline: "bg-blue-600 text-white",
  white: "bg-blue-600 text-white",
}

function PillInner({
  label,
  variant,
}: {
  label: string
  variant: CtaPillVariant
}) {
  return (
    <>
      {label}
      <span
        aria-hidden
        className={cn(
          "flex-center size-6 justify-center rounded-full",
          CIRCLE_STYLES[variant]
        )}
      >
        <ArrowUpRight aria-hidden className="size-4" />
      </span>
    </>
  )
}

export function CtaPill({
  href,
  label,
  variant = "solid",
  onClick,
}: {
  href?: string
  label: string
  variant?: CtaPillVariant
  onClick?: () => void
}) {
  const className = cn(
    "flex-center w-fit gap-2 rounded-full py-1.5 pr-1.5 pl-4 text-sm font-semibold transition-colors",
    PILL_STYLES[variant]
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(className, "cursor-pointer")}>
        <PillInner label={label} variant={variant} />
      </button>
    )
  }

  return (
    <Link href={href ?? "#"} className={className}>
      <PillInner label={label} variant={variant} />
    </Link>
  )
}
