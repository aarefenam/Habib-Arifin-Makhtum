import { cn } from "@/lib/utils"

export const ABOUT_CARD_BG =
  "rounded-2xl border border-border/70 bg-card/10 border border border-border hover:border-blue-600/30 p-5 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.18)] sm:p-6"

export function AboutCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <article className={cn(ABOUT_CARD_BG, className)}>{children}</article>
}

export function AboutSectionHead({
  index,
  title,
}: {
  index: string
  title: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="flex items-center gap-2 text-sm font-bold tracking-widest text-blue-600">
        {index}
        <span aria-hidden className="h-px w-8 bg-blue-600" />
      </p>
      <h2 className="heading-2">{title}</h2>
    </div>
  )
}
