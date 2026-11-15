import { BriefcaseBusiness } from "lucide-react"

import type { PortfolioTimelineEntry } from "@/types/cms"

function monthYear(value: string | null) {
  if (!value) return ""
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("id-ID", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date)
}

export function AboutTimeline({
  entries,
  title,
  emptyText,
  currentLabel,
}: {
  entries: PortfolioTimelineEntry[]
  title: string
  emptyText: string
  currentLabel: string
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6">
      <BriefcaseBusiness aria-hidden className="size-5 text-blue-600" />
      <h2 className="heading-5 mt-4">{title}</h2>
      {entries.length ? (
        <ol className="mt-4 space-y-5">
          {entries.map((entry) => {
            const period = [
              monthYear(entry.startDate),
              entry.isCurrent ? currentLabel : monthYear(entry.endDate),
            ]
              .filter(Boolean)
              .join(" - ")
            return (
              <li key={entry.id} className="border-l border-border pl-4">
                <h3 className="text-sm font-semibold">{entry.title}</h3>
                {entry.organization ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.organization}
                  </p>
                ) : null}
                {period ? (
                  <p className="mt-1 text-xs text-muted-foreground">{period}</p>
                ) : null}
                {entry.description ? (
                  <p className="mt-2 text-sm leading-6 whitespace-pre-wrap text-muted-foreground">
                    {entry.description}
                  </p>
                ) : null}
              </li>
            )
          })}
        </ol>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">{emptyText}</p>
      )}
    </article>
  )
}
