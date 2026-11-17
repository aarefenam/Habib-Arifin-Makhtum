import { SectionHeader } from "@/components/shared/section-header"
import { StarRating } from "@/components/shared/star-rating"
import { TESTIMONIALS_HEADER } from "@/constants/testimonials"
import type { PortfolioTestimonial } from "@/types/cms"

// Approved client ratings. Hidden when none are approved yet.
export function Testimonials({
  testimonials,
}: {
  testimonials: PortfolioTestimonial[]
}) {
  if (!testimonials.length) return null

  const average =
    testimonials.reduce((sum, item) => sum + item.rating, 0) /
    testimonials.length
  const count = testimonials.length

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="mt-6 sm:mt-10"
    >
      <div className="flex flex-col gap-8">
        <SectionHeader
          {...TESTIMONIALS_HEADER}
          sideNote={`Rated ${average.toFixed(1)}/5 by ${count} ${count === 1 ? "client" : "clients"}.`}
          center={false}
          badgeCenter
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => {
            const initials = item.clientName
              .split(" ")
              .map((part) => part.slice(0, 1))
              .slice(0, 2)
              .join("")
              .toUpperCase()
            const meta = [item.clientRole, item.projectName]
              .filter(Boolean)
              .join(" · ")

            return (
              <figure
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <StarRating rating={item.rating} />
                <blockquote className="flex-1 leading-7 text-muted-foreground">
                  &ldquo;{item.message}&rdquo;
                </blockquote>
                <figcaption className="flex-center gap-3 border-t border-dashed border-border pt-4">
                  <span
                    aria-hidden
                    className="flex-center size-10 shrink-0 justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
                  >
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{item.clientName}</p>
                    {meta ? (
                      <p className="truncate text-sm text-muted-foreground">
                        {meta}
                      </p>
                    ) : null}
                  </div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
