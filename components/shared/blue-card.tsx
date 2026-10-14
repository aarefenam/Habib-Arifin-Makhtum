import { cn } from "@/lib/utils"

export function BlueCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-600/20",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-24 size-64 rounded-full border border-white/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -bottom-16 size-48 rounded-full border border-white/20"
      />
      {children}
    </article>
  )
}
