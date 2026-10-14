import { cn } from "@/lib/utils"

export function ProjectCover({
  cover,
  name,
  className,
  innerClassName,
  imgClassName,
  zoomOnHover = false,
}: {
  cover: string
  name: string
  className?: string
  innerClassName?: string
  imgClassName?: string
  zoomOnHover?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-border bg-card p-1.5 shadow-sm",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[14px] bg-muted",
          innerClassName
        )}
      >
        <img
          src={cover}
          alt={`${name} cover`}
          loading="lazy"
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            imgClassName,
            zoomOnHover &&
              "transition-transform duration-500 group-hover:scale-[1.02]"
          )}
        />
      </div>
    </div>
  )
}
