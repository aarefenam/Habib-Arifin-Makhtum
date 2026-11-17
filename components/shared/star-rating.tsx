import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

// Read-only row of 5 stars
export function StarRating({
  rating,
  className,
}: {
  rating: number
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={cn("flex gap-0.5", className)}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          aria-hidden
          className={cn(
            "size-4",
            value <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}
